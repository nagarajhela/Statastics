import React from 'react';
import { Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenCLTSimulator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCLTSimulator }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-xs">
            ∑
          </span>
          <span>StatsTutor</span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-600">
          <a
            href="#step0_datasets"
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            Fixed Datasets
          </a>
          <a
            href="#mean"
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            Central Tendency
          </a>
          <a
            href="#range"
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            Variability
          </a>
          <a
            href="#clt"
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            Inferential & CLT
          </a>
          <a
            href="#z_test"
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            Z, T & Chi-Square
          </a>
          <a
            href="#step4_summary"
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            Master Summary
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCLTSimulator}
            className="px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLT Simulator</span>
          </button>
        </div>
      </div>
    </header>
  );
};
