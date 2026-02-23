import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { TrendingUp, Sparkles } from "lucide-react";

const BarGraphPage = ({ data }) => {
  const chartData = data.slice(0, 10).map(item => ({
    name: item[0],
    salary: parseInt(item[5].replace(/[$,]/g, "")) || 0
  }));

  const COLORS = ["#ffd700", "#d946ef", "#8b5cf6", "#6366f1", "#4f46e5"];

  return (
    <div className="h-[400px] md:h-[600px] flex flex-col p-4 md:p-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 md:mb-12 gap-4">
        <div className="text-center sm:text-left">
          <h3 className="text-2xl md:text-3xl font-black text-white flex items-center justify-center sm:justify-start gap-3 md:gap-4 uppercase tracking-tight">
            <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
            Valuation Nebula
          </h3>
          <p className="text-purple-200/30 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mt-2 sm:ml-12">Top 10 celestial contributors</p>
        </div>
        <div className="flex items-center gap-2 px-4 md:px-5 py-2 bg-yellow-500/5 text-yellow-500/60 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-yellow-500/10">
          <Sparkles className="w-3 h-3" />
          Astral Scale
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-black/20 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 p-4 md:p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 to-transparent pointer-events-none" />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              interval={0}
              height={60}
              stroke="rgba(255,215,0,0.3)"
              fontSize={8}
              fontWeight={900}
              tick={{ fill: "rgba(255,255,255,0.4)" }}
            />
            <YAxis
              stroke="rgba(255,215,0,0.3)"
              fontSize={8}
              fontWeight={900}
              tick={{ fill: "rgba(255,255,255,0.4)" }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
              contentStyle={{
                backgroundColor: "#1a0b2e",
                borderRadius: "16px",
                border: "1px solid rgba(255,215,0,0.2)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                padding: "12px md:20px",
                color: "#fff"
              }}
              itemStyle={{ color: "#ffd700", fontWeight: 900, textTransform: "uppercase", fontSize: "10px md:12px" }}
              labelStyle={{ fontWeight: 900, color: "#fff", marginBottom: "4px md:8px", textTransform: "uppercase", fontSize: "10px md:12px" }}
              formatter={(value) => [`$${value.toLocaleString()}`, "Astral Value"]}
            />
            <Bar dataKey="salary" radius={[8, 8, 2, 2]} barSize={30}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} stroke={COLORS[index % COLORS.length]} strokeWidth={2} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarGraphPage;