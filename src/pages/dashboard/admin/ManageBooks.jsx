import React from 'react';
import { BookOpen, Trash2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Spinner from '../../../components/Spinner';

const ManageBooks = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all books
    const { data: books = [], refetch, isLoading } = useQuery({
        queryKey: ['all-books'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-books');
            return res.data;
        }
    });

    const toggleStatus = async (book) => {
        const newStatus = book.status === "published" ? "unpublished" : "published";

        // Confirm alert
        Swal.fire({
            title: "Are you sure?",
            text: `You want to mark this book as ${newStatus}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, update it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/books/${book._id}`, { status: newStatus });

                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Updated!",
                            text: `Book status changed to ${newStatus}`,
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        });
                        refetch();
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to update status",
                        icon: "error"
                    });
                }
            }
        });
    };


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will delete the book AND all its orders permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/books/${id}`);
                    if (res.data.deletedCount) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Book has been deleted.",
                            icon: "success"
                        });
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to delete book");
                }
            }
        });
    };

    if (isLoading) return <Spinner />;

    return (
        <div className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="text-primary" /> Manage All Books ({books.length})
            </h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Book Title</th>
                            <th>Author</th>
                            <th>Added By</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book._id} className="hover">
                                <td className="font-bold">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-10 h-10">
                                                <img src={book.image} alt={book.title} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{book.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{book.author}</td>
                                <td className="text-sm opacity-70">{book.librarianEmail || book.librarian || 'N/A'}</td>
                                <td>
                                    <div className={`badge ${book.status === 'published' ? 'badge-success text-white' : 'badge-ghost'} capitalize`}>
                                        {book.status}
                                    </div>
                                </td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => toggleStatus(book)}
                                        className="btn btn-xs btn-outline"
                                        title={book.status === 'published' ? 'Unpublish' : 'Publish'}
                                    >
                                        {book.status === 'published' ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(book._id)}
                                        className="btn btn-xs btn-outline btn-error"
                                        title="Delete Book"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {books.length === 0 && (
                    <div className="text-center py-10 text-base-content/50">
                        No books found in system.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageBooks;
