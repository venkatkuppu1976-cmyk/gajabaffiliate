import React from "react";

export default function Logo({ size = "md", showTag = true }) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl",
  };
  return (
    <div className="inline-flex items-center gap-2" data-testid="gajab-logo">
      <div className="flex items-baseline">
        <span className={`font-display font-extrabold tracking-tight text-[#E11D2A] ${sizes[size]}`}>
          gajab
        </span>
        <span className={`font-display font-extrabold tracking-tight text-[#1A1A1A] ${sizes[size]}`}>.</span>
      </div>
      {showTag && (
        <span className="gajab-sticker-yellow text-[10px]" style={{ transform: "rotate(-4deg)" }}>
          Ambassadors
        </span>
      )}
    </div>
  );
}
