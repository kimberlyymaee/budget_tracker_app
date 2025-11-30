"use client";

import { ReactNode } from "react";

interface DeviceMockupProps {
  children: ReactNode;
  className?: string;
}

export function DeviceMockup({ children, className = "" }: DeviceMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Device Frame */}
      <div className="relative mx-auto w-full max-w-[280px] aspect-[9/19.5]">
        {/* Device Shadow */}
        <div className="absolute inset-0 rounded-[2.5rem] bg-slate-900/20 blur-2xl transform translate-y-4 scale-95"></div>
        
        {/* Device Body */}
        <div className="relative bg-slate-900 rounded-[2.5rem] p-2 shadow-2xl h-full flex flex-col">
          {/* Screen Bezel */}
          <div className="bg-slate-800 rounded-[2rem] p-1 h-full flex flex-col">
            {/* Notch (optional, for phone style) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-10"></div>
            
            {/* Screen Content Area */}
            <div className="bg-white rounded-[1.75rem] overflow-hidden relative h-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

