import React, { useState } from "react";
import { Search, Users, ShoppingBag, TrendingUp, Upload, Download, Plus, MessageSquare, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { leaderboard, adminKpis, states, cities, ambassador } from "@/data/mockData";

const Kpi = ({ icon: Icon, label, value, bg }) => (
  <div className={`gajab-card p-5 ${bg}`}><Icon className="w-6 h-6 mb-2" strokeWidth={2.5} /><p className="text-xs uppercase font-extrabold tracking-wider opacity-70">{label}</p><p className="font-display text-3xl mt-1">{value}</p></div>
);

const tierFor = (rev) => rev >= 400000 ? "Platinum" : rev >= 150000 ? "Gold" : rev >= 50000 ? "Silver" : "Bronze";

export default function Directory() {
  const [q, setQ] = useState("");
  const [stateF, setStateF] = useState("All States");
  const [cityF, setCityF] = useState("All Cities");
  const [levelF, setLevelF] = useState("All");
  const [open, setOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(null);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", college: "", year: "", city: "", state: "", instagram: "", followers: "", whyJoin: "" });

  const filtered = leaderboard
    .filter(a => stateF === "All States" || a.state === stateF)
    .filter(a => cityF === "All Cities" || a.city === cityF)
    .filter(a => levelF === "All" || tierFor(a.revenue) === levelF)
    .filter(a => (a.name+a.college+a.city+a.state).toLowerCase().includes(q.toLowerCase()));

  const save = (e) => { e.preventDefault(); if (!form.name) { toast.error("Name required"); return; } toast.success(`${form.name} added as Approved affiliate. Welcome email sent.`); setOpen(false); };
  const sendMsg = (e) => { e.preventDefault(); if (!msg.trim()) { toast.error("Message required"); return; } toast.success(`Message sent to ${msgOpen.name}`); setMsgOpen(null); setMsg(""); };

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <span className="gajab-sticker-yellow">Ambassador Directory</span>
          <h1 className="font-display text-3xl sm:text-4xl mt-2">Active ambassadors</h1>
          <p className="text-[#5A6378] mt-1">{filtered.length} of {leaderboard.length} ambassadors</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={()=>toast.success("CSV template downloaded")} className="btn-ghost text-sm" data-testid="bulk-import-btn"><Upload className="w-4 h-4" /> Bulk Import</button>
          <button onClick={()=>toast.success("Exported 312 ambassadors to CSV")} className="btn-ghost text-sm" data-testid="export-btn"><Download className="w-4 h-4" /> Export</button>
          <button onClick={()=>setOpen(true)} className="btn-primary text-sm" data-testid="add-affiliate-btn"><Plus className="w-4 h-4" /> Add Affiliate</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi icon={Users} label="Total Ambassadors" value={adminKpis.totalAmbassadors} bg="bg-white" />
        <Kpi icon={Users} label="Active this month" value={adminKpis.activeThisMonth} bg="bg-[#FFF1C2]" />
        <Kpi icon={ShoppingBag} label="Total orders" value={adminKpis.totalOrders.toLocaleString()} bg="bg-[#D1FAE5]" />
        <Kpi icon={TrendingUp} label="Total GMV" value={`₹${(adminKpis.totalGMV/100000).toFixed(1)}L`} bg="bg-[#FFE9D9]" />
      </div>

      <div className="gajab-card p-4 grid lg:grid-cols-5 gap-3">
        <div className="relative lg:col-span-2"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6378]" /><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search name, college, city..." className="input-gajab pl-10" data-testid="directory-search" /></div>
        <select value={stateF} onChange={e=>setStateF(e.target.value)} className="input-gajab" data-testid="dir-filter-state">{states.map(s=><option key={s}>{s}</option>)}</select>
        <select value={cityF} onChange={e=>setCityF(e.target.value)} className="input-gajab" data-testid="dir-filter-city">{cities.map(c=><option key={c}>{c}</option>)}</select>
        <select value={levelF} onChange={e=>setLevelF(e.target.value)} className="input-gajab" data-testid="dir-filter-level"><option>All</option><option>Bronze</option><option>Silver</option><option>Gold</option><option>Platinum</option></select>
      </div>

      <div className="gajab-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#FFF7EE] border-b border-[#EFEAE0]"><tr className="text-left text-[10px] font-extrabold uppercase tracking-wider text-[#5A6378]">
              <th className="p-3">#</th><th className="p-3">Ambassador</th><th className="p-3">College</th><th className="p-3">City</th><th className="p-3">State</th><th className="p-3">Level</th><th className="p-3">Affiliate URL</th><th className="p-3 text-right">Orders</th><th className="p-3 text-right">Revenue</th><th className="p-3">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(r => {
                const tier = tierFor(r.revenue);
                return (
                  <tr key={r.rank} className="border-b border-[#F0EBE2] hover:bg-[#FFF7EE]" data-testid={`directory-row-${r.rank}`}>
                    <td className="p-3 font-display">#{r.rank}</td>
                    <td className="p-3"><div className="flex items-center gap-2"><img src={r.avatar} alt="" className="w-8 h-8 rounded-full object-cover" /><p className="font-bold">{r.name}</p></div></td>
                    <td className="p-3">{r.college}</td>
                    <td className="p-3">{r.city}</td>
                    <td className="p-3 text-xs">{r.state}</td>
                    <td className="p-3"><span className="gajab-sticker bg-[#FFF1C2] text-[#92400E] border border-[#FFC93C]/60">{tier}</span></td>
                    <td className="p-3 max-w-[180px]"><a href="#" onClick={e=>{e.preventDefault(); toast.success("Affiliate link opened");}} className="flex items-center gap-1 text-xs text-[#F26B1F] truncate hover:underline"><ExternalLink className="w-3 h-3 flex-shrink-0" />gajab.com/r/{r.name.split(" ")[0].toUpperCase()}</a></td>
                    <td className="p-3 text-right font-bold">{r.orders}</td>
                    <td className="p-3 text-right font-display">₹{(r.revenue/1000).toFixed(0)}K</td>
                    <td className="p-3"><button onClick={()=>setMsgOpen(r)} className="text-xs font-bold text-[#F26B1F] hover:bg-[#FFE9D9] px-2 py-1 rounded-lg flex items-center gap-1" data-testid={`msg-${r.rank}`}><MessageSquare className="w-3 h-3" /> Message</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#1B2D54]/40 p-4">
          <form onSubmit={save} className="gajab-card p-6 bg-white w-full max-w-xl space-y-3 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between"><h3 className="font-display text-2xl">Add affiliate (status: Approved)</h3><button type="button" onClick={()=>setOpen(false)}><X className="w-5 h-5" /></button></div>
            <p className="text-xs text-[#5A6378]">Uses the same Apply form fields. New affiliate goes directly to Approved status.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="block sm:col-span-2"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Full name</span><input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="input-gajab mt-1" /></label>
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Phone</span><input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="input-gajab mt-1" /></label>
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Email</span><input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="input-gajab mt-1" /></label>
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">College</span><input value={form.college} onChange={e=>setForm({...form, college:e.target.value})} className="input-gajab mt-1" /></label>
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Year</span><select value={form.year} onChange={e=>setForm({...form, year:e.target.value})} className="input-gajab mt-1"><option value="">Select</option><option>1st year</option><option>2nd year</option><option>3rd year</option><option>4th year</option><option>Masters</option></select></label>
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">City</span><input value={form.city} onChange={e=>setForm({...form, city:e.target.value})} className="input-gajab mt-1" /></label>
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">State</span><input value={form.state} onChange={e=>setForm({...form, state:e.target.value})} className="input-gajab mt-1" /></label>
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Instagram</span><input value={form.instagram} onChange={e=>setForm({...form, instagram:e.target.value})} className="input-gajab mt-1" placeholder="@handle" /></label>
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Followers</span><input value={form.followers} onChange={e=>setForm({...form, followers:e.target.value})} className="input-gajab mt-1" /></label>
              <label className="block sm:col-span-2"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Why pick them?</span><textarea value={form.whyJoin} onChange={e=>setForm({...form, whyJoin:e.target.value})} rows={3} className="input-gajab mt-1 py-3 h-auto resize-none" /></label>
            </div>
            <button className="btn-primary w-full">Add as Approved Affiliate</button>
          </form>
        </div>
      )}

      {msgOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#1B2D54]/40 p-4">
          <form onSubmit={sendMsg} className="gajab-card p-6 bg-white w-full max-w-md space-y-3">
            <div className="flex items-center justify-between"><h3 className="font-display text-xl">Message {msgOpen.name}</h3><button type="button" onClick={()=>setMsgOpen(null)}><X className="w-5 h-5" /></button></div>
            <textarea value={msg} onChange={e=>setMsg(e.target.value)} rows={5} placeholder="Quick message to ambassador..." className="input-gajab py-3 h-auto resize-none" data-testid="quick-msg-input" />
            <button className="btn-primary w-full" data-testid="quick-msg-send">Send via WhatsApp + Inbox</button>
          </form>
        </div>
      )}
    </div>
  );
}
