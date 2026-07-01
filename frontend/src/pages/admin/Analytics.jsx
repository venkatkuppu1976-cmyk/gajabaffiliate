import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { Filter } from "lucide-react";
import { adminKpis, trendData, states, cities } from "@/data/mockData";
import { useVersion } from "@/hooks/useVersion";

const convData = [{ name: "With Referral", value: adminKpis.conversionWithRef }, { name: "Without Referral", value: adminKpis.conversionWithoutRef }];
const COLORS = ["#F26B1F", "#FFC93C"];

const Kpi = ({ label, value, sub, bg }) => (
  <div className={`gajab-card p-5 ${bg}`}><p className="text-xs uppercase font-extrabold tracking-wider opacity-70">{label}</p><p className="font-display text-4xl mt-1">{value}</p>{sub && <p className="text-xs text-[#5A6378] mt-1">{sub}</p>}</div>
);

export default function Analytics() {
  const { isV2 } = useVersion();
  const [frequency, setFrequency] = useState("Weekly");
  const [stateF, setStateF] = useState("All States");
  const [cityF, setCityF] = useState("All Cities");
  const [scope, setScope] = useState("Overall");

  return (
    <div className="space-y-5">
      <div>
        <span className="gajab-sticker-yellow">Analytics</span>
        <h1 className="font-display text-3xl sm:text-4xl mt-2">Program performance</h1>
      </div>

      <div className="gajab-card p-4 grid lg:grid-cols-4 gap-3">
        <div className="flex flex-col"><span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6378] mb-1 flex items-center gap-1"><Filter className="w-3 h-3" /> Frequency</span>
          <select value={frequency} onChange={e=>setFrequency(e.target.value)} className="input-gajab h-10" data-testid="analytics-frequency"><option>Daily</option><option>Weekly</option><option>Monthly</option><option>Quarterly</option><option>Yearly</option>{isV2 && <option>Custom Date</option>}</select>
          {isV2 && frequency === "Custom Date" && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              <input type="date" className="input-gajab h-9 text-xs" data-testid="analytics-custom-from" />
              <input type="date" className="input-gajab h-9 text-xs" data-testid="analytics-custom-to" />
            </div>
          )}
        </div>
        <div className="flex flex-col"><span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6378] mb-1">State</span><select value={stateF} onChange={e=>setStateF(e.target.value)} className="input-gajab h-10" data-testid="analytics-state">{states.map(s=><option key={s}>{s}</option>)}</select></div>
        <div className="flex flex-col"><span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6378] mb-1">City</span><select value={cityF} onChange={e=>setCityF(e.target.value)} className="input-gajab h-10" data-testid="analytics-city">{cities.map(c=><option key={c}>{c}</option>)}</select></div>
        <div className="flex flex-col"><span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6378] mb-1">Scope</span><select value={scope} onChange={e=>setScope(e.target.value)} className="input-gajab h-10" data-testid="analytics-scope"><option>Overall</option><option>By tier</option><option>By college</option><option>By channel</option></select></div>
      </div>

      <p className="text-xs text-[#5A6378]">Showing: <b className="text-[#1B2D54]">{frequency}</b> · <b className="text-[#1B2D54]">{stateF}</b> · <b className="text-[#1B2D54]">{cityF}</b> · <b className="text-[#1B2D54]">{scope}</b></p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi label="% Orders w/ Referral" value={`${adminKpis.refOrdersPercent}%`} sub="of total orders" bg="bg-[#FFE9D9]" />
        <Kpi label="Conversion w/ Ref" value={`${adminKpis.conversionWithRef}%`} sub={`vs ${adminKpis.conversionWithoutRef}% without`} bg="bg-[#FFF1C2]" />
        <Kpi label="Total Commission Paid" value={`₹${(adminKpis.totalCommissionPaid/100000).toFixed(1)}L`} sub="lifetime to date" bg="bg-[#D1FAE5]" />
        <Kpi label="Total GMV via Refs" value={`₹${(adminKpis.totalGMV/100000).toFixed(1)}L`} sub="from referral orders" bg="bg-[#E0E7FF]" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="gajab-card p-5 lg:col-span-2"><h3 className="font-display text-lg mb-3">Revenue trend ({frequency})</h3>
          <div className="h-72"><ResponsiveContainer><BarChart data={trendData}><CartesianGrid stroke="#EFEAE0" strokeDasharray="4 4" /><XAxis dataKey="day" stroke="#1B2D54" fontWeight="700" /><YAxis stroke="#1B2D54" /><Tooltip contentStyle={{borderRadius:12, border:"1px solid #EFEAE0"}} /><Bar dataKey="revenue" fill="#F26B1F" radius={[8,8,0,0]} /></BarChart></ResponsiveContainer></div>
        </div>
        <div className="gajab-card p-5"><h3 className="font-display text-lg mb-3">Conversion comparison</h3>
          <div className="h-72"><ResponsiveContainer><PieChart><Pie data={convData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>{convData.map((_, i) => <Cell key={i} fill={COLORS[i]} stroke="#1B2D54" strokeWidth={2} />)}</Pie><Legend /></PieChart></ResponsiveContainer></div>
        </div>
      </div>
    </div>
  );
}
