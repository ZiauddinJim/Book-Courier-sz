import { Pencil, Book } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { TbCurrencyTaka } from "react-icons/tb";
import { useNavigate } from 'react-router';


const MyBooks = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const navigate = useNavigate()

    const { data: books = [] } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const response = await axiosSecure.get(`/books/${user?.email}/myBooks`)
            return response.data;
        }
    })

    const handleEdit = (id) => {
        navigate(`/dashboard/editBook/${id}`);
    };

    return (
        <div className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Book className="text-primary" /> My Books ({books?.length})
            </h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>No</th>
                            <th>Book</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, i) => (
                            <tr key={book._id} className="hover">
                                <td>{i + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={book.image} alt={book.title} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{book.title}</div>
                                            <div className="text-sm opacity-50">ID: {book._id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{book.author}</td>
                                <td><TbCurrencyTaka className='inline' />{book.price}</td>
                                <td>
                                    <div
                                        className={`badge badge-sm hover:scale-105 transition-transform ${book.status === 'published' ? 'badge-primary' : 'badge-secondary'}`}
                                    >
                                        {book.status}
                                    </div>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(book._id)}
                                        className="btn btn-sm btn-ghost btn-square"
                                        title="Edit Book"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {books.length === 0 && (
                    <div className="text-center py-10 text-base-content/50">
                        No books added yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBooks;
