import Link from "next/link";

export default function ArticleCard({ article }) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
      <div className="relative w-full h-52 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {article.intro}
        </p>
        <Link
          href={`/articles/${article.slug}`}
          className="inline-block text-indigo-600 font-semibold hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}