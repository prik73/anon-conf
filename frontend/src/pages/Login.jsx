import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Loader2, 
  MessageCircle,
  Sparkles
} from "lucide-react";

const API = axios.create({ baseURL: "http://localhost:5000/api/v1" });
const setToken = (token) => localStorage.setItem("Authorization", token);


const QuirkyText = ({ text, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 0.5, y: 0 }}
    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
    className={className}
  >
    {text}
  </motion.div>
);

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await API.post("/auth/login", formData);
      setToken(res.data.token);
      navigate("/home");
    } catch (err) {
      setError("Your secret identity wasn't recognized...");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-purple-900 via-gray-900 to-black">
      {/* Quirky background texts */}
      <QuirkyText 
        text="Secrets whispered..." 
        className="absolute top-20 left-10 text-purple-300/30 text-2xl font-bold rotate-[-15deg]" 
      />
      <QuirkyText 
        text="Stories untold..." 
        className="absolute bottom-20 right-10 text-purple-300/30 text-2xl font-bold rotate-[15deg]" 
      />
      <QuirkyText 
        text="Confess..." 
        className="absolute top-40 right-20 text-purple-300/30 text-3xl font-bold" 
      />
      <QuirkyText 
        text="Share anonymously" 
        className="absolute bottom-40 left-20 text-purple-300/30 text-xl font-bold rotate-[-5deg]" 
      />

      {/* Floating bubbles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2], 
              scale: [1, 1.2, 1],
              x: [Math.random() * 100, Math.random() * -100],
              y: [Math.random() * 100, Math.random() * -100],
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              delay: i * 0.5 
            }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <MessageCircle size={20} className="text-purple-500/20" />
          </motion.div>
        ))}
      </div>

      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 backdrop-blur-sm bg-white/10 rounded-lg shadow-2xl"
      >
        <style>
          {`
            input:-webkit-autofill,
            input:-webkit-autofill:hover, 
            input:-webkit-autofill:focus {
              -webkit-box-shadow: 0 0 0 30px rgba(168, 85, 247, 0.1) inset !important;
              -webkit-text-fill-color: rgb(243, 232, 255) !important;
              caret-color: rgb(243, 232, 255) !important;
              transition: background-color 5000s ease-in-out 0s;
            }
          `}
        </style>

        <div className="mb-8 text-center">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="inline-block"
          >
            <Sparkles className="text-purple-300 w-8 h-8 mb-2 mx-auto" />
          </motion.div>
          <h2 className="text-3xl font-bold text-center mb-2 text-purple-300">
            Secret Confessions
          </h2>
          <p className="text-purple-200/60">Share your secrets, find your freedom</p>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-center mb-4"
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <User className="absolute left-3 top-3 text-purple-300" size={18} />
            <input
              type="text"
              placeholder="Secret Identity"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full p-2 pl-10 bg-white/5 border border-purple-500/30 rounded-lg 
                       text-purple-100 placeholder-purple-300/50 outline-none focus:border-purple-400
                       transition-colors"
            />
          </motion.div>

          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Lock className="absolute left-3 top-3 text-purple-300" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Secret Code"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 pl-10 bg-white/5 border border-purple-500/30 rounded-lg 
                       text-purple-100 placeholder-purple-300/50 outline-none focus:border-purple-400
                       transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-purple-300 hover:text-purple-100 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-2 bg-purple-600/80 text-white rounded-lg hover:bg-purple-500/80 
                     transition-colors disabled:bg-purple-400/50 disabled:cursor-not-allowed
                     backdrop-blur-sm"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin mx-auto" size={20} />
            ) : (
              "Enter the Confession Chamber"
            )}
          </motion.button>
        </form>

        {/* Signup Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-purple-200/60">
            Need a secret identity?{" "}
            <Link 
              to="/signup"
              className="text-purple-300 hover:text-purple-100 transition-colors
                         relative group"
            >
              Create one here
              <motion.span
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-300
                         group-hover:w-full transition-all duration-300"
              />
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;