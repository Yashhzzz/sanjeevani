// ─── Shared mock data for Citizen Dashboard ───────────────────────────────

export const CITIZEN = {
  name: "Rahul Bora",
  initials: "RB",
  email: "rahul.bora@email.com",
  phone: "+91 98540-XXXXX",
  age: 28,
  gender: "male" as const,
  address: "Block C, Kamrup District",
  pincode: "781001",
  district: "Kamrup",
  state: "Assam",
  memberSince: "January 2026",
};

export const AREA_RISKS = [
  { location: "Kamrup East", pincode: "781001", risk: "HIGH" as const, cases: 14, color: "#E53935" },
  { location: "Azara", pincode: "781017", risk: "HIGH" as const, cases: 11, color: "#E53935" },
  { location: "Jalukbari", pincode: "781013", risk: "MEDIUM" as const, cases: 8, color: "#FB8C00" },
  { location: "Beltola", pincode: "781028", risk: "MEDIUM" as const, cases: 6, color: "#FB8C00" },
  { location: "Dispur", pincode: "781005", risk: "LOW" as const, cases: 2, color: "#43A047" },
];

export const SENSOR_DATA = [
  { label: "TDS", value: "842 ppm", status: "CRITICAL", color: "#E53935" },
  { label: "pH", value: "5.2", status: "ACIDIC", color: "#E53935" },
  { label: "Turbidity", value: "78 NTU", status: "HIGH", color: "#FB8C00" },
  { label: "Temp", value: "28.4°C", status: "NORMAL", color: "#43A047" },
  { label: "Humidity", value: "84%", status: "NORMAL", color: "#43A047" },
];

export const ARTICLES = [
  {
    id: 1,
    tag: "Prevention",
    tagColor: "#43A047",
    tagBg: "#E8F5E9",
    title: "How to purify water at home",
    excerpt: "Safe water is your first defense against water-borne diseases. Learn these simple steps...",
    author: "Anita Devi",
    role: "ASHA Worker",
    date: "Mar 8, 2026",
  },
  {
    id: 2,
    tag: "Cholera",
    tagColor: "#E53935",
    tagBg: "#FFEBEE",
    title: "Early warning signs you must know",
    excerpt: "Cholera can escalate quickly. Recognizing these early symptoms can save lives in your community.",
    author: "Dr. R. Sharma",
    role: "PHC Guwahati",
    date: "Mar 7, 2026",
  },
  {
    id: 3,
    tag: "Hygiene",
    tagColor: "#1565C0",
    tagBg: "#E3F2FD",
    title: "5 daily habits that prevent outbreaks",
    excerpt: "Small daily habits can make a big difference in preventing the spread of disease in your area.",
    author: "Priya Das",
    role: "ASHA Worker",
    date: "Mar 6, 2026",
  },
];

export const SURVEYS = [
  {
    id: 1,
    title: "Water Quality Feedback Survey",
    desc: "Help us understand water issues in your area",
    deadline: "Closes Mar 15",
    responses: 47,
    total: 100,
  },
  {
    id: 2,
    title: "Community Health Assessment",
    desc: "Monthly health status survey for your pincode",
    deadline: "Closes Mar 20",
    responses: 23,
    total: 100,
  },
  {
    id: 3,
    title: "Monthly Symptom Tracker",
    desc: "Track and report symptoms in your household",
    deadline: "Closes Mar 25",
    responses: 67,
    total: 100,
  },
];

export const ALERTS = [
  {
    id: "ALT-001",
    location: "Kamrup East",
    pincode: "781001",
    risk: "HIGH" as const,
    cause: "High TDS detected (842 ppm)",
    causeIcon: "💧",
    tds: "842",
    ph: "5.2",
    turbidity: "78 NTU",
    cases: 14,
    time: "2 hours ago",
    desc: "Critical water contamination detected. TDS levels far exceed WHO safe limits. Multiple cholera cases reported in the area. Immediate preventive action required.",
  },
  {
    id: "ALT-002",
    location: "Azara",
    pincode: "781017",
    risk: "HIGH" as const,
    cause: "pH below safe levels (5.1)",
    causeIcon: "⚗️",
    tds: "710",
    ph: "5.1",
    turbidity: "62 NTU",
    cases: 11,
    time: "3 hours ago",
    desc: "Highly acidic water source detected. pH of 5.1 is well below the safe drinking range of 6.5–8.5. 11 gastrointestinal cases linked to this source this week.",
  },
  {
    id: "ALT-003",
    location: "Jalukbari",
    pincode: "781013",
    risk: "MEDIUM" as const,
    cause: "Turbidity at 65 NTU",
    causeIcon: "🌊",
    tds: "520",
    ph: "6.8",
    turbidity: "65 NTU",
    cases: 8,
    time: "5 hours ago",
    desc: "Elevated turbidity levels detected at municipal supply point. 8 cases of diarrheal illness reported. Situation being monitored by PHC team.",
  },
  {
    id: "ALT-004",
    location: "Beltola",
    pincode: "781028",
    risk: "MEDIUM" as const,
    cause: "6 cases reported nearby",
    causeIcon: "🦠",
    tds: "620",
    ph: "6.4",
    turbidity: "42 NTU",
    cases: 6,
    time: "8 hours ago",
    desc: "Cluster of 6 water-borne illness cases identified in Beltola ward. TDS slightly elevated. ASHA worker field visit scheduled.",
  },
  {
    id: "ALT-005",
    location: "Dispur",
    pincode: "781005",
    risk: "LOW" as const,
    cause: "All readings within normal range",
    causeIcon: "✅",
    tds: "310",
    ph: "7.2",
    turbidity: "8 NTU",
    cases: 2,
    time: "1 hour ago",
    desc: "All sensor readings within WHO safe limits. 2 minor cases likely unrelated to water quality. Routine monitoring active.",
  },
  {
    id: "ALT-006",
    location: "Narengi",
    pincode: "781026",
    risk: "LOW" as const,
    cause: "Monitoring active — 1 case",
    causeIcon: "📡",
    tds: "280",
    ph: "7.5",
    turbidity: "6 NTU",
    cases: 1,
    time: "30 min ago",
    desc: "Low risk zone. One isolated case reported, likely not water-borne. Sensors showing normal readings. Continued monitoring in place.",
  },
];

