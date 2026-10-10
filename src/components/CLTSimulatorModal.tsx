import React, { useState, useMemo } from 'react';
import { TABLE_1_ONLINE_SALES } from '../data/datasets';
import { X, Play, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

interface CLTSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CLTSimulatorModal: React.FC<CLTSimulatorModalProps> = ({ isOpen, onClose }) => {
  const [sampleSize, setSampleSize] = useState<number>(10);
  const [numSamples, setNumSamples] = useState<number>(1000);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [seed, setSeed] = useState<number>(1);

  const rawPrices = useMemo(() => TABLE_1_ONLINE_SALES.map(p => p.price), []);
  const trueMean = useMemo(() => rawPrices.reduce((a, b) => a + b, 0) / rawPrices.length, [rawPrices]);

  // Compute CLT Simulation
  const { simulatedMeans, meanOfMeans, cltSkewness, binsData } = useMemo(() => {
    // Deterministic pseudo-random based on seed
    let s = seed * 12345;
    const rnd = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };

    const means: number[] = [];
    for (let i = 0; i < numSamples; i++) {
      let sum = 0;
      for (let j = 0; j < sampleSize; j++) {
        const idx = Math.floor(rnd() * rawPrices.length);
        sum += rawPrices[idx];
      }
      means.push(sum / sampleSize);
    }

    const avg = means.reduce((a, b) => a + b, 0) / means.length;

    // Calculate sample skewness of the means
    const variance = means.reduce((acc, m) => acc + (m - avg) ** 2, 0) / (means.length - 1);
    const std = Math.sqrt(variance);
    const m3 = means.reduce((acc, m) => acc + (m - avg) ** 3, 0) / means.length;
    const skew = std > 0 ? m3 / (std ** 3) : 0;

    // Build 15 bins for histogram
    const minM = Math.min(...means);
    const maxM = Math.max(...means);
    const binCount = 16;
    const binWidth = (maxM - minM) / binCount || 1;
    const counts = new Array(binCount).fill(0);

    means.forEach(m => {
      const bIdx = Math.min(binCount - 1, Math.floor((m - minM) / binWidth));
      counts[bIdx]++;
    });

    const maxCount = Math.max(...counts);
    const bins = counts.map((count, idx) => ({
      x0: minM + idx * binWidth,
      x1: minM + (idx + 1) * binWidth,
      count,
      pctHeight: (count / maxCount) * 100
    }));

    return {
      simulatedMeans: means,
      meanOfMeans: avg,
      cltSkewness: skew,
      binsData: bins
    };
  }, [sampleSize, numSamples, seed, rawPrices]);

  if (!isOpen) return null;

  const triggerRun = () => {
    setIsRunning(true);
    setSeed(prev => prev + 1);
    setTimeout(() => setIsRunning(false), 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base sm:text-lg font-bold">Interactive Central Limit Theorem Simulator</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Watch the Central Limit Theorem magic happen in real time! We take repeated random samples from
            Table 1's crooked <strong>Price</strong> column (original skewness = <strong>+1.18</strong>).
            As you draw more sample means, see how the distribution transforms into a smooth, symmetrical bell curve.
          </p>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Sample Size (n per draw):
              </label>
              <div className="flex gap-1.5">
                {[5, 10, 20, 30].map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSampleSize(sz)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                      sampleSize === sz
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    n = {sz}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Number of Samples to Draw:
              </label>
              <div className="flex gap-1.5">
                {[200, 500, 1000, 2500].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => setNumSamples(cnt)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                      numSamples === cnt
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cnt}x
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={triggerRun}
                disabled={isRunning}
                className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
                <span>Re-Run Random Draw</span>
              </button>
            </div>
          </div>

          {/* Visual Simulation Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Raw Data (Skewed) */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">Raw Data: Table 1 Prices</span>
                <span className="text-xs font-mono text-red-600 font-semibold">Skew = +1.18 (Lopsided)</span>
              </div>
              <div className="h-44 flex items-end gap-1.5 pt-4 pb-2 border-b border-slate-200">
                {rawPrices.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-red-400 hover:bg-red-500 rounded-t-xs transition-colors"
                    style={{ height: `${(p / 3200) * 100}%` }}
                    title={`#${idx + 1}: ₹${p}`}
                  />
                ))}
              </div>
              <p className="mt-2 text-[11px] text-slate-500 text-center">
                Individual product prices range from ₹80 to ₹3,200 with heavy right skew.
              </p>
            </div>

            {/* CLT Transformed Bell Curve */}
            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">After CLT: {numSamples} Sample Means</span>
                <span className="text-xs font-mono text-emerald-700 font-bold">
                  Skew = {cltSkewness > 0 ? `+${cltSkewness.toFixed(2)}` : cltSkewness.toFixed(2)} (Normal!)
                </span>
              </div>
              <div className="h-44 flex items-end gap-1 pt-4 pb-2 border-b border-emerald-200">
                {binsData.map((bin, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 rounded-t-xs transition-all"
                    style={{ height: `${bin.pctHeight}%` }}
                    title={`Count: ${bin.count} (${Math.round(bin.x0)}-${Math.round(bin.x1)})`}
                  />
                ))}
              </div>
              <p className="mt-2 text-[11px] text-emerald-800 text-center font-medium">
                Symmetrical Gaussian mound centered at ₹{Math.round(meanOfMeans)}!
              </p>
            </div>
          </div>

          {/* Key Metric Comparisons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-500 block">True Mean (Population)</span>
              <strong className="text-sm font-mono text-slate-900 font-bold">₹{trueMean.toFixed(1)}</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Mean of Sample Means</span>
              <strong className="text-sm font-mono text-emerald-700 font-bold">₹{meanOfMeans.toFixed(1)}</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Theoretical SE (σ/√n)</span>
              <strong className="text-sm font-mono text-indigo-700 font-bold">
                ±₹{(925.15 / Math.sqrt(sampleSize)).toFixed(1)}
              </strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Skewness Reduction</span>
              <strong className="text-sm font-mono text-emerald-700 font-bold">
                {Math.round(((1.18 - Math.abs(cltSkewness)) / 1.18) * 100)}% Drop
              </strong>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Close Simulator
          </button>
        </div>
      </div>
    </div>
  );
};
