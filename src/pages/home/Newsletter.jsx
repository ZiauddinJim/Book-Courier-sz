import React from 'react';

const Newsletter = () => {
    return (
        <div className="py-16 bg-primary text-primary-content">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="mb-8 max-w-2xl mx-auto">
                    Stay updated with the latest book arrivals, special offers, and literary events. Join our community today!
                </p>
                <div className="flex justify-center">
                    <div className="join">
                        <input className="input input-bordered join-item text-black dark:text-white w-64 md:w-96" placeholder="Email address" />
                        <button className="btn btn-secondary join-item">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
