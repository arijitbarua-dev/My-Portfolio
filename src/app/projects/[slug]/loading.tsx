import React from "react";

export default function ProjectLoading() {
  return (
    <div className="min-h-screen bg-[#FFFBEA] flex flex-col items-center justify-center p-6 text-[#111111]">
      <div className="border-3 border-[#111111] bg-[#FFFFFF] p-8 shadow-brutal-md flex items-center gap-4">
        <div className="w-4 h-4 bg-[#83E52B] animate-spin" />
        <span className="font-mono text-xs uppercase font-black tracking-widest text-[#111111]">
          DECODING CASE STUDY SPECIFICATION...
        </span>
      </div>
    </div>
  );
}

