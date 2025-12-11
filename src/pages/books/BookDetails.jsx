import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import { FaHeart, FaStar, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { TbCurrencyTaka } from 'react-icons/tb';
import OrderModal from '../../components/OrderModal';
import Loading from '../../components/Loading';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const BookDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axios = useAxios();
    const queryClient = useQueryClient();
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    // Review Form State
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    // Fetch Book Details
    const { data: book, isLoading, isError } = useQuery({
        queryKey: ['book', id],
        queryFn: async () => {
            const res = await axios.get(`/books/${id}`);
            return res.data;
        }
    });

    // Fetch Reviews
    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews', id],
        queryFn: async () => {
            try {
                const res = await axios.get(`/reviews/${id}`);
                return res.data;
            } catch (error) {
                console.error("Failed to fetch reviews", error);
                return [];
            }
        }
    });

    const averageRating = reviews.length > 0
        ? Math.round(reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length)
        : 0;

    const handleAddToWishlist = async () => {
        if (!user) return toast.error("Please login first");

        const wishlistData = {
            bookId: book._id,
            title: book.title,
            image: book.image,
            category: book.category,
            price: book.price,
            userEmail: user.email,
            userName: user.displayName,
            addedDate: new Date()
        };

        try {
            const res = await axios.post('/wishlist', wishlistData);
            if (res.data.insertedId) {
                toast.success("Added to wishlist!");
            } else if (res.data.message) {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Failed to add to wishlist");
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) return toast.error("Please login to review");

        const reviewData = {
            bookId: book._id,
            userEmail: user.email,
            userName: user.displayName,
            rating,
            comment,
            date: new Date()
        };

        try {
            const res = await axios.post('/reviews', reviewData);
            if (res.data.insertedId) {
                toast.success("Review submitted!");
                setComment("");
                queryClient.invalidateQueries(['reviews', id]);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to submit review");
        }
    };

    if (isLoading) return <Loading />;
    if (isError || !book) return <div className="text-center py-20 text-error">Failed to load book details.</div>;

    const { title, image, author, category, description, price, quantity, status, librarianName, librarianEmail } = book;

    return (
        <div className="container mx-auto px-4 py-10">
            {/* Back Button */}
            <Link to="/books" className="btn btn-ghost mb-6 pl-0 hover:bg-transparent hover:underline flex items-center gap-2 w-fit">
                <FaArrowLeft /> Back to Books
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Image Section */}
                <div className="h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg border border-base-200">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                </div>

                {/* Info Section */}
                <div className="flex flex-col gap-4">
                    <span className="badge badge-primary badge-outline">{category}</span>
                    <h1 className="text-4xl font-bold">{title}</h1>
                    <p className="text-xl text-gray-500">by <span className="font-semibold text-base-content">{author}</span></p>

                    <div className="flex items-center gap-4 my-2">
                        {/* Rating Display */}
                        <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => <FaStar key={i} className={i < averageRating ? "" : "text-gray-300"} />)}
                        </div>
                        <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
                    </div>

                    <div className="divider my-0"></div>

                    <p className="text-gray-600 leading-relaxed text-justify">{description}</p>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center text-3xl font-bold text-primary">
                            <TbCurrencyTaka className="text-4xl" /> {price}
                        </div>
                        <div className={`badge ${quantity > 0 ? 'badge-success' : 'badge-error'} badge-lg text-white`}>
                            {quantity > 0 ? 'In Stock' : 'Out of Stock'} {quantity > 0 && `(${quantity})`}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={handleAddToWishlist}
                            className="btn btn-outline btn-secondary flex-1"
                        >
                            <FaHeart /> Wishlist
                        </button>
                        <button
                            onClick={() => setIsOrderModalOpen(true)}
                            className="btn btn-primary flex-1"
                            disabled={quantity === 0}
                        >
                            <FaShoppingCart /> Order Now
                        </button>
                    </div>

                    {/* Librarian Info */}
                    <div className="mt-8 p-4 bg-base-200 rounded-lg">
                        <h4 className="font-semibold mb-2">Librarian Details:</h4>
                        <p className="text-sm">Name: {librarianName || "N/A"}</p>
                        <p className="text-sm">Email: {librarianEmail || "N/A"}</p>
                    </div>

                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-16">
                <h2 className="text-3xl font-bold mb-6">Reviews ({reviews.length})</h2>

                {/* Review Form */}
                <div className="bg-base-200 p-6 rounded-xl mb-10">
                    <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Rating</span></label>
                            <div className="rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <input
                                        key={star}
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400"
                                        checked={rating === star}
                                        onChange={() => setRating(star)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Your Review</span></label>
                            <textarea
                                className="textarea textarea-bordered h-24"
                                placeholder="Share your thoughts..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!user}
                        >
                            {user ? "Submit Review" : "Login to Review"}
                        </button>
                    </form>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {reviews.length > 0 ? reviews.map((review, idx) => (
                        <div key={idx} className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-200">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="avatar placeholder">
                                    <div className="bg-neutral text-neutral-content rounded-full w-8">
                                        <span className="text-xs">{review.userName?.[0]}</span>
                                    </div>
                                </div>
                                <span className="font-bold">{review.userName}</span>
                                <span className="text-xs text-gray-500">• {new Date(review.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex text-orange-400 text-sm mb-2">
                                {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                        </div>
                    )) : (
                        <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
                    )}
                </div>
            </div>

            {/* Modal */}
            <OrderModal
                book={book}
                isOpen={isOrderModalOpen}
                onClose={() => setIsOrderModalOpen(false)}
            />
        </div>
    );
};

export default BookDetails;
