import React from 'react';
import { SECTION_GROUPS, ALL_TOPICS } from '../data/allTopics';
import { BookOpen, Compass, ArrowRight, Lightbulb } from 'lucide-react';

interface IntroSectionProps {
  onSelectTopic: (topicId: string) => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onSelectTopic }) => {
  return (
    <section id="step1_intro" className="py-8 scroll-mt-20">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1">
          <span>Step 1 · Foundations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
          Personal Statistics & Python Tutor Notebook
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
          Welcome! Consider this your personal interactive textbook. Whether you are a curious school student
          or an aspiring data scientist, we assume zero jargon and explain every single concept with simple analogies,
          hands-on arithmetic steps, runnable Python code, and visual charts.
        </p>
      </div>

      {/* Two Essential Concept Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
              🧠
            </div>
            <h2 className="text-lg font-bold text-slate-900">What is Statistics?</h2>
          </div>
          <p className="text-sm text-slate-700 font-medium leading-relaxed mb-3">
            <strong className="text-indigo-900">In one simple sentence:</strong> Statistics is the science of turning a giant,
            confusing pile of messy numbers into clear, simple clues so you can understand what happened and make smart decisions.
          </p>
          <div className="p-3.5 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-100 leading-relaxed">
            <strong className="text-slate-800">Kid-Friendly Analogy:</strong> Imagine looking at your Lego box dumped upside-down
            on the carpet. Statistics is like sorting the bricks by color, counting the biggest towers, and figuring out what
            castle you can build without counting every single tiny stud one by one!
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold">
              ⚖️
            </div>
            <h2 className="text-lg font-bold text-slate-900">Descriptive vs Inferential Statistics</h2>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed mb-3">
            Think of statistics as having two main superpowers:
          </p>
          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="p-3 bg-indigo-50/60 rounded-lg border border-indigo-100">
              <span className="font-semibold text-indigo-950">1. Descriptive Statistics (The Mirror):</span>
              <p className="mt-1 text-slate-600">
                Simply summarizes and describes the numbers you currently have in front of you (e.g. Mean, Median, Range, Histograms).
                It says: <em>"Here is what my 20 store items look like."</em>
              </p>
            </div>
            <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100">
              <span className="font-semibold text-emerald-950">2. Inferential Statistics (The Crystal Ball):</span>
              <p className="mt-1 text-slate-600">
                Uses a small sample spoon to make confident guesses about the entire huge population you haven't seen (e.g. Z-Test, T-Test, Chi-Square).
                It asks: <em>"Does this pattern hold true across the whole world?"</em>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents Grid */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Interactive Table of Contents</h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">13 Core Chapters</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTION_GROUPS.map((sec) => (
            <div
              key={sec.id}
              className="p-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-slate-50/70 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 mb-1">
                  <span>{sec.code}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500 text-[11px] truncate">{sec.name.split('—')[0]}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">{sec.name}</h4>
                <p className="text-xs text-slate-600 leading-normal">{sec.description}</p>
              </div>

              {sec.topicIds.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {sec.topicIds.map((tId) => {
                    const topic = ALL_TOPICS.find((t) => t.id === tId);
                    if (!topic) return null;
                    return (
                      <button
                        key={tId}
                        onClick={() => onSelectTopic(tId)}
                        className="text-[11px] font-medium text-slate-700 hover:text-indigo-600 bg-white px-2 py-0.5 rounded border border-slate-200 hover:border-indigo-200 transition-colors cursor-pointer"
                      >
                        {topic.title.split('(')[0].trim()}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
