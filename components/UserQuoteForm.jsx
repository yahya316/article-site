"use client";

import { useState, useEffect } from "react";
import { categoryButtonColors } from "@/data/categories.json";
import imageQuotes from "@/data/imageQuotes.json";
import Image from "next/image";

export default function UserQuoteForm() {
    const [quoteText, setQuoteText] = useState("");
    const [author, setAuthor] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const categories = Object.keys(categoryButtonColors);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % imageQuotes.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const current = imageQuotes[currentIndex];

    function handleCheckbox(cat) {
        let updatedCategories = [...selectedCategories];
        if (updatedCategories.includes(cat)) {
            updatedCategories = updatedCategories.filter((c) => c !== cat);
        } else {
            updatedCategories.push(cat);
        }
        setSelectedCategories(updatedCategories);
    }

    //   const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!quoteText || !author || selectedCategories.length === 0) {
    //       alert("Please fill all fields and select at least one category.");
    //       return;
    //     }
    //     alert(
    //       `Thank you for submitting:\n"${quoteText}"\n- ${author}\nCategories: ${selectedCategories.join(
    //         ", "
    //       )}`
    //     );
    //     setQuoteText("");
    //     setAuthor("");
    //     setSelectedCategories([]);
    //   };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!quoteText || !author || selectedCategories.length === 0) {
            alert("Please fill all fields and select at least one category.");
            return;
        }

        try {
            const res = await fetch("/api/submit-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: quoteText,
                    author,
                    categories: selectedCategories,
                }),
            });

            const data = await res.json();
            if (data.success) {
                alert("Quote submitted for admin approval!");
                setQuoteText("");
                setAuthor("");
                setSelectedCategories([]);
            } else {
                alert("Failed to submit: " + data.error);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }
    };

    return (
        <section className="w-full py-12 sm:py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row bg-gradient-to-r from-white to-gray-100 rounded-xl shadow-md overflow-hidden">

                {/* Form Column */}
                <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-8 text-gray-900">
                        Share Your Inspirational Quote
                    </h3>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
                        {/* <div className="relative">
                            <textarea
                                value={quoteText}
                                onChange={(e) => setQuoteText(e.target.value)}
                                placeholder=" "
                                rows={5}
                                className="w-full p-4 sm:p-5 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-transparent peer text-sm sm:text-base"
                                required
                            />
                            <label className="absolute top-2 left-4 text-gray-400 text-xs sm:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base transition-all">
                                Enter your motivational quote...
                            </label>
                        </div> */}
                        {/* <div className="relative">
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder=" "
                                className="w-full p-3 sm:p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-transparent peer text-sm sm:text-base"
                                required
                            />
                            <label className="absolute top-2 left-3 text-gray-400 text-xs sm:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base transition-all">
                                Author's Name
                            </label>
                        </div> */}
                        <div class="relative">
                            <textarea
                                id="quote-text"
                                value={quoteText}
                                onChange={(e) => setQuoteText(e.target.value)}
                                placeholder="Enter your motivational quote..."
                                rows={5}
                                class="w-full p-4 sm:p-5 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
                                required
                            ></textarea>
                        </div>
                        <div class="relative">
                            <input
                                id="author-name"
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="Author's Name"
                                class="w-full p-3 sm:p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
                                required
                            />
                        </div>

                        <div>
                            <p className="font-semibold mb-2 sm:mb-3 text-gray-700 text-sm sm:text-base">
                                Select Categories:
                            </p>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {categories.map((cat) => {
                                    const isSelected = selectedCategories.includes(cat);
                                    return (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => handleCheckbox(cat)}
                                            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full font-medium transition transform ${isSelected
                                                ? "bg-indigo-500 text-white shadow-md"
                                                : "bg-gray-200 text-gray-800 hover:bg-indigo-100"
                                                } hover:scale-105`}
                                        >
                                            {cat}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-5 py-3 sm:px-6 sm:py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg transform transition hover:scale-105"
                        >
                            Submit Quote
                        </button>
                    </form>
                </div>

                {/* Image Column */}
                <div className="hidden lg:block w-full lg:w-1/2 relative">
                    <Image
                        src={`/images/${current.image}`}
                        alt={`Motivational Image ${currentIndex + 1}`}
                        fill
                        className="object-cover h-full transition-all duration-700"
                    />

                    {/* Overlay Text */}
                    <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/30">
                        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold text-center drop-shadow-lg">
                            "{current.quote}"
                        </h2>
                    </div>
                </div>

            </div>
        </section>
    );
}















