import React, { useEffect, useRef } from 'react';
import { Truck, BookOpen, Users, RotateCcw } from 'lucide-react';

const WhyChooseUs = () => {
    const features = [
        {
            id: 1,
            icon: <Truck className="w-12 h-12 text-primary mb-4" />,
            title: "Fast Delivery",
            description: "Get your books delivered to your doorstep within 24 hours."
        },
        {
            id: 2,
            icon: <BookOpen className="w-12 h-12 text-secondary mb-4" />,
            title: "Wide Collection",
            description: "Access thousands of books from various genres and authors."
        },
        {
            id: 3,
            icon: <Users className="w-12 h-12 text-accent mb-4" />,
            title: "Community Driven",
            description: "Join a community of book lovers and share your reviews."
        },
        {
            id: 4,
            icon: <RotateCcw className="w-12 h-12 text-info mb-4" />,
            title: "Easy Returns",
            description: "Hassle-free return policy for all borrowed books."
        }
    ];

    const cardsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('animate-in');
                        }, index * 150);
                    }
                });
            },
            { threshold: 0.1 }
        );

        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="py-16 bg-base-100">
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes floatIcon {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                @keyframes pulse-glow {
                    0%, 100% {
                        box-shadow: 0 0 20px rgba(106, 27, 154, 0.3);
                    }
                    50% {
                        box-shadow: 0 0 30px rgba(106, 27, 154, 0.5);
                    }
                }

                .feature-card {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .feature-card.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }

                .feature-card:hover .icon-wrapper {
                    animation: floatIcon 2s ease-in-out infinite;
                }

                .feature-card:hover {
                    transform: translateY(-10px) scale(1.02);
                    animation: pulse-glow 2s ease-in-out infinite;
                }

                .title-animate {
                    animation: fadeInUp 0.8s ease-out;
                }

                .subtitle-animate {
                    animation: fadeInUp 0.8s ease-out 0.2s both;
                }
            `}</style>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 title-animate">Why Choose BookCourier?</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto subtitle-animate">
                        We are dedicated to providing the best reading experience for our users. Here is why you should choose us.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className="feature-card card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-200 text-center p-8 cursor-pointer"
                        >
                            <div className="flex justify-center icon-wrapper">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;