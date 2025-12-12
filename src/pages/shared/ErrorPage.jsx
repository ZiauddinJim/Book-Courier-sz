import React from 'react';
import { Link, useRouteError, useNavigate } from 'react-router';

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    console.error(error);


    return (
        <div className="hero min-h-screen">
            <div className="hero-content text-center flex-col">
                <div className="w-full max-w-sm mb-8">
                    <div className="text-9xl font-bold text-primary mb-4">404</div>
                </div>
                <div className="max-w-md">

                    <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
                    <p className="py-6 text-lg">
                        Sorry, the page you are looking for doesn't exist or has been moved.
                    </p>
                    <p className="mb-8 text-error italic">
                        {error?.statusText || error?.message}
                    </p>
                    <div className="flex justify-center gap-4">
                        <button onClick={() => navigate(-1)} className="btn btn-outline">
                            Go Back
                        </button>
                        <Link to="/" className="btn btn-primary px-8">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
