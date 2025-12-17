import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaHeart, FaStar, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { TbCurrencyTaka } from 'react-icons/tb';
import OrderModal from '../../components/OrderModal';
import Loading from '../../components/Loading';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const BookDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    //  Fetch Book
    const { data: book, isLoading, isError } = useQuery({
        queryKey: ['book', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books/${id}`);
            return res.data;
        }
    });

    //  Fetch Reviews
    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${id}`);
            return res.data;
        }
    });

    //  Check Order Status
    const { data: orderStatus } = useQuery({
        queryKey: ['orderStatus', user?.email, id],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/check/${user.email}/${id}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;
    if (isError || !book) return <div className="text-center py-20 text-error">Failed to load book</div>;

    const averageRating = reviews.length
        ? Math.round(reviews.reduce((a, b) => a + b.rating, 0) / reviews.length)
        : 0;

    const { title, image, author, category, description, price, quantity } = book;

    //  Wishlist
    const handleAddToWishlist = async () => {
        if (!user) return toast.error("Please login first");

        const wishlistData = {
            bookId: book._id,
            title,
            image,
            category,
            price,
            userEmail: user.email,
            userName: user.displayName,
            addedDate: new Date()
        };

        const res = await axiosSecure.post('/wishlist', wishlistData);
        res.data.insertedId
            ? toast.success("Added to wishlist")
            : toast.error(res.data.message);
    };

    //  Review Submit
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) return toast.error("Login required");

        const reviewData = {
            bookId: book._id,
            userEmail: user.email,
            userName: user.displayName,
            rating,
            comment,
            date: new Date()
        };

        await axiosSecure.post('/reviews', reviewData);
        toast.success("Review submitted");
        setComment("");
        queryClient.invalidateQueries(['reviews', id]);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <Link to="/books" className="flex items-center gap-2 mb-6 text-primary">
                <FaArrowLeft /> Back to Books
            </Link>

            <div className="grid md:grid-cols-2 gap-10">
                <img src={image} alt={title} className="rounded-xl shadow-lg h-[450px] object-cover w-full" />

                <div>
                    <span className="badge badge-primary">{category}</span>
                    <h1 className="text-4xl font-bold mt-2">{title}</h1>
                    <p className="text-gray-500 mb-2">by {author}</p>

                    <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < averageRating ? "text-yellow-400" : "text-gray-300"} />
                        ))}
                        <span className="text-sm">({reviews.length})</span>
                    </div>

                    <p className="my-4 text-gray-600">{description}</p>

                    <div className="text-3xl font-bold flex items-center text-primary">
                        <TbCurrencyTaka /> {price}
                    </div>

                    <div className="flex gap-4 mt-6">
                        <button onClick={handleAddToWishlist} className="btn btn-outline flex-1">
                            <FaHeart /> Wishlist
                        </button>
                        <button
                            disabled={quantity === 0}
                            onClick={() => setIsOrderModalOpen(true)}
                            className="btn btn-primary flex-1"
                        >
                            <FaShoppingCart /> Order Now
                        </button>
                    </div>
                </div>
            </div>

            {/*  Reviews */}
            <div className="mt-16">
                <h2 className="text-3xl font-bold mb-6">Reviews</h2>

                <div className="bg-base-200 p-6 rounded-xl mb-8">
                    <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>

                    {orderStatus?.hasOrdered ? (
                        <form onSubmit={handleReviewSubmit} className="space-y-4">
                            <div className="rating">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <input
                                        key={star}
                                        type="radio"
                                        className="mask mask-star-2 bg-orange-400"
                                        checked={rating === star}
                                        onChange={() => setRating(star)}
                                    />
                                ))}
                            </div>

                            <textarea
                                className="textarea textarea-bordered w-full"
                                placeholder="Write your review"
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                required
                            />

                            <button className="btn btn-primary">Submit Review</button>
                        </form>
                    ) : (
                        <p className="italic text-gray-500">
                            You must purchase this book before reviewing.
                        </p>
                    )}
                </div>

                {reviews.map((r, i) => (
                    <div key={i} className="p-5 bg-base-100 rounded-xl shadow mb-4">
                        <strong>{r.userName}</strong>
                        <div className="flex text-orange-400 text-sm my-1">
                            {[...Array(r.rating)].map((_, i) => <FaStar key={i} />)}
                        </div>
                        <p>{r.comment}</p>
                    </div>
                ))}
            </div>

            <OrderModal
                book={book}
                isOpen={isOrderModalOpen}
                onClose={() => setIsOrderModalOpen(false)}
            />
        </div>
    );
};

export default BookDetails;
