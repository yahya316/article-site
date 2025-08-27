import Image from "next/image";

const categoryButtonColors = {
  Faith: "bg-blue-500 text-white",
  Motivation: "bg-green-500 text-white",
  Wisdom: "bg-yellow-500 text-black",
  Patience: "bg-purple-500 text-white",
  Guidance: "bg-indigo-500 text-white",
  Encouragement: "bg-pink-500 text-white",
  Trust: "bg-teal-500 text-white",
  "Self-Discipline": "bg-orange-500 text-white",
  Contentment: "bg-red-500 text-white",
  Success: "bg-cyan-500 text-black",
  Happiness: "bg-lime-500 text-black",
};

export default function QuoteCard({ quote }) {
  return (
    <div className="bg-white rounded-lg shadow-md flex items-stretch overflow-hidden hover:shadow-lg transition w-full min-h-[180px] sm:min-h-[220px]">
      {/* Left: Image */}
      <div className="relative w-28 sm:w-32 h-auto flex-shrink-0">
        <Image
          src={quote.imageUrl || "/images/default-quote.jpg"}
          alt={quote.author || "Quote Image"}
          fill
          className="object-cover"
        />

        {/* Category on Image (optional) */}
        {quote.categories?.[0] && (
          <span
            className={`absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded-full ${
              categoryButtonColors[quote.categories[0]] || "bg-gray-600 text-white"
            }`}
          >
            {quote.categories[0]}
          </span>
        )}
      </div>

      {/* Right: Content */}
      <div className="flex flex-col justify-between p-4 flex-1">
        {/* Quote Text */}
        <blockquote className="text-gray-800 italic text-sm sm:text-base leading-snug">
          "{quote.text}"
        </blockquote>

        {/* Author + Categories */}
        <div className="mt-3">
          <p className="text-gray-600 font-medium text-sm sm:text-base">
            - {quote.author || "Unknown"}
          </p>

          {quote.categories && quote.categories.length > 1 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {quote.categories.slice(1).map((cat, idx) => (
                <span
                  key={idx}
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    categoryButtonColors[cat] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
