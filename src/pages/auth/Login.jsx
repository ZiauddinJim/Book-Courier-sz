import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { Link, useLocation, useNavigate } from 'react-router';
import { assets } from '../../assets/assets';
import { IoIosCloseCircle } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { firebaseErrorMessage } from '../../utils/firebaseErrorMessage';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxiosSecure()
    const { signInFun, googleSignInFun, setEmail } = useAuth()
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();


    const onSubmit = async (data) => {
        const toastId = toast.loading("Logging in...");

        try {
            const result = await signInFun(data.email, data.password);
            const user = result.user;

            toast.success("Login successful!", { id: toastId });

            // Redirect
            navigate(location?.state || "/");

        } catch (err) {
            const message = firebaseErrorMessage(err.code);
            toast.error(message, { id: toastId });
            console.error(err);
        }
    };

    const handleForgetPassword = () => {
        // SN: getValues useForm hooks suggest data
        const emailValue = getValues("email")
        setEmail(emailValue);
        navigate("/forgetPassword");
    }


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
            <div className="flex  rounded-2xl shadow-2xl max-w-[1100px] w-full overflow-hidden relative">

                {/* Close Button */}
                <IoIosCloseCircle
                    onClick={() => navigate('/')} className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full
                     transition-colors duration-200" aria-label="Close" />

                {/* Image Section */}
                <div className="lg:flex justify-center items-center hidden w-1/2 bg-linear-to-br from-purple-50 to-orange-100 dark:from-purple-50/0 dark:to-orange-100/0 p-12">
                    <img
                        className="w-full max-w-[400px] h-auto" src={assets.login} alt="Login illustration" />
                </div>

                {/* Form Section */}
                <div className="w-full lg:w-1/2 p-8 md:p-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="text-3xl font-bold mb-6">Login now!</h1>

                        <div className="space-y-4">

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Email
                                </label>
                                <input
                                    type="email" placeholder="Enter your email"
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
                                    <p className="text-sm mt-1 text-red-600">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <label className="block text-sm font-medium mb-1">
                                    Password
                                </label>
                                <input
                                    type={show ? "text" : "password"} placeholder="Enter your password"
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

                            {/* Forgot Password */}
                            <div className="text-right">
                                <button
                                    type="button"
                                    onClick={handleForgetPassword}
                                    className="text-sm font-medium text-primary cursor-pointer dark:text-secondary hover:underline"
                                >
                                    Forgot password?
                                </button>

                            </div>

                            {/* Submit */}
                            <button type="submit" className="btn w-full border-0 shadow-lg btn-primary dark:btn-secondary">
                                Login
                            </button>

                            {/* OR */}
                            <div className="divider">OR</div>

                            {/* Google */}
                            <button type="button" onClick={handleGoogleSubmit} className="btn w-full btn-primary dark:btn-secondary">
                                <FcGoogle />
                                Login with Google
                            </button>
                        </div>

                        {/* Register Link */}
                        <p className="text-center mt-6 text-sm">
                            New to our website?{" "}
                            <Link className="font-semibold hover:underline text-primary dark:text-secondary" to="/register" state={location?.state}>
                                Register
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;