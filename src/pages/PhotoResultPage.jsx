import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Share2, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

const PhotoResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { image, employee } = location.state || {};

  if (!image) {
    return (
      <div className="min-h-screen bg-[#05051a] flex flex-col items-center justify-center space-y-6">
        <Sparkles className="w-16 h-16 text-yellow-500/20 animate-pulse" />
        <p className="text-yellow-500 font-black uppercase tracking-[0.3em] text-sm text-center px-4">No essence captured</p>
        <button
          onClick={() => navigate("/list")}
          className="text-white/40 hover:text-white transition-colors uppercase tracking-widest text-[10px] md:text-xs font-black"
        >
          Return to Registry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] md:h-[500px] bg-gradient-to-b from-yellow-500/5 to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col justify-center space-y-8 md:space-y-12 relative z-10">
        <div className="text-center space-y-4 md:space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 bg-yellow-500/10 text-yellow-500 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] border border-yellow-500/20 shadow-2xl"
          >
            <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" />
            Synthesis Complete
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic">Captured Essence</h1>
          <p className="text-sm md:text-lg text-purple-200/40 font-bold uppercase tracking-[0.2em]">Subject: {employee?.[0] || "Unknown Star"}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] border-4 md:border-8 border-white/5 group"
        >
          <img src={image} alt="Captured" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

          <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-[8px] md:text-[10px] font-black text-yellow-500 uppercase tracking-widest">Metadata Hash</p>
              <p className="text-[8px] md:text-[10px] text-white/40 font-mono tracking-tighter">0xSTN_{Math.random().toString(16).slice(2, 10).toUpperCase()}</p>
            </div>
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-500/40" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 md:gap-4 py-4 md:py-5 bg-white/5 border border-white/10 text-white rounded-xl md:rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-white/10 transition-all shadow-xl group text-xs md:text-sm">
            <Download className="w-4 h-4 md:w-5 h-5 text-yellow-500 group-hover:translate-y-1 transition-transform" />
            Preserve Image
          </button>
          <button className="flex items-center justify-center gap-3 md:gap-4 py-4 md:py-5 bg-white/5 border border-white/10 text-white rounded-xl md:rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-white/10 transition-all shadow-xl group text-xs md:text-sm">
            <Share2 className="w-4 h-4 md:w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform" />
            Distribute
          </button>
        </div>

        <button
          onClick={() => navigate("/list")}
          className="w-full py-5 md:py-6 bg-yellow-500 text-black rounded-[1.5rem] md:rounded-[2rem] font-black shadow-2xl shadow-yellow-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 md:gap-3 uppercase tracking-[0.2em] text-sm md:text-base"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          Back to Star Chart
        </button>

        <p className="text-center text-[8px] md:text-[10px] text-purple-200/20 font-black uppercase tracking-[0.4em]">
          Synthesized on {new Date().toLocaleDateString(undefined, { month: "long", day: "numeric" })}  Astral Cycle {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default PhotoResultPage;