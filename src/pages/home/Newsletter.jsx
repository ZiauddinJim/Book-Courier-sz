import React, { useState } from "react";
import Swal from "sweetalert2";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        if (!email) {
            return Swal.fire({
                icon: "warning",
                title: "Email Required",
                text: "Please enter your email address!",
                confirmButtonColor: "#3085d6",
            });
        }

        Swal.fire({
            icon: "success",
            title: "Subscribed Successfully!",
            text: `Thank you for subscribing: ${email}`,
            confirmButtonColor: "#3085d6",
        });

        setEmail("");
    };

    return (
        <div className="py-16 bg-primary text-primary-content">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Subscribe to Our Newsletter
                </h2>

                <p className="mb-8 max-w-xl mx-auto text-sm md:text-base px-2">
                    Stay updated with the latest book arrivals, special offers,
                    and literary events. Join our community today!
                </p>

                <div className="flex justify-center">
                    <div className="join w-full max-w-md">
                        <input
                            type="email"
                            required
                            className="input input-bordered join-item w-full text-black dark:text-white"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className="btn btn-secondary join-item w-28 md:w-auto"
                            onClick={handleSubscribe}
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
