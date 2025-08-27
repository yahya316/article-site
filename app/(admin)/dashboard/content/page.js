// "use client";

// import { useEffect, useState } from "react";
// import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

// export default function ContentPage() {
//   const [articles, setArticles] = useState([]);
//   const [quotes, setQuotes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [type, setType] = useState("article");
//   const [activeTab, setActiveTab] = useState("articles");

//   // Fetch data
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const resArticles = await fetch("/api/articles");
//       const dataArticles = await resArticles.json();

//       const resQuotes = await fetch("/api/quotes");
//       const dataQuotes = await resQuotes.json();

//       setArticles(dataArticles);
//       setQuotes(dataQuotes);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Save (Add or Edit)
//   const handleSave = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);

//     try {
//       if (type === "article") {
//         const post = {
//           id: editItem?.id,
//           title: formData.get("title"),
//           author: formData.get("author"),
//           content: formData.get("content"),
//           slug: formData.get("slug"),
//           date: formData.get("date"),
//           category: formData.get("category"),
//           readTime: formData.get("readTime"),
//           tags: formData.get("tags").split(",").map((t) => t.trim()),
//           image: formData.get("image"),
//         };

//         await fetch("/api/articles", {
//           method: editItem ? "PUT" : "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(post),
//         });
//       } else if (type === "quote") {
//         const quote = {
//           id: editItem?.id,
//           text: formData.get("text"),
//           author: formData.get("author"),
//           imageUrl: formData.get("imageUrl"),
//           categories: formData.get("categories").split(",").map((c) => c.trim()),
//         };

//         await fetch("/api/quotes", {
//           method: editItem ? "PUT" : "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(quote),
//         });
//       }
//       setShowModal(false);
//       setEditItem(null);
//       fetchData();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Delete
//   const handleDelete = async (id, itemType) => {
//     try {
//       await fetch(`/api/${itemType}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });
//       fetchData();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
//       <div className="w-full max-w-7xl mx-auto space-y-6">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
//           Content Management
//         </h1>

