import React from "react";
import { leaderboard } from "@/data/mockData";

export default function MasterLeaderboard() {
  return (
    <div className="space-y-5">
      <div>
        <span className="gajab-sticker-yellow">Master Leaderboard</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-2">Revenue rankings</h1>
        <p className="text-[#4A4A4A] mt-1">Live ranking, sorted by revenue generated.</p>
      </div>
      <div className="gajab-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1A1A1A] text-white">
              <tr className="text-left text-[10px] font-extrabold uppercase tracking-wider">
                <th className="p-3">Rank</th><th className="p-3">Ambassador</th><th className="p-3">College</th><th className="p-3 text-right">Orders</th><th className="p-3 text-right">Revenue Generated</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map(r => (
                <tr key={r.rank} className={`border-b border-[#EAE6E1] ${r.rank<=3?"bg-[#FFF6DC]":""}`} data-testid={`master-row-${r.rank}`}>
                  <td className="p-3"><span className="font-display font-extrabold text-xl">{r.rank<=3 ? ["🥇","🥈","🥉"][r.rank-1] : `#${r.rank}`}</span></td>
                  <td className="p-3"><div className="flex items-center gap-2"><img src={r.avatar} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-black" /><span className="font-bold">{r.name}</span></div></td>
                  <td className="p-3">{r.college}</td>
                  <td className="p-3 text-right font-bold">{r.orders}</td>
                  <td className="p-3 text-right font-display font-extrabold">₹{r.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
