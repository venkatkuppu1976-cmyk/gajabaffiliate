import React from "react";
import { Send, MessageCircle, Instagram, Copy } from "lucide-react";
import { toast } from "sonner";
import { ambassador } from "@/data/mockData";

const PITCH = `Hey! 🔥 Found India's most fun bargain marketplace — *Gajab*.\nTons of great deals — RC cars, gadgets, skincare combos, everything.\n\nUse my link for exclusive cashback 👇\n${ambassador.affiliateLink}`;
const SHORT = `Bargain marketplace with crazy deals 🔥 use my link: ${ambassador.affiliateLink}`;

export default function ShareRow({ compact = false }) {
  const copyAndToast = async (text, msg) => {
    try { await navigator.clipboard.writeText(text); toast.success(msg); }
    catch { toast.error("Copy failed — please copy manually"); }
  };

  const whatsapp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(PITCH)}`, "_blank", "noopener");
    toast.success("WhatsApp opened — pick your chat");
  };

  const telegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(ambassador.affiliateLink)}&text=${encodeURIComponent(SHORT)}`, "_blank", "noopener");
    toast.success("Telegram opened — pick your chat");
  };

  const insta = () => {
    copyAndToast(SHORT, "Caption copied — paste in your Insta Story");
    window.open("https://www.instagram.com/", "_blank", "noopener");
  };

  const copyLink = () => copyAndToast(ambassador.affiliateLink, "Link copied!");

  const size = compact ? "h-9 px-3 text-xs" : "h-10 px-4 text-sm";

  return (
    <div className="flex flex-wrap gap-2" data-testid="share-row">
      <button onClick={whatsapp} className={`${size} inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white font-bold shadow-[0_4px_12px_rgba(37,211,102,0.30)] hover:-translate-y-0.5 transition-all`} data-testid="share-whatsapp">
        <MessageCircle className="w-4 h-4" strokeWidth={2.5} /> WhatsApp
      </button>
      <button onClick={insta} className={`${size} inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white font-bold shadow-[0_4px_12px_rgba(221,42,123,0.30)] hover:-translate-y-0.5 transition-all`} data-testid="share-instagram">
        <Instagram className="w-4 h-4" strokeWidth={2.5} /> Insta Story
      </button>
      <button onClick={telegram} className={`${size} inline-flex items-center justify-center gap-2 rounded-xl bg-[#0088CC] text-white font-bold shadow-[0_4px_12px_rgba(0,136,204,0.30)] hover:-translate-y-0.5 transition-all`} data-testid="share-telegram">
        <Send className="w-4 h-4" strokeWidth={2.5} /> Telegram
      </button>
      <button onClick={copyLink} className={`${size} inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#1B2D54] font-bold border border-white/40 hover:bg-white/90 transition-all`} data-testid="share-copy">
        <Copy className="w-4 h-4" strokeWidth={2.5} /> Copy
      </button>
    </div>
  );
}
