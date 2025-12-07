import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { assets } from '../../assets/assets';
import { IoIosCloseCircle } from 'react-icons/io';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { FcGoogle } from 'react-icons/fc';
import AuthContext from '../../contexts/AuthContext';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Register = () => {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { registerUserFun, updateProfileFun } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const profileImg = data.photo[0]
        // console.log("Form Data:", data);
        registerUserFun(data.email, data.password)
            .then(() => {
                // 1. Store the image in form data
                const formData = new FormData();
                formData.append('image', profileImg)

                // 2. send the photo to store and get the ul
                const image_API_URI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`

                axios.post(image_API_URI, formData)
                    .then(res => {
                        const photoUrl = res.data.data.url;
                        // console.log(photoUrl, res);

                        // firebase Profile Update
                        const userUpdate = {
                            displayName: data.name,
                            photoURL: photoUrl
                        }
                        updateProfileFun(userUpdate)
                            .then(() => {
                                navigate(location.state || '/');
                            }).catch(error => console.error(error))

                        // create user in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoUrl,
                            role: "user",
                        }
                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user created in the database');
                                }
                            })


                    })
            })
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="flex  rounded-2xl shadow-2xl max-w-[1100px] w-full overflow-hidden relative">

                {/* Close Button */}
                <IoIosCloseCircle
                    onClick={() => navigate('/')} className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full
                             transition-colors duration-200" aria-label="Close" />

                {/* Image Section */}
                <div className="lg:flex justify-center items-center hidden w-1/2 bg-linear-to-br
                 from-purple-50 to-orange-100 dark:from-purple-50/0 dark:to-orange-100/70 p-12">
                    <img
                        className="w-full max-w-[400px] h-auto" src={assets.registerImg} alt="Login illustration" />
                </div>

                {/* Form Section */}
                <div className="w-full lg:w-1/2 p-8 md:p-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="text-3xl font-bold mb-6">Register</h1>

                        <div className="space-y-4">

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="input w-full focus:outline-none border border-primary dark:border-secondary"
                                    {...register("name", { required: "Name is required" })}
                                />
                                {errors.name && (
                                    <p className="text-sm mt-1 text-red-600">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="input w-full focus:outline-none border border-primary dark:border-secondary"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Enter a valid email",
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <p className="text-sm mt-1 text-red-600">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Profile Image */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Profile Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="file-input w-full focus:outline-none border border-primary dark:border-secondary"
                                    {...register("photo", { required: "Image is required" })}
                                />
                                {errors.photo && (
                                    <p className="text-sm mt-1 text-red-600">{errors.photo.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input
                                    type={show ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="input w-full pr-12 focus:outline-none border border-primary dark:border-secondary"
                                    {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                                            message:
                                                "Min 6 chars, include uppercase, lowercase & number",
                                        },
                                    })}
                                />
                                <span
                                    onClick={() => setShow(!show)}
                                    className="absolute right-3 top-10 cursor-pointer"
                                >
                                    {show ? <LuEye size={20} /> : <LuEyeClosed size={20} />}
                                </span>

                                {errors.password && (
                                    <p className="text-sm mt-1 text-red-600">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn w-full border-0 shadow-lg btn-primary dark:btn-secondary"
                            >
                                Register
                            </button>

                            {/* OR */}
                            <div className="divider">OR</div>

                            {/* Google */}
                            <button type="button" className="btn w-full btn-primary dark:btn-secondary">
                                <FcGoogle />
                                Sign up with Google
                            </button>
                        </div>

                        {/* Login Link */}
                        <p className="text-center mt-6 text-sm">
                            Already have an account?{" "}
                            <Link
                                className="font-semibold hover:underline text-primary dark:text-secondary"
                                to="/login"
                            >
                                Login
                            </Link>
                        </p>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Register;