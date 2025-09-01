import { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  useEffect(() => {
          if (userId) {
            // Add this temporarily to see what user object looks like
console.log("User object:", userId);
console.log("User ID:", userId?.id);
              navigate('/dashboard');
          }
      }, [userId]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const {user} = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
            localStorage.setItem('userId', JSON.stringify(user.uid));
      toast.success("👋 Welcome back!");
      navigate("/dashboard");
    }
    } catch (err) {
      console.log(err)
  if (err.code === "auth/wrong-password") {
    toast.error("❌ Wrong password. Try again.");
  } else if (err.code === "auth/user-not-found") {
    toast.error("❌ No account found with this email.");
  } else if (err.code === "auth/invalid-email") {
    toast.error("❌ Invalid email format.");
  } else {
    toast.error("⚠️ " + err);
  }
} finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithPopup(auth, googleProvider);
      if (user) {
            localStorage.setItem('userId', JSON.stringify(user.uid));
      toast.success("🎉 Logged in with Google!");
      navigate("/dashboard");
      }
    } catch (err) {
      toast.error("⚠️ " + err.message);
    }
  };
   return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 bg-pink-50 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
          Welcome Back!
        </h2>
        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-2 text-sm">{error}</p>
        )}


        {/* Email/Password Login */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
  type="email"
  placeholder="Email"
  autoComplete="email"
  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

<input
  type="password"
  placeholder="Password"
  autoComplete="current-password"
  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Logo"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-pink-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}