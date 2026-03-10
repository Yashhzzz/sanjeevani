import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MAP_MARKERS, RISK_COLOR, RISK_BG, type RiskLevel } from "../mockData";

const RISK_EMOJI: Record<RiskLevel, string> = { HIGH: "🔴", MEDIUM: "🟠", LOW: "🟢" };

const TABLE_DATA = [
  { area: "Kamrup East", pincode: "781001", risk: "HIGH" as RiskLevel, score: "0.91", cases: 14, tds: "842", ph: "5.2", updated: "2 min ago" },
  { area: "Azara", pincode: "781017", risk: "HIGH" as RiskLevel, score: "0.87", cases: 11, tds: "710", ph: "5.1", updated: "3 hr ago" },
  { area: "Jalukbari", pincode: "781013", risk: "MEDIUM" as RiskLevel, score: "0.61", cases: 8, tds: "520", ph: "6.8", updated: "5 hr ago" },
  { area: "Beltola", pincode: "781028", risk: "MEDIUM" as RiskLevel, score: "0.55", cases: 6, tds: "620", ph: "6.4", updated: "8 hr ago" },
  { area: "Jorhat", pincode: "785001", risk: "MEDIUM" as RiskLevel, score: "0.52", cases: 5, tds: "490", ph: "6.9", updated: "4 hr ago" },
  { area: "Dispur", pincode: "781005", risk: "LOW" as RiskLevel, score: "0.22", cases: 2, tds: "310", ph: "7.2", updated: "1 hr ago" },
  { area: "Narengi", pincode: "781026", risk: "LOW" as RiskLevel, score: "0.18", cases: 1, tds: "280", ph: "7.5", updated: "30 min ago" },
  { area: "Dibrugarh", pincode: "786001", risk: "LOW" as RiskLevel, score: "0.20", cases: 3, tds: "300", ph: "7.3", updated: "6 hr ago" },
];

// SVG-based map using proportional coordinates — no leaflet CDN required
const MAP_BOUNDS = {
  minLat: 26.0, maxLat: 27.8,
  minLng: 91.5, maxLng: 95.2,
};

