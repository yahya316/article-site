// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import HeroQuote from "@/components/HeroQuote";
// import QuoteCard from "@/components/QuoteCard";
// import UserQuoteForm from "@/components/UserQuoteForm";
// import { heroQuotes, miniQuotes } from "@/data/quotes.json";
// import { categoryButtonColors } from "@/data/categories.json";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";

// const categories = Object.keys(categoryButtonColors);

// export default function HomeContent() {
//     const [heroIndex, setHeroIndex] = useState(0);
//     const [quoteOfTheDay, setQuoteOfTheDay] = useState(heroQuotes[0]);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setHeroIndex((prev) => (prev + 1) % heroQuotes.length);
//         }, 5000);
//         return () => clearInterval(interval);
//     }, []);

//     useEffect(() => {
//         const randomIndex = Math.floor(Math.random() * heroQuotes.length);
//         setQuoteOfTheDay(heroQuotes[randomIndex]);
//     }, []);

//     const stats = [
//         { label: "Quotes Shared", value: "1,200+" },
//         { label: "Daily Readers Inspired", value: "500+" },
//         { label: "Happy Users", value: "300+" },
//         { label: "New Quotes Daily", value: "50+" },
//     ];

//     return (
//         <div className="bg-gray-50 min-h-screen text-black">
//             <HeroQuote quote={heroQuotes[heroIndex]} />

//             <section className="w-full py-12 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 bg-gradient-to-b from-gray-50 to-white rounded-xl">
//                 <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-center mb-6 sm:mb-8 text-gray-900">
//                     Explore & Get Inspired
//                 </h2>

//                 <Swiper
//                     modules={[Autoplay]}
//                     autoplay={{
//                         delay: 0,
//                         disableOnInteraction: false,
//                         pauseOnMouseEnter: true,
//                     }}
//                     loop={true}
//                     slidesPerView={"auto"}
//                     spaceBetween={20}
//                     speed={1500}
//                     className="mySwiper"
//                 >
//                     {categories.map((cat) => (
//                         <SwiperSlide key={cat} className="py-4" style={{ width: "auto" }}>
//                             <button
//                                 className={`flex-shrink-0 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm md:px-5 md:py-3 md:text-base font-medium rounded-full shadow-md hover:scale-105 transform transition ${categoryButtonColors[cat]}`}
//                             >
//                                 {cat}
//                             </button>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>

//                 <Swiper
//                     modules={[Autoplay, Pagination]}
//                     autoplay={{ delay: 2000, disableOnInteraction: false }}
//                     loop={true}
//                     pagination={{
//                         el: ".custom-pagination",
//                         clickable: true,
//                     }}
//                     spaceBetween={20}
//                     breakpoints={{
//                         640: { slidesPerView: 1 },
//                         768: { slidesPerView: 2 },
//                         1024: { slidesPerView: 3 },
//                         1280: { slidesPerView: 3 },
//                         1536: { slidesPerView: 4 },
//                         2048: { slidesPerView: 5 },
//                     }}
//                 >
//                     {miniQuotes.map((quote, index) => (
//                         <SwiperSlide key={index} className="py-8 px-2">
//                             <QuoteCard quote={quote} />
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>

//                 <div className="custom-pagination flex justify-center gap-2 mt-5"></div>
//             </section>


//             <section className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
//                 <div className="relative p-6 sm:p-8 rounded-md shadow-xl overflow-hidden min-h-[250px] sm:min-h-[300px] flex items-center justify-center text-center">
//                     <div className="absolute inset-0 z-0">
//                         <Image
//                             src="/images/img-3.jpg"
//                             alt="Background"
//                             fill
//                             priority
//                             className="object-cover"
//                         />
//                         <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
//                     </div>

//                     <div className="relative z-10 text-white animate-fadeIn">
//                         <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Quote of the Day</h3>
//                         <blockquote className="text-xl sm:text-2xl md:text-3xl italic leading-snug">
//                             "{quoteOfTheDay.text}"
//                         </blockquote>
//                         <p className="mt-4 sm:mt-6 text-right text-base sm:text-lg font-medium opacity-90">
//                             - {quoteOfTheDay.author}
//                         </p>
//                     </div>
//                 </div>
//             </section>

//             <section className="w-full py-12 sm:py-16 bg-gray-50">
//                 <div className="w-full px-4 sm:px-6 lg:px-12 text-center mb-8 sm:mb-12">
//                     <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//                         Our Impact
//                     </h2>
//                     <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
//                         Inspiring thousands daily through motivational quotes
//                     </p>
//                 </div>

