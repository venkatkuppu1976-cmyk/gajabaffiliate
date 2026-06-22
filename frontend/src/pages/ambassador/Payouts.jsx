import React from "react";
import { Wallet, Clock } from "lucide-react";
import { stats, payouts } from "@/data/mockData";

export default function Payouts() {
  return (
    <div className="space-y-5">
      <div>
        <span className="gajab-sticker-yellow">💰 Your Money</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-2">Payouts</h1>
        <p className="text-[#5A6378] mt-1">Bi-monthly UPI/NEFT transfers. Minimum payout ₹500.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="gajab-card p-5 bg-gradient-to-br from-[#FFC93C] to-[#FFB81C] sm:col-span-2">
          <Wallet className="w-6 h-6" strokeWidth={2.5} />
          <p className="text-xs uppercase font-extrabold tracking-wider mt-2 opacity-70">Available balance</p>
          <p className="font-display text-6xl font-extrabold">₹{stats.pendingPayout.toLocaleString()}</p>
          <p className="text-sm font-bold mt-2">Next payout: <b>Dec 20, 2026</b></p>
        </div>
        <div className="gajab-card p-5">
          <p className="text-xs uppercase font-extrabold tracking-wider opacity-70">Lifetime earned</p>
          <p className="font-display text-4xl font-extrabold mt-1">₹{(stats.paidOut + stats.pendingPayout).toLocaleString()}</p>
          <hr className="my-3 border-[#EAE6E1]" />
          <p className="text-xs uppercase font-extrabold tracking-wider opacity-70">Already paid out</p>
          <p className="font-display text-2xl font-extrabold">₹{stats.paidOut.toLocaleString()}</p>
        </div>
      </div>

      <div className="gajab-card p-5">
        <h3 className="font-display text-lg font-extrabold mb-3">Payout history</h3>
        <div className="space-y-2">
          {payouts.map(p => (
            <div key={p.id} className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[#EFEAE0]" data-testid={`payout-${p.id}`}>
              <div>
                <p className="font-bold text-sm">{p.period}</p>
                <p className="text-xs text-[#5A6378]">{p.id} • {p.date}</p>
              </div>
              <div className="text-right">
                <p className="font-display font-extrabold">₹{p.amount.toLocaleString()}</p>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${p.status==="Paid"?"bg-[#D1FAE5] text-[#065F46] border-[#065F46]":"bg-[#FEF3C7] text-[#92400E] border-[#92400E]"}`}>{p.status==="Paid"?"✓":(<Clock className="w-3 h-3 inline" />)} {p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
