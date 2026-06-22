import React, { useState } from "react";
import { Plus, X, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { referralCodes, leaderboard } from "@/data/mockData";

export default function ReferralCodesAdmin() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ code:"", user:"", type:"Percentage", value:"", cap:"", expires:"", commissionPct:"10" });
  const create = (e) => {
    e.preventDefault();
    if (!form.code || !form.user) { toast.error("Code & user required"); return; }
    toast.success(`Code ${form.code} created!`);
    setOpen(false);
    setForm({ code:"", user:"", type:"Percentage", value:"", cap:"", expires:"", commissionPct:"10" });
  };
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <span className="gajab-sticker-yellow">Referral Codes Manager</span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-2">Promo codes</h1>
          <p className="text-[#4A4A4A] mt-1">{referralCodes.length} active codes • Create, link to ambassadors, manage discounts</p>
        </div>
        <button onClick={()=>setOpen(true)} className="btn-primary" data-testid="create-code-btn"><Plus className="w-4 h-4" />New Code</button>
      </div>

      <div className="gajab-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F3EFE9] border-b-2 border-black">
              <tr className="text-left text-[10px] font-extrabold uppercase tracking-wider">
                <th className="p-3">Code</th><th className="p-3">Linked to</th><th className="p-3">Type</th><th className="p-3">Value</th><th className="p-3">Cap</th><th className="p-3 text-right">Uses</th><th className="p-3 text-right">GMV</th><th className="p-3 text-right">Commission</th><th className="p-3">Status</th><th className="p-3">Expires</th><th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {referralCodes.map(c => (
                <tr key={c.code} className="border-b border-[#EAE6E1] hover:bg-[#FFF6DC]" data-testid={`code-row-${c.code}`}>
                  <td className="p-3"><span className="font-display font-extrabold">{c.code}</span></td>
                  <td className="p-3"><p className="font-bold">{c.linkedTo}</p><p className="text-xs text-[#737373]">{c.college}</p></td>
                  <td className="p-3 text-xs">{c.type}</td>
                  <td className="p-3 font-bold">{c.value}</td>
                  <td className="p-3 text-xs">{c.cap}</td>
                  <td className="p-3 text-right font-bold">{c.uses}</td>
                  <td className="p-3 text-right">₹{(c.gmv/1000).toFixed(0)}K</td>
                  <td className="p-3 text-right font-display font-extrabold">₹{(c.commission/1000).toFixed(1)}K</td>
                  <td className="p-3"><span className={`gajab-sticker border-2 ${c.status==="Active"?"bg-[#D1FAE5] text-[#065F46] border-[#065F46]":"bg-[#FEF3C7] text-[#92400E] border-[#92400E]"}`}>{c.status}</span></td>
                  <td className="p-3 text-xs">{c.expires}</td>
                  <td className="p-3"><div className="flex gap-1"><button className="p-1 hover:bg-[#FFF6DC] rounded"><Edit className="w-4 h-4" /></button><button className="p-1 hover:bg-[#FEE2E2] rounded"><Trash2 className="w-4 h-4" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <form onSubmit={create} className="gajab-card p-6 bg-white w-full max-w-lg space-y-3" data-testid="create-code-modal">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-extrabold">New referral code</h3>
              <button type="button" onClick={()=>setOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider">Code</span><input value={form.code} onChange={e=>setForm({...form, code:e.target.value.toUpperCase()})} placeholder="RIYA10" className="input-gajab mt-1" data-testid="new-code-code" /></label>
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider">Link to ambassador</span>
                <select value={form.user} onChange={e=>setForm({...form, user:e.target.value})} className="input-gajab mt-1" data-testid="new-code-user"><option value="">Select</option>{leaderboard.map(a=><option key={a.rank}>{a.name}</option>)}</select>
              </label>
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider">Type</span>
                <select value={form.type} onChange={e=>setForm({...form, type:e.target.value})} className="input-gajab mt-1"><option>Percentage</option><option>Fixed</option></select>
              </label>
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider">Discount value</span><input value={form.value} onChange={e=>setForm({...form, value:e.target.value})} placeholder={form.type==="Percentage"?"10":"100"} className="input-gajab mt-1" /></label>
              {form.type==="Percentage" && <label className="block"><span className="text-xs font-bold uppercase tracking-wider">Max cap (₹)</span><input value={form.cap} onChange={e=>setForm({...form, cap:e.target.value})} placeholder="150" className="input-gajab mt-1" /></label>}
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider">Commission %</span><input value={form.commissionPct} onChange={e=>setForm({...form, commissionPct:e.target.value})} className="input-gajab mt-1" /></label>
              <label className="block col-span-2"><span className="text-xs font-bold uppercase tracking-wider">Expires on</span><input type="date" value={form.expires} onChange={e=>setForm({...form, expires:e.target.value})} className="input-gajab mt-1" /></label>
            </div>
            <button className="btn-primary w-full" data-testid="submit-new-code">Create Code</button>
          </form>
        </div>
      )}
    </div>
  );
}
