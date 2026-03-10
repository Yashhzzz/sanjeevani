import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Droplets, Loader2 } from "lucide-react";
import { useAuth, UserRole, DEMO_ACCOUNTS } from "@/lib/auth";

type Role = UserRole;

const ROLES: { id: Role; label: string; emoji: string; subtitle: string }[] = [
  { id: "citizen", label: "Citizen", emoji: "👤", subtitle: "Access your personal health alerts and community reports" },
  { id: "asha", label: "ASHA Worker", emoji: "👩‍⚕️", subtitle: "Manage community cases, surveys, and health advisories" },
  { id: "hospital", label: "Hospital", emoji: "🏥", subtitle: "Monitor patients and report disease cases to the network" },
];

const TRUST_PILLS = [
  { icon: "🛡️", text: "12 Districts Protected" },
  { icon: "📡", text: "97.3% Detection Rate" },
  { icon: "👥", text: "2,400+ Health Workers" },
];

const DASHBOARD_ROUTES: Record<Role, string> = {
  citizen: "/dashboard/citizen",
  asha: "/dashboard/asha",
  hospital: "/dashboard/hospital",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [selectedRole, setSelectedRole] = useState<Role>("citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const roleData = ROLES.find((r) => r.id === selectedRole)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("Please enter your email."); return; }
    if (!password.trim()) { setError("Please enter your password."); return; }
    try {
      await login(email, password, selectedRole);
      navigate(DASHBOARD_ROUTES[selectedRole]);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleDemo = async (role: Role) => {
    setError("");
    setSelectedRole(role);
    const demo = DEMO_ACCOUNTS[role];
    setEmail(demo.email);
    setPassword("demo1234");
    try {
      await login(demo.email, "demo1234", role);
      navigate(DASHBOARD_ROUTES[role]);
    } catch {
      setError("Demo login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ═══════════════════════════════════════
          LEFT PANEL — Dark nature illustration
      ═══════════════════════════════════════ */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative md:w-[45%] bg-[#0D1F1A] flex flex-col items-center justify-center overflow-hidden
                   h-[120px] md:h-auto md:min-h-screen shrink-0"
      >
        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/hero-landscape.jpg')" }}
        />

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #4ADE80 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Soft radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[360px] h-[360px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)" }}
          />
        </div>

        {/* Content — hidden on mobile (banner-only) */}
        <div className="relative z-10 hidden md:flex flex-col items-center text-center px-10 gap-8">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#22C55E]/30 to-[#16A34A]/20 border border-white/10 flex items-center justify-center shadow-2xl">
              <Droplets className="w-10 h-10 text-[#4ADE80]" />
            </div>
            <div>
              <h1 className="font-display text-4xl font-bold text-white tracking-tight leading-none">
                Sanjeevani
              </h1>
              <p className="mt-2 text-[#86EFAC] text-sm font-medium leading-snug max-w-[260px]">
                AI-powered early warning for water-borne outbreaks
              </p>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-16 h-px bg-white/10" />

          {/* Trust pills */}
          <div className="flex flex-col gap-3">
            {TRUST_PILLS.map((pill, i) => (
              <motion.div
                key={pill.text}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/8 border border-white/10 text-white/80 text-sm backdrop-blur-sm"
              >
                <span className="text-base">{pill.icon}</span>
                <span className="font-medium">{pill.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Bottom quote */}
          <p className="text-white/30 text-xs leading-relaxed max-w-[240px] mt-4">
            Protecting communities of Northeast India through intelligent, real-time health surveillance.
          </p>
        </div>

        {/* Mobile — logo only (shown inside banner strip) */}
        <div className="md:hidden flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 rounded-lg bg-[#22C55E]/20 border border-white/10 flex items-center justify-center">
            <Droplets className="w-5 h-5 text-[#4ADE80]" />
          </div>
          <span className="font-display text-xl font-bold text-white">Sanjeevani</span>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════
          RIGHT PANEL — Login form
      ═══════════════════════════════════════ */}
      <div className="flex-1 bg-[#FAFAFA] flex items-center justify-center px-6 py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[420px]"
        >
          {/* Heading */}
          <div className="mb-8">
            <h2 className="font-display text-[32px] font-bold text-[#0D1F1A] leading-tight">
              Welcome back
            </h2>
            <p className="mt-1.5 text-sm text-[#6B7B74]">
              Sign in to your Sanjeevani account
            </p>
          </div>

          {/* Role selector tabs */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-[#6B7B74] uppercase tracking-wider mb-3">
              Sign in as
            </p>
            <div className="flex gap-2">
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => { setSelectedRole(role.id); setError(""); }}
                  className={`flex-1 flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D1F1A]/30 ${
                    selectedRole === role.id
                      ? "bg-[#0D1F1A] text-white border-[#0D1F1A] shadow-md"
                      : "bg-white text-[#6B7B74] border-[#E2E9E6] hover:border-[#0D1F1A]/30 hover:text-[#0D1F1A]"
                  }`}
                >
                  <span className="text-base leading-none">{role.emoji}</span>
                  <span className="leading-none">{role.label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={selectedRole}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.22 }}
                className="mt-3 text-xs text-[#6B7B74] leading-relaxed"
              >
                {roleData.subtitle}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#3D5247] mb-1.5" htmlFor="login-email">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9BADA6] pointer-events-none" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E2E9E6] bg-white text-sm text-[#0D1F1A] placeholder:text-[#B8C9C3] focus:outline-none focus:ring-2 focus:ring-[#0D1F1A]/20 focus:border-[#0D1F1A]/40 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#3D5247] mb-1.5" htmlFor="login-password">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9BADA6] pointer-events-none" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-[#E2E9E6] bg-white text-sm text-[#0D1F1A] placeholder:text-[#B8C9C3] focus:outline-none focus:ring-2 focus:ring-[#0D1F1A]/20 focus:border-[#0D1F1A]/40 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9BADA6] hover:text-[#0D1F1A] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`w-4 h-4 rounded-[4px] border-2 flex items-center justify-center transition-all cursor-pointer ${
                      rememberMe
                        ? "bg-[#0D1F1A] border-[#0D1F1A]"
                        : "bg-white border-[#C5D3CE] group-hover:border-[#0D1F1A]/40"
                    }`}
                  >
                    {rememberMe && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-xs text-[#6B7B74] select-none">Remember me</span>
              </label>
              <a href="#" className="text-xs font-medium text-[#0D7A4A] hover:text-[#0D1F1A] transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 5v3M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.01 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full py-3 rounded-xl bg-[#0D1F1A] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#1A3D2B] disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#0D1F1A]/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  {roleData.emoji} Sign In as {roleData.label}
                </>
              )}
            </motion.button>
          </form>

          {/* Demo login shortcuts */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E8EFEC]" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#FAFAFA] px-3 text-[11px] text-[#9BADA6] font-medium">
                  Try a demo account
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {ROLES.map((role) => (
                <motion.button
                  key={role.id}
                  onClick={() => handleDemo(role.id)}
                  disabled={isLoading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 py-2 px-2 rounded-xl border border-[#E2E9E6] bg-white text-[11px] font-semibold text-[#3D5247] hover:border-[#0D1F1A]/30 hover:bg-[#F4F9F7] hover:text-[#0D1F1A] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {role.emoji} Demo {role.label.split(" ")[0]}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Signup link */}
          <p className="mt-6 text-center text-xs text-[#6B7B74]">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[#0D7A4A] hover:text-[#0D1F1A] transition-colors"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
