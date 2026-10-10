import React, { useState } from 'react';
import { DECISION_GUIDE_NODES } from '../data/summaryData';
import { HelpCircle, ArrowRight, RotateCcw, CheckCircle, Split } from 'lucide-react';

export const DecisionWizard: React.FC = () => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [history, setHistory] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<'interactive' | 'flowchart'>('interactive');

  const currentNode = DECISION_GUIDE_NODES.find(n => n.id === currentNodeId);

  const handleSelectOption = (option: typeof DECISION_GUIDE_NODES[0]['options'][0]) => {
    if (option.nextId) {
      setHistory(prev => [...prev, currentNodeId]);
      setCurrentNodeId(option.nextId);
    }
  };

  const handleReset = () => {
    setCurrentNodeId('start');
    setHistory([]);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentNodeId(prev);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1">
            <span>Statistical Test Selector</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Which Test Should I Use? Decision Guide
          </h3>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
          <button
            onClick={() => setActiveView('interactive')}
            className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
              activeView === 'interactive'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Interactive Wizard
          </button>
          <button
            onClick={() => setActiveView('flowchart')}
            className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
              activeView === 'flowchart'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Plain Text Flowchart View
          </button>
        </div>
      </div>

      {activeView === 'interactive' ? (
        <div className="space-y-6">
          {/* Breadcrumb / Step Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2">
            <span>Step {history.length + 1} of decision tree</span>
            {history.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBack}
                  className="text-indigo-600 hover:text-indigo-800 font-medium underline cursor-pointer"
                >
                  ← Previous Question
                </button>
                <span className="text-slate-300">·</span>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>
            )}
          </div>

          {/* Question Box */}
          {currentNode && (
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
                {currentNode.question}
              </h4>

              <div className="grid grid-cols-1 gap-3">
                {currentNode.options.map((opt, idx) => (
                  <div key={idx}>
                    {opt.result ? (
                      /* Final recommendation card */
                      <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                        <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                          <span>Recommended Test: {opt.result.testName}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          <strong>Why this test:</strong> {opt.result.why}
                        </p>
                        <div className="p-3 bg-white rounded-lg border border-emerald-100 text-xs text-slate-600">
                          <strong className="text-slate-800">Notebook Example:</strong> {opt.result.example}
                        </div>
                        <button
                          onClick={handleReset}
                          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" /> Test Another Scenario
                        </button>
                      </div>
                    ) : (
                      /* Clickable choice button */
                      <button
                        onClick={() => handleSelectOption(opt)}
                        className="w-full text-left p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/40 transition-all group flex items-start justify-between gap-4 cursor-pointer"
                      >
                        <div>
                          <span className="font-bold text-sm text-slate-900 group-hover:text-indigo-700 block mb-1">
                            {opt.label}
                          </span>
                          {opt.description && (
                            <span className="text-xs text-slate-500 block">
                              {opt.description}
                            </span>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Plain Text / ASCII Flowchart View */
        <div className="bg-slate-900 text-slate-100 p-6 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
          <pre className="text-indigo-200">
{`========================================================================
             WHICH TEST SHOULD I USE? (PLAIN TEXT FLOWCHART)
========================================================================

START: What type of data are you analyzing?
│
├── 1. CATEGORICAL DATA (Counts, Categories, Yes/No, Groups)
│   │
│   ├── Is it 2 categorical variables in a 2D contingency table?
│   │   (e.g., Does Product Category relate to High vs Low Sales?)
│   │   └── 👉 USE: CHI-SQUARE TEST FOR INDEPENDENCE
│   │
│   └── Is it 1 categorical variable compared to expected proportions?
│       (e.g., Is a 6-sided dice fair with equal 1/6 chances?)
│       └── 👉 USE: CHI-SQUARE GOODNESS OF FIT TEST
│
└── 2. NUMERIC / CONTINUOUS DATA (Price, Runs, Heights, Test Scores)
    │
    ├── HOW MANY GROUPS?
    │   │
    │   ├── ONE SAMPLE (Compare 1 sample mean against claimed target μ0)
    │   │   │
    │   │   ├── Do you know true population spread (σ) OR is n ≥ 30?
    │   │   │   └── YES ── 👉 USE: ONE-SAMPLE Z-TEST
    │   │   │
    │   │   └── Do you only know sample std dev (s) AND is n < 30?
    │   │       └── NO  ── 👉 USE: ONE-SAMPLE T-TEST
    │   │
    │   ├── TWO SAMPLES (Compare Group 1 vs Group 2)
    │   │   │
    │   │   ├── Are the two groups separate/independent?
    │   │   │   (e.g., India players vs Australia players)
    │   │   │   └── 👉 USE: INDEPENDENT TWO-SAMPLE T-TEST
    │   │   │
    │   │   └── Are they the same subjects measured Before & After?
    │   │       (e.g., Fitness score Before training vs After training)
    │   │       └── 👉 USE: PAIRED SAMPLES T-TEST
    │   │
    │   └── THREE OR MORE GROUPS (Compare 3+ groups simultaneously)
    │       (e.g., India vs Australia vs England vs Pakistan)
    │       └── 👉 USE: ONE-WAY ANOVA (ANALYSIS OF VARIANCE) F-TEST
========================================================================`}
          </pre>
        </div>
      )}
    </div>
  );
};
