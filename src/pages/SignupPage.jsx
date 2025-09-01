import { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignupPage() {
  // local states for form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            navigate('/dashboard');
        }}, [navigate]);
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(error.message);

     try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) {
        localStorage.setItem('userId', JSON.stringify(user.uid));
      toast.success("🎉 Account created successfully!");
      navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignup = async () => {
    try {
      const user = await signInWithPopup(auth, googleProvider);
      if (user) {
        localStorage.setItem('userId', JSON.stringify(user.uid));
      toast.success("🎉 Signed up with Google!");
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
          Create Account
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-2 text-sm">{error}</p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Signup/Login */}
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Logo"
            className="w-5 h-5"
          />
          Sign up with Google
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
