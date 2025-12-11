import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router";
import BookCard from "../home/BookCard";
import { categories } from "../../assets/data/categories";
import { useQuery } from '@tanstack/react-query';
import Spinner from "../../components/Spinner";
import useAxios from "../../hooks/useAxios";

const Books = () => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [price, setPrice] = useState(10000);
    const axios = useAxios()

    const { data: books = [], isLoading, } = useQuery({
        queryKey: ["books", search, selectedCategory, price],
        queryFn: async () => {
            try {
                console.log({ search, selectedCategory, price });
                const res = await axios.get("/books", { params: { search, category: selectedCategory, maxPrice: price, status: "published" } });
                // console.log("Books response:", res.data);
                return res.data;
            } catch (error) {
                console.error("Error fetching books:", error);
                throw error;
            }
        }
    });

    if (isLoading) return <Spinner />;

    console.log(books);

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
                    <p className="text-gray-500 mt-2">
                        Discover your favorite books — from classics to sci-fi adventures.
                    </p>
                </div>

                {/* Main Layout */}
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Filters */}
                    <div className="md:w-72 bg-base-200 p-5 rounded-lg shadow-sm h-fit">

                        {/* Search */}
                        <label className="font-medium">Search</label>
                        <div className="relative mt-2 mb-6">
                            <input
                                type="text"
                                className="input input-bordered w-full pl-10"
                                placeholder="Search books..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <FaSearch className="absolute top-3 left-3 text-gray-400" />
                        </div>

                        {/* Category */}
                        <div className="form-control mb-6">
                            <label className="label font-medium">Category</label>
                            <select
                                className="select select-primary w-full"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option value="">All</option>
                                {categories.map(cat =>
                                    <option key={cat} value={cat}>{cat}</option>
                                )}
                            </select>
                        </div>

                        {/* Price Filter */}
                        <div className="mb-6">
                            <label className="font-medium">Price (BDT): Up to ৳{price}</label>

                            {/* Increase Price Button */}
                            <button
                                className="btn btn-xs btn-outline btn-primary w-full mt-2"
                                onClick={() => setPrice(prev => Math.min(prev + 200, 5000))}
                            >
                                Increase Limit +200
                            </button>

                            {/* Range Slider */}
                            <input
                                type="range"
                                min="500"
                                max="5000"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="range range-primary my-2"
                            />

                            {/* Decrease Price Button */}
                            <button
                                className="btn btn-xs btn-outline btn-secondary w-full"
                                onClick={() => setPrice(prev => Math.max(prev - 200, 200))}
                            >
                                Decrease Limit -200
                            </button>
                        </div>

                    </div>

                    {/* Books Grid */}
                    {books.length ?
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {books.map(book => (
                                <BookCard key={book._id} book={book} />
                            ))}
                        </div>
                        :
                        <p className="text-center text-gray-500">No books found</p>
                    }


                </div>
            </div>
        </div>
    );
};

export default Books;
