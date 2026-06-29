import React, { useState } from "react";
import { Crown, Trophy, Medal, MapPin } from "lucide-react";
import { leaderboard, ambassador } from "@/data/mockData";

const PodiumCard = ({ rank, name, college, revenue, avatar, color, height, icon: Icon }) => (
  <div className={`gajab-card p-4 text-center ${color} flex flex-col justify-end`} style={{ minHeight: height }}>
    <Icon className="w-8 h-8 mx-auto mb-2" strokeWidth={2.5} />
    <img src={avatar} alt="" className="w-16 h-16 mx-auto rounded-full object-cover" />
    <p className="font-display text-3xl mt-2">#{rank}</p>
    <p className="font-display font-extrabold mt-1 truncate">{name}</p>
    <p className="text-xs text-[#5A6378] truncate">{college}</p>
    <p className="font-display text-xl mt-2">₹{(revenue/1000).toFixed(0)}K</p>
  </div>
);

const scopes = ["Overall", "My State", "My City"];

export default function Leaderboard() {
  const [scope, setScope] = useState("Overall");
  let data = leaderboard;
  if (scope === "My State") data = leaderboard.filter(r => r.state === ambassador.state);
  if (scope === "My City") data = leaderboard.filter(r => r.city === ambassador.city);
  // Re-rank for filtered views
  const ranked = data.map((r, i) => ({ ...r, displayRank: i + 1 }));
  const [first, second, third, ...rest] = ranked;

  return (
    <div className="space-y-5 pb-20">
      <div>
        <span className="gajab-sticker-yellow">🏆 The Big Board</span>
        <h1 className="font-display text-3xl sm:text-4xl mt-2">Top hustlers, ranked.</h1>
        <p className="text-[#5A6378] mt-1">Updated live. Race to the top is real.</p>
      </div>

      <div className="flex gap-2">
        {scopes.map(s => (
          <button key={s} onClick={() => setScope(s)} className={`nav-tab border ${scope===s ? "bg-[#1B2D54] text-white border-[#1B2D54]" : "bg-white border-[#EFEAE0] text-[#5A6378]"}`} data-testid={`lb-scope-${s.toLowerCase().replace(/ /g,"-")}`}>
            {s === "Overall" ? "🌐 Overall" : s === "My State" ? `📍 ${ambassador.state}` : `🏙️ ${ambassador.city}`}
          </button>
        ))}
      </div>

      {first && second && third && (
        <div className="grid grid-cols-3 gap-3 items-end">
          <PodiumCard rank={second.displayRank} name={second.name} college={second.college} revenue={second.revenue} avatar={second.avatar} icon={Trophy} color="bg-[#F3EFE9]" height="260px" />
          <PodiumCard rank={first.displayRank} name={first.name} college={first.college} revenue={first.revenue} avatar={first.avatar} icon={Crown} color="bg-gradient-to-br from-[#FFC93C] to-[#FFB81C]" height="300px" />
          <PodiumCard rank={third.displayRank} name={third.name} college={third.college} revenue={third.revenue} avatar={third.avatar} icon={Medal} color="bg-[#FFE3E5]" height="240px" />
        </div>
      )}

      <div className="gajab-card p-2 sm:p-3">
        <div className="grid grid-cols-12 px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-[#5A6378]">
          <div className="col-span-1">Rank</div>
          <div className="col-span-6 sm:col-span-5">Name</div>
          <div className="hidden sm:block sm:col-span-2">City</div>
          <div className="hidden sm:block sm:col-span-2">State</div>
          <div className="col-span-5 sm:col-span-2 text-right">Revenue</div>
        </div>
        {rest.map(r => (
          <div key={r.rank} className={`grid grid-cols-12 items-center px-3 py-3 rounded-xl ${r.isYou ? "bg-[#FFF7EE] border border-[#F26B1F]/40" : "hover:bg-[#FFF7EE]"}`} data-testid={`leaderboard-row-${r.rank}`}>
            <div className="col-span-1 font-display text-lg">#{r.displayRank}</div>
            <div className="col-span-6 sm:col-span-5 flex items-center gap-3 min-w-0">
              <img src={r.avatar} className="w-9 h-9 rounded-full object-cover" alt="" />
              <div className="min-w-0">
                <p className="font-bold truncate">{r.name} {r.isYou && <span className="gajab-sticker-orange text-[9px] ml-1">YOU</span>}</p>
                <p className="text-xs text-[#5A6378] sm:hidden truncate">{r.city}, {r.state}</p>
              </div>
            </div>
            <div className="hidden sm:block sm:col-span-2 text-sm text-[#5A6378]"><MapPin className="w-3 h-3 inline mr-0.5" />{r.city}</div>
            <div className="hidden sm:block sm:col-span-2 text-sm text-[#5A6378]">{r.state}</div>
            <div className="col-span-5 sm:col-span-2 text-right font-display">₹{(r.revenue/1000).toFixed(0)}K</div>
          </div>
        ))}
        {rest.length === 0 && <p className="p-6 text-center text-sm text-[#5A6378]">No other ambassadors in this scope yet.</p>}
      </div>

      <div className="fixed bottom-20 lg:bottom-6 left-4 right-4 lg:left-auto lg:right-8 lg:w-80 z-20 gajab-card p-3 bg-[#1B2D54] text-white flex items-center gap-3 shadow-2xl">
        <div className="font-display text-3xl text-[#FFC93C]">#{ambassador.rank}</div>
        <div className="flex-1 min-w-0"><p className="text-xs uppercase font-extrabold tracking-wider opacity-70">Your overall rank</p><p className="font-bold truncate">{ambassador.name}</p></div>
        <div className="text-right"><p className="font-display text-lg">₹248K</p></div>
      </div>
    </div>
  );
}
