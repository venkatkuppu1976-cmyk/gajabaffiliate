import React, { createContext, useContext, useEffect, useState } from "react";

const KEY = "gajab_version";
const VersionContext = createContext({ v: "v1", isV2: false, toggle: () => {} });

export function VersionProvider({ children }) {
  const [v, setV] = useState(() => localStorage.getItem(KEY) || "v1");
  useEffect(() => { localStorage.setItem(KEY, v); }, [v]);
  const value = { v, isV2: v === "v2", toggle: () => setV(x => (x === "v1" ? "v2" : "v1")) };
  return <VersionContext.Provider value={value}>{children}</VersionContext.Provider>;
}

export function useVersion() {
  return useContext(VersionContext);
}

export function VersionToggle({ className = "" }) {
  const { v, toggle } = useVersion();
  return (
    <button onClick={toggle} data-testid="version-toggle" title="Switch demo version" className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border border-[#F26B1F] bg-white text-[10px] font-extrabold uppercase tracking-wider ${className}`}>
      <span className={`px-2 py-0.5 rounded-full transition-all ${v==="v1"?"bg-[#F26B1F] text-white":"text-[#5A6378]"}`}>V1</span>
      <span className={`px-2 py-0.5 rounded-full transition-all ${v==="v2"?"bg-[#F26B1F] text-white":"text-[#5A6378]"}`}>V2</span>
    </button>
  );
}
