import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { BookPlus } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";

const EditBook = () => {
    const { id } = useParams();
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: book, isLoading } = useQuery({
        queryKey: ["single-book", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books/${id}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />

    const onSubmit = async (data) => {
        const res = await axiosSecure.put(`/books/${id}`, data);
        if (res.data.modifiedCount > 0) {
            Swal.fire("Success!", "Book Updated Successfully", "success");
            navigate("/dashboard/my-books");
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-base-100 p-8 rounded-2xl shadow-sm border border-base-200">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <BookPlus className="text-primary" />
                Edit Book
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Book Title (readonly) */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Book Title</span></label>
                    <input
                        type="text"
                        className="input input-bordered"
                        defaultValue={book?.title}
                        readOnly
                        {...register("title")}
                    />
                </div>

                {/* Author (readonly) */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Author Name</span></label>
                    <input
                        type="text"
                        className="input input-bordered"
                        defaultValue={book?.author}
                        readOnly
                        {...register("author")}
                    />
                </div>

                {/* Available Quantity */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Available Quantity</span></label>
                    <input
                        type="number"
                        className="input input-bordered"
                        defaultValue={book?.quantity}
                        {...register("quantity", { min: 0 })}
                    />
                </div>

                {/* Price */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Price (BDT)</span></label>
                    <input
                        type="number"
                        className="input input-bordered"
                        defaultValue={book?.price}
                        {...register("price", { min: 0 })}
                    />
                </div>

                {/* Status */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Status</span></label>
                    <select
                        className="select select-bordered"
                        defaultValue={book?.status}
                        {...register("status")}
                    >
                        <option value="published">Published</option>
                        <option value="unpublished">Unpublished</option>
                    </select>
                </div>

                {/* Short Description */}
                <div className="form-control">
                    <label className="label"><span className="label-text mr-2">Short Description</span></label>
                    <textarea
                        className="textarea textarea-bordered h-24"
                        defaultValue={book?.description}
                        {...register("description")}
                    ></textarea>
                </div>

                {/* Buttons */}
                <button type="submit" className="btn btn-primary">Update Book</button>
                <button type="button" className="btn btn-outline hover:btn-secondary"
                    onClick={() => navigate("/dashboard/my-books")}>Cancel</button>


            </form >
        </div >
    );
};

export default EditBook;
