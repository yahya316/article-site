// "use client";

// import { useState, useEffect } from "react";
// import { categoryButtonColors } from "@/data/categories.json";
// import imageQuotes from "@/data/imageQuotes.json";
// import Image from "next/image";

// export default function UserQuoteForm() {
//   const [quoteText, setQuoteText] = useState("");
//   const [author, setAuthor] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");

//   const categories = Object.keys(categoryButtonColors);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % imageQuotes.length);
//     }, 2500);
//     return () => clearInterval(interval);
//   }, []);

//   const current = imageQuotes[currentIndex];

//   function handleCheckbox(cat) {
//     let updatedCategories = [...selectedCategories];
//     if (updatedCategories.includes(cat)) {
//       updatedCategories = updatedCategories.filter((c) => c !== cat);
//     } else {
//       updatedCategories.push(cat);
//     }
//     setSelectedCategories(updatedCategories);
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setMessageType("");

//     if (!quoteText || !author || selectedCategories.length === 0) {
//       setMessage("Please fill all fields and select at least one category.");
//       setMessageType("error");
//       return;
//     }

//     try {
//       const res = await fetch("/api/submit-quote", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           text: quoteText,
//           author,
//           categories: selectedCategories,
//         }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         setMessage("Quote submitted for admin approval!");
//         setMessageType("success");
//         setQuoteText("");
//         setAuthor("");
//         setSelectedCategories([]);
//         setTimeout(() => setMessage(""), 3000);
//       } else {
//         setMessage(`Failed to submit: ${data.error}`);
//         setMessageType("error");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("Something went wrong. Please try again.");
//       setMessageType("error");
//     }
//   };

//   return (
//     <section className="w-full py-12 sm:py-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row bg-gradient-to-r from-white to-gray-100 rounded-xl shadow-md overflow-hidden">
//         {/* Form Column */}
//         <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
//           <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-8 text-gray-900">
//             Share Your Inspirational Quote
//           </h3>
//           {message && (
//             <div
//               className={`mb-4 p-3 rounded-lg text-center shadow-md ${
//                 messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//               }`}
//             >
//               {message}
//             </div>
//           )}
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
//             <div className="relative">
//               <textarea
//                 id="quote-text"
//                 value={quoteText}
//                 onChange={(e) => setQuoteText(e.target.value)}
//                 placeholder="Enter your motivational quote..."
//                 rows={5}
//                 className="w-full p-4 sm:p-5 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
//                 required
//               ></textarea>
//             </div>
//             <div className="relative">
//               <input
//                 id="author-name"
//                 type="text"
//                 value={author}
//                 onChange={(e) => setAuthor(e.target.value)}
//                 placeholder="Author's Name"
//                 className="w-full p-3 sm:p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
//                 required
//               />
//             </div>
//             <div>
//               <p className="font-semibold mb-2 sm:mb-3 text-gray-700 text-sm sm:text-base">
//                 Select Categories:
//               </p>
//               <div className="flex flex-wrap gap-2 sm:gap-3">
//                 {categories.map((cat) => {
//                   const isSelected = selectedCategories.includes(cat);
//                   return (
//                     <button
//                       key={cat}
//                       type="button"
//                       onClick={() => handleCheckbox(cat)}
//                       className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full font-medium transition transform ${
//                         isSelected ? "bg-indigo-500 text-white shadow-md" : "bg-gray-200 text-gray-800 hover:bg-indigo-100"
//                       } hover:scale-105`}
//                     >
//                       {cat}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="w-full px-5 py-3 sm:px-6 sm:py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg transform transition hover:scale-105"
//             >
//               Submit Quote
//             </button>
//           </form>
//         </div>
//         {/* Image Column */}
//         <div className="hidden lg:block w-full lg:w-1/2 relative">
//           <Image
//             src={`/images/${current.image}`}
//             alt={`Motivational Image ${currentIndex + 1}`}
//             fill
//             className="object-cover h-full transition-all duration-700"
//           />
//           <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/30">
//             <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold text-center drop-shadow-lg">
//               "{current.quote}"
//             </h2>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
































