// "use client";

// import { useEffect, useState } from "react";
// import {
//   FaUsers,
//   FaFileAlt,
//   FaRegClock,
//   FaComments,
//   FaEye,
//   FaDollarSign,
// } from "react-icons/fa";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// export default function DashboardPage() {
//   const [users, setUsers] = useState([]);
//   const [articles, setArticles] = useState([]);
//   const [quotes, setQuotes] = useState([]);
//   const [pendingQuotes, setPendingQuotes] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const resUsers = await fetch("/api/users");
//         setUsers(await resUsers.json());

//         const resArticles = await fetch("/api/articles");
//         setArticles(await resArticles.json());

//         const resQuotes = await fetch("/api/quotes");
//         setQuotes(await resQuotes.json());

//         const resPending = await fetch("/api/get-pending-quotes");
//         setPendingQuotes(await resPending.json());
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   const totalUsers = users.length;
//   const totalArticles = articles.length;
//   const totalQuotes = quotes.length;

//   // Articles per Category
//   const articlesPerCategory = articles.reduce((acc, article) => {
//     const category = article.category?.trim().toLowerCase() || "uncategorized";
//     acc[category] = (acc[category] || 0) + 1;
//     return acc;
//   }, {});
//   const articlesCategoryData = Object.keys(articlesPerCategory).map((cat) => ({
//     category: cat.charAt(0).toUpperCase() + cat.slice(1),
//     count: articlesPerCategory[cat],
//   }));

//   // User roles breakdown
//   const roleCounts = users.reduce((acc, u) => {
//     const role = u.role?.trim().toLowerCase() || "unknown";
//     acc[role] = (acc[role] || 0) + 1;
//     return acc;
//   }, {});
//   const userRoles = Object.keys(roleCounts).map((role) => ({
//     role: role.charAt(0).toUpperCase() + role.slice(1),
//     value: roleCounts[role],
//   }));

//   const COLORS = ["#2563eb", "#22c55e", "#f59e0b", "#ef4444", "#10b981"];

//   const handleApproval = async (id, action) => {
//     try {
//       const mappedAction = action === "accept" ? "approve" : "reject";

//       const res = await fetch("/api/manage-quote", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id, action: mappedAction }),
//       });

//       if (!res.ok) throw new Error("Failed to update quote");

//       setPendingQuotes((prev) => prev.filter((q) => q.id !== id));

//       if (mappedAction === "approve") {
//         const resQuotes = await fetch("/api/quotes");
//         setQuotes(await resQuotes.json());
//       }
//     } catch (err) {
//       console.error("Error updating quote:", err);
//     }
//   };