//                 <div className="w-full px-4 sm:px-6 lg:px-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
//                     {stats.map((stat) => (
//                         <div
//                             key={stat.label}
//                             className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-lg transform transition hover:scale-105 cursor-pointer"
//                         >
//                             <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
//                                 {stat.value}
//                             </h3>
//                             <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg text-gray-600 text-center">
//                                 {stat.label}
//                             </p>
//                         </div>
//                     ))}
//                 </div>

//             </section>


//             <UserQuoteForm />
//         </div>
//     );
// }





// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import HeroQuote from "@/components/HeroQuote";
// import QuoteCard from "@/components/QuoteCard";
// import UserQuoteForm from "@/components/UserQuoteForm";
// import { categoryButtonColors } from "@/data/categories.json";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";

// // Fallback categories if categoryButtonColors is undefined
// const fallbackCategories = [
//   "Faith",
//   "Motivation",
//   "Wisdom",
//   "Patience",
//   "Guidance",
//   "Encouragement",
//   "Trust",
//   "Self-Discipline",
//   "Contentment",
//   "Success",
//   "Happiness",
// ];
// const fallbackColors = {
//   Faith: "bg-blue-500",
//   Motivation: "bg-green-500",
//   Wisdom: "bg-yellow-500",
//   Patience: "bg-purple-500",
//   Guidance: "bg-indigo-500",
//   Encouragement: "bg-pink-500",
//   Trust: "bg-teal-500",
//   "Self-Discipline": "bg-orange-500",
//   Contentment: "bg-red-500",
//   Success: "bg-cyan-500",
//   Happiness: "bg-lime-500",
// };

// // Use fallback if categoryButtonColors is undefined
// const categories = categoryButtonColors && Object.keys(categoryButtonColors).length > 0
//   ? Object.keys(categoryButtonColors)
//   : fallbackCategories;

// export default function HomeContent() {
//     const [heroQuotes, setHeroQuotes] = useState([]);
//     const [miniQuotes, setMiniQuotes] = useState([]);
//     const [heroIndex, setHeroIndex] = useState(0);
//     const [quoteOfTheDay, setQuoteOfTheDay] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 const [miniQuotesRes, heroQuotesRes] = await Promise.all([
//                     fetch("/api/mini-quotes"),
//                     fetch("/api/hero-quotes"),
//                 ]);
//                 if (!miniQuotesRes.ok || !heroQuotesRes.ok) {
//                     throw new Error("Failed to fetch quotes");
//                 }
//                 const [miniQuotesData, heroQuotesData] = await Promise.all([
//                     miniQuotesRes.json(),
//                     heroQuotesRes.json(),
//                 ]);
//                 setMiniQuotes(miniQuotesData);
//                 setHeroQuotes(heroQuotesData);
//                 if (heroQuotesData.length > 0) {
//                     const randomIndex = Math.floor(Math.random() * heroQuotesData.length);
//                     setQuoteOfTheDay(heroQuotesData[randomIndex]);
//                 }
//             } catch (err) {
//                 console.error("Error fetching quotes:", err);
//                 setError("Failed to load quotes. Please try again later.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, []);

//     useEffect(() => {
//         if (heroQuotes.length === 0) return;
//         const interval = setInterval(() => {
//             setHeroIndex((prev) => (prev + 1) % heroQuotes.length);
//         }, 5000);
//         return () => clearInterval(interval);
//     }, [heroQuotes]);

//     const stats = [
//         { label: "Quotes Shared", value: `${(miniQuotes.length + heroQuotes.length).toLocaleString()}+` },
//         { label: "Daily Readers Inspired", value: "500+" },
//         { label: "Happy Users", value: "300+" },
//         { label: "New Quotes Daily", value: "50+" },
//     ];

//     return (
//         <div className="bg-gray-50 min-h-screen text-black">
//             {loading ? (
//                 <div className="text-center py-12 text-gray-600">Loading...</div>
//             ) : error ? (
//                 <div className="text-center py-12 text-red-600">{error}</div>
//             ) : !quoteOfTheDay ? (
//                 <div className="text-center py-12 text-gray-600">No quotes available.</div>
//             ) : (
//                 <>
//                     <HeroQuote quote={heroQuotes[heroIndex]} />

//                     <section className="w-full py-12 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 bg-gradient-to-b from-gray-50 to-white rounded-xl">
//                         <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-center mb-6 sm:mb-8 text-gray-900">
//                             Explore & Get Inspired
//                         </h2>

