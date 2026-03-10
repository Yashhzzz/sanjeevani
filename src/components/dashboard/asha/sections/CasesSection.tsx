/*
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { CASES_DATA, SEV_COLOR, SEV_BG, SEV_EMOJI, type Severity } from "../ashaData";

type Case = typeof CASES_DATA[number];
type FilterTab = "ALL" | Severity;
const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: "ALL", label: "All" },
  { id: "SEVERE", label: "🔴 Severe" },
  { id: "MODERATE", label: "🟠 Moderate" },
  { id: "MILD", label: "🟡 Mild" },
  { id: "RECOVERED", label: "✅ Recovered" },
];

// ─── Case Detail Slide-over ───────────────────────────────────────────────────
function CaseDetail({ c, onClose }: { c: Case; onClose: () => void }) {
  const [status, setStatus] = useState(c.status);
  const timeline = [
    { label: "Reported", date: `${c.reported} 06:42`, done: true },
    { label: "Under Treatment", date: `${c.reported} 14:00`, done: c.status !== "Recovered" || true },
    { label: "Recovered", date: "Pending", done: c.severity === "RECOVERED" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <motion.div initial={{ x: 500 }} animate={{ x: 0 }} exit={{ x: 500 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-[480px] bg-white shadow-2xl overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="font-display text-xl font-bold text-[#0D1F1A]">Case Details</h2>
            <p className="text-xs text-gray-400 font-mono">{c.id}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <div
          className="px-6 py-3 border-b-2"
          style={{ background: SEV_BG[c.severity], borderBottomColor: SEV_COLOR[c.severity] }}
        >
          <p className="font-bold text-sm" style={{ color: SEV_COLOR[c.severity] }}>{SEV_EMOJI[c.severity]} {c.severity} — {c.status}</p>
          <p className="text-xs text-gray-500 mt-0.5">Reported: {c.reported} · Location: {c.location}</p>
        </div>

        <div className="p-6 space-y-5">
          {/* Patient info */}
          <div className="grid grid-cols-2 gap-3">
            {[{ label: "Patient", value: c.patient }, { label: "Age", value: c.age }, { label: "Gender", value: c.gender === "M" ? "Male" : "Female" }, { label: "Disease", value: c.disease }].map((r) => (
              <div key={r.label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">{r.label}</p>
                <p className="text-sm font-semibold text-[#0D1F1A]">{r.value}</p>
              </div>
            ))}
          </div>

          {/* Symptoms */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Symptoms</p>
            <div className="flex flex-wrap gap-2">
              {c.symptoms.map((s) => (
                <span key={s} className="px-3 py-1 rounded-full text-xs font-medium bg-[#FFEBEE] text-[#E53935] border border-red-100">{s}</span>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Clinical Notes</p>
            <p className="text-sm text-gray-600 leading-relaxed">{c.notes}</p>
          </div>

          {/* Status timeline */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Status Timeline</p>
            <div className="relative pl-4 space-y-3">
              <div className="absolute left-[6px] top-2 bottom-2 w-px bg-gray-200" />
              {timeline.map((t) => (
                <div key={t.label} className="flex items-start gap-3 relative">
                  <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm shrink-0 mt-0.5 z-10 ${t.done ? "bg-[#22C55E]" : "bg-gray-200"}`} />
                  <div>
                    <p className={`text-sm font-medium ${t.done ? "text-[#0D1F1A]" : "text-gray-400"}`}>{t.label}</p>
                    <p className="text-[11px] text-gray-400">{t.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Update status */}
          {c.severity !== "RECOVERED" && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Update Status</p>
              <div className="flex gap-2">
                <select value={status} onChange={e => setStatus(e.target.value)}
                  className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none">
                  <option>Under Treatment</option>
                  <option>Hospitalized</option>
                  <option>Recovered</option>
                  <option>Critical</option>
                </select>
                <button className="px-4 py-2.5 rounded-xl bg-[#0D7A4A] text-white text-sm font-semibold hover:bg-[#0D1F1A] transition-colors">Save</button>
              </div>
            </div>
          )}

          {/* Alert link */}
          <div className="bg-[#FFEBEE] rounded-xl p-3 flex items-center justify-between">
            <p className="text-xs font-semibold text-[#E53935]">🔴 Linked Alert: 781001 HIGH RISK</p>
            <button className="text-xs font-semibold text-[#E53935] hover:text-red-800 transition-colors">View →</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Report Case Modal (reused) ───────────────────────────────────────────────
function QuickReportModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState("moderate");
  const symptomList = ["Diarrhea", "Vomiting", "Fever", "Weakness", "Jaundice", "Dehydration", "Abdominal pain", "Skin rash"];
  const toggle = (s: string) => setSymptoms(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <h2 className="font-display text-xl font-bold text-[#0D1F1A]">🦠 Report New Case</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><X className="w-5 h-5" /></button>
        </div>
        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-9 h-9 text-[#43A047]" /></div>
            <h3 className="font-display text-xl font-bold text-[#0D1F1A] mb-1">Case Reported!</h3>
            <p className="text-sm text-gray-500 mb-1">Reference: <span className="font-mono font-bold">PAT-011</span></p>
            <p className="text-sm text-gray-500 mb-6">System will auto-alert relevant authorities.</p>
            <button onClick={onClose} className="px-6 py-2.5 rounded-xl bg-[#E53935] text-white text-sm font-semibold">Close</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="overflow-y-auto p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Patient Name (Optional)</label>
                <input className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none" placeholder="Leave blank for privacy" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Age</label>
                <input type="number" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none" placeholder="e.g. 32" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">Symptoms</label>
              <div className="grid grid-cols-2 gap-2">
                {symptomList.map(s => (
                  <label key={s} onClick={() => toggle(s)} className={`flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer text-xs font-medium transition-all ${symptoms.includes(s) ? "border-[#0D7A4A] bg-[#F0FAF7] text-[#0D7A4A]" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                    <span>{symptoms.includes(s) ? "☑" : "☐"}</span>{s}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Suspected Disease</label>
              <select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none">
                <option>Cholera</option><option>Typhoid</option><option>Diarrhea</option><option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">Severity</label>
              <div className="grid grid-cols-3 gap-2">
                {[{ id: "mild", label: "🟡 Mild", c: "#FDD835", b: "#FFFDE7" }, { id: "moderate", label: "🟠 Moderate", c: "#FB8C00", b: "#FFF3E0" }, { id: "severe", label: "🔴 Severe", c: "#E53935", b: "#FFEBEE" }].map(s => (
                  <button key={s.id} type="button" onClick={() => setSeverity(s.id)}
                    className="py-2.5 rounded-xl text-xs font-bold border-2 transition-all"
                    style={severity === s.id ? { borderColor: s.c, background: s.b, color: s.c } : { borderColor: "#E5E7EB", color: "#6B7280" }}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Location Pincode</label>
              <input defaultValue="781001" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Reported By</label>
              <input disabled value="Priya Sharma (ASHA Worker)" className="w-full px-3 py-2.5 rounded-xl border border-gray-100 text-sm text-gray-400 bg-gray-50 cursor-not-allowed" />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-[#E53935] text-white text-sm font-semibold hover:bg-red-700 transition-colors">Submit Case Report</button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

// ─── Cases Section ────────────────────────────────────────────────────────────
export default function CasesSection() {
  const [activeTab, setActiveTab] = useState<FilterTab>("ALL");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const filtered = activeTab === "ALL" ? CASES_DATA : CASES_DATA.filter(c => c.severity === activeTab);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-[28px] font-bold text-[#0D1F1A]">Active Cases</h2>
            <p className="text-sm text-gray-500">Pincode 781001 · Mar 2026</p>
          </div>
          <button onClick={() => setShowReportModal(true)}
            className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ background: "#E53935" }}>
            + Report New Case
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Severe", value: 3, color: "#E53935", bg: "#FFEBEE" },
            { label: "Moderate", value: 11, color: "#FB8C00", bg: "#FFF3E0" },
            { label: "Mild", value: 9, color: "#F59E0B", bg: "#FFFDE7" },
            { label: "Recovered", value: 24, color: "#43A047", bg: "#E8F5E9" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-5 border" style={{ background: s.bg, borderColor: s.color + "30" }}>
              <p className="font-display text-3xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs font-semibold mt-1" style={{ color: s.color }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {FILTER_TABS.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${activeTab === t.id ? "bg-[#0D1F1A] text-white border-[#0D1F1A]" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-[11px] text-gray-500 uppercase tracking-wider">
                  {["Case ID", "Patient", "Age", "Symptoms", "Severity", "Status", "Reported", "Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-t border-gray-50 hover:bg-[#F8FFFE] transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-[#0D1F1A]">{c.id}</td>
                    <td className="px-4 py-3 font-medium text-[#0D1F1A]">{c.patient}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">{c.age}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {c.symptoms.slice(0, 2).map(s => (
                          <span key={s} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#FFEBEE] text-[#E53935]">{s}</span>
                        ))}
                        {c.symptoms.length > 2 && <span className="text-[10px] text-gray-400 self-center">+{c.symptoms.length - 2}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ color: SEV_COLOR[c.severity], background: SEV_BG[c.severity] }}>
                        {SEV_EMOJI[c.severity]} {c.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{c.status}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{c.reported}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {c.severity !== "RECOVERED" && (
                          <><button onClick={() => setSelectedCase(c)} className="text-xs font-semibold text-[#FB8C00] hover:text-orange-700 transition-colors">Update</button>
                          <span className="text-gray-200">|</span></>
                        )}
                        <button onClick={() => setSelectedCase(c)} className="text-xs font-semibold text-[#2ED8A3] hover:text-[#0D7A4A] transition-colors">View</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedCase && <CaseDetail c={selectedCase} onClose={() => setSelectedCase(null)} />}
        {showReportModal && <QuickReportModal onClose={() => setShowReportModal(false)} />}
      </AnimatePresence>
    </>
  );
}
*/

// ─── Placeholder (Cases section commented out) ───────────────────────────────
export default function CasesSection() {
  return null;
}
