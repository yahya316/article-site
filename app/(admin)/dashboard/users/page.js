"use client";
import { useEffect, useState } from "react";
import { FaSearch, FaUserShield, FaBan, FaTrash, FaCheckCircle, FaPlus, FaEdit } from "react-icons/fa";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  // Handle input change
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Add / Edit user
  const handleSave = async (e) => {
    e.preventDefault();
    if (editUser) {
      await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id: editUser.id }),
      });
    } else {
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }
    setShowModal(false);
    setEditUser(null);
    setFormData({ name: "", email: "", role: "User", status: "Active" });
    fetchUsers();
  };

  // Delete user
  const deleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchUsers();
  };

  // Toggle ban/unban
  const toggleBan = (user) => {
    handleSaveUser({ ...user, status: user.status === "Active" ? "Banned" : "Active" });
  };

  const promoteToAdmin = (user) => {
    handleSaveUser({ ...user, role: "Admin" });
  };

  const handleSaveUser = async (user) => {
    await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    fetchUsers();
  };

  // Open modal
  const openModal = (user = null) => {
    setEditUser(user);
    setFormData(user || { name: "", email: "", role: "User", status: "Active" });
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users Management</h1>

      <div className="flex gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-64"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All</option>
          <option value="Admin">Admins</option>
          <option value="User">Users</option>
          <option value="Active">Active</option>
          <option value="Banned">Banned</option>
        </select>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Add User
        </button>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(u => filter === "all" ? true : u.role === filter || u.status === filter)
                .filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
                .map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">{user.status}</td>
                  <td className="px-4 py-2 flex gap-3">
                    {user.role !== "Admin" && (
                      <button onClick={() => promoteToAdmin(user)} className="text-blue-600 hover:text-blue-800" title="Promote to Admin"><FaUserShield /></button>
                    )}
                    <button
                      onClick={() => toggleBan(user)}
                      className={`${user.status === "Banned" ? "text-green-600" : "text-yellow-600"} hover:text-opacity-80`}
                      title={user.status === "Banned" ? "Unban User" : "Ban User"}
                    >
                      {user.status === "Banned" ? <FaCheckCircle /> : <FaBan />}
                    </button>
                    <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:text-red-800" title="Delete User"><FaTrash /></button>
                    <button onClick={() => openModal(user)} className="text-yellow-600 hover:text-yellow-800" title="Edit User"><FaEdit /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">{editUser ? "Edit User" : "Add New User"}</h2>
            <form onSubmit={handleSave} className="flex flex-col gap-3">
              <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border p-2 rounded" required />
              <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} className="border p-2 rounded" required />
              <select name="role" value={formData.role} onChange={handleChange} className="border p-2 rounded">
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
              <select name="status" value={formData.status} onChange={handleChange} className="border p-2 rounded">
                <option value="Active">Active</option>
                <option value="Banned">Banned</option>
              </select>
              <div className="flex justify-end gap-2 mt-3">
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
