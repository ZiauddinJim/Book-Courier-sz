import React from "react";
import { Link } from "react-router";
import { FaHeart, FaStar } from "react-icons/fa";

const BookCard = ({ book }) => {
    return (
        <div className="group card bg-base-100 shadow-md hover:shadow-xl rounded-xl overflow-hidden transition-all duration-300 relative">

            {/* Wishlist
            <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md z-50 opacity-0 group-hover:opacity-100 transition duration-300">
                <FaHeart className="text-red-500" size={18} />
            </button> */}

            {/* Image */}
            <figure className="h-48 w-full overflow-hidden">
                <img
                    src={book.image}
                    alt={book.title}
                    className="object-cover h-full w-full group-hover:scale-110 transition duration-500"
                />
            </figure>

            {/* Info */}
            <div className="card-body text-center">
                <h3 className="font-semibold text-lg truncate" title={book.title}>
                    {book.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm truncate" title={book.author}>
                    by {book.author}
                </p>

                {/* Rating */}
                <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            className={`text-yellow-400 ${i < Math.floor(book.rating) ? "" : "opacity-30"}`}
                        />
                    ))}
                </div>

                {/* Price */}
                <p className="font-bold text-primary">${book.price}</p>

                {/* Quick View */}
                <div className="card-actions justify-center mt-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition duration-300">
                    <Link to={`/books/${book.id}`} className="btn btn-primary btn-sm">
                        Quick View
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default BookCard;