export const MAP_MARKERS = [
  { pincode: "781001", name: "Kamrup East", lat: 26.1445, lng: 91.7362, risk: "HIGH" as const, tds: 842, ph: 5.2, cases: 14, radius: 40 },
  { pincode: "781017", name: "Azara", lat: 26.1244, lng: 91.6886, risk: "HIGH" as const, tds: 710, ph: 5.1, cases: 11, radius: 35 },
  { pincode: "781013", name: "Jalukbari", lat: 26.1589, lng: 91.6763, risk: "MEDIUM" as const, tds: 520, ph: 6.8, cases: 8, radius: 30 },
  { pincode: "781028", name: "Beltola", lat: 26.1197, lng: 91.7611, risk: "MEDIUM" as const, tds: 620, ph: 6.4, cases: 6, radius: 28 },
  { pincode: "781005", name: "Dispur", lat: 26.1353, lng: 91.7898, risk: "LOW" as const, tds: 310, ph: 7.2, cases: 2, radius: 20 },
  { pincode: "781026", name: "Narengi", lat: 26.1728, lng: 91.7987, risk: "LOW" as const, tds: 280, ph: 7.5, cases: 1, radius: 18 },
  { pincode: "785001", name: "Jorhat", lat: 26.7509, lng: 94.2037, risk: "MEDIUM" as const, tds: 490, ph: 6.9, cases: 5, radius: 32 },
  { pincode: "786001", name: "Dibrugarh", lat: 27.4728, lng: 94.9119, risk: "LOW" as const, tds: 300, ph: 7.3, cases: 3, radius: 22 },
];

export const MY_REPORTS = [
  {
    id: "RPT-2026-0847",
    type: "Water Quality Issue",
    typeIcon: "💧",
    desc: "Foul smell from tap water at Block C",
    pincode: "781001",
    date: "Mar 8, 2026",
    status: "Under Review" as const,
    assignee: "Priya Sharma (ASHA Worker)",
  },
  {
    id: "RPT-2026-0821",
    type: "Symptom Report",
    typeIcon: "🤒",
    desc: "Persistent diarrhea for 2 days",
    pincode: "781001",
    date: "Mar 5, 2026",
    status: "Resolved" as const,
    assignee: "Anita Devi (ASHA Worker)",
  },
  {
    id: "RPT-2026-0798",
    type: "Water Quality Issue",
    typeIcon: "💧",
    desc: "Brown colored water from municipal supply",
    pincode: "781001",
    date: "Feb 28, 2026",
    status: "Resolved" as const,
    assignee: "Anita Devi (ASHA Worker)",
  },
  {
    id: "RPT-2026-0776",
    type: "Other Issue",
    typeIcon: "⚠️",
    desc: "Open drain near community water source",
    pincode: "781001",
    date: "Feb 20, 2026",
    status: "Submitted" as const,
    assignee: "Under review by system",
  },
];

export type RiskLevel = "HIGH" | "MEDIUM" | "LOW";

export const RISK_COLOR = {
  HIGH: "#E53935",
  MEDIUM: "#FB8C00",
  LOW: "#43A047",
} as const;

export const RISK_BG = {
  HIGH: "#FFEBEE",
  MEDIUM: "#FFF3E0",
  LOW: "#E8F5E9",
} as const;

export const RISK_TEXT_CLASS = {
  HIGH: "text-[#E53935]",
  MEDIUM: "text-[#FB8C00]",
  LOW: "text-[#43A047]",
} as const;
