import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Lock, User as UserIcon, Sparkles } from "lucide-react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/list" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/list");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[128px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-6 md:p-10 glass rounded-[2rem] md:rounded-[2.5rem] relative z-10 border border-yellow-500/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-tr from-yellow-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-yellow-500/30 glow-gold relative">
            <Sparkles className="absolute -top-3 -right-3 w-6 h-6 md:w-8 md:h-8 text-yellow-500 animate-pulse" />
            <LogIn className="w-10 h-10 md:w-12 md:h-12 text-yellow-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">Jotish Portal</h1>
          <p className="text-purple-200/50 font-medium text-sm md:text-base">Unlock the celestial records</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-yellow-500/80 uppercase tracking-widest ml-1">Universal Key</label>
            <div className="relative group">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300/40 group-focus-within:text-yellow-500 transition-colors" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/10 focus:outline-none focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/5 transition-all font-light"
                placeholder="Username"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-yellow-500/80 uppercase tracking-widest ml-1">Cosmic Secret</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300/40 group-focus-within:text-yellow-500 transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/10 focus:outline-none focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/5 transition-all font-light"
                placeholder=""
                required
              />
            </div>
          </div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm font-bold text-center">
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-black py-4 rounded-2xl shadow-xl shadow-yellow-500/10 hover:bg-yellow-400 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest"
          >
            Enter Sanctuary
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-purple-200/20 text-[10px] font-bold uppercase tracking-[0.3em]">Astral Infrastructure v2.0</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;