//         {/* Tabs */}
//         <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//           <button
//             onClick={() => setActiveTab("articles")}
//             className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition ${
//               activeTab === "articles"
//                 ? "bg-blue-600 text-white shadow-md"
//                 : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-300"
//             } focus:outline-none focus:ring-2 focus:ring-blue-500`}
//           >
//             Articles
//           </button>
//           <button
//             onClick={() => setActiveTab("quotes")}
//             className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition ${
//               activeTab === "quotes"
//                 ? "bg-green-600 text-white shadow-md"
//                 : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-300"
//             } focus:outline-none focus:ring-2 focus:ring-green-500`}
//           >
//             Quotes
//           </button>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500 text-sm sm:text-base">Loading...</p>
//         ) : (
//           <>
//             {/* Articles */}
//             {activeTab === "articles" && (
//               <div>
//                 <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//                   <h2 className="text-lg sm:text-xl font-semibold">Articles</h2>
//                   <button
//                     onClick={() => {
//                       setShowModal(true);
//                       setType("article");
//                     }}
//                     className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                   >
//                     <FaPlus /> Add Article
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                   {articles.map((a) => (
//                     <div
//                       key={a.id}
//                       className="bg-white rounded-xl shadow-lg p-4 border hover:shadow-xl transition"
//                     >
//                       <img
//                         src={a.image || "/placeholder.jpg"}
//                         alt={a.title}
//                         className="h-40 w-full object-cover rounded-lg mb-3"
//                       />
//                       <h3 className="font-bold text-base sm:text-lg text-gray-800 truncate">
//                         {a.title}
//                       </h3>
//                       <p className="text-sm text-gray-500 mb-2">By {a.author}</p>
//                       <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs sm:text-sm">
//                         {a.category}
//                       </span>
//                       <div className="flex justify-end gap-3 mt-4">
//                         <button
//                           onClick={() => {
//                             setEditItem(a);
//                             setType("article");
//                             setShowModal(true);
//                           }}
//                           className="text-yellow-600 hover:text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded p-1"
//                           aria-label="Edit article"
//                         >
//                           <FaEdit size={18} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(a.id, "articles")}
//                           className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
//                           aria-label="Delete article"
//                         >
//                           <FaTrash size={18} />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Quotes */}
//             {activeTab === "quotes" && (
//               <div>
//                 <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//                   <h2 className="text-lg sm:text-xl font-semibold">Quotes</h2>
//                   <button
//                     onClick={() => {
//                       setShowModal(true);
//                       setType("quote");
//                     }}
//                     className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//                   >
//                     <FaPlus /> Add Quote
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                   {quotes.map((q) => (
//                     <div
//                       key={q.id}
//                       className="bg-white rounded-xl shadow-lg p-4 border hover:shadow-xl transition"
//                     >
//                       <p className="italic text-gray-700 text-sm sm:text-base mb-2 line-clamp-3">
//                         "{q.text}"
//                       </p>
//                       <p className="text-sm text-gray-500">— {q.author}</p>
//                       <div className="flex justify-end gap-3 mt-4">
//                         <button
//                           onClick={() => {
//                             setEditItem(q);
//                             setType("quote");
//                             setShowModal(true);
//                           }}
//                           className="text-yellow-600 hover:text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded p-1"
//                           aria-label="Edit quote"
//                         >
//                           <FaEdit size={18} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(q.id, "quotes")}
//                           className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
//                           aria-label="Delete quote"
//                         >
//                           <FaTrash size={18} />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </>
//         )}

//         {/* Modal */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 sm:p-6 transition">
//             <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-md sm:max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
//               <h2 className="text-lg sm:text-xl font-semibold mb-4">
//                 {editItem ? "Edit" : "Add"} {type.charAt(0).toUpperCase() + type.slice(1)}
//               </h2>
//               <form onSubmit={handleSave} className="space-y-3">
//                 {type === "article" ? (
//                   <>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Title</label>
//                       <input
//                         type="text"
//                         name="title"
//                         defaultValue={editItem?.title || ""}
//                         placeholder="Title"
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Author</label>
//                       <input
//                         type="text"
//                         name="author"
//                         defaultValue={editItem?.author || ""}
//                         placeholder="Author"
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Content</label>
//                       <textarea
//                         name="content"
//                         defaultValue={editItem?.content || ""}
//                         placeholder="Content"
//                         className="w-full border border-gray-300 p-2 rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Slug</label>
//                       <input
//                         type="text"
//                         name="slug"
//                         defaultValue={editItem?.slug || ""}
//                         placeholder="Slug"
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Date</label>
//                       <input
//                         type="date"
//                         name="date"
//                         defaultValue={editItem?.date || ""}
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Category</label>
//                       <input
//                         type="text"
//                         name="category"
//                         defaultValue={editItem?.category || ""}
//                         placeholder="Category"
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Read Time</label>
//                       <input
//                         type="text"
//                         name="readTime"
//                         defaultValue={editItem?.readTime || ""}
//                         placeholder="Read Time"
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Tags (comma separated)</label>
//                       <input
//                         type="text"
//                         name="tags"
//                         defaultValue={editItem?.tags?.join(", ") || ""}
//                         placeholder="Tags (comma separated)"
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Image URL</label>
//                       <input
//                         type="text"
//                         name="image"
//                         defaultValue={editItem?.image || ""}
//                         placeholder="Image URL"
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                       />
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Quote</label>
//                       <textarea
//                         name="text"
//                         defaultValue={editItem?.text || ""}
//                         placeholder="Quote"
//                         className="w-full border border-gray-300 p-2 rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Author</label>
//                       <input
//                         type="text"
//                         name="author"
//                         defaultValue={editItem?.author || ""}
//                         placeholder="Author"
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Image URL</label>
//                       <input
//                         type="text"
//                         name="imageUrl"
//                         defaultValue={editItem?.imageUrl || ""}
//                         placeholder="Image URL"
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Categories (comma separated)</label>
//                       <input
//                         type="text"
//                         name="categories"
//                         defaultValue={editItem?.categories?.join(", ") || ""}
//                         placeholder="Categories (comma separated)"
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                       />
//                     </div>
//                   </>
//                 )}
//                 <div className="flex justify-end gap-3 pt-2">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowModal(false);
//                       setEditItem(null);
//                     }}
//                     className="w-full sm:w-auto bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }












// "use client";

// import { useEffect, useState } from "react";
// import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

// export default function UsersPage() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [editItem, setEditItem] = useState(null);

//   // Fetch users
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/users");
//       if (!res.ok) throw new Error("Failed to fetch users");
//       const data = await res.json();
//       setUsers(data);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Save (Add or Edit)
//   const handleSave = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const user = {
//       id: editItem?.id,
//       name: formData.get("name"),
//       email: formData.get("email"),
//       role: formData.get("role"),
//       status: formData.get("status"),
//       password: formData.get("password"),
//       phone: formData.get("phone"),
//       location: formData.get("location"),
//       bio: formData.get("bio"),
//       notifications: formData.get("notifications") === "on",
//     };

//     try {
//       await fetch("/api/users", {
//         method: editItem ? "PUT" : "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       });
//       setShowModal(false);
//       setEditItem(null);
//       fetchData();
//     } catch (err) {
//       console.error("Error saving user:", err);
//     }
//   };

//   // Delete
//   const handleDelete = async (id) => {
//     try {
//       await fetch("/api/users", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });
//       fetchData();
//     } catch (err) {
//       console.error("Error deleting user:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
//       <div className="w-full max-w-7xl mx-auto space-y-6">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">User Management</h1>

//         {loading ? (
//           <p className="text-center text-gray-500 text-sm sm:text-base">Loading...</p>
//         ) : (
//           <>
//             <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//               <h2 className="text-lg sm:text-xl font-semibold">Users</h2>
//               <button
//                 onClick={() => {
//                   setShowModal(true);
//                   setEditItem(null);
//                 }}
//                 className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               >
//                 <FaPlus /> Add User
//               </button>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//               {users.map((user) => (
//                 <div
//                   key={user.id}
//                   className="bg-white rounded-xl shadow-lg p-4 border hover:shadow-xl transition"
//                 >
//                   <h3 className="font-bold text-base sm:text-lg text-gray-800 truncate">
//                     {user.name}
//                   </h3>
//                   <p className="text-sm text-gray-500 mb-1">{user.email}</p>
//                   <p className="text-sm text-gray-500 mb-1">Role: {user.role}</p>
//                   <p className="text-sm text-gray-500 mb-1">Status: {user.status}</p>
//                   <p className="text-sm text-gray-500 mb-1">Phone: {user.phone}</p>
//                   <p className="text-sm text-gray-500 mb-1">Location: {user.location}</p>
//                   <p className="text-sm text-gray-500 line-clamp-2">Bio: {user.bio}</p>
//                   <p className="text-sm text-gray-500">
//                     Notifications: {user.notifications ? "Enabled" : "Disabled"}
//                   </p>
//                   <div className="flex justify-end gap-3 mt-4">
//                     <button
//                       onClick={() => {
//                         setEditItem(user);
//                         setShowModal(true);
//                       }}
//                       className="text-yellow-600 hover:text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded p-1"
//                       aria-label="Edit user"
//                     >
//                       <FaEdit size={18} />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(user.id)}
//                       className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
//                       aria-label="Delete user"
//                     >
//                       <FaTrash size={18} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* Modal */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 sm:p-6 transition">
//             <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-md sm:max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
//               <h2 className="text-lg sm:text-xl font-semibold mb-4">
//                 {editItem ? "Edit" : "Add"} User
//               </h2>
//               <form onSubmit={handleSave} className="space-y-3">
//                 <div>
//                   <label className="block text-gray-700 text-sm sm:text-base">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     defaultValue={editItem?.name || ""}
//                     placeholder="Name"
//                     className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 text-sm sm:text-base">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     defaultValue={editItem?.email || ""}
//                     placeholder="Email"
//                     className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 text-sm sm:text-base">Role</label>
//                   <select
//                     name="role"
//                     defaultValue={editItem?.role || "User"}
//                     className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                     required
//                   >
//                     <option value="User">User</option>
//                     <option value="Admin">Admin</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 text-sm sm:text-base">Status</label>
//                   <select
//                     name="status"
//                     defaultValue={editItem?.status || "Active"}
//                     className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                     required
//                   >
//                     <option value="Active">Active</option>
//                     <option value="Banned">Banned</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 text-sm sm:text-base">Password</label>
//                   <input
//                     type="password"
//                     name="password"
//                     defaultValue={editItem?.password || ""}
//                     placeholder="Password"
//                     className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 text-sm sm:text-base">Phone</label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     defaultValue={editItem?.phone || ""}
//                     placeholder="Phone"
//                     className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 text-sm sm:text-base">Location</label>
//                   <input
//                     type="text"
//                     name="location"
//                     defaultValue={editItem?.location || ""}
//                     placeholder="Location"
//                     className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 text-sm sm:text-base">Bio</label>
//                   <textarea
//                     name="bio"
//                     defaultValue={editItem?.bio || ""}
//                     placeholder="Bio"
//                     className="w-full border border-gray-300 p-2 rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 text-sm sm:text-base">
//                     Notifications
//                   </label>
//                   <input
//                     type="checkbox"
//                     name="notifications"
//                     defaultChecked={editItem?.notifications || false}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                 </div>
//                 <div className="flex justify-end gap-3 pt-2">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowModal(false);
//                       setEditItem(null);
//                     }}
//                     className="w-full sm:w-auto bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }












// "use client";

// import { useEffect, useState } from "react";
// import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

// export default function ContentPage() {
//   const [articles, setArticles] = useState([]);
//   const [miniQuotes, setMiniQuotes] = useState([]);
//   const [heroQuotes, setHeroQuotes] = useState([]);
//   const [pendingQuotes, setPendingQuotes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [activeTab, setActiveTab] = useState("articles");
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");
//   const [quoteType, setQuoteType] = useState("mini"); // Track mini or hero quote for add/edit

//   // Fetch data
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [articlesRes, miniQuotesRes, heroQuotesRes, pendingQuotesRes] = await Promise.all([
//         fetch("/api/articles"),
//         fetch("/api/mini-quotes"),
//         fetch("/api/hero-quotes"),
//         fetch("/api/get-pending-quotes"),
//       ]);
//       if (!articlesRes.ok || !miniQuotesRes.ok || !heroQuotesRes.ok || !pendingQuotesRes.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       const [articlesData, miniQuotesData, heroQuotesData, pendingQuotesData] = await Promise.all([
//         articlesRes.json(),
//         miniQuotesRes.json(),
//         heroQuotesRes.json(),
//         pendingQuotesRes.json(),
//       ]);
//       setArticles(articlesData);
//       setMiniQuotes(miniQuotesData);
//       setHeroQuotes(heroQuotesData);
//       setPendingQuotes(pendingQuotesData);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setMessage("Failed to load content.");
//       setMessageType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Save (Add or Edit)
//   const handleSave = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setMessageType("");
//     const formData = new FormData(e.target);
//     const data = {
//       id: editItem?.id,
//       ...(activeTab === "articles"
//         ? {
//             slug: formData.get("slug"),
//             title: formData.get("title"),
//             image: formData.get("image"),
//             intro: formData.get("intro"),
//             content: formData.get("content"),
//             author: formData.get("author"),
//             date: formData.get("date"),
//             category: formData.get("category"),
//             readTime: formData.get("readTime"),
//             tags: formData.get("tags").split(",").map((tag) => tag.trim()).filter((tag) => tag),
//           }
//         : {
//             text: formData.get("text"),
//             author: formData.get("author"),
//             ...(quoteType === "mini"
//               ? {
//                   imageUrl: formData.get("imageUrl") || null,
//                   categories: formData.get("categories").split(",").map((cat) => cat.trim()).filter((cat) => cat),
//                 }
//               : {}),
//           }),
//     };

//     try {
//       const endpoint =
//         activeTab === "articles"
//           ? "/api/articles"
//           : quoteType === "mini"
//           ? "/api/mini-quotes"
//           : "/api/hero-quotes";
//       const res = await fetch(endpoint, {
//         method: editItem ? "PUT" : "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || "Failed to save");
//       }
//       setMessage(
//         `${activeTab === "articles" ? "Article" : quoteType === "mini" ? "Mini Quote" : "Hero Quote"} saved successfully!`
//       );
//       setMessageType("success");
//       setShowModal(false);
//       setEditItem(null);
//       setQuoteType("mini"); // Reset to default
//       fetchData();
//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       console.error(`Error saving ${activeTab}:`, err);
//       setMessage(`Error: ${err.message}`);
//       setMessageType("error");
//     }
//   };

//   // Delete
//   const handleDelete = async (id, type) => {
//     try {
//       const endpoint =
//         type === "articles"
//           ? "/api/articles"
//           : type === "miniQuotes"
//           ? "/api/mini-quotes"
//           : type === "heroQuotes"
//           ? "/api/hero-quotes"
//           : "/api/pending-quotes";
//       const res = await fetch(endpoint, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });
//       if (!res.ok) throw new Error(`Failed to delete ${type}`);
//       setMessage(
//         `${
//           type === "articles"
//             ? "Article"
//             : type === "miniQuotes"
//             ? "Mini Quote"
//             : type === "heroQuotes"
//             ? "Hero Quote"
//             : "Pending Quote"
//         } deleted successfully!`
//       );
//       setMessageType("success");
//       fetchData();
//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       console.error(`Error deleting ${type}:`, err);
//       setMessage(`Error: ${err.message}`);
//       setMessageType("error");
//     }
//   };

//   // Approve/Reject Pending Quote
//   const handleApproveReject = async (id, action) => {
//     try {
//       const pendingQuote = pendingQuotes.find((q) => q.id === id);
//       if (action === "approve") {
//         const newQuote = {
//           id: pendingQuote.id,
//           text: pendingQuote.text,
//           author: pendingQuote.author,
//           imageUrl: pendingQuote.imageUrl || null,
//           categories: Array.isArray(pendingQuote.categories) ? pendingQuote.categories : [],
//         };
//         const res = await fetch("/api/mini-quotes", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(newQuote),
//         });
//         if (!res.ok) throw new Error("Failed to approve quote");
//       }
//       await fetch("/api/pending-quotes", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });
//       setMessage(`Quote ${action === "approve" ? "approved and added" : "rejected"} successfully!`);
//       setMessageType("success");
//       fetchData();
//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       console.error(`Error ${action}ing quote:`, err);
//       setMessage(`Error: ${err.message}`);
//       setMessageType("error");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
//       <div className="w-full max-w-7xl mx-auto space-y-6">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Content Management</h1>
//         {message && (
//           <div
//             className={`p-3 rounded-lg text-center shadow-md ${
//               messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//             }`}
//           >
//             {message}
//           </div>
//         )}
//         {/* Tabs */}
//         <div className="flex border-b border-gray-300">
//           <button
//             className={`px-4 py-2 font-semibold ${activeTab === "articles" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
//             onClick={() => setActiveTab("articles")}
//           >
//             Articles
//           </button>
//           <button
//             className={`px-4 py-2 font-semibold ${activeTab === "quotes" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
//             onClick={() => setActiveTab("quotes")}
//           >
//             Quotes
//           </button>
//           <button
//             className={`px-4 py-2 font-semibold ${activeTab === "pendingQuotes" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
//             onClick={() => setActiveTab("pendingQuotes")}
//           >
//             Pending Quotes
//           </button>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500 text-sm sm:text-base">Loading...</p>
//         ) : (
//           <>
//             <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//               <h2 className="text-lg sm:text-xl font-semibold">
//                 {activeTab === "articles" ? "Articles" : activeTab === "quotes" ? "Quotes" : "Pending Quotes"}
//               </h2>
//               {activeTab !== "pendingQuotes" && (
//                 <div className="flex gap-4">
//                   {activeTab === "quotes" && (
//                     <select
//                       value={quoteType}
//                       onChange={(e) => setQuoteType(e.target.value)}
//                       className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="mini">Mini Quote</option>
//                       <option value="hero">Hero Quote</option>
//                     </select>
//                   )}
//                   <button
//                     onClick={() => {
//                       setShowModal(true);
//                       setEditItem(null);
//                     }}
//                     className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                   >
//                     <FaPlus /> Add {activeTab === "articles" ? "Article" : quoteType === "mini" ? "Mini Quote" : "Hero Quote"}
//                   </button>
//                 </div>
//               )}
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//               {(activeTab === "articles"
//                 ? articles
//                 : activeTab === "quotes"
//                 ? [...miniQuotes.map(q => ({ ...q, type: "miniQuotes" })), ...heroQuotes.map(q => ({ ...q, type: "heroQuotes" }))]
//                 : pendingQuotes
//               ).map((item) => (
//                 <div
//                   key={`${item.type || "pendingQuotes"}-${item.id}`}
//                   className="bg-white rounded-xl shadow-lg p-4 border hover:shadow-xl transition"
//                 >
//                   {activeTab === "articles" ? (
//                     <>
//                       <h3 className="font-bold text-base sm:text-lg text-gray-800 truncate">{item.title}</h3>
//                       <p className="text-sm text-gray-500 mb-1">Slug: {item.slug}</p>
//                       <p className="text-sm text-gray-500 mb-1">Author: {item.author}</p>
//                       <p className="text-sm text-gray-500 mb-1">Category: {item.category}</p>
//                       <p className="text-sm text-gray-500 mb-1">Date: {item.date}</p>
//                       <p className="text-sm text-gray-500 mb-1">Read Time: {item.readTime}</p>
//                       <p className="text-sm text-gray-500 line-clamp-2">Intro: {item.intro}</p>
//                       <p className="text-sm text-gray-500">Tags: {(item.tags || []).join(", ") || "None"}</p>
//                     </>
//                   ) : activeTab === "quotes" ? (
//                     <>
//                       <h3 className="font-bold text-base sm:text-lg text-gray-800 line-clamp-2">{item.text}</h3>
//                       <p className="text-sm text-gray-500 mb-1">Author: {item.author}</p>
//                       {item.type === "miniQuotes" ? (
//                         <>
//                           <p className="text-sm text-gray-500 mb-1">Image URL: {item.imageUrl || "None"}</p>
//                           <p className="text-sm text-gray-500 mb-1">Categories: {(item.categories || []).join(", ") || "None"}</p>
//                         </>
//                       ) : null}
//                       <p className="text-sm text-gray-500">Type: {item.type === "miniQuotes" ? "Mini Quote" : "Hero Quote"}</p>
//                     </>
//                   ) : (
//                     <>
//                       <h3 className="font-bold text-base sm:text-lg text-gray-800 line-clamp-2">{item.text}</h3>
//                       <p className="text-sm text-gray-500 mb-1">Author: {item.author}</p>
//                       <p className="text-sm text-gray-500 mb-1">Image URL: {item.imageUrl || "None"}</p>
//                       <p className="text-sm text-gray-500 mb-1">Categories: {(item.categories || []).join(", ") || "None"}</p>
//                       <p className="text-sm text-gray-500">Status: {item.status}</p>
//                     </>
//                   )}
//                   <div className="flex justify-end gap-3 mt-4">
//                     {activeTab !== "pendingQuotes" ? (
//                       <>
//                         <button
//                           onClick={() => {
//                             setEditItem(item);
//                             setQuoteType(item.type === "miniQuotes" ? "mini" : "hero");
//                             setShowModal(true);
//                           }}
//                           className="text-yellow-600 hover:text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded p-1"
//                           aria-label={`Edit ${activeTab === "articles" ? "article" : item.type === "miniQuotes" ? "mini quote" : "hero quote"}`}
//                         >
//                           <FaEdit size={18} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item.id, item.type || activeTab)}
//                           className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
//                           aria-label={`Delete ${activeTab === "articles" ? "article" : item.type === "miniQuotes" ? "mini quote" : "hero quote"}`}
//                         >
//                           <FaTrash size={18} />
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button
//                           onClick={() => handleApproveReject(item.id, "approve")}
//                           className="text-green-600 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 rounded p-1"
//                           aria-label="Approve quote"
//                         >
//                           <FaCheck size={18} />
//                         </button>
//                         <button
//                           onClick={() => handleApproveReject(item.id, "reject")}
//                           className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
//                           aria-label="Reject quote"
//                         >
//                           <FaTimes size={18} />
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* Modal */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 sm:p-6 transition">
//             <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-md sm:max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
//               <h2 className="text-lg sm:text-xl font-semibold mb-4">
//                 {editItem ? "Edit" : "Add"} {activeTab === "articles" ? "Article" : quoteType === "mini" ? "Mini Quote" : "Hero Quote"}
//               </h2>
//               <form onSubmit={handleSave} className="space-y-3">
//                 {activeTab === "articles" ? (
//                   <>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Slug</label>
//                       <input
//                         type="text"
//                         name="slug"
//                         defaultValue={editItem?.slug || ""}
//                         placeholder="Slug"
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Title</label>
//                       <input
//                         type="text"
//                         name="title"
//                         defaultValue={editItem?.title || ""}
//                         placeholder="Title"
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Image URL</label>
//                       <input
//                         type="text"
//                         name="image"
//                         defaultValue={editItem?.image || ""}
//                         placeholder="Image URL"
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Intro</label>
//                       <textarea
//                         name="intro"
//                         defaultValue={editItem?.intro || ""}
//                         placeholder="Intro"
//                         className="w-full border border-gray-300 p-2 rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Content</label>
//                       <textarea
//                         name="content"
//                         defaultValue={editItem?.content || ""}
//                         placeholder="Content"
//                         className="w-full border border-gray-300 p-2 rounded-lg min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Author</label>
//                       <input
//                         type="text"
//                         name="author"
//                         defaultValue={editItem?.author || ""}
//                         placeholder="Author"
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Date</label>
//                       <input
//                         type="date"
//                         name="date"
//                         defaultValue={editItem?.date || ""}
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Category</label>
//                       <input
//                         type="text"
//                         name="category"
//                         defaultValue={editItem?.category || ""}
//                         placeholder="Category"
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Read Time</label>
//                       <input
//                         type="text"
//                         name="readTime"
//                         defaultValue={editItem?.readTime || ""}
//                         placeholder="Read Time (e.g., 5 min)"
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Tags (comma-separated)</label>
//                       <input
//                         type="text"
//                         name="tags"
//                         defaultValue={(editItem?.tags || []).join(", ") || ""}
//                         placeholder="Tags (e.g., motivation, productivity)"
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                         required
//                       />
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Text</label>
//                       <textarea
//                         name="text"
//                         defaultValue={editItem?.text || ""}
//                         placeholder="Quote Text"
//                         className="w-full border border-gray-300 p-2 rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm sm:text-base">Author</label>
//                       <input
//                         type="text"
//                         name="author"
//                         defaultValue={editItem?.author || ""}
//                         placeholder="Author"
//                         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                         required
//                       />
//                     </div>
//                     {quoteType === "mini" && (
//                       <>
//                         <div>
//                           <label className="block text-gray-700 text-sm sm:text-base">Image URL</label>
//                           <input
//                             type="text"
//                             name="imageUrl"
//                             defaultValue={editItem?.imageUrl || ""}
//                             placeholder="Image URL"
//                             className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-gray-700 text-sm sm:text-base">Categories (comma-separated)</label>
//                           <input
//                             type="text"
//                             name="categories"
//                             defaultValue={(editItem?.categories || []).join(", ") || ""}
//                             placeholder="Categories (e.g., Faith, Motivation)"
//                             className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                             required
//                           />
//                         </div>
//                       </>
//                     )}
//                   </>
//                 )}
//                 <div className="flex justify-end gap-3 pt-2">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowModal(false);
//                       setEditItem(null);
//                       setQuoteType("mini");
//                     }}
//                     className="w-full sm:w-auto bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



























"use client";

import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

// Define categories to match UserQuoteForm.js
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

const validCategories = Object.keys(categoryButtonColors);

export default function ContentPage() {
  const [miniQuotes, setMiniQuotes] = useState([]);
  const [heroQuotes, setHeroQuotes] = useState([]);
  const [pendingQuotes, setPendingQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [activeTab, setActiveTab] = useState("miniQuotes");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [quoteType, setQuoteType] = useState("mini");

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [miniQuotesRes, heroQuotesRes, pendingQuotesRes] = await Promise.all([
        fetch("/api/mini-quotes"),
        fetch("/api/hero-quotes"),
        fetch("/api/get-pending-quotes"),
      ]);
      if (!miniQuotesRes.ok || !heroQuotesRes.ok || !pendingQuotesRes.ok) {
        throw new Error("Failed to fetch data");
      }
      const [miniQuotesData, heroQuotesData, pendingQuotesData] = await Promise.all([
        miniQuotesRes.json(),
        heroQuotesRes.json(),
        pendingQuotesRes.json(),
      ]);
      setMiniQuotes(miniQuotesData);
      setHeroQuotes(heroQuotesData);
      setPendingQuotes(pendingQuotesData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setMessage("Failed to load content.");
      setMessageType("error");
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
    setMessage("");
    setMessageType("");
    const formData = new FormData(e.target);
    const data = {
      id: editItem?.id,
      text: formData.get("text"),
      author: formData.get("author"),
      ...(quoteType === "mini"
        ? {
            imageUrl: formData.get("imageUrl") || null,
            categories: formData
              .get("categories")
              .split(",")
              .map((cat) => cat.trim())
              .filter((cat) => cat && validCategories.includes(cat)),
          }
        : {}),
    };

    if (!data.text || !data.author) {
      setMessage("Quote text and author are required.");
      setMessageType("error");
      return;
    }

    if (quoteType === "mini" && (!data.imageUrl || data.categories.length === 0)) {
      setMessage("Image URL and at least one valid category are required for mini quotes.");
      setMessageType("error");
      return;
    }

    try {
      const endpoint = quoteType === "mini" ? "/api/mini-quotes" : "/api/hero-quotes";
      const res = await fetch(endpoint, {
        method: editItem ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save quote");
      }
      setMessage(`${quoteType === "mini" ? "Mini Quote" : "Hero Quote"} saved successfully!`);
      setMessageType("success");
      setShowModal(false);
      setEditItem(null);
      setQuoteType("mini");
      fetchData();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(`Error saving quote:`, err);
      setMessage(`Error: ${err.message}`);
      setMessageType("error");
    }
  };

  // Delete
  const handleDelete = async (id, type) => {
    try {
      const endpoint = type === "miniQuotes" ? "/api/mini-quotes" : "/api/hero-quotes";
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Failed to delete ${type}`);
      }
      setMessage(`${type === "miniQuotes" ? "Mini Quote" : "Hero Quote"} deleted successfully!`);
      setMessageType("success");
      fetchData();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(`Error deleting ${type}:`, err);
      setMessage(`Error: ${err.message}`);
      setMessageType("error");
    }
  };

  // Approve/Reject Pending Quote
  const handleApproveReject = async (id, action) => {
    try {
      const pendingQuote = pendingQuotes.find((q) => q.id === id);
      if (!pendingQuote) {
        throw new Error("Pending quote not found");
      }

      if (action === "approve") {
        // Validate imageUrl for mini quotes
        if (pendingQuote.type === "mini" && (!pendingQuote.imageUrl || typeof pendingQuote.imageUrl !== "string" || pendingQuote.imageUrl.trim() === "")) {
          throw new Error("A valid image URL is required for mini quotes");
        }

        const newQuote = {
          text: pendingQuote.text,
          author: pendingQuote.author,
          ...(pendingQuote.type === "mini"
            ? {
                imageUrl: pendingQuote.imageUrl,
                categories: Array.isArray(pendingQuote.categories)
                  ? pendingQuote.categories.filter((cat) => validCategories.includes(cat))
                  : [],
              }
            : {}),
        };

        const endpoint = pendingQuote.type === "mini" ? "/api/mini-quotes" : "/api/hero-quotes";
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newQuote),
        });
        if (!res.ok) {
          const errorData = await res.json();
          console.error("Approval error response:", errorData);
          throw new Error(errorData.error || "Failed to approve quote");
        }
      }

      // Delete from pending quotes
      const resDelete = await fetch("/api/pending-quotes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!resDelete.ok) {
        const errorData = await resDelete.json();
        throw new Error(errorData.error || "Failed to delete pending quote");
      }

      setMessage(`Quote ${action === "approve" ? "approved and added" : "rejected"} successfully!`);
      setMessageType("success");
      fetchData();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(`Error ${action}ing quote:`, err);
      setMessage(`Error: ${err.message}`);
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Content Management</h1>
        {message && (
          <div
            className={`p-3 rounded-lg text-center shadow-md ${
              messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}
        {/* Tabs */}
        <div className="flex border-b border-gray-300">
          <button
            className={`px-4 py-2 font-semibold ${activeTab === "miniQuotes" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("miniQuotes")}
          >
            Mini Quotes
          </button>
          <button
            className={`px-4 py-2 font-semibold ${activeTab === "heroQuotes" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("heroQuotes")}
          >
            Hero Quotes
          </button>
          <button
            className={`px-4 py-2 font-semibold ${activeTab === "pendingQuotes" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("pendingQuotes")}
          >
            Pending Quotes
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 text-sm sm:text-base">Loading...</p>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-lg sm:text-xl font-semibold">
                {activeTab === "miniQuotes" ? "Mini Quotes" : activeTab === "heroQuotes" ? "Hero Quotes" : "Pending Quotes"}
              </h2>
              {activeTab !== "pendingQuotes" && (
                <div className="flex gap-4">
                  <select
                    value={quoteType}
                    onChange={(e) => setQuoteType(e.target.value)}
                    className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="mini">Mini Quote</option>
                    <option value="hero">Hero Quote</option>
                  </select>
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setEditItem(null);
                    }}
                    className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <FaPlus /> Add {quoteType === "mini" ? "Mini Quote" : "Hero Quote"}
                  </button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {(activeTab === "miniQuotes"
                ? miniQuotes.map((q) => ({ ...q, type: "miniQuotes" }))
                : activeTab === "heroQuotes"
                ? heroQuotes.map((q) => ({ ...q, type: "heroQuotes" }))
                : pendingQuotes
              ).map((item) => (
                <div
                  key={`${item.type || "pendingQuotes"}-${item.id}`}
                  className="bg-white rounded-xl shadow-lg p-4 border hover:shadow-xl transition"
                >
                  <h3 className="font-bold text-base sm:text-lg text-gray-800 line-clamp-2">{item.text}</h3>
                  <p className="text-sm text-gray-500 mb-1">Author: {item.author}</p>
                  {item.type === "miniQuotes" || (activeTab === "pendingQuotes" && item.type === "mini") ? (
                    <>
                      <p className="text-sm text-gray-500 mb-1">Image URL: {item.imageUrl || "None"}</p>
                      <p className="text-sm text-gray-500 mb-1">Categories: {(item.categories || []).join(", ") || "None"}</p>
                    </>
                  ) : null}
                  <p className="text-sm text-gray-500">
                    Type: {item.type === "miniQuotes" ? "Mini Quote" : item.type === "heroQuotes" ? "Hero Quote" : item.type}
                  </p>
                  <div className="flex justify-end gap-3 mt-4">
                    {activeTab !== "pendingQuotes" ? (
                      <>
                        <button
                          onClick={() => {
                            setEditItem(item);
                            setQuoteType(item.type === "miniQuotes" ? "mini" : "hero");
                            setShowModal(true);
                          }}
                          className="text-yellow-600 hover:text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded p-1"
                          aria-label={`Edit ${item.type === "miniQuotes" ? "mini quote" : "hero quote"}`}
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.type)}
                          className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
                          aria-label={`Delete ${item.type === "miniQuotes" ? "mini quote" : "hero quote"}`}
                        >
                          <FaTrash size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleApproveReject(item.id, "approve")}
                          className="text-green-600 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 rounded p-1"
                          aria-label="Approve quote"
                        >
                          <FaCheck size={18} />
                        </button>
                        <button
                          onClick={() => handleApproveReject(item.id, "reject")}
                          className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
                          aria-label="Reject quote"
                        >
                          <FaTimes size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 sm:p-6 transition">
            <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-md sm:max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                {editItem ? "Edit" : "Add"} {quoteType === "mini" ? "Mini Quote" : "Hero Quote"}
              </h2>
              <form onSubmit={handleSave} className="space-y-3">
                <div>
                  <label className="block text-gray-700 text-sm sm:text-base">Text</label>
                  <textarea
                    name="text"
                    defaultValue={editItem?.text || ""}
                    placeholder="Quote Text"
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
                    required
                  />
                </div>
                {quoteType === "mini" && (
                  <>
                    <div>
                      <label className="block text-gray-700 text-sm sm:text-base">Image URL</label>
                      <input
                        type="text"
                        name="imageUrl"
                        defaultValue={editItem?.imageUrl || ""}
                        placeholder="Image URL (e.g., /images/img-1.jpg)"
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm sm:text-base">Categories (comma-separated, e.g., Faith, Motivation)</label>
                      <input
                        type="text"
                        name="categories"
                        defaultValue={(editItem?.categories || []).join(", ") || ""}
                        placeholder={`Categories (e.g., ${validCategories.slice(0, 2).join(", ")})`}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
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
                      setQuoteType("mini");
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
