import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { adminKpis, trendData, referralCodes } from "@/data/mockData";

const codeBarData = referralCodes.map(c => ({ name: c.code, gmv: c.gmv, commission: c.commission }));
const convData = [
  { name: "With Referral", value: adminKpis.conversionWithRef },
  { name: "Without Referral", value: adminKpis.conversionWithoutRef },
];
const COLORS = ["#F26B1F", "#FFC93C"];

const Kpi = ({ label, value, sub, bg }) => (
  <div className={`gajab-card p-5 ${bg}`}>
    <p className="text-xs uppercase font-extrabold tracking-wider opacity-70">{label}</p>
    <p className="font-display text-4xl font-extrabold mt-1">{value}</p>
    {sub && <p className="text-xs text-[#5A6378] mt-1">{sub}</p>}
  </div>
);

export default function Analytics() {
  return (
    <div className="space-y-5">
      <div>
        <span className="gajab-sticker-yellow">Analytics</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-2">Program performance</h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi label="% Orders w/ Referral" value={`${adminKpis.refOrdersPercent}%`} sub="of total orders" bg="bg-[#FFE3E5]" />
        <Kpi label="Conversion w/ Ref" value={`${adminKpis.conversionWithRef}%`} sub={`vs ${adminKpis.conversionWithoutRef}% without`} bg="bg-[#FFF6DC]" />
        <Kpi label="Total Commission Paid" value={`₹${(adminKpis.totalCommissionPaid/100000).toFixed(1)}L`} sub="lifetime to date" bg="bg-[#E6F8EF]" />
        <Kpi label="Total GMV via Refs" value={`₹${(adminKpis.totalGMV/100000).toFixed(1)}L`} sub="from referral orders" bg="bg-[#E8E4FB]" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="gajab-card p-5 lg:col-span-2">
          <h3 className="font-display text-lg font-extrabold mb-3">Top referral codes by GMV</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={codeBarData}>
                <CartesianGrid stroke="#EAE6E1" strokeDasharray="4 4" />
                <XAxis dataKey="name" stroke="#1A1A1A" fontSize={11} fontWeight="700" />
                <YAxis stroke="#1A1A1A" fontSize={11} />
                <Tooltip contentStyle={{borderRadius:12, border:"2px solid #1A1A1A"}} />
                <Bar dataKey="gmv" fill="#F26B1F" radius={[8,8,0,0]} />
                <Bar dataKey="commission" fill="#FFC93C" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="gajab-card p-5">
          <h3 className="font-display text-lg font-extrabold mb-3">Conversion comparison</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={convData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                  {convData.map((_, i) => <Cell key={i} fill={COLORS[i]} stroke="#1A1A1A" strokeWidth={2} />)}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="gajab-card p-5">
        <h3 className="font-display text-lg font-extrabold mb-3">Weekly revenue trend (all ambassadors)</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={trendData}>
              <CartesianGrid stroke="#EAE6E1" strokeDasharray="4 4" />
              <XAxis dataKey="day" stroke="#1A1A1A" fontWeight="700" />
              <YAxis stroke="#1A1A1A" />
              <Tooltip contentStyle={{borderRadius:12, border:"2px solid #1A1A1A"}} />
              <Bar dataKey="revenue" fill="#F26B1F" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
