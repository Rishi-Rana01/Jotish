import { useRef, useState, useEffect } from "react";
import { Camera } from "react-camera-pro";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Camera as CameraIcon,
  MapPin,
  Briefcase,
  User,
  Calendar,
  Star,
  Sparkles,
  X
} from "lucide-react";

const DetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const camera = useRef(null);
  const [showCamera, setShowCamera] = useState(false);

  const employeeData = location.state?.employee;
  const employee = Array.isArray(employeeData) ? employeeData : [];

  useEffect(() => {
    if (employee.length === 0) {
      console.warn("No employee data received in DetailsPage state");
    }
  }, [employee]);

  if (employee.length === 0) {
    return (
      <div className="min-h-screen bg-[#05051a] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 border border-yellow-500/20">
          <Star className="w-10 h-10 text-yellow-500/40" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tighter">Star Record Lost</h2>
        <p className="text-purple-200/40 font-medium max-w-md mb-8">The celestial coordinates for this member are missing from the current session.</p>
        <button
          onClick={() => navigate("/list")}
          className="px-8 py-4 bg-yellow-500 text-black rounded-2xl font-black uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-500/10"
        >
          Return to Registry
        </button>
      </div>
    );
  }

  const safeVal = (val, fallback = "N/A") => val || fallback;

  const handleCapture = () => {
    try {
      const photo = camera.current.takePhoto();
      navigate("/photo-result", { state: { image: photo, employee } });
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  return (
    <div className="min-h-screen pb-10 md:pb-20">
      <div className="relative pt-8 md:pt-12 pb-32 md:pb-40 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-purple-900/40 via-indigo-900/40 to-transparent" />

        <div className="max-w-5xl mx-auto relative z-10">
          <button
            onClick={() => navigate("/list")}
            className="mb-8 md:mb-12 flex items-center gap-3 text-yellow-500/60 hover:text-yellow-500 transition-all group font-black uppercase tracking-widest text-[10px] md:text-xs"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 h-5 group-hover:-translate-x-2 transition-transform" />
            Back to Registry
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-10">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10 md:text-left text-center">
              <motion.div
                initial={{ rotate: -10, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-3xl md:rounded-[2.5rem] glass flex items-center justify-center text-4xl md:text-5xl font-black text-yellow-500 border-yellow-500/30 glow-gold"
              >
                {safeVal(employee[0], "S").charAt(0)}
              </motion.div>
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-3 md:mb-4 border border-yellow-500/20 shadow-xl"
                >
                  <Star className="w-2.5 h-2.5 md:w-3 h-3 fill-yellow-500" />
                  Celestial Member
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none mb-3 md:mb-4 uppercase">{safeVal(employee[0])}</h1>
                <p className="text-lg md:text-xl text-purple-200/40 flex items-center justify-center md:justify-start gap-2 md:gap-3 font-bold uppercase tracking-widest">
                  <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-yellow-500/40" />
                  {safeVal(employee[1])}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCamera(true)}
              className="flex items-center justify-center gap-3 md:gap-4 px-8 md:px-10 py-4 md:py-5 bg-yellow-500 text-black rounded-xl md:rounded-[1.5rem] font-black shadow-2xl shadow-yellow-500/20 hover:scale-[1.05] active:scale-[0.95] transition-all uppercase tracking-widest text-sm md:text-base"
            >
              <CameraIcon className="w-5 h-5 md:w-6 md:h-6" />
              Capture Essence
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 -mt-20 md:-mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 border-yellow-500/10 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-8 md:mb-10">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center border border-yellow-500/20">
                  <User className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Astral Coordinates</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-2 md:space-y-3">
                  <p className="text-[10px] font-black text-yellow-500/40 uppercase tracking-[0.3em]">Realm Frequency</p>
                  <p className="text-lg md:text-xl text-white font-bold flex items-center gap-3">
                    <MapPin className="w-4 h-4 md:w-5 h-5 text-yellow-500" />
                    {safeVal(employee[2])}
                  </p>
                </div>
                <div className="space-y-2 md:space-y-3">
                  <p className="text-[10px] font-black text-yellow-500/40 uppercase tracking-[0.3em]">Temporal Cycle</p>
                  <p className="text-lg md:text-xl text-white font-bold">{safeVal(employee[3])} Cycles</p>
                </div>
                <div className="space-y-2 md:space-y-3">
                  <p className="text-[10px] font-black text-yellow-500/40 uppercase tracking-[0.3em]">Manifestation Date</p>
                  <p className="text-lg md:text-xl text-white font-bold flex items-center gap-3">
                    <Calendar className="w-4 h-4 md:w-5 h-5 text-yellow-500" />
                    {safeVal(employee[4])}
                  </p>
                </div>
                <div className="space-y-2 md:space-y-3">
                  <p className="text-[10px] font-black text-yellow-500/40 uppercase tracking-[0.3em]">Celestial Merit</p>
                  <p className="text-3xl md:text-4xl font-black text-yellow-500 tracking-tighter">
                    <span className="text-lg md:text-xl mr-1 font-bold text-yellow-500/50">$</span>
                    {typeof employee[5] === "string" ? employee[5].replace("$", "") : safeVal(employee[5], "0")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 text-black shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <Sparkles className="w-16 h-16 md:w-20 md:h-20" />
              </div>
              <h4 className="font-black mb-3 md:mb-4 uppercase text-[10px] tracking-[0.3em] opacity-60">Astrologer Note</h4>
              <p className="text-base md:text-lg leading-relaxed font-bold">
                Member is currently aligned with the high-performance quadrant of the constellation.
              </p>
            </div>

            <div className="glass rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border-white/5 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                <Star className="text-yellow-500/20 w-6 h-6 md:w-8 md:h-8" />
              </div>
              <p className="text-purple-200/30 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em]">Prophecy Pending</p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCamera && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex flex-col"
          >
            <div className="p-4 md:p-8 flex justify-between items-center text-white absolute top-0 w-full z-10">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-500 rounded-lg md:rounded-xl flex items-center justify-center">
                  <CameraIcon className="w-4 h-4 md:w-5 h-5 text-black" />
                </div>
                <h3 className="font-black uppercase tracking-widest text-base md:text-lg">Image Synthesis</h3>
              </div>
              <button
                onClick={() => setShowCamera(false)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold transition-all border border-white/10"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center overflow-hidden p-4">
              <div className="w-full max-w-4xl aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden border-2 md:border-4 border-yellow-500/20 shadow-2xl relative">
                <Camera ref={camera} aspectRatio={16 / 9} />
                <div className="absolute inset-0 border-[10px] md:border-[20px] border-black/20 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 border border-yellow-500/10 rounded-full animate-pulse pointer-events-none" />
              </div>
            </div>

            <div className="p-8 md:p-16 flex justify-center pb-16 md:pb-24">
              <button
                onClick={handleCapture}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-yellow-500 flex items-center justify-center active:scale-90 transition-transform bg-black/40 group hover:glow-gold"
              >
                <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.5)] group-hover:scale-90" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DetailsPage;