import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from "react-hot-toast";
import { assets } from '../../assets/assets';
import { IoIosCloseCircle } from 'react-icons/io';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { firebaseErrorMessage } from '../../utils/firebaseErrorMessage';
import useAuth from '../../hooks/useAuth';

const Register = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { registerUserFun, updateProfileFun, googleSignInFun } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        const toastId = toast.loading("Creating account...");
        const profileImg = data.photo[0];

        try {
            await registerUserFun(data.email, data.password);

            const formData = new FormData();
            formData.append("image", profileImg);
            const image_API_URI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;

            const resImg = await axios.post(image_API_URI, formData);
            const photoUrl = resImg.data.data.url;

            await updateProfileFun({
                displayName: data.name,
                photoURL: photoUrl,
            });

            const userInfo = {
                email: data.email,
                displayName: data.name,
                photoURL: photoUrl,
                role: "user",
            };

            await axiosSecure.post('/users', userInfo);

            toast.success("Account created successfully!", { id: toastId });
            reset();
            navigate(location.state || "/");

        } catch (error) {
            const message = firebaseErrorMessage(error.code);
            toast.error(message, { id: toastId });
            console.error(error);
        }
    };


    const handleGoogleSubmit = async () => {
        const toastId = toast.loading("Logging in...");

        try {
            const result = await googleSignInFun();
            const gUser = result.user;

            const userInfo = {
                displayName: gUser?.displayName,
                photoURL: gUser?.photoURL,
                email: gUser?.email,
                role: "user",
            };

            await axiosSecure.post("/users", userInfo)
                .catch(() => console.log("User already exists in DB"));

            toast.success("Login successful!", { id: toastId });
            navigate(location?.state || "/");

        } catch (err) {
            const message = firebaseErrorMessage(err.code);
            toast.error(message, { id: toastId });
            console.error(err);
        }
    };



    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="flex rounded-2xl shadow-2xl max-w-[1100px] w-full overflow-hidden relative">

                <IoIosCloseCircle
                    onClick={() => navigate('/')} className="absolute top-4 right-4 w-8 h-8 cursor-pointer" />

                <div className="lg:flex justify-center items-center hidden w-1/2 bg-linear-to-br from-purple-50 to-orange-100 dark:from-purple-50/0 dark:to-orange-100/0 p-12">
                    <img className="w-full max-w-[400px] h-auto" src={assets.registerImg} alt="Register" />
                </div>

                <div className="w-full lg:w-1/2 p-8 md:p-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="text-3xl font-bold mb-6">Register</h1>

                        <div className="space-y-4">
                            {/* Name input */}
                            <div>
                                <label className="block mb-1">Name</label>
                                <input type="text" {...register("name", { required: "Name is required" })}
                                    className="input w-full focus:outline-none border border-primary dark:border-secondary" placeholder="Enter your name" />
                                {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                            </div>

                            {/* Email input */}
                            <div>
                                <label className="block mb-1">Email</label>
                                <input type="email"
                                    {...register("email", { required: "Email is required" })}
                                    className="input w-full focus:outline-none border border-primary dark:border-secondary" placeholder="Enter your email" />
                                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                            </div>

                            {/* Profile image input */}
                            <div>
                                <label className="block mb-1">Profile Image</label>
                                <input type="file" accept="image/*"
                                    {...register("photo", { required: "Image is required" })}
                                    className="file-input w-full focus:outline-none border border-primary dark:border-secondary" />
                                {errors.photo && <p className="text-red-600">{errors.photo.message}</p>}
                            </div>
                            {/* password input */}
                            <div className="relative">
                                <label className="block mb-1">Password</label>
                                <input
                                    type={show ? "text" : "password"}
                                    placeholder="Password"
                                    {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                                            message: "Min 6 chars, include uppercase, lowercase & number",
                                        },
                                    })}
                                    className="input w-full pr-10 focus:outline-none border border-primary dark:border-secondary"
                                />
                                <span onClick={() => setShow(!show)} className="absolute right-3 top-9 cursor-pointer">
                                    {show ? <LuEye /> : <LuEyeClosed />}
                                </span>
                                {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                            </div>

                            <button type="submit" className="btn w-full btn-primary dark:btn-secondary">
                                Register
                            </button>

                            <div className="divider">OR</div>

                            <button
                                type="button"
                                onClick={handleGoogleSubmit}
                                className="btn w-full btn-primary dark:btn-secondary"
                            >
                                <FcGoogle /> Sign up with Google
                            </button>
                        </div>

                        <p className="text-center mt-6 text-sm">
                            Already have an account? <Link to="/login" state={location?.state} className="font-semibold hover:underline text-primary dark:text-secondary">Login</Link>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Register;
