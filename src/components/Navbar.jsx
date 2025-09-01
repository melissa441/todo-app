// components/Navbar.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onLogout }) {
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center relative">
      {/* App Name */}
      <h1 className="text-2xl font-bold text-pink-600">Task Manager</h1>

      {/* Right Section */}
      <div className="flex items-center gap-4 relative">
        <span className="text-pink-500">Hello, {user.name}</span>
        <div className="relative">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-pink-500 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-pink-50 text-pink-600"
                onClick={() => alert("Go to Profile")}
              >
                Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-pink-50 text-pink-600"
                onClick={() => alert("Go to Settings")}
              >
                Settings
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-pink-50 text-red-500"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