"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function UserQuoteForm() {
  const [quoteText, setQuoteText] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [quoteType, setQuoteType] = useState("mini");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Define categories and colors directly
  const categoryButtonColors = {
    Faith: "bg-blue-500",
    Motivation: "bg-green-500",
    Wisdom: "bg-yellow-500",
    Patience: "bg-purple-500",
    Guidance: "bg-indigo-500",
    Encouragement: "bg-pink-500",
    Trust: "bg-teal-500",
    "Self-Discipline": "bg-orange-500",
    Contentment: "bg-red-500",
    Success: "bg-cyan-500",
    Happiness: "bg-lime-500",
  };

  const categories = Object.keys(categoryButtonColors);

  // Define image quotes directly
  const imageQuotes = [
    { image: "img-1.jpg", quote: "Inspire others with your words." },
    { image: "img-2.jpg", quote: "Your quote can change a life." },
    { image: "img-3.jpg", quote: "Share your wisdom today." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageQuotes.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [imageQuotes.length]); // Add dependency for clarity

  const handleCheckbox = (cat) => {
    let updatedCategories = [...selectedCategories];
    if (updatedCategories.includes(cat)) {
      updatedCategories = updatedCategories.filter((c) => c !== cat);
    } else {
      updatedCategories.push(cat);
    }
    setSelectedCategories(updatedCategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (!quoteText || !author) {
      setMessage("Please fill in the quote text and author fields.");
      setMessageType("error");
      return;
    }

    if (quoteType === "mini" && (!imageUrl || selectedCategories.length === 0)) {
      setMessage("Please provide an image URL and select at least one category for mini quotes.");
      setMessageType("error");
      return;
    }

    try {
      const payload = {
        text: quoteText,
        author,
        categories: quoteType === "mini" ? selectedCategories : [],
        imageUrl: quoteType === "mini" ? imageUrl : null,
        type: quoteType,
      };

      const res = await fetch("/api/submit-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Use a guard clause for non-ok responses
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Unknown error');
      }

      const data = await res.json();
      
      // The original code was checking for data.success, which is now unnecessary
      // given the `res.ok` check above. We can simplify.
      setMessage("Quote submitted for admin approval!");
      setMessageType("success");
      setQuoteText("");
      setAuthor("");
      setSelectedCategories([]);
      setImageUrl("");
      setQuoteType("mini");
      setTimeout(() => setMessage(""), 3000);
      
    } catch (err) {
      console.error(err);
      setMessage(`Something went wrong: ${err.message}`);
      setMessageType("error");
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
          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-center shadow-md ${messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
            <div>
              <label htmlFor="quote-type" className="block text-gray-700 text-sm sm:text-base font-semibold mb-2">
                Quote Type
              </label>
              <select
                id="quote-type"
                value={quoteType}
                onChange={(e) => setQuoteType(e.target.value)}
                className="w-full p-3 sm:p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
                required
              >
                <option value="mini">Mini Quote</option>
                <option value="hero">Hero Quote</option>
              </select>
            </div>
            <div className="relative">
              <label htmlFor="quote-text" className="block text-gray-700 text-sm sm:text-base font-semibold mb-2">
                Quote Text
              </label>
              <textarea
                id="quote-text"
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                placeholder="Enter your motivational quote..."
                rows={5}
                className="w-full p-4 sm:p-5 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
                required
              ></textarea>
            </div>
            <div className="relative">
              <label htmlFor="author-name" className="block text-gray-700 text-sm sm:text-base font-semibold mb-2">
                Author
              </label>
              <input
                id="author-name"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author's Name"
                className="w-full p-3 sm:p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
                required
              />
            </div>
            {quoteType === "mini" && (
              <>
                <div className="relative">
                  <label htmlFor="image-url" className="block text-gray-700 text-sm sm:text-base font-semibold mb-2">
                    Image URL
                  </label>
                  <input
                    id="image-url"
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Image URL (e.g., /images/img-1.jpg)"
                    className="w-full p-3 sm:p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
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
                          className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full font-medium transition transform ${isSelected ? "bg-indigo-500 text-white shadow-md" : "bg-gray-200 text-gray-800 hover:bg-indigo-100"
                            } hover:scale-105`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
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
            src={`/images/${imageQuotes[currentIndex].image}`}
            alt={`Motivational Image ${currentIndex + 1}`}
            fill
            className="object-cover h-full transition-all duration-700"
          />
          <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/30">
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold text-center drop-shadow-lg">
              "{imageQuotes[currentIndex].quote}"
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}







