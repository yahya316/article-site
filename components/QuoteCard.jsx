import React from "react";
import Image from "next/image";

const categoryColors = {
  Motivation: "bg-purple-100 text-purple-800",
  Happiness: "bg-yellow-100 text-yellow-800",
  Success: "bg-green-100 text-green-800",
  Mindfulness: "bg-pink-100 text-pink-800",
  Faith: "bg-blue-100 text-blue-800",
  "Self-Discipline": "bg-red-100 text-red-800",
  Guidance: "bg-indigo-100 text-indigo-800",
  Trust: "bg-teal-100 text-teal-800",
  Wisdom: "bg-orange-100 text-orange-800",
  Contentment: "bg-lime-100 text-lime-800",
  Encouragement: "bg-rose-100 text-rose-800",
  Patience: "bg-cyan-100 text-cyan-800",
  Character: "bg-fuchsia-100 text-fuchsia-800",
};

export default function QuoteCard({ quote }) {
  return (
    <div className="flex flex-col justify-between p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 transform transition-all duration-300 hover:scale-[1.03] h-68 md:h-52 cursor-pointer">
      
      <div className="flex flex-wrap gap-2 mb-2">
        {quote.categories.map((cat) => (
          <span
            key={cat}
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              categoryColors[cat] || "bg-gray-100 text-gray-800"
            }`}
          >
            {cat}
          </span>
        ))}
      </div>

      <div className="flex items-center space-x-6 flex-1">
        <div className="flex-shrink-0">
          <Image
            src={quote.imageUrl}
            alt={quote.author}
            width={80}   
            height={80}  
            className="rounded-lg object-cover shadow-sm transition-transform duration-300 hover:rotate-1"
          />
        </div>

        <div className="flex flex-col justify-between flex-1">
          <blockquote className="text-gray-800 italic leading-snug text-sm">
            "{quote.text}"
          </blockquote>
          <p className="mt-2 text-sm font-semibold text-gray-600">
            - {quote.author}
          </p>
        </div>
      </div>
    </div>
  );
}

