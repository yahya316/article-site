// "use client";
// import { useState } from "react";
// import {
//     FaUserCircle,
//     FaEnvelope,
//     FaPhoneAlt,
//     FaMapMarkerAlt,
//     FaEdit,
//     FaSave,
//     FaLock,
// } from "react-icons/fa";

// export default function ProfilePage() {
//     const [editMode, setEditMode] = useState(false);
//     const [searchEmail, setSearchEmail] = useState("");
//     const [user, setUser] = useState(null);
//     const [form, setForm] = useState(null);
//     const [message, setMessage] = useState("");

//     const handleSearch = async () => {
//     setMessage("");
//     setUser(null);
//     setForm(null);

//     if (!searchEmail) {
//         setMessage("Please enter an email to search.");
//         return;
//     }

//     try {
//         // Send email as query param to your profile API route
//         const res = await fetch(`/api/profile?email=${encodeURIComponent(searchEmail)}`);
//         const data = await res.json();

//         if (!res.ok) {
//             setMessage(data.error || "User not found.");
//             return;
//         }

//         setUser(data);
//         setForm(data);
//     } catch (err) {
//         console.error(err);
//         setMessage("Error fetching user.");
//     }
// };


//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSave = async () => {
//         try {
//             const res = await fetch("/api/profile", {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(form),
//             });

//             if (!res.ok) throw new Error("Failed to save profile");

//             const updatedUser = await res.json();
//             setUser(updatedUser);
//             setForm(updatedUser);
//             setEditMode(false);
//             setMessage("Profile updated successfully!");
//         } catch (err) {
//             console.error(err);
//             setMessage(err.message || "Error saving profile.");
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-4">
//             {/* Search */}
//             <div className="bg-white p-6 rounded-2xl shadow-md mb-6 flex flex-col md:flex-row gap-4 items-center">
//                 <input
//                     type="email"
//                     placeholder="Enter your email to search"
//                     value={searchEmail}
//                     onChange={(e) => setSearchEmail(e.target.value)}
//                     className="w-full md:flex-1 border rounded-lg px-4 py-2"
//                 />
//                 <button
//                     onClick={handleSearch}
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
//                 >
//                     Search
//                 </button>
//             </div>

//             {message && <p className="text-center text-red-600 mb-4">{message}</p>}

//             {!user && !message && <p className="text-center text-gray-500">Search your profile to see details.</p>}

//             {user && (
//                 <>
//                     {/* Profile Card */}
//                     <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center mb-6">
//                         <FaUserCircle size={100} className="text-gray-400" />
//                         <h2 className="text-2xl font-bold mt-3">{user.name}</h2>
//                         <p className="text-gray-500">{user.role}</p>
//                         <p className="text-gray-600 mt-2">{user.bio}</p>

//                         <div className="flex gap-6 mt-4 text-gray-600 flex-wrap justify-center">
//                             <p className="flex items-center gap-2">
//                                 <FaEnvelope /> {user.email}
//                             </p>
//                             <p className="flex items-center gap-2">
//                                 <FaPhoneAlt /> {user.phone}
//                             </p>
//                             <p className="flex items-center gap-2">
//                                 <FaMapMarkerAlt /> {user.location}
//                             </p>
//                         </div>
//                     </div>

//                     {/* Edit Form */}
//                     <div className="bg-white mt-6 rounded-2xl shadow-md p-6">
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="text-xl font-semibold">Edit Profile</h3>
//                             {!editMode ? (
//                                 <button
//                                     onClick={() => setEditMode(true)}
//                                     className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//                                 >
//                                     <FaEdit /> Edit
//                                 </button>
//                             ) : (
//                                 <button
//                                     onClick={handleSave}
//                                     className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
//                                 >
//                                     <FaSave /> Save
//                                 </button>
//                             )}
//                         </div>

