// src/components/Button.jsx
import { Link } from "react-router-dom";

// Reusable Button Component
export default function Button({ to, children, variant = "primary" }) {
  // Tailwind styles for different button types
  const baseStyles =
    "px-6 py-3 rounded-lg font-medium transition duration-200";
  const variants = {
    primary: "bg-pink-500 text-white hover:bg-pink-600",
    outline: "border border-pink-500 text-pink-600 hover:bg-pink-50",
  };

  return (
    <Link to={to} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </Link>
  );
}
