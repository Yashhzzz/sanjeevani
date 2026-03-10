import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Stethoscope } from "lucide-react";

type MessageSide = "bot" | "user";
interface Message { id: number; side: MessageSide; text: string }

const QUICK_REPLIES = ["📊 Case trends?", "🗺️ Outbreak hotspots?", "💊 Cholera protocol?", "📋 Survey insights?", "📢 Draft advisory?"];

const BOT_RESPONSES: Record<string, string> = {
  "📊 Case trends?": `📊 Case Trends — Pincode 781001 (Last 7 Days):\n\n🔴 Severe: 3 (↑+1 since last week)\n🟠 Moderate: 11 (↓-2)\n🟡 Mild: 9 (stable)\n✅ Recovered: 24 (↑+6)\n\nTotal active cases: 23\nMost common symptom: Diarrhea (71% of cases)\nLikely cause: High TDS contamination (842 ppm)\n\n📢 Recommendation: Escalate to PHC for mass ORS distribution.`,
  "🗺️ Outbreak hotspots?": `🗺️ Outbreak Hotspots in Your Coverage Area:\n\n1. 🔴 Kamrup East (781001) — Your Area\n   TDS: 842 ppm | pH: 5.2 | Cases: 14\n\n2. 🔴 Azara (781017)\n   TDS: 710 ppm | pH: 5.1 | Cases: 11\n\n3. 🟠 Jalukbari (781013)\n   TDS: 520 ppm | Cases: 8\n\n⚠️ AI model predicts 85% probability of Cholera outbreak in 781001 within 72 hours without intervention.\n\n🏥 Immediate action: Coordinate with PHC Dispur for water testing.`,
  "💊 Cholera protocol?": `💊 Cholera Response Protocol (NHM Assam):\n\n1. IDENTIFY: Sudden watery diarrhea + rapid dehydration\n2. ISOLATE: Immediately separate patient\n3. HYDRATE: Start ORS — 200ml per loose stool\n4. REPORT: Submit case via Sanjeevani app (PAT-ID assigned)\n5. ESCALATE: If severe → PHC Dispur emergency line\n6. CONTAIN: Alert neighbors, boiling water advisory\n7. TRACE: Identify water source, test sample\n\n📞 District RRT: 0361-2XX-XXXX\n📱 NHM 24×7: 1800-XXX-XXXX`,
  "📋 Survey insights?": `📋 Survey Insights — Water Quality Survey (SRV-001):\n\n📊 47 responses (47% target reached)\n\n🔍 Key findings:\n• 64% rated water quality as Poor or Very Poor\n• 72% experienced symptoms in the last week\n• 59% rely on tap water as primary source\n• Only 31% currently boil water before drinking\n\n💡 Immediate action items:\n1. Send boiling water advisory via SMS today\n2. Arrange clean water supply at PHC for 3 days\n3. Follow up with citizens using river water directly`,
  "📢 Draft advisory?": `📝 Suggested Advisory Draft (Copy & Edit):\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\nHEALTH ADVISORY — Pincode 781001\nDate: March 10, 2026 | From: ASHA Worker Priya Sharma\n\n⚠️ WATER CONTAMINATION ALERT\nTDS levels have exceeded safe limits (842 ppm) in your area's municipal supply. Do NOT drink tap water without boiling.\n\n✅ DO:\n• Boil water 10 min before drinking\n• Use ORS if experiencing diarrhea\n• Wash hands with soap frequently\n\n🚫 AVOID:\n• Raw vegetables washed with tap water\n• Open water sources\n\nFor emergencies: PHC Dispur — 0361-2XX-XXXX\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nReady to post as article or send via SMS?`,
  default: `I can help with your ASHA work. Try asking me about:\n• Case trends and severity analysis\n• Outbreak hotspot identification\n• Disease response protocols\n• Survey response insights\n• Drafting community advisories`,
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1, side: "bot",
    text: `Hello Priya! 👋 Here's your area summary:\n\n📍 Coverage: Pincode 781001\n⚠️ Current Risk: MEDIUM\n🦠 Active Cases: 23\n📋 Surveys Pending: 8\n\nHow can I assist you today?`
  },
];

