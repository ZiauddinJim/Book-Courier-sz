import React from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import BookCard from "./BookCard";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import Spinner from "../../components/Spinner";

const LatestBooks = () => {
    const axios = useAxios();

    const { data: books = [], isLoading } = useQuery({
        queryKey: ['latest-books'],
        queryFn: async () => {
            const res = await axios.get('/latest-books');
            return res.data;
        }
    });
    console.log(books);

    if (isLoading) return <div className="my-5"><Spinner /></div>;

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
                    {books.slice(0, 10).map((book) => (
                        <SwiperSlide key={book._id}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </div>
    );
};

export default LatestBooks;
