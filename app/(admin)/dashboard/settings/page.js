"use client";

import { useState } from "react";
import { FaLock, FaBell, FaTrash, FaSave } from "react-icons/fa";

export default function SettingsPage() {
  const [searchEmail, setSearchEmail] = useState("");
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: false,
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Search user by email
  const handleSearch = async () => {
    setMessage("");
    setUser(null);
    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      notifications: false,
    });

    if (!searchEmail) {
      setMessage("Please enter an email to search.");
      setMessageType("error");
      return;
    }

    try {
      const res = await fetch("/api/settings");
      if (!res.ok) throw new Error("Failed to fetch users");
      const users = await res.json();
      const foundUser = users.find(u => u.email.toLowerCase() === searchEmail.toLowerCase());

      if (!foundUser) {
        setMessage("User not found.");
        setMessageType("error");
        return;
      }

      setUser(foundUser);
      setForm(prev => ({ ...prev, notifications: foundUser.notifications || false }));
    } catch (err) {
      console.error(err);
      setMessage("Error fetching user.");
      setMessageType("error");
    }
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  // Password change
  const handlePasswordChange = async () => {
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setMessage("Please fill in all password fields.");
      setMessageType("error");
      return;
    }
    if (form.currentPassword !== user.password) {
      setMessage("Current password is incorrect.");
      setMessageType("error");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setMessage("New passwords do not match.");
      setMessageType("error");
      return;
    }

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          updates: { password: form.newPassword },
        }),
      });
      if (!res.ok) throw new Error("Failed to update password");

      setUser(prev => ({ ...prev, password: form.newPassword }));
      setForm(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
      setMessage("Password updated successfully.");
      setMessageType("success");
    } catch (err) {
      console.error(err);
      setMessage("Error updating password.");
      setMessageType("error");
    }
  };

  // Notification toggle
  const handleNotificationToggle = async () => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          updates: { notifications: form.notifications },
        }),
      });
      if (!res.ok) throw new Error("Failed to update notifications");

      setUser(prev => ({ ...prev, notifications: form.notifications }));
      setMessage("Notification settings updated.");
      setMessageType("success");
    } catch (err) {
      console.error(err);
      setMessage("Error updating notifications.");
      setMessageType("error");
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete this account?")) return;

    try {
      const res = await fetch("/api/settings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      if (!res.ok) throw new Error("Failed to delete account");

      setUser(null);
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "", notifications: false });
      setSearchEmail("");
      setMessage("Account deleted successfully.");
      setMessageType("success");
    } catch (err) {
      console.error(err);
      setMessage("Error deleting account.");
      setMessageType("error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Search User */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6 flex flex-col md:flex-row gap-4 items-center">
        <input
          type="email"
          placeholder="Enter user email to do settings"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="w-full md:flex-1 border rounded-lg px-4 py-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {message && (
        <p className={`text-center mb-4 ${messageType === "error" ? "text-red-600" : "text-green-600"}`}>
          {message}
        </p>
      )}

      {user && (
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">{user.name} ({user.email})</h2>

          {/* Password Change */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Change Password</h3>
            <div className="flex flex-col gap-2">
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={form.currentPassword}
                onChange={handleChange}
                className="border rounded-lg p-2"
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={form.newPassword}
                onChange={handleChange}
                className="border rounded-lg p-2"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="border rounded-lg p-2"
              />
              <button
                onClick={handlePasswordChange}
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
              >
                <FaLock /> Update Password
              </button>
            </div>
          </div>

          {/* Notification Toggle */}
          <div className="mb-6 flex items-center gap-3">
            <FaBell size={20} />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="notifications"
                checked={form.notifications}
                onChange={handleChange}
                onBlur={handleNotificationToggle} // save when toggle changes
              />
              Notifications
            </label>
          </div>

          {/* Delete Account */}
          <div className="flex justify-end">
            <button
              onClick={handleDeleteAccount}
              className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600"
            >
              <FaTrash /> Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
