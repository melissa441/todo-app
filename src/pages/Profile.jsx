import React, { useState } from "react";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { toast } from "react-toastify";

function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleUpdate = async () => {
    try {
      if (displayName !== user.displayName) {
        await updateProfile(user, { displayName });
      }
      if (email !== user.email) {
        await updateEmail(user, email);
      }
      toast.success("Profile updated!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-pink-500 p-6">
      <h1 className="text-3xl font-bold mb-4">Profile Settings</h1>
      <div className="bg-pink-50 p-6 rounded-lg shadow-md w-full max-w-md">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full p-2 rounded border border-pink-200 mb-4"
        />
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded border border-pink-200 mb-4"
        />
        <button
          onClick={handleUpdate}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
