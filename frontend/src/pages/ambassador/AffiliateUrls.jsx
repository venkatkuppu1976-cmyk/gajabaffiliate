import React, { useState } from "react";
import { Copy, Link as LinkIcon, MousePointerClick, Users, ShoppingBag, IndianRupee, Plus, X, TrendingUp, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { affiliateUrls } from "@/data/mockData";
import { useVersion } from "@/hooks/useVersion";

const channelColor = {
  "All": "bg-[#FFF1C2] text-[#92400E] border-[#FFC93C]/60",
  "Instagram": "bg-[#FCE4F0] text-[#9D174D] border-[#EC4899]/40",
  "WhatsApp": "bg-[#D1FAE5] text-[#065F46] border-[#10B981]/40",
  "Offline / QR": "bg-[#E0E7FF] text-[#3730A3] border-[#6366F1]/40",
};

const Stat = ({ icon: Icon, label, value, sub, accent }) => (
  <div className="gajab-card p-4">
    <div className={`w-9 h-9 rounded-lg grid place-items-center mb-2 ${accent}`}><Icon className="w-5 h-5" strokeWidth={2.5} /></div>
    <p className="text-[10px] font-bold uppercase tracking-wider text-[#5A6378]">{label}</p>
    <p className="font-display text-2xl mt-0.5">{value}</p>
    {sub && <p className="text-xs text-[#5A6378] mt-0.5">{sub}</p>}
  </div>
);

export default function AffiliateUrls() {
  const { isV2 } = useVersion();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ label: "", channel: "Instagram", campaign: "" });

  // In V2, restrict to a single master link only
  const urls = isV2 ? affiliateUrls.slice(0, 1) : affiliateUrls;

  const totals = urls.reduce((a, u) => ({
    clicks: a.clicks + u.clicks, signups: a.signups + u.signups, orders: a.orders + u.orders,
    revenue: a.revenue + u.revenue, commission: a.commission + u.commission,
  }), { clicks: 0, signups: 0, orders: 0, revenue: 0, commission: 0 });

  const copy = async (url) => {
    try { await navigator.clipboard.writeText(url); toast.success("Link copied!"); }
    catch { toast.error("Copy failed — please copy manually"); }
  };

  const create = (e) => {
    e.preventDefault();
    if (!form.label) { toast.error("Give your link a name"); return; }
    toast.success(`New link "${form.label}" created!`);
    setForm({ label: "", channel: "Instagram", campaign: "" });
    setOpen(false);
  };

  const chartData = urls.map(u => ({ name: u.label.length > 12 ? u.label.slice(0,10)+"…" : u.label, clicks: u.clicks, revenue: u.revenue }));

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <span className="gajab-sticker-yellow">URL Tracking</span>
          <h1 className="font-display text-3xl sm:text-4xl mt-2">{isV2 ? "Your affiliate link" : "Your affiliate links"}</h1>
          <p className="text-[#5A6378] mt-1">{isV2 ? "Your unique master link. All performance rolls up to this single URL." : "Track every link you share. Create campaign URLs to know what's working."}</p>
        </div>
        {!isV2 && <button onClick={()=>setOpen(true)} className="btn-primary" data-testid="create-url-btn"><Plus className="w-4 h-4" /> New Link</button>}
      </div>

      {/* Totals */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <Stat icon={LinkIcon} label={isV2 ? "Active URL" : "Active URLs"} value={urls.length} accent="bg-[#FFE9D9] text-[#C9450C]" />
        <Stat icon={MousePointerClick} label="Total Clicks" value={totals.clicks.toLocaleString()} accent="bg-[#FFF1C2] text-[#92400E]" />
        <Stat icon={Users} label="Signups" value={totals.signups} accent="bg-[#E0E7FF] text-[#3730A3]" />
        <Stat icon={ShoppingBag} label="Orders" value={totals.orders} accent="bg-[#D1FAE5] text-[#065F46]" />
        <Stat icon={IndianRupee} label="Commission" value={`₹${(totals.commission/1000).toFixed(1)}K`} accent="bg-[#FFE9D9] text-[#C9450C]" />
      </div>

      {/* Chart */}
      <div className="gajab-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-lg">Performance by URL</h3>
          <span className="gajab-sticker-orange"><TrendingUp className="w-3 h-3" /> Last 30 days</span>
        </div>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid stroke="#EFEAE0" strokeDasharray="4 4" />
              <XAxis dataKey="name" stroke="#1B2D54" fontSize={11} fontWeight="600" />
              <YAxis stroke="#1B2D54" fontSize={11} />
              <Tooltip contentStyle={{borderRadius:12, border:"1px solid #EFEAE0"}} />
              <Bar dataKey="clicks" fill="#F26B1F" radius={[6,6,0,0]} />
              <Bar dataKey="revenue" fill="#FFC93C" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* URL list */}
      <div className="gajab-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#FFF7EE] border-b border-[#EFEAE0]">
              <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-[#5A6378]">
                <th className="p-3">Label</th><th className="p-3">URL</th><th className="p-3">Channel</th><th className="p-3 text-right">Clicks</th><th className="p-3 text-right">Signups</th><th className="p-3 text-right">Orders</th><th className="p-3 text-right">Revenue</th><th className="p-3 text-right">Commission</th><th className="p-3 text-right">CTR</th><th className="p-3">Last Click</th><th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {urls.map(u => (
                <tr key={u.id} className="border-b border-[#F0EBE2] hover:bg-[#FFF7EE]" data-testid={`url-row-${u.id}`}>
                  <td className="p-3"><p className="font-bold text-[#1B2D54]">{u.label}</p><p className="text-[10px] text-[#5A6378]">{u.campaign}</p></td>
                  <td className="p-3 max-w-xs"><div className="flex items-center gap-1.5 text-xs text-[#5A6378] truncate"><ExternalLink className="w-3 h-3 flex-shrink-0" /><span className="truncate">{u.url}</span></div></td>
                  <td className="p-3"><span className={`gajab-sticker ${channelColor[u.channel] || channelColor["All"]}`}>{u.channel}</span></td>
                  <td className="p-3 text-right font-bold">{u.clicks.toLocaleString()}</td>
                  <td className="p-3 text-right">{u.signups}</td>
                  <td className="p-3 text-right">{u.orders}</td>
                  <td className="p-3 text-right">₹{(u.revenue/1000).toFixed(1)}K</td>
                  <td className="p-3 text-right font-display text-[#F26B1F]">₹{(u.commission/1000).toFixed(1)}K</td>
                  <td className="p-3 text-right">{u.ctr}%</td>
                  <td className="p-3 text-xs text-[#5A6378]">{u.lastClick}</td>
                  <td className="p-3"><button onClick={()=>copy(u.url)} className="p-1.5 hover:bg-[#FFE9D9] rounded-lg" data-testid={`copy-url-${u.id}`}><Copy className="w-4 h-4 text-[#F26B1F]" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#1B2D54]/40 p-4">
          <form onSubmit={create} className="gajab-card p-6 bg-white w-full max-w-md space-y-3" data-testid="new-url-modal">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl">Create campaign URL</h3>
              <button type="button" onClick={()=>setOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Link name</span><input value={form.label} onChange={e=>setForm({...form, label:e.target.value})} placeholder="e.g. Insta Story Dec" className="input-gajab mt-1" data-testid="new-url-label" /></label>
            <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Channel</span>
              <select value={form.channel} onChange={e=>setForm({...form, channel:e.target.value})} className="input-gajab mt-1"><option>Instagram</option><option>WhatsApp</option><option>Offline / QR</option><option>Other</option></select>
            </label>
            <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Campaign tag (UTM)</span><input value={form.campaign} onChange={e=>setForm({...form, campaign:e.target.value})} placeholder="e.g. freshers" className="input-gajab mt-1" /></label>
            <button className="btn-primary w-full" data-testid="submit-new-url">Generate Link</button>
            <p className="text-xs text-[#5A6378]">A unique tracked URL will be generated with your ambassador ID + UTM tags.</p>
          </form>
        </div>
      )}
    </div>
  );
}
