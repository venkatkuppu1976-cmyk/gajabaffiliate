import React, { useState } from "react";
import { Search, Users, ShoppingBag, TrendingUp } from "lucide-react";
import { leaderboard, adminKpis } from "@/data/mockData";

const Kpi = ({ icon: Icon, label, value, bg }) => (
  <div className={`gajab-card p-5 ${bg}`}>
    <Icon className="w-6 h-6 mb-2" strokeWidth={2.5} />
    <p className="text-xs uppercase font-extrabold tracking-wider opacity-70">{label}</p>
    <p className="font-display text-3xl font-extrabold mt-1">{value}</p>
  </div>
);

export default function Directory() {
  const [q, setQ] = useState("");
  const filtered = leaderboard.filter(a => (a.name+a.college+a.city).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-5">
      <div>
        <span className="gajab-sticker-yellow">Ambassador Directory</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-2">Active ambassadors</h1>
        <p className="text-[#4A4A4A] mt-1">{adminKpis.activeThisMonth} active this month</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi icon={Users} label="Total Ambassadors" value={adminKpis.totalAmbassadors} bg="bg-white" />
        <Kpi icon={Users} label="Active this month" value={adminKpis.activeThisMonth} bg="bg-[#FFF6DC]" />
        <Kpi icon={ShoppingBag} label="Total orders" value={adminKpis.totalOrders.toLocaleString()} bg="bg-[#E6F8EF]" />
        <Kpi icon={TrendingUp} label="Total GMV" value={`₹${(adminKpis.totalGMV/100000).toFixed(1)}L`} bg="bg-[#FFE3E5]" />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name, college, city..." className="input-gajab pl-10" data-testid="directory-search" />
        </div>
      </div>

      <div className="gajab-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F3EFE9] border-b-2 border-black">
              <tr className="text-left text-[10px] font-extrabold uppercase tracking-wider">
                <th className="p-3">#</th><th className="p-3">Ambassador</th><th className="p-3">College</th><th className="p-3 text-right">Orders</th><th className="p-3 text-right">Revenue</th><th className="p-3 text-right">Task Rate</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.rank} className="border-b border-[#EAE6E1] hover:bg-[#FFF6DC]" data-testid={`directory-row-${r.rank}`}>
                  <td className="p-3 font-display font-extrabold">#{r.rank}</td>
                  <td className="p-3"><div className="flex items-center gap-2"><img src={r.avatar} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-black" /><div><p className="font-bold">{r.name}</p><p className="text-xs text-[#737373]">{r.city}</p></div></div></td>
                  <td className="p-3">{r.college}</td>
                  <td className="p-3 text-right font-bold">{r.orders}</td>
                  <td className="p-3 text-right font-display font-extrabold">₹{(r.revenue/1000).toFixed(0)}K</td>
                  <td className="p-3 text-right"><span className="gajab-sticker bg-[#D1FAE5] text-[#065F46] border border-[#065F46]">{(80 + (r.rank * 1.2)).toFixed(0)}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
