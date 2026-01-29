import { useEffect, useState } from "react";
import {
  X,
  Megaphone,
  Bot,
  ShieldCheck,
  TrendingDown,
  Rocket,
} from "lucide-react";

const WelcomeModal = () => {
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen the welcome modal
    const hasSeen = localStorage.getItem("hasSeenWelcome");
    if (hasSeen) return;

    const timer = setTimeout(() => {
      setShow(true);
      // Small delay to trigger animation after mount
      setTimeout(() => setIsVisible(true), 10);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Mark as seen in localStorage
    localStorage.setItem("hasSeenWelcome", "true");
    // Wait for animation to finish before removing from DOM
    setTimeout(() => setShow(false), 500);
  };

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-start p-4 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-5xl md:max-w-4xl lg:max-w-5xl bg-[#1A1C20] border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-out ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-white/5 bg-gradient-to-r from-[#25282C] to-[#1A1C20]">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            Welcome to <span className="text-[#ECECEC]">MindBuddy</span> 🧠
          </h2>
          <button
            onClick={handleClose}
            className="p-1.5 md:p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 space-y-4 md:space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 gap-y-4 md:gap-y-6">
            {[
              {
                icon: <Megaphone className="text-emerald-400" size={20} />,
                title: "Just be yourself",
                desc: "Think of this as your private work diary. Vent about a tough meeting or celebrate a small win.",
              },
              {
                icon: <Bot className="text-purple-400" size={20} />,
                title: "I’m here to listen",
                desc: "I’ll actually read what you say and reply with real support to help you get through your day.",
              },
              {
                icon: <ShieldCheck className="text-white" size={20} />,
                title: "Your secret is safe",
                desc: "I never tell your boss who said what. They only see team trends, so you can be 100% honest.",
              },
              {
                icon: <TrendingDown className="text-orange-400" size={20} />,
                title: "No more burnout",
                desc: "Catch stress early and fix culture issues before they get too overwhelming.",
              },
              {
                icon: <Rocket className="text-red-400" size={20} />,
                title: "Make work better",
                desc: "Your feedback helps your company understand exactly what they need to do to support you.",
              },
            ].map((point, index) => (
              <div key={index} className="flex gap-3 md:gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  {point.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base md:text-lg">
                    {point.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-white/[0.02] flex justify-end">
          <button
            onClick={handleClose}
            className="px-8 py-3 bg-[#2F2F2F] hover:bg-[#424242] text-white font-bold rounded-xl border border-[#3E3E3E] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
