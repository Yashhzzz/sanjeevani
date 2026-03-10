// ─── ASHA Worker Dashboard Mock Data ─────────────────────────────────────────

export const ASHA_WORKER = {
  name: "Priya Sharma",
  initials: "PS",
  email: "priya.sharma@asha.gov.in",
  phone: "+91 94351-XXXXX",
  address: "PHC Compound, Dispur, Guwahati",
  pincode: "781001",
  district: "Kamrup",
  state: "Assam",
  servingSince: "March 2024",
};

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
export const DASH_STATS = {
  activeCases: 23,
  casesCapacity: 50,
  casesWeekDelta: 4,
  pendingSurveys: 8,
  surveysClozing: 3,
  alertsToday: 5,
  alertsHigh: 2,
  alertsMedium: 2,
  alertsLow: 1,
};

// ─── Activity Feed ────────────────────────────────────────────────────────────
export const ACTIVITY_FEED = [
  { id: 1, icon: "🔴", text: "High risk alert issued for 781001", time: "2h ago", color: "#E53935" },
  { id: 2, icon: "🦠", text: "PAT-002 case severity updated to Severe", time: "4h ago", color: "#E53935" },
  { id: 3, icon: "📋", text: "Water Quality Survey received 5 new responses", time: "6h ago", color: "#1565C0" },
  { id: 4, icon: "📰", text: "Your article published: Cholera Prevention Tips", time: "1d ago", color: "#0D7A4A" },
  { id: 5, icon: "✅", text: "PAT-003 marked as Recovered", time: "1d ago", color: "#43A047" },
  { id: 6, icon: "👥", text: "3 new citizens registered in 781001", time: "2d ago", color: "#1565C0" },
];

// ─── Community Members ────────────────────────────────────────────────────────
export type RiskLevel = "HIGH" | "MEDIUM" | "LOW";

export const COMMUNITY_MEMBERS = [
  { id: 1, name: "Rahul Bora", age: 34, gender: "M", phone: "98540-11111", address: "Beltola, Guwahati", risk: "MEDIUM" as RiskLevel, reports: 2, surveys: 1, lastActive: "Mar 8, 2026" },
  { id: 2, name: "Meena Gogoi", age: 28, gender: "F", phone: "94351-22222", address: "Zoo Road, Guwahati", risk: "HIGH" as RiskLevel, reports: 3, surveys: 2, lastActive: "Mar 9, 2026" },
  { id: 3, name: "Bikash Das", age: 45, gender: "M", phone: "70001-33333", address: "Dispur, Guwahati", risk: "LOW" as RiskLevel, reports: 0, surveys: 1, lastActive: "Mar 7, 2026" },
  { id: 4, name: "Anita Borah", age: 19, gender: "F", phone: "86001-44444", address: "Narengi, Guwahati", risk: "LOW" as RiskLevel, reports: 1, surveys: 0, lastActive: "Mar 6, 2026" },
  { id: 5, name: "Dipak Kalita", age: 52, gender: "M", phone: "98540-55555", address: "Azara, Guwahati", risk: "HIGH" as RiskLevel, reports: 4, surveys: 2, lastActive: "Mar 9, 2026" },
  { id: 6, name: "Ritu Sharma", age: 31, gender: "F", phone: "94010-66666", address: "Jalukbari, Guwahati", risk: "MEDIUM" as RiskLevel, reports: 1, surveys: 1, lastActive: "Mar 8, 2026" },
  { id: 7, name: "Sanjay Nath", age: 67, gender: "M", phone: "70099-77777", address: "Beltola, Guwahati", risk: "HIGH" as RiskLevel, reports: 5, surveys: 0, lastActive: "Mar 7, 2026" },
  { id: 8, name: "Purnima Das", age: 23, gender: "F", phone: "86010-88888", address: "Dispur, Guwahati", risk: "LOW" as RiskLevel, reports: 0, surveys: 2, lastActive: "Mar 5, 2026" },
  { id: 9, name: "Hemanta Bora", age: 41, gender: "M", phone: "98010-99999", address: "Beltola, Guwahati", risk: "MEDIUM" as RiskLevel, reports: 2, surveys: 1, lastActive: "Mar 8, 2026" },
  { id: 10, name: "Lakshmi Devi", age: 55, gender: "F", phone: "70020-11122", address: "Azara, Guwahati", risk: "HIGH" as RiskLevel, reports: 3, surveys: 0, lastActive: "Mar 9, 2026" },
  { id: 11, name: "Pradip Gogoi", age: 38, gender: "M", phone: "94020-33344", address: "Zoo Road, Guwahati", risk: "LOW" as RiskLevel, reports: 1, surveys: 2, lastActive: "Mar 4, 2026" },
  { id: 12, name: "Rima Choudhury", age: 26, gender: "F", phone: "86020-55566", address: "Narengi, Guwahati", risk: "MEDIUM" as RiskLevel, reports: 0, surveys: 1, lastActive: "Mar 3, 2026" },
];

