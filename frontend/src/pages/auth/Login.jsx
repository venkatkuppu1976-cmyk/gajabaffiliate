import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/components/Logo";

export default function Login() {
  const nav = useNavigate();
  const [mode, setMode] = useState("phone");
  const [val, setVal] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!val) { toast.error("Enter your phone or email"); return; }
    toast.success("OTP sent! (demo: use 123456)");
    nav("/verify");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT visual */}
      <div className="hidden lg:flex relative bg-[#E11D2A] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #FFC93C 0%, transparent 40%), radial-gradient(circle at 80% 70%, #FFC93C 0%, transparent 40%)" }} />
        <div className="relative p-12 flex flex-col justify-between w-full">
          <Logo size="lg" />
          <div>
            <p className="gajab-sticker-yellow inline-block mb-4">🏆 Top earners</p>
            <h2 className="font-display text-5xl font-extrabold leading-none">Welcome back,<br />Gajab champ.</h2>
            <p className="mt-4 text-white/80 max-w-md">Your dashboard's been waiting. New orders, leaderboard moves, and fresh tasks — all inside.</p>
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
              <div className="bg-white/10 border-2 border-white/30 rounded-xl p-3 backdrop-blur"><p className="text-xs opacity-70">This month</p><p className="font-display text-2xl font-extrabold">₹24K</p></div>
              <div className="bg-white/10 border-2 border-white/30 rounded-xl p-3 backdrop-blur"><p className="text-xs opacity-70">Your rank</p><p className="font-display text-2xl font-extrabold">#7</p></div>
              <div className="bg-white/10 border-2 border-white/30 rounded-xl p-3 backdrop-blur"><p className="text-xs opacity-70">Orders</p><p className="font-display text-2xl font-extrabold">184</p></div>
            </div>
          </div>
          <p className="text-sm opacity-60">© 2026 Gajab Bazaar</p>
        </div>
      </div>
      {/* RIGHT form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-[#FDFBF7]">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo size="md" /></div>
          <span className="gajab-sticker-yellow">Ambassador Login</span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold mt-4">Login to your<br />Gajab profile.</h1>
          <p className="text-[#4A4A4A] mt-3">Enter your phone or email — we'll send you a one-time code.</p>

          <div className="mt-8 flex gap-2 p-1 bg-white border-2 border-black rounded-xl w-fit">
            <button onClick={() => setMode("phone")} className={`px-4 py-2 rounded-lg font-bold text-sm ${mode==="phone" ? "bg-[#1A1A1A] text-white" : ""}`} data-testid="login-mode-phone"><Phone className="w-4 h-4 inline mr-1" />Phone</button>
            <button onClick={() => setMode("email")} className={`px-4 py-2 rounded-lg font-bold text-sm ${mode==="email" ? "bg-[#1A1A1A] text-white" : ""}`} data-testid="login-mode-email"><Mail className="w-4 h-4 inline mr-1" />Email</button>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wider">{mode === "phone" ? "Phone number" : "Email address"}</span>
              <input data-testid="login-input" value={val} onChange={e=>setVal(e.target.value)} type={mode === "phone" ? "tel" : "email"} placeholder={mode === "phone" ? "+91 98765 43210" : "you@college.edu"} className="input-gajab mt-1" />
            </label>
            <button type="submit" className="btn-primary w-full" data-testid="login-submit-btn">Send OTP <ArrowRight className="w-4 h-4" /></button>
          </form>

          <p className="mt-6 text-sm text-[#4A4A4A]">Not an ambassador yet? <Link to="/apply" className="font-bold text-[#E11D2A] underline" data-testid="login-apply-link">Apply via Campus →</Link></p>
        </div>
      </div>
    </div>
  );
}
