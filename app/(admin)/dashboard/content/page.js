"use client";

import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function ContentPage() {
  const [articles, setArticles] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [type, setType] = useState("article");
  const [activeTab, setActiveTab] = useState("articles");

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const resArticles = await fetch("/api/articles");
      const dataArticles = await resArticles.json();

      const resQuotes = await fetch("/api/quotes");
      const dataQuotes = await resQuotes.json();

      setArticles(dataArticles);
      setQuotes(dataQuotes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Save (Add or Edit)
  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      if (type === "article") {
        const post = {
          id: editItem?.id,
          title: formData.get("title"),
          author: formData.get("author"),
          content: formData.get("content"),
          slug: formData.get("slug"),
          date: formData.get("date"),
          category: formData.get("category"),
          readTime: formData.get("readTime"),
          tags: formData.get("tags").split(",").map((t) => t.trim()),
          image: formData.get("image"),
        };

        await fetch("/api/articles", {
          method: editItem ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(post),
        });
      } else if (type === "quote") {
        const quote = {
          id: editItem?.id,
          text: formData.get("text"),
          author: formData.get("author"),
          imageUrl: formData.get("imageUrl"),
          categories: formData.get("categories").split(",").map((c) => c.trim()),
        };

        await fetch("/api/quotes", {
          method: editItem ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(quote),
        });
      }
      setShowModal(false);
      setEditItem(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete
  const handleDelete = async (id, itemType) => {
    try {
      await fetch(`/api/${itemType}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Content Management
        </h1>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => setActiveTab("articles")}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition ${
              activeTab === "articles"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            Articles
          </button>
          <button
            onClick={() => setActiveTab("quotes")}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition ${
              activeTab === "quotes"
                ? "bg-green-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            Quotes
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 text-sm sm:text-base">Loading...</p>
        ) : (
          <>
            {/* Articles */}
            {activeTab === "articles" && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                  <h2 className="text-lg sm:text-xl font-semibold">Articles</h2>
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setType("article");
                    }}
                    className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <FaPlus /> Add Article
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {articles.map((a) => (
                    <div
                      key={a.id}
                      className="bg-white rounded-xl shadow-lg p-4 border hover:shadow-xl transition"
                    >
                      <img
                        src={a.image || "/placeholder.jpg"}
                        alt={a.title}
                        className="h-40 w-full object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-bold text-base sm:text-lg text-gray-800 truncate">
                        {a.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">By {a.author}</p>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs sm:text-sm">
                        {a.category}
                      </span>
                      <div className="flex justify-end gap-3 mt-4">
                        <button
                          onClick={() => {
                            setEditItem(a);
                            setType("article");
                            setShowModal(true);
                          }}
                          className="text-yellow-600 hover:text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded p-1"
                          aria-label="Edit article"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(a.id, "articles")}
                          className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
                          aria-label="Delete article"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quotes */}
            {activeTab === "quotes" && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                  <h2 className="text-lg sm:text-xl font-semibold">Quotes</h2>
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setType("quote");
                    }}
                    className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  >
                    <FaPlus /> Add Quote
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {quotes.map((q) => (
                    <div
                      key={q.id}
                      className="bg-white rounded-xl shadow-lg p-4 border hover:shadow-xl transition"
                    >
                      <p className="italic text-gray-700 text-sm sm:text-base mb-2 line-clamp-3">
                        "{q.text}"
                      </p>
                      <p className="text-sm text-gray-500">— {q.author}</p>
                      <div className="flex justify-end gap-3 mt-4">
                        <button
                          onClick={() => {
                            setEditItem(q);
                            setType("quote");
                            setShowModal(true);
                          }}
                          className="text-yellow-600 hover:text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded p-1"
                          aria-label="Edit quote"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(q.id, "quotes")}
                          className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
                          aria-label="Delete quote"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 sm:p-6 transition">
            <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-md sm:max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                {editItem ? "Edit" : "Add"} {type.charAt(0).toUpperCase() + type.slice(1)}
              </h2>
              <form onSubmit={handleSave} className="space-y-3">
                {type === "article" ? (
                  <>
                    <div>
                      <label className="block text-gray-700 text-sm sm:text-base">Title</label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={editItem?.title || ""}
                        placeholder="Title"
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm sm:text-base">Author</label>
                      <input
                        type="text"
                        name="author"
                        defaultValue={editItem?.author || ""}
                        placeholder="Author"
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm sm:text-base">Content</label>
                      <textarea
                        name="content"
                        defaultValue={editItem?.content || ""}
                        placeholder="Content"
                        className="w-full border border-gray-300 p-2 rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm sm:text-base">Slug</label>
                      <input
                        type="text"
                        name="slug"
                        defaultValue={editItem?.slug || ""}
                        placeholder="Slug"
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm sm:text-base">Date</label>
                      <input
                        type="date"
                        name="date"
                        defaultValue={editItem?.date || ""}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm sm:text-base">Category</label>
                      <input
                        type="text"
                        name="category"
                        defaultValue={editItem?.category || ""}
                        placeholder="Category"
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm sm:text-base">Read Time</label>
                      <input
                        type="text"
                        name="readTime"
                        defaultValue={editItem?.readTime || ""}
                        placeholder="Read Time"
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm sm:text-base">Tags (comma separated)</label>
                      <input
                        type="text"
                        name="tags"
                        defaultValue={editItem?.tags?.join(", ") || ""}
                        placeholder="Tags (comma separated)"
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm sm:text-base">Image URL</label>
                      <input
                        type="text"
                        name="image"
                        defaultValue={editItem?.image || ""}
                        placeholder="Image URL"
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-gray-700 text-sm sm:text-base">Quote</label>
                      <textarea
                        name="text"
                        defaultValue={editItem?.text || ""}
                        placeholder="Quote"
                        className="w-full border border-gray-300 p-2 rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm sm:text-base">Author</label>
                      <input
                        type="text"
                        name="author"
                        defaultValue={editItem?.author || ""}
                        placeholder="Author"
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm sm:text-base">Image URL</label>
                      <input
                        type="text"
                        name="imageUrl"
                        defaultValue={editItem?.imageUrl || ""}
                        placeholder="Image URL"
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm sm:text-base">Categories (comma separated)</label>
                      <input
                        type="text"
                        name="categories"
                        defaultValue={editItem?.categories?.join(", ") || ""}
                        placeholder="Categories (comma separated)"
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                  </>
                )}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditItem(null);
                    }}
                    className="w-full sm:w-auto bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}