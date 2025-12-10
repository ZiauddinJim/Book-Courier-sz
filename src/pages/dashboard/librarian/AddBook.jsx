import React from 'react';
import { useForm } from 'react-hook-form';
import { BookPlus } from 'lucide-react';
import Swal from 'sweetalert2';
import { categories } from '../../../assets/data/categories';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const AddBook = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const onSubmit = async (data) => {
        // Add logged in librarian info automatically
        data.librarianName = user?.displayName;
        data.librarianEmail = user?.email;
        data.createdAt = new Date();

        try {
            const res = await axiosSecure.post("/books", data);

            if (res.data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "New Book Added Successfully",
                    icon: "success",
                });
                reset();
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: `Failed to add book, error message: ${error}!`,
                icon: "error",
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-base-100 p-8 rounded-2xl shadow-sm border border-base-200">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <BookPlus className="text-primary" />
                Add New Book
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Image URL */}
                <div className="form-control md:col-span-2">
                    <label className="label"><span className="label-text">Image URL</span></label>
                    <input
                        type="url"
                        className="input input-bordered w-full"
                        {...register("image", { required: "Image is required" })}
                    />
                </div>

                {/* Title */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Book Title</span></label>
                    <input
                        type="text"
                        className="input input-bordered"
                        {...register("title", { required: true })}
                    />
                </div>

                {/* Author */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Author Name</span></label>
                    <input
                        type="text"
                        className="input input-bordered"
                        {...register("author", { required: true })}
                    />
                </div>

                {/* Category */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Category</span></label>
                    <select className="select select-bordered" {...register("category", { required: true })}>
                        {categories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                {/* Price */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Amount (BDT)</span></label>
                    <input
                        type="number"
                        className="input input-bordered"
                        {...register("price", { required: true, min: 0 })}
                    />
                </div>

                {/* Quantity */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Available Quantity</span></label>
                    <input
                        type="number"
                        className="input input-bordered"
                        {...register("quantity", { required: true })}
                    />
                </div>

                {/* Status */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Status</span></label>
                    <select className="select select-bordered" {...register("status")}>
                        <option value="published">Published</option>
                        <option value="unpublished">Unpublished</option>
                    </select>
                </div>

                {/* Description */}
                <div className="form-control md:col-span-2">
                    <label className="label"><span className="label-text">Short Description</span></label>
                    <textarea
                        className="textarea textarea-bordered h-24"
                        {...register("description", { required: true })}
                    />
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary md:col-span-2 mt-3">
                    Add Book
                </button>

            </form>
        </div>
    );
};

export default AddBook;