export default function AshaChat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const GEMINI_API_KEY =
    import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyA9n_DHvPsrrVJJR7NobmtfMAsNrb0U5Z4";

  const send = async (text: string) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { id: Date.now(), side: "user", text }]);
    setInput("");
    setIsTyping(true);

    try {
      const systemInstruction = "You are the Sanjeevani AI Assistant optimized for ASHA Workers. You cover pincode 781001. There are 23 active cases and the risk is MEDIUM. Provide concise, actionable advice for field workers about disease protocols, outbreak tracking, and patient management. Format nicely with markdown and emojis.";
      
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: { text: systemInstruction } },
          contents: [{ parts: [{ text: text }] }]
        })
      });
      
      if (!res.ok) throw new Error("API Error");
      const data = await res.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that.";
      
      setMessages(m => [...m, { id: Date.now() + 1, side: "bot", text: responseText }]);
    } catch (e) {
      console.error(e);
      setMessages(m => [...m, { id: Date.now() + 1, side: "bot", text: "Connection error. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-0">
      <div className="mb-5">
        <h2 className="font-display text-[24px] font-bold text-[#0D1F1A]">Sanjeevani AI Assistant</h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-green-600 font-medium">Online ·</span>
          <span className="text-sm text-gray-500">ASHA-optimized AI</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chat (65%) */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col" style={{ height: 580 }}>
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-3 ${msg.side === "user" ? "flex-row-reverse" : ""}`}>
                {msg.side === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-[#E8F5EE] border border-[#C8EBD8] flex items-center justify-center shrink-0 mt-0.5">
                    <Stethoscope className="w-4 h-4 text-[#0D7A4A]" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${msg.side === "bot" ? "bg-gray-50 text-gray-700 rounded-tl-none" : "bg-[#0D7A4A] text-white rounded-tr-none"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E8F5EE] border border-[#C8EBD8] flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 text-[#0D7A4A]" />
                </div>
                <div className="bg-gray-50 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
                  {[0, 0.15, 0.3].map((delay, i) => (
                    <motion.div key={i} className="w-2 h-2 rounded-full bg-[#0D7A4A]" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, delay, repeat: Infinity }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          {/* Quick replies */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto border-t border-gray-50 no-scrollbar">
            {QUICK_REPLIES.map(qr => (
              <button key={qr} onClick={() => send(qr)} className="shrink-0 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-600 hover:border-[#0D7A4A] hover:text-[#0D7A4A] transition-colors bg-white">{qr}</button>
            ))}
          </div>
          {/* Input */}
          <div className="p-4 border-t border-gray-100 flex gap-3">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send(input)}
              placeholder="Ask me anything about your patients, surveys, or protocols…"
              className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7A4A]/20" />
            <button onClick={() => send(input)} className="w-10 h-10 rounded-full bg-[#0D7A4A] text-white flex items-center justify-center hover:bg-[#0D1F1A] transition-colors shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sidebar (35%) */}
        <div className="space-y-4">
          {/* Coverage summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h4 className="font-display font-bold text-[#0D1F1A] mb-3 text-sm">Your Coverage Summary</h4>
            <div className="space-y-2.5">
              {[{ label: "Active Cases", value: "23", color: "#E53935" }, { label: "High Risk Citizens", value: "89", color: "#E53935" }, { label: "Surveys Active", value: "2", color: "#0D7A4A" }, { label: "Citizens Covered", value: "248", color: "#0D1F1A" }].map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{s.label}</span>
                  <span className="font-mono font-bold text-sm" style={{ color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outbreak protocols */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h4 className="font-display font-bold text-[#0D1F1A] mb-3 text-sm">Outbreak Protocols</h4>
            <div className="space-y-2">
              {[{ icon: "🦠", label: "Cholera Response →", color: "#E53935" }, { icon: "🤒", label: "Typhoid Protocol →", color: "#FB8C00" }, { icon: "📢", label: "Mass Alert Procedure →", color: "#1565C0" }].map(p => (
                <button key={p.label} onClick={() => send(`💊 Cholera protocol?`)} className="w-full flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-left text-xs font-semibold hover:bg-gray-50 transition-colors border border-gray-100" style={{ color: p.color }}>
                  <span>{p.icon}</span>{p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Helpline */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h4 className="font-display font-bold text-[#0D1F1A] mb-3 text-sm">ASHA Helpline</h4>
            <div className="space-y-2.5">
              {[{ icon: "🏛️", label: "District Officer", number: "0361-2XX-XXXX" }, { icon: "🏥", label: "PHC Dispur", number: "0361-2XX-XXXX" }, { icon: "🆘", label: "NHM Assam", number: "1800-XXX-XXXX" }].map(c => (
                <div key={c.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><span>{c.icon}</span><span className="text-xs font-medium text-[#0D1F1A]">{c.label}</span></div>
                  <span className="text-xs font-mono text-[#0D7A4A] font-semibold">{c.number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