function toXY(lat: number, lng: number, w: number, h: number) {
  const x = ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * w;
  const y = h - ((lat - MAP_BOUNDS.minLat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * h;
  return { x, y };
}

export default function HealthMapSection() {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [filter, setFilter] = useState<"All" | RiskLevel>("All");

  const filtered = MAP_MARKERS.filter((m) => filter === "All" || m.risk === filter);

  const W = 700, H = 380;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-display text-[28px] font-bold text-[#0D1F1A]">Health Risk Map</h2>
        <p className="text-sm text-gray-500">Pincode-level outbreak risk visualization · Guwahati District</p>
      </div>

      {/* Controls bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-wrap items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-500 font-medium">Filter:</span>
          {(["All", "HIGH", "MEDIUM", "LOW"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as typeof filter)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                filter === f
                  ? "bg-[#0D1F1A] text-white border-[#0D1F1A]"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
              }`}
            >
              {f === "HIGH" ? "🔴 High" : f === "MEDIUM" ? "🟠 Medium" : f === "LOW" ? "🟢 Low" : "All"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-600 font-semibold">📡 Live Data</span>
          <span className="text-xs text-gray-400">· Last updated: 6 min ago</span>
        </div>
      </motion.div>

      {/* SVG Map */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="relative" style={{ background: "linear-gradient(180deg, #EBF5F0 0%, #D6EEE5 100%)" }}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full"
            style={{ maxHeight: 520, display: "block" }}
          >
            {/* Grid lines */}
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`v${i}`} x1={i * (W / 6)} y1={0} x2={i * (W / 6)} y2={H} stroke="#C8E6D4" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <line key={`h${i}`} x1={0} y1={i * (H / 4)} x2={W} y2={i * (H / 4)} stroke="#C8E6D4" strokeWidth="0.5" />
            ))}

            {/* District label */}
            <text x="24" y="32" fontSize="13" fontFamily="Fraunces, serif" fontWeight="700" fill="#0D1F1A" opacity="0.7">Guwahati District</text>
            <text x="24" y="48" fontSize="9" fontFamily="DM Sans, sans-serif" fill="#6B7B74">Assam, NE India</text>

            {/* Markers */}
            {filtered.map((m) => {
              const { x, y } = toXY(m.lat, m.lng, W, H);
              const isActive = activeMarker === m.pincode;
              const color = RISK_COLOR[m.risk];
              return (
                <g key={m.pincode} onClick={() => setActiveMarker(isActive ? null : m.pincode)} style={{ cursor: "pointer" }}>
                  {/* Pulse ring for high risk */}
                  {m.risk === "HIGH" && (
                    <>
                      <circle cx={x} cy={y} r={m.radius * 1.5} fill={color} opacity="0.08">
                        <animate attributeName="r" values={`${m.radius * 1.2};${m.radius * 2};${m.radius * 1.2}`} dur="2.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.12;0;0.12" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}
                  {/* Main circle */}
                  <circle
                    cx={x} cy={y}
                    r={isActive ? m.radius + 4 : m.radius}
                    fill={color}
                    opacity={isActive ? 0.85 : 0.65}
                    stroke="white"
                    strokeWidth="2"
                    style={{ transition: "all 0.2s" }}
                  />
                  {/* Label */}
                  <text x={x} y={y - m.radius - 6} textAnchor="middle" fontSize="9" fontFamily="DM Sans, sans-serif" fontWeight="700" fill={color}>
                    {m.name}
                  </text>
                  <text x={x} y={y - m.radius + 3} textAnchor="middle" fontSize="7" fontFamily="DM Sans, sans-serif" fill="#6B7B74">
                    {m.pincode}
                  </text>
                  {/* Popup */}
                  {isActive && (
                    <foreignObject x={Math.min(x - 90, W - 190)} y={Math.max(y - m.radius - 130, 8)} width="180" height="115">
                      <div
                        style={{
                          background: "white",
                          borderRadius: 12,
                          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                          padding: "10px 12px",
                          fontSize: 11,
                          border: `2px solid ${color}`,
                        }}
                      >
                        <p style={{ fontFamily: "Fraunces, serif", fontWeight: 700, color: "#0D1F1A", marginBottom: 4 }}>
                          📍 {m.name} — {m.pincode}
                        </p>
                        <p style={{ color, fontWeight: 700, marginBottom: 3 }}>Risk: {RISK_EMOJI[m.risk]} {m.risk}</p>
                        <p style={{ color: "#6B7B74", fontFamily: "monospace", fontSize: 10 }}>
                          TDS: {m.tds} ppm | pH: {m.ph}
                        </p>
                        <p style={{ color: "#6B7B74", marginBottom: 4 }}>Cases: {m.cases} this week</p>
                        <p style={{ color: "#2ED8A3", fontWeight: 600, cursor: "pointer" }}>View Full Alert →</p>
                      </div>
                    </foreignObject>
                  )}
                </g>
              );
            })}

            {/* Legend */}
            <g transform={`translate(14, ${H - 80})`}>
              <rect x="-4" y="-8" width="160" height="80" rx="8" fill="white" opacity="0.9" />
              {[
                { color: "#E53935", label: "High Risk (>0.7)" },
                { color: "#FB8C00", label: "Medium Risk (0.4–0.7)" },
                { color: "#43A047", label: "Low Risk (<0.4)" },
                { color: "#9E9E9E", label: "Circle size = cases" },
              ].map((l, i) => (
                <g key={i} transform={`translate(4, ${i * 16})`}>
                  <circle cx="6" cy="6" r="5" fill={l.color} opacity="0.75" />
                  <text x="16" y="10" fontSize="9" fontFamily="DM Sans, sans-serif" fill="#374151">{l.label}</text>
                </g>
              ))}
            </g>
          </svg>
        </div>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "High Risk Zones", count: 2, color: "#E53935", bg: "#FFEBEE", border: "#FFCDD2" },
          { label: "Medium Risk Zones", count: 3, color: "#FB8C00", bg: "#FFF3E0", border: "#FFE0B2" },
          { label: "Low Risk Zones", count: 3, color: "#43A047", bg: "#E8F5E9", border: "#C8E6C9" },
        ].map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-5 border"
            style={{ background: s.bg, borderColor: s.border }}
          >
            <p className="font-display text-3xl font-bold" style={{ color: s.color }}>{s.count}</p>
            <p className="text-xs font-semibold mt-1" style={{ color: s.color }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Area table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-display text-lg font-bold text-[#0D1F1A]">Area Risk Table</h3>
          <p className="text-xs text-gray-400">Sorted by risk level (high → low)</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-[11px] text-gray-500 uppercase tracking-wider">
                {["Area", "Pincode", "Risk Score", "Cases", "TDS", "pH", "Updated"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_DATA.map((row, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-50 hover:bg-[#F8FFFE] transition-colors cursor-pointer"
                >
                  <td className="px-5 py-3 font-medium text-[#0D1F1A]">
                    <span className="mr-1.5">{RISK_EMOJI[row.risk]}</span>{row.area}
                  </td>
                  <td className="px-5 py-3 font-mono text-gray-500 text-xs">{row.pincode}</td>
                  <td className="px-5 py-3">
                    <span
                      className="font-mono text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ color: RISK_COLOR[row.risk], background: RISK_BG[row.risk] }}
                    >
                      {row.score}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-700 font-mono text-xs">{row.cases}</td>
                  <td className="px-5 py-3 font-mono text-xs text-gray-600">{row.tds}</td>
                  <td className="px-5 py-3 font-mono text-xs text-gray-600">{row.ph}</td>
                  <td className="px-5 py-3 text-xs text-gray-400">{row.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
