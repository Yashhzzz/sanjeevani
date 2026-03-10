// ─── Hospital Dashboard Mock Data ────────────────────────────────────────────

export const HOSPITAL = {
  name: "Gauhati Medical College",
  initials: "GM",
  email: "gmch@hospital.gov.in",
  phone: "+91 0361-2XX-XXXX",
  address: "Bhangagarh, Guwahati",
  pincode: "781005",
  district: "Kamrup",
  state: "Assam",
  headDoctor: "Dr. R. Sharma",
  activeSince: "January 2025",
};

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
export const HOSP_STATS = {
  totalPatients: 1284,
  patientsThisMonth: 23,
  cases30Days: 67,
  casesDelta: 12,
  activeAlerts: 5,
  alertsHigh: 2,
  alertsMedium: 2,
  alertsLow: 1,
};

// ─── Alerts Summary ───────────────────────────────────────────────────────────
export type RiskLevel = "HIGH" | "MEDIUM" | "LOW";

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

export const ALERT_SUMMARY = [
  { pincode: "781001", name: "Kamrup East", risk: "HIGH" as RiskLevel, cases: 14, ago: "2h ago" },
  { pincode: "781017", name: "Azara", risk: "HIGH" as RiskLevel, cases: 11, ago: "3h ago" },
  { pincode: "781013", name: "Jalukbari", risk: "MEDIUM" as RiskLevel, cases: 8, ago: "5h ago" },
  { pincode: "781028", name: "Beltola", risk: "MEDIUM" as RiskLevel, cases: 6, ago: "6h ago" },
  { pincode: "781005", name: "Dispur", risk: "LOW" as RiskLevel, cases: 2, ago: "8h ago" },
];

// ─── SVG Map markers ──────────────────────────────────────────────────────────
export const MAP_MARKERS = [
  { pincode: "781001", name: "Kamrup East", lat: 26.1445, lng: 91.7362, risk: "HIGH" as RiskLevel, tds: 842, ph: 5.2, cases: 14, radius: 38 },
  { pincode: "781017", name: "Azara", lat: 26.1244, lng: 91.6886, risk: "HIGH" as RiskLevel, tds: 710, ph: 5.1, cases: 11, radius: 32 },
  { pincode: "781013", name: "Jalukbari", lat: 26.1589, lng: 91.6763, risk: "MEDIUM" as RiskLevel, tds: 520, ph: 6.8, cases: 8, radius: 28 },
  { pincode: "781028", name: "Beltola", lat: 26.1197, lng: 91.7611, risk: "MEDIUM" as RiskLevel, tds: 620, ph: 6.4, cases: 6, radius: 26 },
  { pincode: "781005", name: "Dispur 🏥", lat: 26.1353, lng: 91.7898, risk: "LOW" as RiskLevel, tds: 310, ph: 7.2, cases: 2, radius: 20, isHospital: true },
  { pincode: "781026", name: "Narengi", lat: 26.1728, lng: 91.7987, risk: "LOW" as RiskLevel, tds: 280, ph: 7.5, cases: 1, radius: 18 },
  { pincode: "785001", name: "Jorhat", lat: 26.7509, lng: 94.2037, risk: "MEDIUM" as RiskLevel, tds: 490, ph: 6.9, cases: 5, radius: 30 },
  { pincode: "786001", name: "Dibrugarh", lat: 27.4728, lng: 94.9119, risk: "LOW" as RiskLevel, tds: 300, ph: 7.3, cases: 3, radius: 20 },
];

// ─── Line chart data ──────────────────────────────────────────────────────────
export const CASE_TREND_DATA = [
  { date: "Mar 1", total: 4, severe: 1 },
  { date: "Mar 2", total: 6, severe: 2 },
  { date: "Mar 3", total: 7, severe: 1 },
  { date: "Mar 4", total: 8, severe: 2 },
  { date: "Mar 5", total: 10, severe: 3 },
  { date: "Mar 6", total: 12, severe: 2 },
  { date: "Mar 7", total: 18, severe: 4 },
  { date: "Mar 8", total: 15, severe: 3 },
  { date: "Mar 9", total: 11, severe: 2 },
];

// ─── Recent cases ─────────────────────────────────────────────────────────────
export type Severity = "SEVERE" | "MODERATE" | "MILD" | "RECOVERED";

