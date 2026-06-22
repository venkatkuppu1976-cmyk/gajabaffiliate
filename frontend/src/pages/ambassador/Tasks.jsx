import React, { useState } from "react";
import { Clock, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { tasks } from "@/data/mockData";

const tabs = ["Pending", "Under Review", "Approved"];

export default function Tasks() {
  const [active, setActive] = useState("Pending");
  const [openId, setOpenId] = useState(null);
  const [proof, setProof] = useState("");

  const filtered = tasks.filter(t => t.status === active);
  const submit = (id) => {
    if (!proof.trim()) { toast.error("Add a link or note"); return; }
    toast.success("Submitted for review!");
    setOpenId(null); setProof("");
  };
  const Icon = active === "Pending" ? Clock : active === "Under Review" ? AlertCircle : CheckCircle2;

  return (
    <div className="space-y-5">
      <div>
        <span className="gajab-sticker-yellow">Tasks Hub</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-2">Earn extra ₹ with tasks.</h1>
        <p className="text-[#4A4A4A] mt-1">Monthly missions from Gajab HQ. Complete & submit proof.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t} onClick={() => setActive(t)} className={`nav-tab whitespace-nowrap border-2 ${active===t ? "bg-[#1A1A1A] text-white border-black" : "bg-white text-[#1A1A1A] border-[#EAE6E1]"}`} data-testid={`tasks-tab-${t.toLowerCase().replace(/ /g,"-")}`}>
            {t} <span className="opacity-60">({tasks.filter(x=>x.status===t).length})</span>
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {filtered.length === 0 && (
          <div className="gajab-card-soft p-10 text-center">
            <Icon className="w-10 h-10 mx-auto opacity-30" />
            <p className="mt-3 font-bold">No {active.toLowerCase()} tasks</p>
          </div>
        )}
        {filtered.map(t => (
          <div key={t.id} className="gajab-card p-5" data-testid={`task-${t.id}`}>
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#737373]">{t.id}</span>
                  <span className="gajab-sticker-yellow text-[10px]">₹{t.reward}</span>
                </div>
                <h4 className="font-display text-lg sm:text-xl font-extrabold">{t.title}</h4>
                <p className="text-sm text-[#4A4A4A] mt-1">{t.description}</p>
                <p className="text-xs text-[#737373] mt-2"><Clock className="w-3 h-3 inline mr-1" />Deadline: <b className="text-[#1A1A1A]">{t.deadline}</b></p>
              </div>
              {active === "Pending" && (
                <button onClick={() => setOpenId(openId === t.id ? null : t.id)} className="btn-primary" data-testid={`submit-task-${t.id}`}>
                  <Send className="w-4 h-4" /> Submit
                </button>
              )}
              {active === "Approved" && <span className="gajab-sticker bg-[#D1FAE5] text-[#065F46] border-2 border-[#065F46]">✓ Approved</span>}
            </div>
            {openId === t.id && (
              <div className="mt-4 pt-4 border-t-2 border-dashed border-[#EAE6E1]">
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wider">Proof (link or note)</span>
                  <textarea value={proof} onChange={e=>setProof(e.target.value)} rows={3} placeholder="Paste your Insta link, drive URL, or describe your submission..." className="input-gajab mt-1 py-3 h-auto resize-none" data-testid={`proof-input-${t.id}`} />
                </label>
                <div className="mt-3 flex gap-2 justify-end">
                  <button onClick={()=>setOpenId(null)} className="btn-ghost">Cancel</button>
                  <button onClick={()=>submit(t.id)} className="btn-primary" data-testid={`proof-submit-${t.id}`}>Submit Proof</button>
                </div>
              </div>
            )}
            {t.submission && active === "Under Review" && (
              <div className="mt-3 p-3 rounded-xl bg-[#FEF3C7] border-2 border-[#92400E] text-xs">
                <b>Your submission:</b> {t.submission}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