//   return (
//     <div className="space-y-10">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
//         <StatCard icon={<FaUsers />} title="Total Users" value={totalUsers} color="from-blue-500 to-blue-600" />
//         <StatCard icon={<FaFileAlt />} title="Articles" value={totalArticles} color="from-green-500 to-green-600" />
//         <StatCard icon={<FaRegClock />} title="Quotes" value={totalQuotes} color="from-yellow-500 to-yellow-600" />
//         <StatCard icon={<FaComments />} title="Comments" value="3" color="from-purple-500 to-purple-600" />
//         <StatCard icon={<FaEye />} title="Page Views" value="15K" color="from-pink-500 to-pink-600" />
//         <StatCard icon={<FaDollarSign />} title="Revenue" value="$2.3K" color="from-indigo-500 to-indigo-600" />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <ChartCard title="Users Growth">
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={users.map((u, i) => ({ index: i + 1, users: i + 1 }))}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="index" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         <ChartCard title="Articles per Category">
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={articlesCategoryData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="category" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="count" fill="#22c55e" radius={[6, 6, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         <ChartCard title="User Roles">
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie data={userRoles} dataKey="value" nameKey="role" cx="50%" cy="50%" outerRadius={90} label>
//                 {userRoles.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </ChartCard>
//       </div>

//       {/* Recent Activity */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <TableCard title="Latest Users" headers={["Name", "Email", "Role"]}>
//           {users.slice(-5).map((u, i) => (
//             <tr key={i} className="border-b hover:bg-gray-50">
//               <td className="py-2">{u.name}</td>
//               <td>{u.email}</td>
//               <td>{u.role}</td>
//             </tr>
//           ))}
//         </TableCard>

//         <TableCard title="Latest Articles" headers={["Title", "Author"]}>
//           {articles.slice(-5).map((a, i) => (
//             <tr key={i} className="border-b hover:bg-gray-50">
//               <td className="py-2">{a.title}</td>
//               <td>{a.author}</td>
//             </tr>
//           ))}
//         </TableCard>
//       </div>

//       {/* Pending Quotes Section */}
//       <div className="bg-white p-6 rounded-xl shadow-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="font-semibold text-lg">Pending Quotes for Approval</h2>
//           <button
//             onClick={async () => {
//               try {
//                 const res = await fetch("/api/pending-quotes");
//                 if (!res.ok) throw new Error("Failed to fetch pending quotes");
//                 setPendingQuotes(await res.json());
//               } catch (err) {
//                 console.error("Error refreshing quotes:", err);
//               }
//             }}
//             className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-sm"
//           >
//             Refresh
//           </button>
//         </div>

//         {pendingQuotes.length === 0 ? (
//           <p className="text-gray-500">No quotes awaiting approval.</p>
//         ) : (
//           <ul className="space-y-4">
//             {pendingQuotes.map((quote) => (
//               <li key={quote.id} className="border p-4 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition">
//                 <p className="text-lg font-medium">“{quote.text}”</p>
//                 <p className="text-gray-600">— {quote.author}</p>
//                 <p className="text-sm text-gray-500">Categories: {quote.categories?.join(", ")}</p>
//                 <div className="flex gap-2 mt-2">
//                   <button
//                     onClick={() => handleApproval(quote.id, "accept")}
//                     className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition shadow-sm"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleApproval(quote.id, "reject")}
//                     className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-sm"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// /* Reusable Components */
// function StatCard({ icon, title, value, color }) {
//   return (
//     <div className="bg-white shadow-md rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition">
//       <div className={`p-3 text-white rounded-full bg-gradient-to-r ${color} shadow-md text-lg`}>
//         {icon}
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">{title}</p>
//         <h3 className="text-2xl font-bold">{value}</h3>
//       </div>
//     </div>
//   );
// }

// function ChartCard({ title, children }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
//       <h2 className="font-semibold mb-4 border-l-4 border-blue-500 pl-2">{title}</h2>
//       {children}
//     </div>
//   );
// }

// function TableCard({ title, headers, children }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
//       <h2 className="font-semibold mb-4 border-l-4 border-green-500 pl-2">{title}</h2>
//       <table className="w-full text-left text-sm">
//         <thead>
//           <tr className="border-b bg-gray-50">
//             {headers.map((h, i) => (
//               <th key={i} className="py-2 font-medium text-gray-600">
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>{children}</tbody>
//       </table>
//     </div>
//   );
// }





















// "use client";

// import { useEffect, useState } from "react";
// import {
//   FaUsers,
//   FaFileAlt,
//   FaRegClock,
//   FaComments,
//   FaEye,
//   FaDollarSign,
// } from "react-icons/fa";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// // Define categories to match UserQuoteForm.js and content/page.js
// const validCategories = [
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

// export default function DashboardPage() {
//   const [users, setUsers] = useState([]);
//   const [articles, setArticles] = useState([]);
//   const [miniQuotes, setMiniQuotes] = useState([]);
//   const [heroQuotes, setHeroQuotes] = useState([]);
//   const [pendingQuotes, setPendingQuotes] = useState([]);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [resUsers, resArticles, resMiniQuotes, resHeroQuotes, resPending] = await Promise.all([
//           fetch("/api/users"),
//           fetch("/api/articles"),
//           fetch("/api/mini-quotes"),
//           fetch("/api/hero-quotes"),
//           fetch("/api/get-pending-quotes"),
//         ]);
//         if (!resUsers.ok || !resArticles.ok || !resMiniQuotes.ok || !resHeroQuotes.ok || !resPending.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const [usersData, articlesData, miniQuotesData, heroQuotesData, pendingQuotesData] = await Promise.all([
//           resUsers.json(),
//           resArticles.json(),
//           resMiniQuotes.json(),
//           resHeroQuotes.json(),
//           resPending.json(),
//         ]);
//         setUsers(usersData);
//         setArticles(articlesData);
//         setMiniQuotes(miniQuotesData);
//         setHeroQuotes(heroQuotesData);
//         setPendingQuotes(pendingQuotesData);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setMessage("Failed to load dashboard data.");
//         setMessageType("error");
//       }
//     };
//     fetchData();
//   }, []);

//   const totalUsers = users.length;
//   const totalArticles = articles.length;
//   const totalQuotes = miniQuotes.length + heroQuotes.length;

//   // Articles per Category
//   const articlesPerCategory = articles.reduce((acc, article) => {
//     const category = article.category?.trim().toLowerCase() || "uncategorized";
//     acc[category] = (acc[category] || 0) + 1;
//     return acc;
//   }, {});
//   const articlesCategoryData = Object.keys(articlesPerCategory).map((cat) => ({
//     category: cat.charAt(0).toUpperCase() + cat.slice(1),
//     count: articlesPerCategory[cat],
//   }));

//   // User roles breakdown
//   const roleCounts = users.reduce((acc, u) => {
//     const role = u.role?.trim().toLowerCase() || "unknown";
//     acc[role] = (acc[role] || 0) + 1;
//     return acc;
//   }, {});
//   const userRoles = Object.keys(roleCounts).map((role) => ({
//     role: role.charAt(0).toUpperCase() + role.slice(1),
//     value: roleCounts[role],
//   }));

//   // Quotes breakdown (Mini vs Hero)
//   const quotesBreakdown = [
//     { name: "Mini Quotes", value: miniQuotes.length },
//     { name: "Hero Quotes", value: heroQuotes.length },
//   ];

//   const COLORS = ["#2563eb", "#22c55e", "#f59e0b", "#ef4444", "#10b981"];

//   const handleApproval = async (id, action) => {
//     try {
//       const mappedAction = action === "accept" ? "approve" : "reject";
//       const quote = pendingQuotes.find((q) => q.id === id);
//       if (!quote) {
//         throw new Error("Pending quote not found");
//       }

//       if (mappedAction === "approve") {
//         // Validate imageUrl for mini quotes
//         if (quote.type === "mini" && (!quote.imageUrl || typeof quote.imageUrl !== "string" || quote.imageUrl.trim() === "")) {
//           throw new Error("A valid image URL is required for mini quotes");
//         }

//         const newQuote = {
//           text: quote.text,
//           author: quote.author,
//           ...(quote.type === "mini"
//             ? {
//                 imageUrl: quote.imageUrl,
//                 categories: Array.isArray(quote.categories)
//                   ? quote.categories.filter((cat) => validCategories.includes(cat))
//                   : [],
//               }
//             : {}),
//         };

//         const endpoint = quote.type === "mini" ? "/api/mini-quotes" : "/api/hero-quotes";
//         const res = await fetch(endpoint, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(newQuote),
//         });
//         if (!res.ok) {
//           const errorData = await res.json();
//           console.error("Approval error response:", errorData);
//           throw new Error(errorData.error || "Failed to approve quote");
//         }
//       }

//       // Delete from pending quotes
//       const resDelete = await fetch("/api/pending-quotes", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });
//       if (!resDelete.ok) {
//         const errorData = await resDelete.json();
//         throw new Error(errorData.error || "Failed to delete pending quote");
//       }

//       // Update state
//       setPendingQuotes((prev) => prev.filter((q) => q.id !== id));
//       if (mappedAction === "approve") {
//         const endpoint = quote.type === "mini" ? "/api/mini-quotes" : "/api/hero-quotes";
//         const resQuotes = await fetch(endpoint);
//         if (resQuotes.ok) {
//           const updatedQuotes = await resQuotes.json();
//           if (quote.type === "mini") {
//             setMiniQuotes(updatedQuotes);
//           } else {
//             setHeroQuotes(updatedQuotes);
//           }
//         }
//       }

//       setMessage(`Quote ${mappedAction === "approve" ? "approved and added" : "rejected"} successfully!`);
//       setMessageType("success");
//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       console.error(`Error ${action}ing quote:`, err);
//       setMessage(`Error: ${err.message}`);
//       setMessageType("error");
//     }
//   };

//   return (
//     <div className="space-y-10">
//       {/* Message Display */}
//       {message && (
//         <div
//           className={`p-3 rounded-lg text-center shadow-md ${
//             messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
//         <StatCard icon={<FaUsers />} title="Total Users" value={totalUsers} color="from-blue-500 to-blue-600" />
//         <StatCard icon={<FaFileAlt />} title="Articles" value={totalArticles} color="from-green-500 to-green-600" />
//         <StatCard icon={<FaRegClock />} title="Quotes" value={totalQuotes} color="from-yellow-500 to-yellow-600" />
//         <StatCard icon={<FaComments />} title="Comments" value="3" color="from-purple-500 to-purple-600" />
//         <StatCard icon={<FaEye />} title="Page Views" value="15K" color="from-pink-500 to-pink-600" />
//         <StatCard icon={<FaDollarSign />} title="Revenue" value="$2.3K" color="from-indigo-500 to-indigo-600" />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
//         <ChartCard title="Users Growth">
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={users.map((u, i) => ({ index: i + 1, users: i + 1 }))}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="index" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         <ChartCard title="Articles per Category">
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={articlesCategoryData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="category" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="count" fill="#22c55e" radius={[6, 6, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         <ChartCard title="User Roles">
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie data={userRoles} dataKey="value" nameKey="role" cx="50%" cy="50%" outerRadius={90} label>
//                 {userRoles.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         <ChartCard title="Quotes Breakdown">
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie data={quotesBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
//                 {quotesBreakdown.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </ChartCard>
//       </div>

//       {/* Recent Activity */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <TableCard title="Latest Users" headers={["Name", "Email", "Role"]}>
//           {users.slice(-5).map((u, i) => (
//             <tr key={i} className="border-b hover:bg-gray-50">
//               <td className="py-2">{u.name}</td>
//               <td>{u.email}</td>
//               <td>{u.role}</td>
//             </tr>
//           ))}
//         </TableCard>

//         <TableCard title="Latest Articles" headers={["Title", "Author"]}>
//           {articles.slice(-5).map((a, i) => (
//             <tr key={i} className="border-b hover:bg-gray-50">
//               <td className="py-2">{a.title}</td>
//               <td>{a.author}</td>
//             </tr>
//           ))}
//         </TableCard>
//       </div>

//       {/* Pending Quotes Section */}
//       <div className="bg-white p-6 rounded-xl shadow-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="font-semibold text-lg">Pending Quotes for Approval</h2>
//           <button
//             onClick={async () => {
//               try {
//                 const res = await fetch("/api/get-pending-quotes");
//                 if (!res.ok) throw new Error("Failed to fetch pending quotes");
//                 setPendingQuotes(await res.json());
//               } catch (err) {
//                 console.error("Error refreshing quotes:", err);
//                 setMessage("Error refreshing quotes.");
//                 setMessageType("error");
//               }
//             }}
//             className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-sm"
//           >
//             Refresh
//           </button>
//         </div>

//         {pendingQuotes.length === 0 ? (
//           <p className="text-gray-500">No quotes awaiting approval.</p>
//         ) : (
//           <ul className="space-y-4">
//             {pendingQuotes.map((quote) => (
//               <li key={quote.id} className="border p-4 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition">
//                 <p className="text-lg font-medium">“{quote.text}”</p>
//                 <p className="text-gray-600">— {quote.author}</p>
//                 <p className="text-sm text-gray-500">Type: {quote.type === "mini" ? "Mini Quote" : "Hero Quote"}</p>
//                 <p className="text-sm text-gray-500">Image URL: {quote.imageUrl || "None"}</p>
//                 <p className="text-sm text-gray-500">Categories: {(quote.categories || []).join(", ") || "None"}</p>
//                 <div className="flex gap-2 mt-2">
//                   <button
//                     onClick={() => handleApproval(quote.id, "accept")}
//                     className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition shadow-sm"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleApproval(quote.id, "reject")}
//                     className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-sm"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// /* Reusable Components */
// function StatCard({ icon, title, value, color }) {
//   return (
//     <div className="bg-white shadow-md rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition">
//       <div className={`p-3 text-white rounded-full bg-gradient-to-r ${color} shadow-md text-lg`}>
//         {icon}
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">{title}</p>
//         <h3 className="text-2xl font-bold">{value}</h3>
//       </div>
//     </div>
//   );
// }

// function ChartCard({ title, children }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
//       <h2 className="font-semibold mb-4 border-l-4 border-blue-500 pl-2">{title}</h2>
//       {children}
//     </div>
//   );
// }

// function TableCard({ title, headers, children }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
//       <h2 className="font-semibold mb-4 border-l-4 border-green-500 pl-2">{title}</h2>
//       <table className="w-full text-left text-sm">
//         <thead>
//           <tr className="border-b bg-gray-50">
//             {headers.map((h, i) => (
//               <th key={i} className="py-2 font-medium text-gray-600">
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>{children}</tbody>
//       </table>
//     </div>
//   );
// }







"use client";

import { useEffect, useState } from "react";
import {
  FaUsers,
  FaFileAlt,
  FaRegClock,
  FaComments,
  FaEye,
  FaDollarSign,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Define categories to match UserQuoteForm.js and content/page.js
const validCategories = [
  "Faith",
  "Motivation",
  "Wisdom",
  "Patience",
  "Guidance",
  "Encouragement",
  "Trust",
  "Self-Discipline",
  "Contentment",
  "Success",
  "Happiness",
];

export default function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [miniQuotes, setMiniQuotes] = useState([]);
  const [heroQuotes, setHeroQuotes] = useState([]);
  const [pendingQuotes, setPendingQuotes] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resUsers, resArticles, resMiniQuotes, resHeroQuotes, resPending] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/articles"),
          fetch("/api/mini-quotes"),
          fetch("/api/hero-quotes"),
          fetch("/api/get-pending-quotes"),
        ]);
        if (!resUsers.ok || !resArticles.ok || !resMiniQuotes.ok || !resHeroQuotes.ok || !resPending.ok) {
          throw new Error("Failed to fetch data");
        }
        const [usersData, articlesData, miniQuotesData, heroQuotesData, pendingQuotesData] = await Promise.all([
          resUsers.json(),
          resArticles.json(),
          resMiniQuotes.json(),
          resHeroQuotes.json(),
          resPending.json(),
        ]);
        setUsers(usersData);
        setArticles(articlesData);
        setMiniQuotes(miniQuotesData);
        setHeroQuotes(heroQuotesData);
        setPendingQuotes(pendingQuotesData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setMessage("Failed to load dashboard data.");
        setMessageType("error");
      }
    };
    fetchData();
  }, []);

  const totalUsers = users.length;
  const totalArticles = articles.length;
  const totalQuotes = miniQuotes.length + heroQuotes.length;

  // User roles breakdown
  const roleCounts = users.reduce((acc, u) => {
    const role = u.role?.trim().toLowerCase() || "unknown";
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});
  const userRoles = Object.keys(roleCounts).map((role) => ({
    role: role.charAt(0).toUpperCase() + role.slice(1),
    value: roleCounts[role],
  }));

  // Quotes breakdown (Mini vs Hero)
  const quotesBreakdown = [
    { name: "Mini Quotes", value: miniQuotes.length },
    { name: "Hero Quotes", value: heroQuotes.length },
  ];

  const COLORS = ["#2563eb", "#22c55e", "#f59e0b", "#ef4444", "#10b981"];

  const handleApproval = async (id, action) => {
    try {
      const mappedAction = action === "accept" ? "approve" : "reject";
      const quote = pendingQuotes.find((q) => q.id === id);
      if (!quote) {
        throw new Error("Pending quote not found");
      }

      if (mappedAction === "approve") {
        // Validate imageUrl for mini quotes
        if (quote.type === "mini" && (!quote.imageUrl || typeof quote.imageUrl !== "string" || quote.imageUrl.trim() === "")) {
          throw new Error("A valid image URL is required for mini quotes");
        }

        const newQuote = {
          text: quote.text,
          author: quote.author,
          ...(quote.type === "mini"
            ? {
              imageUrl: quote.imageUrl,
              categories: Array.isArray(quote.categories)
                ? quote.categories.filter((cat) => validCategories.includes(cat))
                : [],
            }
            : {}),
        };

        const endpoint = quote.type === "mini" ? "/api/mini-quotes" : "/api/hero-quotes";
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

      // Update state
      setPendingQuotes((prev) => prev.filter((q) => q.id !== id));
      if (mappedAction === "approve") {
        const endpoint = quote.type === "mini" ? "/api/mini-quotes" : "/api/hero-quotes";
        const resQuotes = await fetch(endpoint);
        if (resQuotes.ok) {
          const updatedQuotes = await resQuotes.json();
          if (quote.type === "mini") {
            setMiniQuotes(updatedQuotes);
          } else {
            setHeroQuotes(updatedQuotes);
          }
        }
      }

      setMessage(`Quote ${mappedAction === "approve" ? "approved and added" : "rejected"} successfully!`);
      setMessageType("success");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(`Error ${action}ing quote:`, err);
      setMessage(`Error: ${err.message}`);
      setMessageType("error");
    }
  };

  return (
    <div className="space-y-10">
      {/* Message Display */}
      {message && (
        <div
          className={`p-3 rounded-lg text-center shadow-md ${messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
        >
          {message}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard icon={<FaUsers />} title="Total Users" value={totalUsers} color="from-blue-500 to-blue-600" />
        <StatCard icon={<FaFileAlt />} title="Articles" value={totalArticles} color="from-green-500 to-green-600" />
        <StatCard icon={<FaRegClock />} title="Quotes" value={totalQuotes} color="from-yellow-500 to-yellow-600" />
        <StatCard icon={<FaComments />} title="Comments" value="3" color="from-purple-500 to-purple-600" />
        <StatCard icon={<FaEye />} title="Page Views" value="15K" color="from-pink-500 to-pink-600" />
        <StatCard icon={<FaDollarSign />} title="Revenue" value="$2.3K" color="from-indigo-500 to-indigo-600" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">


        <ChartCard title="User Roles">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={userRoles} dataKey="value" nameKey="role" cx="50%" cy="50%" outerRadius={90} label>
                {userRoles.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Users Growth">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={users.map((u, i) => ({ index: i + 1, users: i + 1 }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="index" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Quotes Breakdown">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={quotesBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {quotesBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TableCard title="Latest Users" headers={["Name", "Email", "Role"]}>
          {users.slice(-5).map((u, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="py-2">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </TableCard>

        <TableCard title="Latest Articles" headers={["Title", "Author"]}>
          {articles.slice(-5).map((a, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="py-2">{a.title}</td>
              <td>{a.author}</td>
            </tr>
          ))}
        </TableCard>
      </div>

      {/* Pending Quotes Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Pending Quotes for Approval</h2>
          <button
            onClick={async () => {
              try {
                const res = await fetch("/api/get-pending-quotes");
                if (!res.ok) throw new Error("Failed to fetch pending quotes");
                setPendingQuotes(await res.json());
              } catch (err) {
                console.error("Error refreshing quotes:", err);
                setMessage("Error refreshing quotes.");
                setMessageType("error");
              }
            }}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-sm"
          >
            Refresh
          </button>
        </div>

        {pendingQuotes.length === 0 ? (
          <p className="text-gray-500">No quotes awaiting approval.</p>
        ) : (
          <ul className="space-y-4">
            {pendingQuotes.map((quote) => (
              <li key={quote.id} className="border p-4 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition">
                <p className="text-lg font-medium">“{quote.text}”</p>
                <p className="text-gray-600">— {quote.author}</p>
                <p className="text-sm text-gray-500">Type: {quote.type === "mini" ? "Mini Quote" : "Hero Quote"}</p>
                <p className="text-sm text-gray-500">Image URL: {quote.imageUrl || "None"}</p>
                <p className="text-sm text-gray-500">Categories: {(quote.categories || []).join(", ") || "None"}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleApproval(quote.id, "accept")}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition shadow-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(quote.id, "reject")}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-sm"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* Reusable Components */
function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition">
      <div className={`p-3 text-white rounded-full bg-gradient-to-r ${color} shadow-md text-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <h2 className="font-semibold mb-4 border-l-4 border-blue-500 pl-2">{title}</h2>
      {children}
    </div>
  );
}

function TableCard({ title, headers, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <h2 className="font-semibold mb-4 border-l-4 border-green-500 pl-2">{title}</h2>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b bg-gray-50">
            {headers.map((h, i) => (
              <th key={i} className="py-2 font-medium text-gray-600">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