export const SEV_COLOR: Record<Severity, string> = {
  SEVERE: "#E53935",
  MODERATE: "#FB8C00",
  MILD: "#F59E0B",
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

export const RECENT_CASES = [
  { id: "CASE-067", age: 34, gender: "M", symptoms: ["Diarrhea", "Fever"], severity: "MODERATE" as Severity, status: "Under Treatment", date: "Mar 8", disease: "Suspected Cholera" },
  { id: "CASE-066", age: 12, gender: "F", symptoms: ["Vomiting", "Dehydration"], severity: "SEVERE" as Severity, status: "Hospitalized", date: "Mar 7", disease: "Cholera" },
  { id: "CASE-065", age: 67, gender: "M", symptoms: ["Jaundice", "Fever"], severity: "SEVERE" as Severity, status: "Hospitalized", date: "Mar 7", disease: "Typhoid" },
  { id: "CASE-064", age: 28, gender: "F", symptoms: ["Diarrhea"], severity: "MILD" as Severity, status: "Recovered", date: "Mar 6", disease: "Diarrhea" },
  { id: "CASE-063", age: 45, gender: "M", symptoms: ["Abdominal pain"], severity: "MODERATE" as Severity, status: "Under Treatment", date: "Mar 6", disease: "Suspected Typhoid" },
  { id: "CASE-062", age: 19, gender: "F", symptoms: ["Weakness", "Vomiting"], severity: "MILD" as Severity, status: "Recovered", date: "Mar 5", disease: "Gastroenteritis" },
];

// ─── All cases ────────────────────────────────────────────────────────────────
export const ALL_CASES = [
  { id: "CASE-067", patient: "Arun K.", age: 45, gender: "M", disease: "Suspected Cholera", symptoms: ["Diarrhea", "Fever"], severity: "MODERATE" as Severity, status: "Under Treatment", reported: "Mar 8", pincode: "781028", notes: "Responding to ORS. Watch for progression." },
  { id: "CASE-066", patient: "Sunita B.", age: 32, gender: "F", disease: "Cholera", symptoms: ["Vomiting", "Dehydration"], severity: "SEVERE" as Severity, status: "Hospitalized", reported: "Mar 7", pincode: "781013", notes: "IV fluids. Stool culture pending." },
  { id: "CASE-065", patient: "Manish G.", age: 67, gender: "M", disease: "Typhoid", symptoms: ["Jaundice", "Fever"], severity: "SEVERE" as Severity, status: "Hospitalized", reported: "Mar 7", pincode: "781017", notes: "Widal test positive. Antibiotics started." },
  { id: "CASE-064", patient: "Walk-in", age: 8, gender: "F", disease: "Diarrhea", symptoms: ["Diarrhea"], severity: "MILD" as Severity, status: "Recovered", reported: "Mar 6", pincode: "781001", notes: "ORS sufficient. Discharged." },
  { id: "CASE-063", patient: "Rajan N.", age: 52, gender: "M", disease: "Suspected Typhoid", symptoms: ["Abdominal pain"], severity: "MODERATE" as Severity, status: "Under Treatment", reported: "Mar 6", pincode: "781005", notes: "Blood culture ordered." },
  { id: "CASE-062", patient: "Anita S.", age: 29, gender: "F", disease: "Gastroenteritis", symptoms: ["Weakness", "Vomiting"], severity: "MILD" as Severity, status: "Recovered", reported: "Mar 5", pincode: "781026", notes: "Recovered. Dietary advice given." },
  { id: "CASE-061", patient: "Biren D.", age: 41, gender: "M", disease: "Diarrhea", symptoms: ["Diarrhea", "Fever", "Weakness"], severity: "MODERATE" as Severity, status: "Under Treatment", reported: "Mar 5", pincode: "781028", notes: "Stable. ORS + antibiotics." },
  { id: "CASE-060", patient: "Rekha B.", age: 55, gender: "F", disease: "Cholera", symptoms: ["Vomiting", "Dehydration", "Weakness"], severity: "SEVERE" as Severity, status: "Hospitalized", reported: "Mar 4", pincode: "781001", notes: "ICU admission. Critical watch." },
  { id: "CASE-059", patient: "Walk-in", age: 22, gender: "M", disease: "Typhoid", symptoms: ["Fever", "Headache"], severity: "MILD" as Severity, status: "Under Treatment", reported: "Mar 4", pincode: "781001", notes: "Outpatient. Prescribed paracetamol + monitoring." },
  { id: "CASE-058", patient: "Walk-in", age: 63, gender: "M", disease: "Hepatitis A", symptoms: ["Jaundice", "Abdominal pain", "Fever"], severity: "SEVERE" as Severity, status: "Hospitalized", reported: "Mar 3", pincode: "781017", notes: "LFT: elevated. Supportive care." },
];

// ─── Patients ─────────────────────────────────────────────────────────────────
export const PATIENTS_DATA = [
  { id: "P-001", name: "Arun Kalita", age: 45, gender: "M", phone: "98540-11111", address: "Beltola", pincode: "781028", lastVisit: "Mar 8, 2026", risk: "MEDIUM" as RiskLevel, history: "Hypertension. No known allergies.", email: "" },
  { id: "P-002", name: "Sunita Borah", age: 32, gender: "F", phone: "94351-22222", address: "Jalukbari", pincode: "781013", lastVisit: "Mar 7, 2026", risk: "MEDIUM" as RiskLevel, history: "No significant history.", email: "" },
  { id: "P-003", name: "Manish Gogoi", age: 67, gender: "M", phone: "70001-33333", address: "Azara", pincode: "781017", lastVisit: "Mar 7, 2026", risk: "HIGH" as RiskLevel, history: "Diabetes Type 2. BP medication.", email: "" },
  { id: "P-004", name: "Dipika Das", age: 8, gender: "F", phone: "86001-44444", address: "Kamrup East", pincode: "781001", lastVisit: "Mar 6, 2026", risk: "HIGH" as RiskLevel, history: "No significant history.", email: "" },
  { id: "P-005", name: "Rajan Nath", age: 52, gender: "M", phone: "94010-55555", address: "Dispur", pincode: "781005", lastVisit: "Mar 5, 2026", risk: "LOW" as RiskLevel, history: "Seasonal allergies.", email: "" },
  { id: "P-006", name: "Anita Sharma", age: 29, gender: "F", phone: "98540-66666", address: "Narengi", pincode: "781026", lastVisit: "Mar 5, 2026", risk: "LOW" as RiskLevel, history: "No significant history.", email: "" },
  { id: "P-007", name: "Biren Dutta", age: 41, gender: "M", phone: "70099-77777", address: "Beltola", pincode: "781028", lastVisit: "Mar 4, 2026", risk: "MEDIUM" as RiskLevel, history: "Asthma. Inhaler prescribed.", email: "" },
  { id: "P-008", name: "Rekha Baruah", age: 55, gender: "F", phone: "86010-88888", address: "Kamrup East", pincode: "781001", lastVisit: "Mar 3, 2026", risk: "HIGH" as RiskLevel, history: "Post-cardiac surgery (2022). On blood thinners.", email: "" },
  { id: "P-009", name: "Kamal Choudhury", age: 38, gender: "M", phone: "98010-99999", address: "Dispur", pincode: "781005", lastVisit: "Mar 2, 2026", risk: "LOW" as RiskLevel, history: "No significant history.", email: "" },
  { id: "P-010", name: "Priti Hazarika", age: 26, gender: "F", phone: "94020-11122", address: "Jalukbari", pincode: "781013", lastVisit: "Mar 1, 2026", risk: "MEDIUM" as RiskLevel, history: "Iron deficiency anemia.", email: "" },
  { id: "P-011", name: "Dulal Sarma", age: 72, gender: "M", phone: "70020-33344", address: "Azara", pincode: "781017", lastVisit: "Feb 28, 2026", risk: "HIGH" as RiskLevel, history: "COPD. Diabetes. Multiple medications.", email: "" },
  { id: "P-012", name: "Binita Das", age: 21, gender: "F", phone: "86020-55566", address: "Narengi", pincode: "781026", lastVisit: "Feb 27, 2026", risk: "LOW" as RiskLevel, history: "No significant history.", email: "" },
];

// ─── Reports analytics ────────────────────────────────────────────────────────
export const DISEASE_PIE = [
  { name: "Cholera", value: 34, color: "#E53935" },
  { name: "Typhoid", value: 28, color: "#FB8C00" },
  { name: "Diarrhea", value: 24, color: "#F59E0B" },
  { name: "Hepatitis A", value: 9, color: "#1565C0" },
  { name: "Other", value: 5, color: "#9CA3AF" },
];

export const WEEKLY_BAR = [
  { day: "Mon", severe: 2, moderate: 4, mild: 3 },
  { day: "Tue", severe: 1, moderate: 3, mild: 5 },
  { day: "Wed", severe: 3, moderate: 5, mild: 2 },
  { day: "Thu", severe: 1, moderate: 4, mild: 4 },
  { day: "Fri", severe: 4, moderate: 6, mild: 3 },
  { day: "Sat", severe: 2, moderate: 3, mild: 2 },
  { day: "Sun", severe: 1, moderate: 2, mild: 1 },
];

export const AGE_BAR = [
  { group: "0–18", cases: 12 },
  { group: "19–30", cases: 18 },
  { group: "31–45", cases: 21 },
  { group: "46–60", cases: 9 },
  { group: "60+", cases: 7 },
];

export const PINCODE_TABLE = [
  { pincode: "781001", area: "Kamrup East", cases: 18, severe: 4, moderate: 8, mild: 6, risk: "HIGH" as RiskLevel },
  { pincode: "781017", area: "Azara", cases: 14, severe: 3, moderate: 6, mild: 5, risk: "HIGH" as RiskLevel },
  { pincode: "781013", area: "Jalukbari", cases: 11, severe: 1, moderate: 5, mild: 5, risk: "MEDIUM" as RiskLevel },
  { pincode: "781028", area: "Beltola", cases: 9, severe: 0, moderate: 4, mild: 5, risk: "MEDIUM" as RiskLevel },
  { pincode: "781005", area: "Dispur", cases: 4, severe: 0, moderate: 1, mild: 3, risk: "LOW" as RiskLevel },
  { pincode: "781026", area: "Narengi", cases: 3, severe: 0, moderate: 0, mild: 3, risk: "LOW" as RiskLevel },
];
