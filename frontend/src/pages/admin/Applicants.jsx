import React, { useState } from "react";
import { Search, AlertTriangle, Check, X } from "lucide-react";
import { toast } from "sonner";
import { applicants } from "@/data/mockData";

export default function Applicants() {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(null);
  const [notes, setNotes] = useState("");

  const filtered = applicants.filter(a => (a.name+a.college+a.city+a.email).toLowerCase().includes(q.toLowerCase()));
  const act = (kind) => { toast.success(`${sel.name} ${kind === "approve" ? "approved & login credentials sent" : "rejected"}`); setSel(null); setNotes(""); };

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <span className="gajab-sticker-yellow">Applicant Tracking</span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-2">Applications inbox</h1>
          <p className="text-[#4A4A4A] mt-1">{filtered.length} of {applicants.length} applicants</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search name, college, city..." className="input-gajab pl-10 w-72" data-testid="applicants-search" />
        </div>
      </div>

      <div className="gajab-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F3EFE9] border-b-2 border-black">
              <tr className="text-left text-[10px] font-extrabold uppercase tracking-wider">
                <th className="p-3">ID</th><th className="p-3">Name</th><th className="p-3">Phone</th><th className="p-3">Email</th><th className="p-3">College</th><th className="p-3">City</th><th className="p-3">Applied</th><th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} onClick={()=>{setSel(a); setNotes("");}} className="border-b border-[#EAE6E1] hover:bg-[#FFF6DC] cursor-pointer" data-testid={`applicant-row-${a.id}`}>
                  <td className="p-3 font-mono text-xs">{a.id}</td>
                  <td className="p-3 font-bold">
                    {a.duplicate && <AlertTriangle className="w-4 h-4 text-[#E11D2A] inline mr-1" />}
                    {a.name}
                  </td>
                  <td className="p-3">{a.phone}</td>
                  <td className="p-3 text-xs">{a.email}</td>
                  <td className="p-3">{a.college}</td>
                  <td className="p-3">{a.city}</td>
                  <td className="p-3 text-xs">{a.appliedOn}</td>
                  <td className="p-3"><span className={`gajab-sticker border-2 ${a.status==="Approved"?"bg-[#D1FAE5] text-[#065F46] border-[#065F46]":a.status==="Rejected"?"bg-[#FEE2E2] text-[#991B1B] border-[#991B1B]":"bg-[#FEF3C7] text-[#92400E] border-[#92400E]"}`}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-out drawer */}
      {sel && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={()=>setSel(null)} />
          <div className="w-full max-w-md bg-white h-full overflow-y-auto border-l-2 border-black p-6" data-testid="applicant-drawer">
            <div className="flex items-center justify-between">
              <span className="gajab-sticker-yellow">Application #{sel.id}</span>
              <button onClick={()=>setSel(null)}><X className="w-5 h-5" /></button>
            </div>
            <h2 className="font-display text-3xl font-extrabold mt-3">{sel.name}</h2>
            {sel.duplicate && <p className="mt-2 p-3 rounded-xl bg-[#FEE2E2] border-2 border-[#991B1B] text-sm flex gap-2"><AlertTriangle className="w-4 h-4 text-[#E11D2A] flex-shrink-0" /><span><b>Duplicate detected:</b> Phone/email matches another applicant.</span></p>}
            <div className="mt-4 space-y-2 text-sm">
              <p><b>Email:</b> {sel.email}</p>
              <p><b>Phone:</b> {sel.phone}</p>
              <p><b>College:</b> {sel.college}</p>
              <p><b>City:</b> {sel.city}</p>
              <p><b>Applied:</b> {sel.appliedOn}</p>
            </div>
            <label className="block mt-6">
              <span className="text-xs font-bold uppercase tracking-wider">Internal notes</span>
              <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={4} placeholder="Add note for the team..." className="input-gajab mt-1 py-3 h-auto resize-none" data-testid="applicant-notes" />
            </label>
            <div className="mt-6 flex gap-2">
              <button onClick={()=>act("reject")} className="btn-ghost flex-1 border-[#991B1B] text-[#991B1B]" data-testid="applicant-reject"><X className="w-4 h-4" /> Reject</button>
              <button onClick={()=>act("approve")} className="btn-primary flex-1" data-testid="applicant-approve"><Check className="w-4 h-4" /> Approve & Send credentials</button>
            </div>
            <p className="text-xs text-[#737373] mt-3">Approving auto-generates affiliate link + sends OTP login via Email & WhatsApp.</p>
          </div>
        </div>
      )}
    </div>
  );
}
