import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading';
import { Link } from 'react-router';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { TbCurrencyTaka } from 'react-icons/tb';

const MyWishlist = () => {
    const { user } = useAuth();
    const axios = useAxios();

    const { data: wishlist = [], isLoading, refetch } = useQuery({
        queryKey: ['wishlist', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`/wishlist/${user?.email}`);
            return res.data;
        }
    });

    const handleRemoveFromWishlist = async (id) => {
        try {
            const res = await axios.delete(`/wishlist/${id}`);
            if (res.data.deletedCount > 0) {
                toast.success("Removed from wishlist");
                refetch();
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to remove");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="w-full px-4 lg:px-8 py-10">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">My Wishlist</h2>

            {wishlist.length === 0 ? (
                <div className="text-center py-20 bg-base-100 rounded-lg shadow-sm">
                    <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
                    <Link to="/books" className="btn btn-primary">Browse Books</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlist.map(item => (
                        <div key={item._id} className="card bg-base-100 shadow-xl border border-base-200">
                            <figure className="h-48 overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </figure>
                            <div className="card-body p-4">
                                <h3 className="font-bold text-lg truncate" title={item.title}>{item.title}</h3>
                                <div className="badge badge-secondary badge-outline text-xs mb-2">{item.category}</div>
                                <p className="text-primary font-bold flex items-center text-xl">
                                    <TbCurrencyTaka /> {item.price}
                                </p>

                                <div className="card-actions justify-end mt-4">
                                    <button
                                        onClick={() => handleRemoveFromWishlist(item._id)}
                                        className="btn btn-error btn-sm btn-outline btn-circle"
                                        title="Remove from wishlist"
                                    >
                                        <FaTrash />
                                    </button>
                                    <Link to={`/books/${item.bookId}`} className="btn btn-primary btn-sm flex-1">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyWishlist;
