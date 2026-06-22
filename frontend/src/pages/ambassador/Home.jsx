import React from "react";
import { Copy, Share2, MousePointerClick, ShoppingBag, PackageCheck, TrendingUp, IndianRupee, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { ambassador, stats, trendData, recentOrders } from "@/data/mockData";

const Stat = ({ icon: Icon, label, value, suffix, bg, accent }) => (
  <div className={`gajab-card p-4 ${bg}`}>
    <Icon className="w-5 h-5 mb-2" strokeWidth={2.5} />
    <p className="text-[10px] font-extrabold uppercase tracking-wider opacity-70">{label}</p>
    <p className="font-display text-2xl sm:text-3xl font-extrabold mt-0.5">{value}{suffix}</p>
  </div>
);

export default function Home() {
  const copy = async () => {
    try { await navigator.clipboard.writeText(ambassador.affiliateLink); toast.success("Link copied!"); }
    catch { toast.error("Copy failed — please copy manually"); }
  };
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <span className="gajab-sticker-yellow">Hi {ambassador.name.split(" ")[0]} 👋</span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-2">Aaj kya bechna hai?</h1>
          <p className="text-[#4A4A4A] mt-1">Here's how your hustle's looking this month.</p>
        </div>
      </div>

      {/* Affiliate link card */}
      <div className="gajab-card p-5 sm:p-6 bg-[#1A1A1A] text-white">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <p className="text-xs uppercase font-extrabold tracking-wider text-[#FFC93C]">Your magic link</p>
            <p className="font-display text-xl sm:text-2xl font-extrabold mt-1 break-all">{ambassador.affiliateLink}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={copy} className="btn-accent" data-testid="copy-link-btn"><Copy className="w-4 h-4" /> Copy</button>
            <button onClick={()=>toast.success("Share menu opened")} className="btn-ghost bg-white" data-testid="share-link-btn"><Share2 className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <Stat icon={MousePointerClick} label="Clicks" value={stats.totalClicks.toLocaleString()} bg="bg-white" />
        <Stat icon={ShoppingBag} label="Orders" value={stats.ordersPlaced} bg="bg-[#FFF6DC]" />
        <Stat icon={PackageCheck} label="Delivered" value={stats.ordersDelivered} bg="bg-[#E6F8EF]" />
        <Stat icon={TrendingUp} label="Revenue" value={`₹${(stats.revenue/1000).toFixed(1)}K`} bg="bg-[#FFE3E5]" />
        <Stat icon={IndianRupee} label="Commission" value={`₹${(stats.commission/1000).toFixed(1)}K`} bg="bg-[#E8E4FB]" />
      </div>

      {/* Chart + Rank */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="gajab-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-lg font-extrabold">7-day trend</h3>
            <span className="gajab-sticker-yellow text-[10px]">+18% vs last week</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={trendData}>
                <CartesianGrid stroke="#EAE6E1" strokeDasharray="4 4" />
                <XAxis dataKey="day" stroke="#1A1A1A" fontWeight="700" fontSize={12} />
                <YAxis stroke="#1A1A1A" fontSize={12} />
                <Tooltip contentStyle={{borderRadius:12, border:"2px solid #1A1A1A"}} />
                <Line type="monotone" dataKey="revenue" stroke="#E11D2A" strokeWidth={3} dot={{r:5, fill:"#FFC93C", stroke:"#1A1A1A", strokeWidth:2}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="gajab-card p-5 bg-gradient-to-br from-[#FFC93C] to-[#FFB81C]">
          <Sparkles className="w-6 h-6 mb-2" strokeWidth={2.5} />
          <p className="text-xs uppercase font-extrabold tracking-wider">National rank</p>
          <p className="font-display text-7xl font-extrabold leading-none mt-2">#{ambassador.rank}</p>
          <p className="text-sm font-bold mt-2">out of {ambassador.totalAmbassadors} ambassadors</p>
          <div className="mt-5 p-3 rounded-xl bg-white/40 border-2 border-black">
            <p className="text-xs font-bold">🎯 Climb to #5</p>
            <p className="text-xs mt-1">Earn ₹39,200 more to overtake Rohan Patel</p>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="gajab-card p-5">
        <h3 className="font-display text-lg font-extrabold mb-3">Recent orders</h3>
        <div className="space-y-2">
          {recentOrders.map(o => (
            <div key={o.id} className="flex items-center justify-between gap-3 p-3 rounded-xl border-2 border-[#EAE6E1] hover:border-black transition-all" data-testid={`order-${o.id}`}>
              <div className="min-w-0">
                <p className="font-bold text-sm truncate">{o.product}</p>
                <p className="text-xs text-[#737373]">{o.id} • {o.date}</p>
              </div>
              <div className="text-right">
                <p className="font-display font-extrabold">₹{o.commission}</p>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${o.status==="Delivered"?"bg-[#D1FAE5] text-[#065F46] border-[#065F46]":o.status==="Cancelled"?"bg-[#FEE2E2] text-[#991B1B] border-[#991B1B]":"bg-[#FEF3C7] text-[#92400E] border-[#92400E]"}`}>{o.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
