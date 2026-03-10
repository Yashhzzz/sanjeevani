import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { COMMUNITY_MEMBERS, RISK_COLOR, RISK_BG, type RiskLevel } from "../ashaData";

type Member = typeof COMMUNITY_MEMBERS[number];

const RISK_EMOJI: Record<RiskLevel, string> = { HIGH: "🔴", MEDIUM: "🟠", LOW: "🟢" };

// ─── Citizen Detail Slide-over ────────────────────────────────────────────────
function CitizenDetail({ member, onClose }: { member: Member; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <motion.div initial={{ x: 440 }} animate={{ x: 0 }} exit={{ x: 440 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-[420px] bg-white shadow-2xl overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="font-display text-xl font-bold text-[#0D1F1A]">Citizen Profile</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-5">
          {/* Avatar + badge */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#0D1F1A] flex items-center justify-center text-white font-bold text-lg font-display">
              {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-[#0D1F1A]">{member.name}</h3>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">Citizen</span>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Age", value: member.age },
              { label: "Gender", value: member.gender === "M" ? "Male" : "Female" },
              { label: "Phone", value: member.phone },
              { label: "Address", value: member.address },
              { label: "Pincode", value: "781001" },
              { label: "Last Active", value: member.lastActive },
            ].map((row) => (
              <div key={row.label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">{row.label}</p>
                <p className="text-sm font-semibold text-[#0D1F1A]">{row.value}</p>
              </div>
            ))}
          </div>

          {/* Risk zone */}
          <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: RISK_BG[member.risk] }}>
            <span className="text-2xl">{RISK_EMOJI[member.risk]}</span>
            <div>
              <p className="text-xs text-gray-500">Risk Zone</p>
              <p className="font-bold text-sm" style={{ color: RISK_COLOR[member.risk] }}>{member.risk} RISK</p>
            </div>
          </div>

          {/* Activity */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Reports Submitted", value: member.reports },
              { label: "Surveys Completed", value: member.surveys },
            ].map((s) => (
              <div key={s.label} className="bg-[#F4F9F7] rounded-xl p-4 text-center">
                <p className="font-display text-2xl font-bold text-[#0D1F1A]">{s.value}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button className="py-2.5 rounded-xl bg-green-500 text-white text-xs font-semibold hover:bg-green-600 transition-colors">📱 Send SMS</button>
              <button className="py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:opacity-90 transition-opacity">💬 WhatsApp</button>
            </div>
            <button className="w-full py-2.5 rounded-xl border border-gray-200 text-[#0D1F1A] text-xs font-semibold hover:bg-gray-50 transition-colors">View All Reports</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Community Section ────────────────────────────────────────────────────────
export default function CommunitySection() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "High Risk Area" | "Recently Added">("All");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filtered = COMMUNITY_MEMBERS.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.phone.includes(search);
    const matchesFilter = filter === "All" ? true : filter === "High Risk Area" ? m.risk === "HIGH" : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-display text-[28px] font-bold text-[#0D1F1A]">Community Members</h2>
            <p className="text-sm text-gray-500">Pincode 781001 · <span className="font-mono font-semibold text-[#0D1F1A]">248</span> registered citizens</p>
          </div>
          <button className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Export List ↓
          </button>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Total", value: "248", color: "#0D1F1A" },
            { label: "Active", value: "231", color: "#0D7A4A" },
            { label: "High Risk Area", value: "89", color: "#E53935" },
            { label: "New This Month", value: "12", color: "#1565C0" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
              <p className="font-display text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] text-gray-500 mt-0.5 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or phone…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D1F1A]/20" />
          </div>
          <div className="flex gap-2">
            {(["All", "High Risk Area", "Recently Added"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold border transition-all ${filter === f ? "bg-[#0D1F1A] text-white border-[#0D1F1A]" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-[11px] text-gray-500 uppercase tracking-wider">
                  {["Member", "Age", "Gender", "Phone", "Address", "Risk Zone", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr key={m.id} className="border-t border-gray-50 hover:bg-[#F8FFFE] transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#0D1F1A] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {m.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className="font-medium text-[#0D1F1A]">{m.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-gray-600">{m.age}</td>
                    <td className="px-5 py-3 text-gray-600">{m.gender === "M" ? "Male" : "Female"}</td>
                    <td className="px-5 py-3 font-mono text-xs text-gray-600">{m.phone}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs max-w-[140px] truncate">{m.address}</td>
                    <td className="px-5 py-3">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ color: RISK_COLOR[m.risk], background: RISK_BG[m.risk] }}>
                        {RISK_EMOJI[m.risk]} {m.risk}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setSelectedMember(m)} className="text-xs font-semibold text-[#2ED8A3] hover:text-[#0D7A4A] transition-colors">View</button>
                        <span className="text-gray-200">|</span>
                        <button className="text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors">Message</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="px-5 py-3.5 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">Showing 1–{filtered.length} of 248</p>
            <div className="flex items-center gap-1.5">
              <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-500 hover:bg-gray-50">← Prev</button>
              {[1, 2, 3].map((p) => (
                <button key={p} className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${p === 1 ? "bg-[#0D1F1A] text-white" : "text-gray-500 hover:bg-gray-50 border border-gray-200"}`}>{p}</button>
              ))}
              <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-500 hover:bg-gray-50">Next →</button>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedMember && <CitizenDetail member={selectedMember} onClose={() => setSelectedMember(null)} />}
      </AnimatePresence>
    </>
  );
}
