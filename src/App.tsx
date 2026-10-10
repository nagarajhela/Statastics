import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { DatasetViewer } from './components/DatasetViewer';
import { IntroSection } from './components/IntroSection';
import { TopicCard } from './components/TopicCard';
import { SummarySection } from './components/SummarySection';
import { CLTSimulatorModal } from './components/CLTSimulatorModal';
import { ALL_TOPICS } from './data/allTopics';
import { Search, Sparkles, BookOpen, Layers, ArrowUp } from 'lucide-react';

export default function App() {
  const [isCLTModalOpen, setIsCLTModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');

  const scrollToTopic = (topicId: string) => {
    const el = document.getElementById(topicId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredTopics = ALL_TOPICS.filter((t) => {
    const matchesSearch =
      searchQuery === '' ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.whatIsIt.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.formula.latex.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.section.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSection =
      selectedSection === 'all' ||
      (selectedSection === 'descriptive' && ['mean', 'median', 'mode', 'range', 'mad', 'variance', 'std_dev', 'skewness', 'percentiles_iqr', 'frequency_distribution', 'covariance_correlation'].includes(t.id)) ||
      (selectedSection === 'inferential' && ['inferential_intro', 'clt', 'hypothesis_testing_intro'].includes(t.id)) ||
      (selectedSection === 'tests' && ['z_test', 't_test', 'chi_square_test'].includes(t.id));

    return matchesSearch && matchesSection;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* 3-Zone Clean Header */}
      <Navbar onOpenCLTSimulator={() => setIsCLTModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Step 1: Foundations Intro & Table of Contents */}
        <IntroSection onSelectTopic={scrollToTopic} />

        {/* Step 0: Fixed Datasets */}
        <DatasetViewer />

        {/* Topic Filter & Quick Search Header */}
        <div className="sticky top-16 z-30 bg-slate-50/95 backdrop-blur-md py-4 border-b border-slate-200 mb-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-lg text-xs overflow-x-auto">
              <button
                onClick={() => setSelectedSection('all')}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedSection === 'all'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Topics ({ALL_TOPICS.length})
              </button>
              <button
                onClick={() => setSelectedSection('descriptive')}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedSection === 'descriptive'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                A-F: Descriptive Stats
              </button>
              <button
                onClick={() => setSelectedSection('inferential')}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedSection === 'inferential'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                G-I: Inferential & CLT
              </button>
              <button
                onClick={() => setSelectedSection('tests')}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedSection === 'tests'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                J-L: Z, T & Chi-Square Tests
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, formulas, symbols..."
                className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sequential Topic Notebook Feed (Topics A through L) */}
        <div className="space-y-2">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
              No statistical topics match &quot;{searchQuery}&quot;. Clear search to view all notebook chapters.
            </div>
          )}
        </div>

        {/* Step 4: Final Master Summary & Decision Flowchart */}
        <SummarySection />
      </main>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-30 p-3 bg-slate-900 text-white rounded-full shadow-lg hover:bg-slate-800 transition-all cursor-pointer"
        title="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* Central Limit Theorem Live Interactive Simulator Modal */}
      <CLTSimulatorModal
        isOpen={isCLTModalOpen}
        onClose={() => setIsCLTModalOpen(false)}
      />

      {/* Clean Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium">
            <span className="font-bold text-slate-800">StatsTutor</span>
            <span>·</span>
            <span>Complete Personal Statistics Notes Notebook</span>
          </div>
          <div className="text-slate-400">
            Descriptive &amp; Inferential Statistics · Fixed Reference Datasets · Step-by-Step Python &amp; Math
          </div>
        </div>
      </footer>
    </div>
  );
}
