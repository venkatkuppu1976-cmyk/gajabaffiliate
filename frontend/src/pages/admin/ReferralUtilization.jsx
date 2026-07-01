import React, { useState } from "react";
import { Plus, Edit, Trash2, X, Percent, Calendar, Search } from "lucide-react";
import { toast } from "sonner";
import { referralUtilization, commissionOverrides } from "@/data/mockData";
import DateInputDDMMYYYY from "@/components/DateInputDDMMYYYY";
import { useVersion } from "@/hooks/useVersion";

const overrideStatusClr = {
  "Active": "bg-[#D1FAE5] text-[#065F46] border-[#065F46]/40",
  "Scheduled": "bg-[#E0E7FF] text-[#3730A3] border-[#3730A3]/30",
  "Expired": "bg-[#F3EFE9] text-[#5A6378] border-[#EFEAE0]",
};

export default function Utilization() {
  const { isV2 } = useVersion();
  const [open, setOpen] = useState(false);
  const [uq, setUq] = useState("");
  const [ufilter, setUfilter] = useState("All codes");
  const [form, setForm] = useState({ label: "", appliesTo: "All ambassadors", overridePct: "", startDate: "", endDate: "" });
  const filteredUtil = referralUtilization.filter(u => !isV2 || (u.code + u.orderId + u.customerId).toLowerCase().includes(uq.toLowerCase())).filter(u => !isV2 || ufilter === "All codes" || u.code === ufilter);
  const codeOptions = ["All codes", ...new Set(referralUtilization.map(u=>u.code))];

  const save = (e) => {
    e.preventDefault();
    if (!form.label || !form.overridePct) { toast.error("Label & override % required"); return; }
    toast.success(`Commission override "${form.label}" created`);
    setOpen(false);
    setForm({ label: "", appliesTo: "All ambassadors", overridePct: "", startDate: "", endDate: "" });
  };

  return (
    <div className="space-y-5">
      <div>
        <span className="gajab-sticker-yellow">Utilization & Commission</span>
        <h1 className="font-display text-3xl sm:text-4xl mt-2">Order utilization & commission overrides</h1>
        <p className="text-[#5A6378] mt-1">Track each order using a referral URL, and override commission % for special campaigns.</p>
      </div>

      {/* COMMISSION OVERRIDES */}
      <div className="gajab-card p-5">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
          <div><h3 className="font-display text-xl flex items-center gap-2"><Percent className="w-5 h-5 text-[#F26B1F]" /> Commission overrides</h3><p className="text-xs text-[#5A6378]">Boost commission for specific campaigns & periods. Overrides apply automatically to qualifying orders.</p></div>
          <button onClick={()=>setOpen(true)} className="btn-primary text-sm" data-testid="new-override-btn"><Plus className="w-4 h-4" /> New Override</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#FFF7EE] border-b border-[#EFEAE0]"><tr className="text-left text-[10px] font-extrabold uppercase tracking-wider text-[#5A6378]">
              <th className="p-3">ID</th><th className="p-3">Campaign</th><th className="p-3">Applies to</th><th className="p-3 text-right">Original %</th><th className="p-3 text-right">Override %</th><th className="p-3">Start</th><th className="p-3">End</th><th className="p-3">Status</th><th className="p-3"></th>
            </tr></thead>
            <tbody>
              {commissionOverrides.map(o => (
                <tr key={o.id} className="border-b border-[#F0EBE2]" data-testid={`override-${o.id}`}>
                  <td className="p-3 font-mono text-xs">{o.id}</td>
                  <td className="p-3 font-bold">{o.label}</td>
                  <td className="p-3 text-xs">{o.appliesTo}</td>
                  <td className="p-3 text-right text-[#5A6378]">{o.originalPct}%</td>
                  <td className="p-3 text-right font-display text-[#F26B1F]">{o.overridePct}%</td>
                  <td className="p-3 text-xs">{o.startDate}</td>
                  <td className="p-3 text-xs">{o.endDate}</td>
                  <td className="p-3"><span className={`gajab-sticker border ${overrideStatusClr[o.status]}`}>{o.status}</span></td>
                  <td className="p-3"><div className="flex gap-1"><button onClick={()=>toast.success(`Editing ${o.label}`)} className="p-1.5 hover:bg-[#FFF7EE] rounded-lg"><Edit className="w-3.5 h-3.5 text-[#5A6378]" /></button><button onClick={()=>toast.success(`Deleted ${o.label}`)} className="p-1.5 hover:bg-[#FEE2E2] rounded-lg"><Trash2 className="w-3.5 h-3.5 text-[#991B1B]" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORDER UTILIZATION */}
      <div className="gajab-card p-0 overflow-hidden">
        <div className="p-5 pb-3 flex flex-wrap justify-between items-center gap-3"><div><h3 className="font-display text-xl">Order utilization log</h3><p className="text-xs text-[#5A6378]">Every order placed via a referral URL.</p></div>
          {isV2 && (<div className="flex gap-2 flex-wrap"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6378]" /><input value={uq} onChange={e=>setUq(e.target.value)} placeholder="Search code, order, customer..." className="input-gajab pl-10 h-10 w-64" data-testid="util-search" /></div><select value={ufilter} onChange={e=>setUfilter(e.target.value)} className="input-gajab h-10 w-40" data-testid="util-filter">{codeOptions.map(c=><option key={c}>{c}</option>)}</select></div>)}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#FFF7EE] border-b border-[#EFEAE0]"><tr className="text-left text-[10px] font-extrabold uppercase tracking-wider text-[#5A6378]">
              <th className="p-3">Code</th><th className="p-3">Order ID</th><th className="p-3">Customer</th><th className="p-3 text-right">Order Value</th><th className="p-3">Used at</th><th className="p-3 text-right">Discount</th><th className="p-3 text-right">Commission %</th><th className="p-3 text-right">Commission ₹</th>
            </tr></thead>
            <tbody>
              {filteredUtil.map((u, i) => (
                <tr key={i} className="border-b border-[#F0EBE2] hover:bg-[#FFF7EE]" data-testid={`util-row-${u.orderId}`}>
                  <td className="p-3"><span className="font-display">{u.code}</span></td>
                  <td className="p-3 font-mono text-xs">{u.orderId}</td>
                  <td className="p-3 font-mono text-xs">{u.customerId}</td>
                  <td className="p-3 text-right">₹{u.orderValue.toLocaleString()}</td>
                  <td className="p-3 text-xs">{u.date}</td>
                  <td className="p-3 text-right text-[#F26B1F] font-bold">- ₹{u.discount}</td>
                  <td className="p-3 text-right">{u.commissionPct}</td>
                  <td className="p-3 text-right font-display text-[#065F46]">₹{u.commissionValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#1B2D54]/40 p-4">
          <form onSubmit={save} className="gajab-card p-6 bg-white w-full max-w-lg space-y-3">
            <div className="flex items-center justify-between"><h3 className="font-display text-2xl flex items-center gap-2"><Percent className="w-5 h-5 text-[#F26B1F]" /> New commission override</h3><button type="button" onClick={()=>setOpen(false)}><X className="w-5 h-5" /></button></div>
            <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Campaign label</span><input value={form.label} onChange={e=>setForm({...form, label:e.target.value})} placeholder="Diwali Festive Boost" className="input-gajab mt-1" data-testid="override-label" /></label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Applies to</span><select value={form.appliesTo} onChange={e=>setForm({...form, appliesTo:e.target.value})} className="input-gajab mt-1"><option>All ambassadors</option><option>Gold + Platinum tiers</option><option>Silver tier</option><option>Specific city/state</option></select></label>
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Override % (boost)</span><input type="number" value={form.overridePct} onChange={e=>setForm({...form, overridePct:e.target.value})} className="input-gajab mt-1" placeholder="15" data-testid="override-pct" /></label>
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">Start date</span><div className="mt-1"><DateInputDDMMYYYY value={form.startDate} onChange={v=>setForm({...form, startDate:v})} testId="override-start" /></div></label>
              <label className="block"><span className="text-xs font-bold uppercase tracking-wider text-[#5A6378]">End date</span><div className="mt-1"><DateInputDDMMYYYY value={form.endDate} onChange={v=>setForm({...form, endDate:v})} testId="override-end" /></div></label>
            </div>
            <p className="text-xs text-[#5A6378] flex items-start gap-1"><Calendar className="w-3 h-3 mt-0.5" /> Override % replaces the ambassador&apos;s base commission for qualifying orders during this period.</p>
            <button className="btn-primary w-full" data-testid="override-submit">Create Override</button>
          </form>
        </div>
      )}
    </div>
  );
}
