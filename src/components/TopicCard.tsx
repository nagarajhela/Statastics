import React, { useState } from 'react';
import { TopicTemplate } from '../types/topic';
import { InteractiveChart } from './InteractiveChart';
import { Copy, Check, ChevronDown, ChevronUp, Code2, LineChart, Sparkles } from 'lucide-react';

interface TopicCardProps {
  topic: TopicTemplate;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  const [activeCodeTab, setActiveCodeTab] = useState<'calc' | 'chart'>('calc');
  const [copiedCalc, setCopiedCalc] = useState(false);
  const [copiedChart, setCopiedChart] = useState(false);
  const [showFullArithmetic, setShowFullArithmetic] = useState(true);

  const copyToClipboard = (text: string, isCalc: boolean) => {
    navigator.clipboard.writeText(text);
    if (isCalc) {
      setCopiedCalc(true);
      setTimeout(() => setCopiedCalc(false), 2000);
    } else {
      setCopiedChart(true);
      setTimeout(() => setCopiedChart(false), 2000);
    }
  };

  return (
    <article
      id={topic.id}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs mb-10 overflow-hidden scroll-mt-24 transition-all"
    >
      {/* Topic Header Banner */}
      <div className="px-6 py-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1">
            <span>{topic.sectionCode}</span>
            <span>·</span>
            <span>{topic.section}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>{topic.title}</span>
          </h3>
        </div>
        <div className="text-xs text-slate-300 font-mono bg-white/10 px-3 py-1 rounded-md border border-white/10">
          Fixed Tables 1 & 2
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* =========================================================================
            1. 🧠 "What is it?"
        ========================================================================= */}
        <section>
          <div className="flex items-center gap-2 text-base font-bold text-slate-900 mb-3">
            <span className="text-xl" role="img" aria-label="brain">🧠</span>
            <h4>1. What is it?</h4>
          </div>
          <div className="bg-indigo-50/50 rounded-xl p-5 border border-indigo-100/80 space-y-3">
            <p className="text-sm sm:text-base font-semibold text-indigo-950 leading-relaxed">
              {topic.whatIsIt.summary}
            </p>
            <div className="p-4 bg-white rounded-lg border border-indigo-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="text-indigo-900 block mb-1">Kid-Friendly Analogy:</strong>
              {topic.whatIsIt.analogy}
            </div>
            {topic.whatIsIt.explanation.length > 0 && (
              <ul className="space-y-1.5 pt-1 text-xs sm:text-sm text-slate-600 list-disc list-inside">
                {topic.whatIsIt.explanation.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* =========================================================================
            2. 📍 "Where is it used in real life?"
        ========================================================================= */}
        <section>
          <div className="flex items-center gap-2 text-base font-bold text-slate-900 mb-3">
            <span className="text-xl" role="img" aria-label="pin">📍</span>
            <h4>2. Where is it used in real life?</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topic.realLifeUseCases.map((useCase, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-2.5"
              >
                <span className="text-indigo-500 font-bold shrink-0">#{idx + 1}</span>
                <span>{useCase}</span>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            3. 🤖 "Where is it used in Machine Learning / Data Analysis?"
        ========================================================================= */}
        <section>
          <div className="flex items-center gap-2 text-base font-bold text-slate-900 mb-3">
            <span className="text-xl" role="img" aria-label="robot">🤖</span>
            <h4>3. Where is it used in Machine Learning / Data Analysis?</h4>
          </div>
          <div className="space-y-2.5">
            {topic.mlUseCases.map((mlCase, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-emerald-50/40 rounded-lg border border-emerald-100 text-xs sm:text-sm text-slate-800 leading-relaxed"
              >
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-semibold shrink-0">✦</span>
                  <span>{mlCase}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            4. 📐 Formula
        ========================================================================= */}
        <section>
          <div className="flex items-center gap-2 text-base font-bold text-slate-900 mb-3">
            <span className="text-xl" role="img" aria-label="ruler">📐</span>
            <h4>4. Formula</h4>
          </div>
          <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-800">
            <div className="text-center py-3 bg-slate-950/70 rounded-lg border border-slate-800 font-mono text-sm sm:text-base text-indigo-300 overflow-x-auto tracking-wide">
              {topic.formula.latex}
            </div>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {topic.formula.description}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 text-xs">
              <span className="font-semibold text-slate-400 uppercase tracking-wider block text-[11px]">
                Plain English Symbol Guide:
              </span>
              {topic.formula.symbolExplanations.map((sym, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 text-slate-300">
                  <code className="font-mono text-indigo-300 bg-slate-800 px-1.5 py-0.5 rounded text-[11px] shrink-0 font-bold">
                    {sym.symbol}
                  </code>
                  <span className="text-slate-400 sm:mx-1 hidden sm:inline">→</span>
                  <span className="text-slate-300">{sym.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. ✍️ Manual Calculation
        ========================================================================= */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-base font-bold text-slate-900">
              <span className="text-xl" role="img" aria-label="pencil">✍️</span>
              <h4>5. Manual Step-by-Step Calculation</h4>
            </div>
            <button
              onClick={() => setShowFullArithmetic(!showFullArithmetic)}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{showFullArithmetic ? 'Hide Steps' : 'Show All Steps'}</span>
              {showFullArithmetic ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Table 1 Calculation */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {topic.manualCalculation.table1Title}
                </span>
              </div>
              {showFullArithmetic && (
                <div className="space-y-2 mb-4 font-mono text-xs text-slate-700 leading-relaxed">
                  {topic.manualCalculation.table1Steps.map((step, idx) => (
                    <div key={idx} className="p-2 bg-white rounded border border-slate-200/70">
                      {step}
                    </div>
                  ))}
                </div>
              )}
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs sm:text-sm font-bold text-indigo-950 font-mono tabular-nums">
                {topic.manualCalculation.table1Result}
              </div>
            </div>

            {/* Table 2 Calculation */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {topic.manualCalculation.table2Title}
                </span>
              </div>
              {showFullArithmetic && (
                <div className="space-y-2 mb-4 font-mono text-xs text-slate-700 leading-relaxed">
                  {topic.manualCalculation.table2Steps.map((step, idx) => (
                    <div key={idx} className="p-2 bg-white rounded border border-slate-200/70">
                      {step}
                    </div>
                  ))}
                </div>
              )}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs sm:text-sm font-bold text-emerald-950 font-mono tabular-nums">
                {topic.manualCalculation.table2Result}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. 🐍 Python Code (Calculation) & 7. 📊 Python Code (Chart)
        ========================================================================= */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 text-base font-bold text-slate-900">
              <span className="text-xl" role="img" aria-label="snake">🐍</span>
              <h4>6. Python Code (Calculation) & 7. 📊 Python Code (Chart)</h4>
            </div>

            {/* Sub-tab switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
              <button
                onClick={() => setActiveCodeTab('calc')}
                className={`px-3 py-1 font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                  activeCodeTab === 'calc'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>6. Calculation Code</span>
              </button>
              <button
                onClick={() => setActiveCodeTab('chart')}
                className={`px-3 py-1 font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                  activeCodeTab === 'chart'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LineChart className="w-3.5 h-3.5" />
                <span>7. Chart Code & Visual</span>
              </button>
            </div>
          </div>

          {activeCodeTab === 'calc' ? (
            /* Python Calculation Tab */
            <div className="space-y-4">
              <div className="bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden shadow-xs">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
                  <span className="font-mono text-slate-400">calculate_{topic.id}.py</span>
                  <button
                    onClick={() => copyToClipboard(topic.pythonCalculation.code, true)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    {copiedCalc ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCalc ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed text-indigo-200">
                  <code>{topic.pythonCalculation.code}</code>
                </pre>
              </div>

              {/* Line-by-Line Explanation */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                  Line-by-Line Explanation:
                </span>
                <div className="space-y-1.5 text-xs">
                  {topic.pythonCalculation.lineByLineExplanation.map((exp, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 text-slate-700">
                      <code className="font-mono font-semibold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0 text-[11px]">
                        {exp.line}
                      </code>
                      <span className="text-slate-400 sm:mx-1 hidden sm:inline">→</span>
                      <span>{exp.explanation}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected Output */}
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 font-mono">
                  Console Output:
                </span>
                <pre className="text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                  {topic.pythonCalculation.expectedOutput}
                </pre>
              </div>
            </div>
          ) : (
            /* Python Chart Tab */
            <div className="space-y-4">
              {/* Live Rendered Chart */}
              <div className="mb-2">
                <InteractiveChart type={topic.pythonChart.interactiveChartType} topicId={topic.id} />
              </div>

              {/* How to Read Like a 10-Year-Old */}
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs sm:text-sm text-slate-800 leading-relaxed">
                <div className="flex items-center gap-2 font-bold text-amber-900 mb-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>How to Read This Chart Like You're 10 Years Old:</span>
                </div>
                <p>{topic.pythonChart.howToReadLikeA10YearOld}</p>
              </div>

              {/* Chart Python Code */}
              <div className="bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden shadow-xs">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
                  <span className="font-mono text-slate-400">plot_{topic.id}.py ({topic.pythonChart.chartType})</span>
                  <button
                    onClick={() => copyToClipboard(topic.pythonChart.code, false)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    {copiedChart ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedChart ? 'Copied!' : 'Copy Chart Code'}</span>
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed text-indigo-200">
                  <code>{topic.pythonChart.code}</code>
                </pre>
              </div>

              {/* Chart Line-by-Line Explanation */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                  Chart Code Breakdown:
                </span>
                <div className="space-y-1.5 text-xs">
                  {topic.pythonChart.lineByLineExplanation.map((exp, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 text-slate-700">
                      <code className="font-mono font-semibold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0 text-[11px]">
                        {exp.line}
                      </code>
                      <span className="text-slate-400 sm:mx-1 hidden sm:inline">→</span>
                      <span>{exp.explanation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* =========================================================================
            8. 🔍 Comparison & Insight
        ========================================================================= */}
        <section className="pt-2">
          <div className="flex items-center gap-2 text-base font-bold text-slate-900 mb-3">
            <span className="text-xl" role="img" aria-label="magnifying glass">🔍</span>
            <h4>8. Comparison & Insight: Table 1 vs Table 2</h4>
          </div>
          <div className="p-5 bg-gradient-to-r from-indigo-50/60 to-sky-50/60 rounded-xl border border-indigo-100/90 space-y-3">
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
              {topic.comparisonInsight.comparisonText}
            </p>
            <div className="pt-2 border-t border-indigo-200/50 flex items-start gap-2 text-xs sm:text-sm font-semibold text-indigo-950">
              <span className="text-indigo-600 font-bold shrink-0">💡 Tutor Rule:</span>
              <span>{topic.comparisonInsight.keyTakeaway}</span>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};
