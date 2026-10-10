import React, { useState } from 'react';
import { MASTER_COMPARISON_TABLE, GRAND_RECAP_STORY } from '../data/summaryData';
import { DecisionWizard } from './DecisionWizard';
import { BookOpen, Table, Search, Sparkles } from 'lucide-react';

export const SummarySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredRows = MASTER_COMPARISON_TABLE.filter(row =>
    row.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.usedFor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.pythonFunction.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.realWorldExample.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="step4_summary" className="py-10 scroll-mt-20 space-y-12">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1">
          <span>Step 4 · Master Synthesis</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Final Summary & Decision Flowchart
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl">
          Here is your comprehensive cheat-sheet connecting every statistical tool, formula, and Python function
          covered in this notebook into one unified mastery reference.
        </p>
      </div>

      {/* 1. Master Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Table className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">
              Master Comparison Table (All Topics & Formulas)
            </h3>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search formula, topic, or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs uppercase font-medium">
              <tr>
                <th className="py-3 px-4 font-semibold text-slate-900">Topic</th>
                <th className="py-3 px-4 font-semibold text-slate-900">Formula</th>
                <th className="py-3 px-4 font-semibold text-slate-900">Primary Purpose / Used For</th>
                <th className="py-3 px-4 font-semibold text-slate-900">Real-World Example</th>
                <th className="py-3 px-4 font-semibold text-slate-900">Python Function</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                    {row.topic}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-indigo-700 whitespace-nowrap bg-indigo-50/30">
                    <code>{row.formula}</code>
                  </td>
                  <td className="py-3 px-4 text-slate-600 text-xs sm:text-sm max-w-xs leading-relaxed">
                    {row.usedFor}
                  </td>
                  <td className="py-3 px-4 text-slate-700 text-xs whitespace-nowrap">
                    {row.realWorldExample}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-emerald-800 whitespace-nowrap">
                    <code>{row.pythonFunction}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Interactive & Plain Text Decision Guide */}
      <DecisionWizard />

      {/* 3. Grand Recap Story */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2.5 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>The Big Picture Narrative</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-6 tracking-tight">
          The Grand Story of Statistics: How It All Ties Together
        </h3>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          <p>
            <strong className="text-white">1. Descriptive Statistics (The Mirror):</strong> You start in the dark with a raw pile
            of numbers. Measures of <span className="text-indigo-300 font-semibold">Central Tendency (Mean, Median, Mode)</span> shine
            a spotlight on where the center sits. Measures of <span className="text-indigo-300 font-semibold">Variability (Range, MAD, Variance, Standard Deviation)</span> reveal
            how widely values scatter. <span className="text-indigo-300 font-semibold">Skewness</span> and <span className="text-indigo-300 font-semibold">Boxplots (IQR)</span> show
            which way the tails tilt and catch extreme outliers. But you are only describing the 20 rows right in front of you.
          </p>

          <p>
            <strong className="text-white">2. Central Limit Theorem (The Magical Bridge):</strong> In the real world, you almost never have
            the entire universe of data — you only have a single spoon of soup from the 50-liter pot. The <span className="text-emerald-300 font-semibold">Central Limit Theorem (CLT)</span> is
            the miraculous bridge between describing a sample and understanding the whole world. It proves that no matter how crooked the original data is,
            repeated sample averages always form a smooth, predictable <span className="text-emerald-300 font-semibold">Normal Bell Curve</span>,
            giving us the <span className="text-emerald-300 font-semibold">Standard Error (s/√n)</span> — the ruler of human uncertainty.
          </p>

          <p>
            <strong className="text-white">3. Hypothesis Testing (The Courtroom):</strong> Now you can play detective. You establish a
            <span className="text-amber-300 font-semibold"> Null Hypothesis (H0)</span> representing the skeptical baseline (&quot;nothing special happened&quot;).
            You calculate a <span className="text-amber-300 font-semibold">p-value</span> to evaluate: &quot;If H0 were true, how surprised should we be by our sample?&quot;
            If the chance of fluke is less than your significance threshold (<span className="text-amber-300 font-semibold">α = 0.05</span>), you reject H0 beyond reasonable doubt.
          </p>

          <p>
            <strong className="text-white">4. The Decision Tools (Z, T, and Chi-Square):</strong> When you know the population spread,
            the <span className="text-sky-300 font-semibold">Z-Test</span> gives swift answers. When working with small real-world samples and unknown spread,
            the <span className="text-sky-300 font-semibold">T-Test</span> safely guards against false alarms. And when numbers turn into categories and tally marks,
            the <span className="text-sky-300 font-semibold">Chi-Square Test</span> verifies whether groups are genuinely linked or independent.
          </p>

          <div className="p-4 bg-white/10 rounded-xl border border-white/10 text-xs sm:text-sm font-semibold text-indigo-200 mt-4">
            🌟 From calculating your very first arithmetic average to building machine learning models or running online A/B tests,
            you are walking this exact continuous thread of logic!
          </div>
        </div>
      </div>
    </section>
  );
};