// ─── Cases ────────────────────────────────────────────────────────────────────
export type Severity = "SEVERE" | "MODERATE" | "MILD" | "RECOVERED";

export const CASES_DATA = [
  { id: "PAT-001", patient: "Rahul B.", age: 34, gender: "M", symptoms: ["Diarrhea", "Fever"], severity: "MODERATE" as Severity, status: "Under Treatment", reported: "Mar 8", disease: "Diarrhea", location: "781001", notes: "Patient responding to ORS therapy." },
  { id: "PAT-002", patient: "Anonymous", age: 12, gender: "M", symptoms: ["Vomiting", "Weakness", "Dehydration"], severity: "SEVERE" as Severity, status: "Hospitalized", reported: "Mar 7", disease: "Cholera", location: "781001", notes: "Admitted to Gauhati Medical College. IV fluids administered." },
  { id: "PAT-003", patient: "Meena G.", age: 28, gender: "F", symptoms: ["Diarrhea"], severity: "RECOVERED" as Severity, status: "Recovered", reported: "Mar 6", disease: "Diarrhea", location: "781001", notes: "Recovered after 2 days of ORS." },
  { id: "PAT-004", patient: "Anonymous", age: 67, gender: "M", symptoms: ["Fever", "Jaundice"], severity: "SEVERE" as Severity, status: "Under Treatment", reported: "Mar 6", disease: "Typhoid", location: "781017", notes: "Referred to district hospital. Jaundice worsening." },
  { id: "PAT-005", patient: "Sanjay N.", age: 52, gender: "M", symptoms: ["Vomiting"], severity: "RECOVERED" as Severity, status: "Recovered", reported: "Mar 5", disease: "Diarrhea", location: "781001", notes: "ORS sufficient. Recovered in 1 day." },
  { id: "PAT-006", patient: "Anonymous", age: 8, gender: "F", symptoms: ["Diarrhea", "Fever"], severity: "MODERATE" as Severity, status: "Under Treatment", reported: "Mar 5", disease: "Diarrhea", location: "781001", notes: "Child patient — monitoring closely." },
  { id: "PAT-007", patient: "Purnima D.", age: 23, gender: "F", symptoms: ["Weakness"], severity: "RECOVERED" as Severity, status: "Recovered", reported: "Mar 4", disease: "Other", location: "781005", notes: "Weakness resolved. Fatigue from dehydration." },
  { id: "PAT-008", patient: "Anonymous", age: 45, gender: "M", symptoms: ["Cholera suspected"], severity: "SEVERE" as Severity, status: "Hospitalized", reported: "Mar 4", disease: "Cholera", location: "781013", notes: "Rapid cholera test positive. Isolated ward." },
  { id: "PAT-009", patient: "Bikash D.", age: 41, gender: "M", symptoms: ["Abdominal pain"], severity: "MODERATE" as Severity, status: "Under Treatment", reported: "Mar 3", disease: "Other", location: "781001", notes: "Ultrasound booked. On supportive care." },
  { id: "PAT-010", patient: "Anonymous", age: 19, gender: "F", symptoms: ["Diarrhea"], severity: "RECOVERED" as Severity, status: "Recovered", reported: "Mar 2", disease: "Diarrhea", location: "781028", notes: "Recovered fully. Counseled on hygiene." },
];

// ─── Surveys ──────────────────────────────────────────────────────────────────
export const SURVEYS_DATA = [
  {
    id: "SRV-001",
    status: "active" as const,
    title: "Water Quality Feedback Survey",
    desc: "Understanding water issues in pincode 781001",
    target: "781001",
    responses: 47,
    maxResponses: 100,
    startDate: "Mar 1",
    closeDate: "Mar 15",
    questions: 5,
  },
  {
    id: "SRV-002",
    status: "active" as const,
    title: "Community Health Assessment Q1 2026",
    desc: "Quarterly health assessment for Guwahati district",
    target: "781001, 781013",
    responses: 23,
    maxResponses: 100,
    startDate: "Mar 5",
    closeDate: "Mar 20",
    questions: 8,
  },
  {
    id: "SRV-003",
    status: "closed" as const,
    title: "Monthly Symptom Tracker — February",
    desc: "Monthly household symptom tracking survey",
    target: "781001",
    responses: 89,
    maxResponses: 100,
    startDate: "Feb 1",
    closeDate: "Feb 28",
    questions: 6,
  },
  {
    id: "SRV-004",
    status: "closed" as const,
    title: "Water Source Mapping Survey",
    desc: "Mapping water sources across coverage area",
    target: "781001, 781017, 781028",
    responses: 64,
    maxResponses: 80,
    startDate: "Jan 20",
    closeDate: "Feb 15",
    questions: 4,
  },
];

