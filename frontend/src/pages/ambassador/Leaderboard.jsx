import React from "react";
import { Crown, Trophy, Medal } from "lucide-react";
import { leaderboard, ambassador } from "@/data/mockData";

const PodiumCard = ({ rank, name, college, revenue, avatar, color, height, icon: Icon }) => (
  <div className={`gajab-card p-4 text-center ${color} flex flex-col justify-end`} style={{ minHeight: height }}>
    <Icon className="w-8 h-8 mx-auto mb-2" strokeWidth={2.5} />
    <img src={avatar} alt="" className="w-16 h-16 mx-auto rounded-full border-2 border-black object-cover" />
    <p className="font-display text-3xl font-extrabold mt-2">#{rank}</p>
    <p className="font-display font-extrabold mt-1 truncate">{name}</p>
    <p className="text-xs text-[#4A4A4A] truncate">{college}</p>
    <p className="font-display text-xl font-extrabold mt-2">₹{(revenue/1000).toFixed(0)}K</p>
  </div>
);

export default function Leaderboard() {
  const [first, second, third, ...rest] = leaderboard;
  return (
    <div className="space-y-5 pb-20">
      <div>
        <span className="gajab-sticker-yellow">🏆 The Big Board</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-2">Top hustlers, ranked.</h1>
        <p className="text-[#4A4A4A] mt-1">Updated live. Race to the top is real.</p>
      </div>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-3 items-end">
        <PodiumCard {...second} icon={Trophy} color="bg-[#F3EFE9]" height="260px" />
        <PodiumCard {...first} icon={Crown} color="bg-gradient-to-br from-[#FFC93C] to-[#FFB81C]" height="300px" />
        <PodiumCard {...third} icon={Medal} color="bg-[#FFE3E5]" height="240px" />
      </div>

      {/* Rest */}
      <div className="gajab-card p-2 sm:p-3">
        <div className="grid grid-cols-12 px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-[#737373]">
          <div className="col-span-1">Rank</div>
          <div className="col-span-7 sm:col-span-6">Name</div>
          <div className="hidden sm:block sm:col-span-3">College</div>
          <div className="col-span-4 sm:col-span-2 text-right">Revenue</div>
        </div>
        {rest.map(r => (
          <div key={r.rank} className={`grid grid-cols-12 items-center px-3 py-3 rounded-xl ${r.isYou ? "bg-[#FFF6DC] border-2 border-black" : "hover:bg-[#FDFBF7]"}`} data-testid={`leaderboard-row-${r.rank}`}>
            <div className="col-span-1 font-display text-lg font-extrabold">#{r.rank}</div>
            <div className="col-span-7 sm:col-span-6 flex items-center gap-3 min-w-0">
              <img src={r.avatar} className="w-9 h-9 rounded-full object-cover border-2 border-black" alt="" />
              <div className="min-w-0">
                <p className="font-bold truncate">{r.name} {r.isYou && <span className="gajab-sticker-red text-[9px] ml-1">YOU</span>}</p>
                <p className="text-xs text-[#737373] sm:hidden truncate">{r.college}</p>
              </div>
            </div>
            <div className="hidden sm:block sm:col-span-3 text-sm text-[#4A4A4A] truncate">{r.college}</div>
            <div className="col-span-4 sm:col-span-2 text-right font-display font-extrabold">₹{(r.revenue/1000).toFixed(0)}K</div>
          </div>
        ))}
      </div>

      {/* Sticky My Rank */}
      <div className="fixed bottom-20 lg:bottom-6 left-4 right-4 lg:left-auto lg:right-8 lg:w-80 z-20 gajab-card p-3 bg-[#1A1A1A] text-white flex items-center gap-3 shadow-2xl">
        <div className="font-display text-3xl font-extrabold text-[#FFC93C]">#{ambassador.rank}</div>
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase font-extrabold tracking-wider opacity-70">Your rank</p>
          <p className="font-bold truncate">{ambassador.name}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-lg font-extrabold">₹248K</p>
        </div>
      </div>
    </div>
  );
}