//                         <Swiper
//                             modules={[Autoplay]}
//                             autoplay={{
//                                 delay: 0,
//                                 disableOnInteraction: false,
//                                 pauseOnMouseEnter: true,
//                             }}
//                             loop={true}
//                             slidesPerView={"auto"}
//                             spaceBetween={20}
//                             speed={1500}
//                             className="mySwiper"
//                         >
//                             {categories.map((cat) => (
//                                 <SwiperSlide key={cat} className="py-4" style={{ width: "auto" }}>
//                                     <button
//                                         className={`flex-shrink-0 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm md:px-5 md:py-3 md:text-base font-medium rounded-full shadow-md hover:scale-105 transform transition ${
//                                             categoryButtonColors?.[cat] || fallbackColors[cat]
//                                         }`}
//                                     >
//                                         {cat}
//                                     </button>
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>

//                         <Swiper
//                             modules={[Autoplay, Pagination]}
//                             autoplay={{ delay: 2000, disableOnInteraction: false }}
//                             loop={miniQuotes.length > 0}
//                             pagination={{
//                                 el: ".custom-pagination",
//                                 clickable: true,
//                             }}
//                             spaceBetween={20}
//                             breakpoints={{
//                                 640: { slidesPerView: 1 },
//                                 768: { slidesPerView: 2 },
//                                 1024: { slidesPerView: 3 },
//                                 1280: { slidesPerView: 3 },
//                                 1536: { slidesPerView: 4 },
//                                 2048: { slidesPerView: 5 },
//                             }}
//                         >
//                             {miniQuotes.length > 0 ? (
//                                 miniQuotes.map((quote) => (
//                                     <SwiperSlide key={quote.id} className="py-8 px-2">
//                                         <QuoteCard quote={quote} />
//                                     </SwiperSlide>
//                                 ))
//                             ) : (
//                                 <SwiperSlide className="py-8 px-2">
//                                     <div className="text-center text-gray-600">No mini quotes available.</div>
//                                 </SwiperSlide>
//                             )}
//                         </Swiper>

//                         <div className="custom-pagination flex justify-center gap-2 mt-5"></div>
//                     </section>

//                     <section className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
//                         <div className="relative p-6 sm:p-8 rounded-md shadow-xl overflow-hidden min-h-[250px] sm:min-h-[300px] flex items-center justify-center text-center">
//                             <div className="absolute inset-0 z-0">
//                                 <Image
//                                     src="/images/img-3.jpg"
//                                     alt="Background"
//                                     fill
//                                     priority
//                                     className="object-cover"
//                                 />
//                                 <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
//                             </div>

//                             <div className="relative z-10 text-white animate-fadeIn">
//                                 <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Quote of the Day</h3>
//                                 <blockquote className="text-xl sm:text-2xl md:text-3xl italic leading-snug">
//                                     "{quoteOfTheDay.text}"
//                                 </blockquote>
//                                 <p className="mt-4 sm:mt-6 text-right text-base sm:text-lg font-medium opacity-90">
//                                     - {quoteOfTheDay.author}
//                                 </p>
//                             </div>
//                         </div>
//                     </section>

//                     <section className="w-full py-12 sm:py-16 bg-gray-50">
//                         <div className="w-full px-4 sm:px-6 lg:px-12 text-center mb-8 sm:mb-12">
//                             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//                                 Our Impact
//                             </h2>
//                             <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
//                                 Inspiring thousands daily through motivational quotes
//                             </p>
//                         </div>

//                         <div className="w-full px-4 sm:px-6 lg:px-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
//                             {stats.map((stat) => (
//                                 <div
//                                     key={stat.label}
//                                     className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-lg transform transition hover:scale-105 cursor-pointer"
//                                 >
//                                     <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
//                                         {stat.value}
//                                     </h3>
//                                     <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg text-gray-600 text-center">
//                                         {stat.label}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </section>

//                     <UserQuoteForm />
//                 </>
//             )}
//         </div>
//     );
// }




"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroQuote from "@/components/HeroQuote";
import QuoteCard from "@/components/QuoteCard";
import UserQuoteForm from "@/components/UserQuoteForm";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// Define categories and their colors directly
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

