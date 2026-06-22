import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/components/Logo";

export default function SetupPassword() {
  const nav = useNavigate();
  const [pwd, setPwd] = useState("");
  const [cnf, setCnf] = useState("");
  const [show, setShow] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (pwd.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    if (pwd !== cnf) { toast.error("Passwords don't match"); return; }
    toast.success("Password set! Welcome to Gajab 🎉");
    nav("/dashboard");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex bg-[#1B2D54] text-white p-12 flex-col justify-between">
        <Logo size="lg" showTag={false} />
        <div>
          <span className="gajab-sticker-yellow">Almost there</span>
          <h2 className="font-display text-5xl font-extrabold leading-none mt-4">Lock it in.</h2>
          <p className="mt-4 max-w-md opacity-80">Set a permanent password so you can log back in anytime without OTP fuss.</p>
        </div>
        <p className="text-sm opacity-60">© 2026 Gajab Bazaar</p>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12 bg-[#FFF7EE]">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo size="md" /></div>
          <span className="gajab-sticker-yellow">Step 3 of 3</span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold mt-4">Create password</h1>
          <p className="text-[#5A6378] mt-3">Mandatory first-time setup. Make it something you'll remember.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wider">New password</span>
              <div className="relative mt-1">
                <input data-testid="pwd-new" type={show?"text":"password"} value={pwd} onChange={e=>setPwd(e.target.value)} placeholder="Min 8 characters" className="input-gajab pr-12" />
                <button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2">{show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
              </div>
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wider">Confirm password</span>
              <input data-testid="pwd-confirm" type={show?"text":"password"} value={cnf} onChange={e=>setCnf(e.target.value)} placeholder="Type it again" className="input-gajab mt-1" />
            </label>
            <button type="submit" className="btn-primary w-full" data-testid="pwd-submit-btn">Set Password & Continue <ArrowRight className="w-4 h-4" /></button>
          </form>
        </div>
      </div>
    </div>
  );
}
