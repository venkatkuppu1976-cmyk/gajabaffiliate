import React from "react";
import { toast } from "sonner";
import { Bell, Globe, ShieldCheck } from "lucide-react";
import { useVersion } from "@/hooks/useVersion";

const Toggle = ({ label, defaultChecked = true }) => (
  <label className="flex items-center justify-between p-3 rounded-xl border border-[#EFEAE0]">
    <span className="text-sm font-bold">{label}</span>
    <input type="checkbox" defaultChecked={defaultChecked} className="w-10 h-5 appearance-none rounded-full bg-[#EFEAE0] checked:bg-[#F26B1F] relative cursor-pointer transition-colors" style={{}} />
  </label>
);

export default function AccountSettings() {
  const { isV2 } = useVersion();
  return (
    <div className="space-y-5">
      <div>
        <span className="gajab-sticker-yellow">Account</span>
        <h1 className="font-display text-3xl sm:text-4xl mt-2">Account settings</h1>
        <p className="text-[#5A6378] mt-1">Notifications, language, security.</p>
      </div>

      <div className="gajab-card p-5 space-y-2">
        <h3 className="font-display text-lg mb-2 flex items-center gap-2"><Bell className="w-5 h-5 text-[#F26B1F]" /> Notifications</h3>
        <Toggle label="WhatsApp updates from admin" />
        <Toggle label="Email notifications" />
        <Toggle label="In-app inbox alerts" />
        <Toggle label="New task notifications" />
        <Toggle label="Tier upgrade celebrations" />
      </div>

      <div className={`gajab-card p-5 space-y-3 ${isV2 ? "hidden" : ""}`}>
        <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Language</span>
          <select className="input-gajab mt-1"><option>English</option><option>हिंदी (Hindi)</option><option>தமிழ் (Tamil)</option><option>తెలుగు (Telugu)</option><option>বাংলা (Bengali)</option></select>
        </label>
        <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Time zone</span>
          <select className="input-gajab mt-1"><option>Asia/Kolkata (IST)</option></select>
        </label>
      </div>

      <div className="gajab-card p-5 space-y-3">
        <h3 className="font-display text-lg flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-[#F26B1F]" /> Security</h3>
        <button className="btn-ghost w-full justify-start" onClick={()=>toast.success("Password reset link sent")}>Change password</button>
        {!isV2 && <button className="btn-ghost w-full justify-start" onClick={()=>toast.success("2FA enabled")}>Enable two-factor auth</button>}
        <button className="w-full text-left p-3 rounded-xl border border-[#FEE2E2] text-[#991B1B] hover:bg-[#FEE2E2] font-bold" onClick={()=>toast.error("Account deletion requested. Confirmation sent.")}>Delete account</button>
      </div>

      <button className="btn-primary w-full" onClick={()=>toast.success("Settings saved")}>Save changes</button>
    </div>
  );
}