//                         <form className="space-y-4">
//                             <div>
//                                 <label className="block text-gray-700">Full Name</label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={form.name}
//                                     onChange={handleChange}
//                                     disabled={!editMode}
//                                     className="w-full border rounded-lg p-2 mt-1 disabled:bg-gray-100"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-gray-700">Email Address</label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={form.email}
//                                     disabled
//                                     className="w-full border rounded-lg p-2 mt-1 disabled:bg-gray-100"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-gray-700">Phone</label>
//                                 <input
//                                     type="text"
//                                     name="phone"
//                                     value={form.phone}
//                                     onChange={handleChange}
//                                     disabled={!editMode}
//                                     className="w-full border rounded-lg p-2 mt-1 disabled:bg-gray-100"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-gray-700">Location</label>
//                                 <input
//                                     type="text"
//                                     name="location"
//                                     value={form.location}
//                                     onChange={handleChange}
//                                     disabled={!editMode}
//                                     className="w-full border rounded-lg p-2 mt-1 disabled:bg-gray-100"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-gray-700">Bio</label>
//                                 <textarea
//                                     name="bio"
//                                     value={form.bio}
//                                     onChange={handleChange}
//                                     disabled={!editMode}
//                                     className="w-full border rounded-lg p-2 mt-1 disabled:bg-gray-100"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-gray-700">Change Password</label>
//                                 <div className="flex gap-3">
//                                     <input
//                                         type="password"
//                                         name="password"
//                                         placeholder="New password"
//                                         value={form.password || ""}
//                                         onChange={handleChange}
//                                         disabled={!editMode}
//                                         className="w-full border rounded-lg p-2 mt-1 disabled:bg-gray-100"
//                                     />
//                                     <button
//                                         type="button"
//                                         disabled={!editMode}
//                                         onClick={handleSave}
//                                         className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition disabled:opacity-50"
//                                     >
//                                         <FaLock /> Update
//                                     </button>
//                                 </div>
//                             </div>
//                         </form>
//                         {message && <p className="mt-2 text-green-600">{message}</p>}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }






















"use client";

import { useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaLock,
} from "react-icons/fa";

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [user, setUser] = useState(null);
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSearch = async () => {
    setMessage("");
    setMessageType("");
    setUser(null);
    setForm(null);

    if (!searchEmail) {
      setMessage("Please enter an email to search.");
      setMessageType("error");
      return;
    }

    try {
      const res = await fetch(`/api/profile?email=${encodeURIComponent(searchEmail)}`);
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "User not found.");
        setMessageType("error");
        return;
      }

      setUser(data);
      setForm(data);
    } catch (err) {
      console.error("Error fetching user:", err);
      setMessage("Error fetching user.");
      setMessageType("error");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!form.name || !form.email || !form.phone || !form.location || !form.bio || !form.role || !form.status) {
        setMessage("All fields except password are required.");
        setMessageType("error");
        return;
      }

      // Validate role and status enums
      if (!["Admin", "User"].includes(form.role)) {
        setMessage("Role must be 'Admin' or 'User'.");
        setMessageType("error");
        return;
      }
      if (!["Active", "Banned"].includes(form.status)) {
        setMessage("Status must be 'Active' or 'Banned'.");
        setMessageType("error");
        return;
      }

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save profile");
      }

      const updatedUser = await res.json();
      setUser(updatedUser);
      setForm(updatedUser);
      setEditMode(false);
      setMessage("Profile updated successfully!");
      setMessageType("success");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error saving profile:", err);
      setMessage(err.message || "Error saving profile.");
      setMessageType("error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Search */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6 flex flex-col md:flex-row gap-4 items-center">
        <input
          type="email"
          placeholder="Enter your email to search"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="w-full md:flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>

      {message && (
        <p
          className={`text-center mb-4 ${
            messageType === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      {!user && !message && (
        <p className="text-center text-gray-500">Search your profile to see details.</p>
      )}

      {user && (
        <>
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center mb-6">
            <FaUserCircle size={100} className="text-gray-400" />
            <h2 className="text-2xl font-bold mt-3">{user.name}</h2>
            <p className="text-gray-500">{user.role} ({user.status})</p>
            <p className="text-gray-600 mt-2">{user.bio}</p>
            <div className="flex gap-6 mt-4 text-gray-600 flex-wrap justify-center">
              <p className="flex items-center gap-2">
                <FaEnvelope /> {user.email}
              </p>
              <p className="flex items-center gap-2">
                <FaPhoneAlt /> {user.phone}
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt /> {user.location}
              </p>
            </div>
          </div>

          {/* Edit Form */}
          <div className="bg-white mt-6 rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Profile</h3>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <FaEdit /> Edit
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <FaSave /> Save
                </button>
              )}
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full border rounded-lg p-2 mt-1 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email || ""}
                  disabled
                  className="w-full border rounded-lg p-2 mt-1 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full border rounded-lg p-2 mt-1 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full border rounded-lg p-2 mt-1 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={form.bio || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full border rounded-lg p-2 mt-1 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Role</label>
                <select
                  name="role"
                  value={form.role || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full border rounded-lg p-2 mt-1 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700">Status</label>
                <select
                  name="status"
                  value={form.status || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full border rounded-lg p-2 mt-1 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Banned">Banned</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700">Notifications</label>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={form.notifications || false}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="mt-1 disabled:bg-gray-100"
                />
                <span className="ml-2 text-gray-700">Enable Notifications</span>
              </div>

              <div>
                <label className="block text-gray-700">Change Password</label>
                <div className="flex gap-3">
                  <input
                    type="password"
                    name="password"
                    placeholder="New password (optional)"
                    value={form.password || ""}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="w-full border rounded-lg p-2 mt-1 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    disabled={!editMode}
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <FaLock /> Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}