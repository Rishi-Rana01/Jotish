import { useState } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Search,
  ChevronRight,
  BarChart3,
  Map as MapIcon,
  RefreshCw,
  Table as TableIcon,
  Stars,
  Sparkles,
  Zap,
  AlertCircle
} from "lucide-react";
import BarGraph from "../components/BarGraph";
import MapVisualization from "../components/MapView";

const ListPage = () => {
  const { data, loading, error } = useFetchData();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("list");

  const filteredData = Array.isArray(data) ? data.filter(item =>
    (item[0]?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (item[1]?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (item[2]?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  ) : [];

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#05051a]">
      <RefreshCw className="w-12 h-12 text-yellow-500 animate-spin mb-6" />
      <p className="text-yellow-500/60 font-black uppercase tracking-[0.3em] text-sm text-center px-4">Consulting the Stars...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#05051a] p-8 text-center">
      <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6 border border-red-500/30">
        <AlertCircle className="w-10 h-10 text-red-500" />
      </div>
      <h2 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tighter">Cosmic Connection Failed</h2>
      <p className="text-red-400/60 font-medium max-w-md mb-8">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-8 py-4 bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all"
      >
        Retry Synchronization
      </button>
    </div>
  );

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 glass border-b border-yellow-500/10 px-4 md:px-8 py-4 md:py-5 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-tr from-yellow-600 to-yellow-400 rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl shadow-yellow-500/20 glow-gold">
            <Stars className="text-black w-6 h-6 md:w-7 md:h-7" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight leading-none">Jotish</h2>
            <p className="text-[8px] md:text-[10px] text-yellow-500 font-bold uppercase tracking-widest mt-1">Celestial Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-bold text-white leading-none">Astral Admin</span>
            <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-yellow-500/60 font-bold mt-1">{user?.username}</span>
          </div>
          <button
            onClick={logout}
            className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 rounded-xl md:rounded-2xl transition-all border border-white/5"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 md:space-y-12">

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 overflow-hidden border border-yellow-500/10 bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-black/40 shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-8 hidden md:block">
            <Sparkles className="w-24 h-24 text-yellow-500/10 animate-pulse" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 text-yellow-500 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 border border-yellow-500/20">
              <Zap className="w-3 h-3" />
              Cosmic Insight Active
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Employee Nebula</span>
            </h1>
            <p className="text-lg md:text-xl text-purple-200/60 font-medium leading-relaxed">
              Real-time synchronization with the celestial backend records.
              Manage your cosmic workforce with divine precision.
            </p>
          </div>

          <div className="absolute -bottom-24 -right-24 w-64 h-64 md:w-96 md:h-96 bg-yellow-500/5 rounded-full blur-[80px] md:blur-[100px]" />
        </motion.section>

        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="relative w-full lg:w-[32rem]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-purple-300/30" />
            <input
              type="text"
              placeholder="Seek across the stars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] py-4 md:py-5 pl-14 pr-6 text-white text-base md:text-lg placeholder-white/20 focus:outline-none focus:border-yellow-500/50 transition-all font-light"
            />
          </div>

          <div className="flex w-full lg:w-auto overflow-x-auto no-scrollbar bg-black/40 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-1.5 shadow-2xl backdrop-blur-xl">
            {[
              { id: "list", icon: TableIcon, label: "Registry" },
              { id: "chart", icon: BarChart3, label: "Analytics" },
              { id: "map", icon: MapIcon, label: "Star Map" }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex flex-1 lg:flex-none items-center justify-center gap-3 px-4 md:px-8 py-3 md:py-4 rounded-[1.2rem] md:rounded-[1.5rem] text-[10px] md:text-sm font-black uppercase tracking-widest transition-all whitespace-nowrap ${view === item.id ? "bg-yellow-500 text-black shadow-xl shadow-yellow-500/20 glow-gold" : "text-white/40 hover:text-white hover:bg-white/5"}`}
              >
                <item.icon className="w-4 h-4 md:w-5 h-5" />
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === "list" && (
            <motion.div
              key="list"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="glass rounded-[2rem] md:rounded-[3rem] overflow-hidden p-2 md:p-4 border-yellow-500/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]"
            >
              <div className="overflow-x-auto px-2 md:px-4">
                <table className="w-full text-left border-separate border-spacing-y-2 md:border-spacing-y-4">
                  <thead>
                    <tr className="text-yellow-500/40 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em]">
                      <th className="px-4 md:px-8 pb-2 md:pb-4">Star Member</th>
                      <th className="px-4 md:px-8 pb-2 md:pb-4 hidden sm:table-cell">Cosmic Rank</th>
                      <th className="px-4 md:px-8 pb-2 md:pb-4 hidden md:table-cell">Realm</th>
                      <th className="px-4 md:px-8 pb-2 md:pb-4 hidden lg:table-cell text-center">Cycle Age</th>
                      <th className="px-4 md:px-8 pb-2 md:pb-4 text-right">Value</th>
                      <th className="px-4 md:px-8 pb-2 md:pb-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? filteredData.map((row, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => navigate("/details", { state: { employee: row } })}
                        className="group bg-white/5 hover:bg-white/[0.08] cursor-pointer transition-all border border-white/5"
                      >
                        <td className="px-4 md:px-8 py-4 md:py-6 rounded-l-xl md:rounded-l-[1.5rem]">
                          <div className="flex items-center gap-3 md:gap-5">
                            <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 flex items-center justify-center text-yellow-500 text-base md:text-xl font-black border border-yellow-500/20 group-hover:glow-gold transition-all">
                              {row[0]?.charAt(0) || "S"}
                            </div>
                            <div>
                              <p className="font-black text-white text-sm md:text-lg tracking-tight group-hover:text-yellow-500 transition-colors uppercase truncate max-w-[120px] md:max-w-none">{row[0] || "Unknown Entity"}</p>
                              <p className="text-[10px] text-purple-200/40 font-bold uppercase tracking-widest sm:hidden">{row[1] || "Acolyte"}</p>
                              <p className="hidden sm:block text-[10px] md:text-xs text-purple-200/40 font-bold uppercase tracking-widest">{row[1] || "Acolyte"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 md:px-8 py-4 md:py-6 align-middle hidden sm:table-cell">
                          <span className="text-xs md:text-sm font-bold text-white/80">{row[1] || "-"}</span>
                        </td>
                        <td className="px-4 md:px-8 py-4 md:py-6 hidden md:table-cell align-middle">
                          <div className="flex items-center gap-2 text-purple-200/40">
                            <span className="text-xs md:text-sm font-bold">{row[2] || "Void"}</span>
                          </div>
                        </td>
                        <td className="px-4 md:px-8 py-4 md:py-6 hidden lg:table-cell text-center align-middle">
                          <span className="bg-yellow-500/10 text-yellow-500 text-[10px] font-black px-3 py-1.5 rounded-lg border border-yellow-500/20">{row[3] || "0"}</span>
                        </td>
                        <td className="px-4 md:px-8 py-4 md:py-6 text-right align-middle">
                          <span className="text-sm md:text-lg font-black text-white tracking-widest">{row[5]?.replace("$", "") || "0"}</span>
                        </td>
                        <td className="px-4 md:px-8 py-4 md:py-6 rounded-r-xl md:rounded-r-[1.5rem] text-right align-middle">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center text-white/10 group-hover:text-yellow-500 group-hover:bg-yellow-500/10 transition-all">
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                          </div>
                        </td>
                      </motion.tr>
                    )) : (
                      <tr>
                        <td colSpan="6" className="py-20 text-center">
                          <p className="text-purple-200/20 font-black uppercase tracking-[0.5em] text-sm italic">The nebula is quiet...</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {view === "chart" && (
            <motion.div key="chart" className="glass rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 border-yellow-500/5 min-h-[400px]">
              <BarGraph data={data} />
            </motion.div>
          )}

          {view === "map" && (
            <motion.div key="map" className="glass rounded-[2rem] md:rounded-[3rem] p-2 md:p-4 border-yellow-500/5 h-[400px] md:h-[600px]">
              <MapVisualization data={data || []} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ListPage;