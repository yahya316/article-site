import articles from '@/data/articles.json';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar-1';

import { FiCalendar, FiClock, FiTag, FiShare2, FiTwitter, FiFacebook, FiInstagram } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export const dynamicParams = false;

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticleDetailPage({ params }) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <article className="mx-auto py-10" style={{ width: '95%' }}>
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-md overflow-hidden border border-gray-200 dark:border-gray-800">

          {article.image && (
            <div className="relative w-full h-80">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <h1 className="absolute bottom-4 left-6 text-3xl font-bold text-white drop-shadow-lg">
                {article.title}
              </h1>
            </div>
          )}

          <div className="p-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <FaUserCircle className="text-gray-400 w-5 h-5" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="w-4 h-4" />
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiTag className="w-4 h-4" />
                <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200">
                  {article.category}
                </span>
              </div>
            </div>

            {article.intro && (
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300 mb-6">
                {article.intro}
              </blockquote>
            )}

            <div className="prose lg:prose-xl dark:prose-invert">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {article.tags && (
              <div className="mt-8 flex flex-wrap gap-2">
                {article.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FiShare2 className="w-4 h-4" />
                <span>Share this article</span>
              </div>
              <div className="flex gap-4 text-gray-500 dark:text-gray-400 text-lg">
                <a href="#" className="hover:text-sky-500">
                  <FiTwitter />
                </a>
                <a href="#" className="hover:text-blue-600">
                  <FiFacebook />
                </a>
                <a href="#" className="hover:text-pink-500">
                  <FiInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
