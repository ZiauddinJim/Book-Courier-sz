import React, { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { MdOutlineMail } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import forgetErrorCatch from '../../utils/forgetErrorCatch';

const ForgetPassword = () => {
    const { resetPasswordFun, email, setEmail } = useAuth()
    const emailRef = useRef();
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if (email && emailRef.current) {
            emailRef.current.value = email;
        }
    }, [email])


    const handleReset = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        resetPasswordFun(email)
            .then(() => {
                // reset email sent!
                navigate(`${location.state ? location.state : '/'}`) // if using react-router
                window.open("https://mail.google.com/", "_blank");
                Swal.fire({
                    title: "Password Reset Email Sent!",
                    text: `Please check your inbox for reset instructions.`,
                    icon: "success",
                    confirmButtonColor: "#003453",
                });
            })
            .catch(forgetErrorCatch);
        setEmail(null)

    }

    return (
        <div
            className="flex h-auto min-h-screen items-center justify-center overflow-x-hidden bg-[url('https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/auth/auth-background-2.png')] bg-cover bg-center bg-no-repeat py-10"
        >
            <title>Forget Password | Study Mate</title>
            <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="bg-base-100 shadow-base-300/20 z-1 w-full space-y-6 rounded-xl p-6 shadow-md sm:max-w-md lg:p-8">

                    {/* header */}
                    <div>
                        <h3 className="text-base-content mb-1.5 text-2xl font-semibold">Forgot Password?</h3>
                        <p className="text-base-content/80">Enter your email and we'll send you instructions to reset your password</p>
                    </div>
                    {/* form */}
                    <form onSubmit={handleReset} className="mb-4 space-y-4">
                        <div>
                            <label className="label-text">Email address*</label>
                            <div className="relative flex items-center">
                                <input name="email" ref={emailRef} type="text" required className="w-full text-sm border-b border-primary dark:border-secondary focus:outline-none pl-2 pr-8 py-3 outline-none" placeholder="Enter email" />
                                <MdOutlineMail />
                            </div>
                        </div>
                        <button type='submit' className="btn btn-lg btn-primary dark:btn-secondary  btn-gradient btn-block">Send Reset Link</button>
                    </form>

                    <div className="flex justify-center">
                        <Link to={"/login"} className="underline text-primary dark:text-secondary font-normal">Back to login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;