// Survey results mock
export const SURVEY_RESULTS = {
  "SRV-001": {
    totalResponses: 47,
    completionRate: 88,
    questions: [
      { text: "How would you rate your tap water quality?", type: "rating", data: [2, 5, 10, 18, 12] },
      { text: "Have you experienced any water-borne symptoms this week?", type: "yesno", yes: 34, no: 13 },
      { text: "What is your primary water source?", type: "mcq", options: ["Tap", "River", "Well", "Tanker"], values: [28, 8, 5, 6] },
    ],
  },
};

// ─── Articles ─────────────────────────────────────────────────────────────────
export const ARTICLES_DATA = [
  {
    id: "ART-001",
    status: "published" as const,
    title: "How to Purify Water at Home: A Complete Guide",
    tags: ["Prevention", "Water Safety"],
    excerpt: "Safe drinking water is your first defense against water-borne diseases. Learn these simple steps to purify water at home with or without equipment.",
    author: "Priya Sharma",
    date: "Mar 8, 2026",
    views: 234,
    comments: 12,
  },
  {
    id: "ART-002",
    status: "published" as const,
    title: "5 Early Signs of Cholera You Must Not Ignore",
    tags: ["Cholera", "Emergency"],
    excerpt: "Cholera can escalate within hours. These 5 warning signs can help you act fast and prevent fatalities in your community.",
    author: "Priya Sharma",
    date: "Mar 5, 2026",
    views: 891,
    comments: 34,
  },
  {
    id: "ART-003",
    status: "draft" as const,
    title: "Monsoon Season Water Safety Guidelines",
    tags: ["Prevention", "Hygiene"],
    excerpt: "Monsoons bring risks of flood-contaminated water. Prepare your household with these evidence-based safety guidelines.",
    author: "Priya Sharma",
    date: "Mar 3, 2026",
    views: 0,
    comments: 0,
  },
  {
    id: "ART-004",
    status: "published" as const,
    title: "How ASHA Workers Are Saving Lives with AI",
    tags: ["Community"],
    excerpt: "Discover how frontline ASHA workers are leveraging AI-powered tools from Sanjeevani to detect outbreaks weeks before they happen.",
    author: "Priya Sharma",
    date: "Feb 28, 2026",
    views: 456,
    comments: 19,
  },
];

// ─── Shared risk colors ───────────────────────────────────────────────────────
export const RISK_COLOR: Record<RiskLevel, string> = {
  HIGH: "#E53935",
  MEDIUM: "#FB8C00",
  LOW: "#43A047",
};
export const RISK_BG: Record<RiskLevel, string> = {
  HIGH: "#FFEBEE",
  MEDIUM: "#FFF3E0",
  LOW: "#E8F5E9",
};

export const SEV_COLOR: Record<Severity, string> = {
  SEVERE: "#E53935",
  MODERATE: "#FB8C00",
  MILD: "#FDD835",
  RECOVERED: "#43A047",
};
export const SEV_BG: Record<Severity, string> = {
  SEVERE: "#FFEBEE",
  MODERATE: "#FFF3E0",
  MILD: "#FFFDE7",
  RECOVERED: "#E8F5E9",
};
export const SEV_EMOJI: Record<Severity, string> = {
  SEVERE: "🔴",
  MODERATE: "🟠",
  MILD: "🟡",
  RECOVERED: "✅",
};

export const MAP_MARKERS = [
  { pincode: "781001", name: "Kamrup East", lat: 26.1445, lng: 91.7362, risk: "HIGH" as RiskLevel, tds: 842, ph: 5.2, cases: 14, radius: 40, isYours: true },
  { pincode: "781017", name: "Azara", lat: 26.1244, lng: 91.6886, risk: "HIGH" as RiskLevel, tds: 710, ph: 5.1, cases: 11, radius: 35 },
  { pincode: "781013", name: "Jalukbari", lat: 26.1589, lng: 91.6763, risk: "MEDIUM" as RiskLevel, tds: 520, ph: 6.8, cases: 8, radius: 30 },
  { pincode: "781028", name: "Beltola", lat: 26.1197, lng: 91.7611, risk: "MEDIUM" as RiskLevel, tds: 620, ph: 6.4, cases: 6, radius: 28 },
  { pincode: "781005", name: "Dispur", lat: 26.1353, lng: 91.7898, risk: "LOW" as RiskLevel, tds: 310, ph: 7.2, cases: 2, radius: 20 },
  { pincode: "781026", name: "Narengi", lat: 26.1728, lng: 91.7987, risk: "LOW" as RiskLevel, tds: 280, ph: 7.5, cases: 1, radius: 18 },
  { pincode: "785001", name: "Jorhat", lat: 26.7509, lng: 94.2037, risk: "MEDIUM" as RiskLevel, tds: 490, ph: 6.9, cases: 5, radius: 32 },
  { pincode: "786001", name: "Dibrugarh", lat: 27.4728, lng: 94.9119, risk: "LOW" as RiskLevel, tds: 300, ph: 7.3, cases: 3, radius: 22 },
];
