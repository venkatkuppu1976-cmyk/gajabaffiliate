import React from "react";
import { Copy, Ticket } from "lucide-react";
import { toast } from "sonner";
import { myReferralCodes } from "@/data/mockData";

export default function Referrals() {
  const copy = async (c) => {
    try { await navigator.clipboard.writeText(c); toast.success(`${c} copied!`); }
    catch { toast.error("Copy failed — please copy manually"); }
  };
  return (
    <div className="space-y-5">
      <div>
        <span className="gajab-sticker-yellow">Your Codes</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-2">Your promo code stash.</h1>
        <p className="text-[#5A6378] mt-1">Discount codes assigned to you. Share & earn commission on every use.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {myReferralCodes.map(c => (
          <div key={c.code} className="gajab-card p-5" data-testid={`code-${c.code}`}>
            <div className="flex items-start justify-between">
              <div>
                <Ticket className="w-6 h-6 mb-1" strokeWidth={2.5} />
                <p className="font-display text-3xl font-extrabold tracking-tight">{c.code}</p>
                <p className="text-xs text-[#5A6378] mt-1">{c.type} • {c.value} off {c.cap !== "—" && `(max ${c.cap})`}</p>
              </div>
              <span className={`gajab-sticker border ${c.status==="Active"?"bg-[#D1FAE5] text-[#065F46] border-[#065F46]/40":"bg-[#FEE2E2] text-[#991B1B] border-[#991B1B]/40"}`}>{c.status}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="rounded-lg bg-[#F3EFE9] p-2"><p className="text-[10px] uppercase font-extrabold opacity-70">Uses</p><p className="font-display font-extrabold text-lg">{c.uses}</p></div>
              <div className="rounded-lg bg-[#F3EFE9] p-2"><p className="text-[10px] uppercase font-extrabold opacity-70">GMV</p><p className="font-display font-extrabold text-lg">₹{(c.gmv/1000).toFixed(0)}K</p></div>
              <div className="rounded-lg bg-[#FFF6DC] p-2"><p className="text-[10px] uppercase font-extrabold opacity-70">Earned</p><p className="font-display font-extrabold text-lg">₹{(c.commission/1000).toFixed(1)}K</p></div>
            </div>
            <button onClick={()=>copy(c.code)} className="btn-ghost w-full mt-4" data-testid={`copy-code-${c.code}`}><Copy className="w-4 h-4" /> Copy code</button>
          </div>
        ))}
      </div>
    </div>
  );
}