export default function HomeContent() {
    const [heroQuotes, setHeroQuotes] = useState([]);
    const [miniQuotes, setMiniQuotes] = useState([]);
    const [heroIndex, setHeroIndex] = useState(0);
    const [quoteOfTheDay, setQuoteOfTheDay] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [miniQuotesRes, heroQuotesRes] = await Promise.all([
                    fetch("/api/mini-quotes"),
                    fetch("/api/hero-quotes"),
                ]);
                if (!miniQuotesRes.ok || !heroQuotesRes.ok) {
                    throw new Error("Failed to fetch quotes");
                }
                const [miniQuotesData, heroQuotesData] = await Promise.all([
                    miniQuotesRes.json(),
                    heroQuotesRes.json(),
                ]);
                setMiniQuotes(miniQuotesData);
                setHeroQuotes(heroQuotesData);
                if (heroQuotesData.length > 0) {
                    const randomIndex = Math.floor(Math.random() * heroQuotesData.length);
                    setQuoteOfTheDay(heroQuotesData[randomIndex]);
                }
            } catch (err) {
                console.error("Error fetching quotes:", err);
                setError("Failed to load quotes. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (heroQuotes.length === 0) return;
        const interval = setInterval(() => {
            setHeroIndex((prev) => (prev + 1) % heroQuotes.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [heroQuotes]);

    const stats = [
        { label: "Quotes Shared", value: `${(miniQuotes.length + heroQuotes.length).toLocaleString()}+` },
        { label: "Daily Readers Inspired", value: "500+" },
        { label: "Happy Users", value: "300+" },
        { label: "New Quotes Daily", value: "50+" },
    ];

    return (
        <div className="bg-gray-50 min-h-screen text-black">
            <Navbar/>
            {loading ? (
                <div className="text-center py-12 text-gray-600">Loading...</div>
            ) : error ? (
                <div className="text-center py-12 text-red-600">{error}</div>
            ) : !quoteOfTheDay ? (
                <div className="text-center py-12 text-gray-600">No quotes available.</div>
            ) : (
                <>
                    <HeroQuote quote={heroQuotes[heroIndex]} />

                    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 bg-gradient-to-b from-gray-50 to-white rounded-xl">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-center mb-6 sm:mb-8 text-gray-900">
                            Explore & Get Inspired
                        </h2>

                        <Swiper
                            modules={[Autoplay]}
                            autoplay={{
                                delay: 0,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            loop={true}
                            slidesPerView={"auto"}
                            spaceBetween={20}
                            speed={1500}
                            className="mySwiper"
                        >
                            {categories.map((cat) => (
                                <SwiperSlide key={cat} className="py-4" style={{ width: "auto" }}>
                                    <button
                                        className={`flex-shrink-0 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm md:px-5 md:py-3 md:text-base font-medium rounded-full shadow-md hover:scale-105 transform transition ${categoryButtonColors[cat]}`}
                                    >
                                        {cat}
                                    </button>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <Swiper
                            modules={[Autoplay, Pagination]}
                            autoplay={{ delay: 2000, disableOnInteraction: false }}
                            loop={miniQuotes.length > 0}
                            pagination={{
                                el: ".custom-pagination",
                                clickable: true,
                            }}
                            spaceBetween={20}
                            breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                                1280: { slidesPerView: 3 },
                                1536: { slidesPerView: 4 },
                                2048: { slidesPerView: 5 },
                            }}
                        >
                            {miniQuotes.length > 0 ? (
                                miniQuotes.map((quote) => (
                                    <SwiperSlide key={quote.id} className="py-8 px-2">
                                        <QuoteCard quote={quote} />
                                    </SwiperSlide>
                                ))
                            ) : (
                                <SwiperSlide className="py-8 px-2">
                                    <div className="text-center text-gray-600">No mini quotes available.</div>
                                </SwiperSlide>
                            )}
                        </Swiper>

                        <div className="custom-pagination flex justify-center gap-2 mt-5"></div>
                    </section>

                    <section className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
                        <div className="relative p-6 sm:p-8 rounded-md shadow-xl overflow-hidden min-h-[250px] sm:min-h-[300px] flex items-center justify-center text-center">
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src="/images/img-3.jpg"
                                    alt="Background"
                                    fill
                                    priority
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
                            </div>

                            <div className="relative z-10 text-white animate-fadeIn">
                                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Quote of the Day</h3>
                                <blockquote className="text-xl sm:text-2xl md:text-3xl italic leading-snug">
                                    "{quoteOfTheDay.text}"
                                </blockquote>
                                <p className="mt-4 sm:mt-6 text-right text-base sm:text-lg font-medium opacity-90">
                                    - {quoteOfTheDay.author}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="w-full py-12 sm:py-16 bg-gray-50">
                        <div className="w-full px-4 sm:px-6 lg:px-12 text-center mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                                Our Impact
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
                                Inspiring thousands daily through motivational quotes
                            </p>
                        </div>

                        <div className="w-full px-4 sm:px-6 lg:px-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-lg transform transition hover:scale-105 cursor-pointer"
                                >
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
                                        {stat.value}
                                    </h3>
                                    <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg text-gray-600 text-center">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <UserQuoteForm />
                </>
            )}
        </div>
    );
}