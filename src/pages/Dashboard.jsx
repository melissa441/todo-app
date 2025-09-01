
import React from "react";
import Navbar from "/src/components/Navbar";
import TaskBoard from "/src/components/TaskBoard";
import { AuthProvider } from "/src/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";


function Dashboard() {
    const navigate = useNavigate();
const handleLogout = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    toast.success("Logged out!");
    localStorage.removeItem("userId");
    navigate("/login");
})
    .catch((error) => {
      // An error happened
      console.error("Logout error:", error.message);
    });
};


  return (
    <AuthProvider>
      <Navbar onLogout={handleLogout} />
      <TaskBoard />
      <Footer/>
    </AuthProvider>
  );
}

export default Dashboard;
