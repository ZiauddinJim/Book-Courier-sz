import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router";
import BookCard from "../home/BookCard";
import { categories } from "../../assets/data/categories";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Books = () => {
    const axios = useAxiosSecure();
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [price, setPrice] = useState(5000);
    const [page, setPage] = useState(1);

    const limit = 8;

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["books", search, selectedCategory, price, page],
        queryFn: async () => {
            const res = await axios.get("/books", {
                params: {
                    search,
                    category: selectedCategory,
                    maxPrice: price,
                    status: "published",
                    page,
                    limit
                }
            });
            return res.data;
        },
        keepPreviousData: true
    });

    const books = data?.books || [];
    const totalBooks = data?.totalBooks || 0;
    const totalPages = data?.totalPages || 1;

    useEffect(() => {
        setPage(1);
    }, [search, selectedCategory, price]);

    return (
        <div className="py-10">
            <div className="container mx-auto px-4">

                {/* Breadcrumb */}
                <div className="text-center text-sm breadcrumbs mb-6">
                    <ul className="justify-center">
                        <li><Link to="/">Home</Link></li>
                        <li>Books</li>
                    </ul>
                </div>

                {/* Page Title */}
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h2 className="text-4xl font-bold">All Books</h2>
                    <p className="text-gray-500 mt-2">Discover your favorite books — from classics to sci-fi adventures.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters */}
                    <div className="md:w-72 bg-base-200 p-5 rounded-lg shadow-sm h-fit">
                        <p className="font-semibold mb-4">Total Books: {totalBooks}</p>

                        {/* Search */}
                        <label className="font-medium">Search</label>
                        <div className="relative mt-2 mb-6">
                            <input type="text" className="input input-bordered w-full pl-10"
                                placeholder="Search books..." value={search}
                                onChange={(e) => setSearch(e.target.value)} />
                            <FaSearch className="absolute top-3 left-3 text-gray-400" />
                        </div>

                        {/* Category */}
                        <div className="form-control mb-6">
                            <label className="label font-medium">Category</label>
                            <select className="select select-primary w-full" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option value="">All</option>
                                {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                            </select>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <label className="font-medium"> Price (BDT): Up to ৳{price}</label>
                            <input type="range" min="500" max="5000" value={price} onChange={(e) => setPrice(Number(e.target.value))}
                                className="range range-primary my-3" />
                        </div>
                    </div>

                    {/* Books Grid */}
                    <div className="w-full">
                        {(isLoading || isFetching) ? (
                            <Spinner />
                        ) : (
                            <>
                                {books.length ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {books.map(book => (<BookCard key={book._id} book={book} />))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-500">No books found</p>
                                )}

                                {/* Pagination */}
                                <div className="flex justify-center mt-10">
                                    <div className="join">
                                        {[...Array(totalPages).keys()].map(num => (
                                            <input key={num} className="join-item btn btn-square" type="radio" name="pagination" aria-label={num + 1}
                                                checked={page === num + 1} disabled={page === num + 1} onChange={() => setPage(num + 1)} />
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Books;
