import React from "react";
import { referralUtilization } from "@/data/mockData";

export default function ReferralUtilization() {
  return (
    <div className="space-y-5">
      <div>
        <span className="gajab-sticker-yellow">Referral Utilization</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-2">Code usage log</h1>
        <p className="text-[#5A6378] mt-1">Every order that used a referral code, with full breakdown.</p>
      </div>
      <div className="gajab-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F3EFE9] border-b border-[#EFEAE0]">
              <tr className="text-left text-[10px] font-extrabold uppercase tracking-wider">
                <th className="p-3">Code</th><th className="p-3">Order ID</th><th className="p-3">Customer</th><th className="p-3 text-right">Order Value</th><th className="p-3">Used at</th><th className="p-3 text-right">Discount</th><th className="p-3 text-right">Commission %</th><th className="p-3 text-right">Commission ₹</th>
              </tr>
            </thead>
            <tbody>
              {referralUtilization.map((u, i) => (
                <tr key={i} className="border-b border-[#EAE6E1] hover:bg-[#FFF6DC]" data-testid={`util-row-${u.orderId}`}>
                  <td className="p-3"><span className="font-display font-extrabold">{u.code}</span></td>
                  <td className="p-3 font-mono text-xs">{u.orderId}</td>
                  <td className="p-3 font-mono text-xs">{u.customerId}</td>
                  <td className="p-3 text-right">₹{u.orderValue.toLocaleString()}</td>
                  <td className="p-3 text-xs">{u.date}</td>
                  <td className="p-3 text-right text-[#F26B1F] font-bold">- ₹{u.discount}</td>
                  <td className="p-3 text-right">{u.commissionPct}</td>
                  <td className="p-3 text-right font-display font-extrabold text-[#065F46]">₹{u.commissionValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
