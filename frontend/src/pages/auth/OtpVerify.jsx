import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/components/Logo";

export default function OtpVerify() {
  const nav = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const refs = useRef([]);

  const setDigit = (i, v) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = [...otp]; next[i] = d; setOtp(next);
    if (d && i < 5) refs.current[i+1]?.focus();
  };
  const verify = () => {
    if (otp.join("").length !== 6) { toast.error("Enter all 6 digits"); return; }
    toast.success("Verified! Set your password.");
    nav("/setup-password");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex bg-[#FFC93C] text-[#1B2D54] p-12 flex-col justify-between">
        <Logo size="lg" />
        <div>
          <h2 className="font-display text-5xl font-extrabold leading-none">One last check.</h2>
          <p className="mt-4 max-w-md">We sent a 6-digit code to your phone/email. Pop it in and you're in.</p>
        </div>
        <p className="text-sm opacity-60">© 2026 Gajab Bazaar</p>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12 bg-[#FFF7EE]">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo size="md" /></div>
          <span className="gajab-sticker-yellow">Step 2 of 3</span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold mt-4">Verify OTP</h1>
          <p className="text-[#5A6378] mt-3">Demo OTP: <b>123456</b></p>

          <div className="mt-8 flex gap-2 sm:gap-3" data-testid="otp-inputs">
            {otp.map((d, i) => (
              <input
                key={i}
                ref={el => refs.current[i] = el}
                value={d}
                onChange={e => setDigit(i, e.target.value)}
                onKeyDown={e => e.key === "Backspace" && !d && i > 0 && refs.current[i-1]?.focus()}
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-display font-extrabold rounded-xl border border-[#EFEAE0] bg-white focus:outline-none focus:ring-4 focus:ring-[#FFC93C]/40"
                data-testid={`otp-digit-${i}`}
              />
            ))}
          </div>

          <button onClick={verify} className="btn-primary mt-8 w-full" data-testid="otp-verify-btn">Verify <ArrowRight className="w-4 h-4" /></button>
          <p className="mt-6 text-sm text-[#5A6378]"><Link to="/login" className="font-bold underline">← Change number</Link> • Didn't get the code? <button className="font-bold text-[#F26B1F] underline">Resend</button></p>
        </div>
      </div>
    </div>
  );
}
