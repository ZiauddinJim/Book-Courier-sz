import React from 'react';
import Marquee from "react-fast-marquee";

const Testimonials = () => {
    const reviews = [
        {
            id: 1,
            name: "Alice Johnson",
            review: "BookCourier has changed the way I read. The delivery is super fast!",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            rating: 5
        },
        {
            id: 2,
            name: "Michael Smith",
            review: "I love the collection they have. Found some rare gems here.",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            rating: 4
        },
        {
            id: 3,
            name: "Emily Davis",
            review: "Great service and friendly staff. Highly recommended!",
            avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
            rating: 5
        },
        {
            id: 4,
            name: "David Wilson",
            review: "Such a helpful and convenient service. It saves me so much time!",
            avatar: "https://i.pravatar.cc/150?u=b043582f4e29026024d",
            rating: 5
        },
        {
            id: 5,
            name: "Sophia Martinez",
            review: "Excellent book quality and fast response. I'm impressed!",
            avatar: "https://i.pravatar.cc/150?u=c04458314e29026704d",
            rating: 4
        },
        {
            id: 6,
            name: "James Brown",
            review: "Easy ordering and smooth delivery. Love using BookCourier!",
            avatar: "https://i.pravatar.cc/150?u=d04558414e29026302d",
            rating: 5
        }
    ];

    return (
        <div className="py-16 bg-base-200">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">
                    What Our Readers Say
                </h2>

                <Marquee pauseOnHover={true} speed={40} gradient={false}>
                    <div className="flex gap-6">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="card bg-base-100 shadow-xl my-5 p-6 w-80 mx-2
    transition-transform duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl">
                                <div className="flex items-center mb-4">
                                    <div className="avatar">
                                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={review.avatar} alt={review.name} />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-bold text-lg">{review.name}</h3>
                                        <div className="rating rating-sm">
                                            {[...Array(5)].map((_, i) => (<input key={i} type="radio" name={`rating-${review.id}`}
                                                className="mask mask-star-2 bg-orange-400" checked={i < review.rating}
                                                readOnly />))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 italic">
                                    "{review.review}"
                                </p>
                            </div>
                        ))}
                    </div>
                </Marquee>

            </div>
        </div>
    );
};

export default Testimonials;
