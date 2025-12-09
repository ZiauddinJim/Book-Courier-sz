import React from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import BookCard from "./BookCard";

const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Classic", rating: 4.5, price: 1760 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Classic", rating: 4.8, price: 2090 },
    { id: 3, title: "1984", author: "George Orwell", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Dystopian", rating: 4.6, price: 1815 },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Romance", rating: 4.7, price: 1650 },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Fiction", rating: 4.3, price: 1980 },
    { id: 6, title: "Moby Dick", author: "Herman Melville", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Adventure", rating: 4.4, price: 2200 },
    { id: 7, title: "War and Peace", author: "Leo Tolstoy", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Historical", rating: 4.9, price: 2740 },
    { id: 8, title: "The Odyssey", author: "Homer", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Epic", rating: 4.5, price: 1870 }
];


const LatestBooks = () => {
    return (
        <div className="py-16 bg-base-100">
            <div className="container mx-auto px-4">

                {/* Title + View All */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold">Latest Books</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                            Explore the newest arrivals and trending reads!
                        </p>
                    </div>

                    <Link to="/books" className="btn btn-outline btn-primary hover:scale-105 transition">
                        View All
                    </Link>
                </div>

                {/* Swiper Slider */}
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 6 }
                    }}
                >
                    {books.map((book) => (
                        <SwiperSlide key={book.id}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </div>
    );
};

export default LatestBooks;
