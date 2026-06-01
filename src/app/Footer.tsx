import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#030507", borderTop: "1px solid rgba(201,145,42,0.1)" }}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #c9912a, #e8b84b)" }}>
                <span className="font-display font-bold text-black text-sm">AM</span>
              </div>
              <span className="font-display text-lg font-semibold gold-text">Ahmed Memon</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Building intelligent AI solutions — automations, voice agents, and transformative courses for the modern business.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-600 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Services", "Courses", "Pricing", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={`/#${item.toLowerCase()}`} className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-600 mb-4">Get In Touch</h4>
            <a
              href="https://wa.me/923368952826"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)", color: "#25d366" }}
            >
              <MessageCircle size={16} />
              WhatsApp: 03368952826
            </a>
            <p className="text-gray-500 text-xs mt-4 leading-relaxed">
              Payment required before work begins. Send transaction screenshot on WhatsApp after payment.
            </p>
          </div>
        </div>

        <hr className="section-divider my-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} Ahmed Memon. All rights reserved.</p>
          <p className="text-gray-700 text-xs font-mono">AI Automation · Voice Agents · Courses</p>
        </div>
      </div>
    </footer>
  );
}