import React, { useState } from 'react';
import { TABLE_1_ONLINE_SALES, TABLE_2_CRICKET_STATS } from '../data/datasets';

interface InteractiveChartProps {
  type: 'bar' | 'histogram' | 'boxplot' | 'scatter' | 'skew' | 'polygon' | 'bell' | 'contingency';
  topicId: string;
}

export const InteractiveChart: React.FC<InteractiveChartProps> = ({ type, topicId }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 1. Mean Bar Chart (Table 1 Prices vs Mean line)
  if (topicId === 'mean') {
    const meanPrice = 915;
    const maxPrice = 3200;
    const chartHeight = 220;
    const barWidth = 14;
    const gap = 8;
    const startX = 40;

    return (
      <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-200 overflow-x-auto">
        <div className="flex items-center justify-between mb-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-800">Visual Chart · 20 Product Prices vs Mean Reference Line</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-indigo-500 rounded-xs inline-block"></span> Product Price
            </span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-0.5 bg-red-500 border-b border-dashed border-red-500 inline-block"></span> Mean = ₹915
            </span>
          </div>
        </div>

        <svg viewBox="0 0 520 260" className="w-full h-auto min-w-[500px]">
          {/* Grid lines */}
          <line x1="30" y1="20" x2="500" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
          <text x="5" y="24" className="text-[10px] fill-slate-400 font-mono">₹3.2k</text>

          <line x1="30" y1="120" x2="500" y2="120" stroke="#e2e8f0" strokeDasharray="3 3" />
          <text x="5" y="124" className="text-[10px] fill-slate-400 font-mono">₹1.5k</text>

          <line x1="30" y1="210" x2="500" y2="210" stroke="#cbd5e1" />
          <text x="15" y="214" className="text-[10px] fill-slate-400 font-mono">0</text>

          {/* Mean reference dashed line (y = 210 - (915/3200)*190 = 210 - 54.3 = 155.7) */}
          <line x1="30" y1="155.7" x2="500" y2="155.7" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
          <text x="430" y="150" className="text-[10px] font-bold fill-red-600">Mean ₹915</text>

          {/* Bars */}
          {TABLE_1_ONLINE_SALES.map((item, idx) => {
            const h = (item.price / maxPrice) * 190;
            const x = startX + idx * (barWidth + gap);
            const y = 210 - h;
            const isAbove = item.price > meanPrice;

            return (
              <g
                key={item.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer transition-opacity"
              >
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={h}
                  rx="2"
                  fill={hoveredIndex === idx ? '#4338ca' : isAbove ? '#6366f1' : '#818cf8'}
                />
                {hoveredIndex === idx && (
                  <g>
                    <rect x={Math.max(10, x - 40)} y={Math.max(10, y - 28)} width="95" height="22" rx="4" fill="#0f172a" />
                    <text x={Math.max(10, x - 40) + 47} y={Math.max(10, y - 28) + 15} textAnchor="middle" className="text-[9px] fill-white font-mono font-medium">
                      {item.product_name.slice(0, 10)}: ₹{item.price}
                    </text>
                  </g>
                )}
                <text x={x + barWidth / 2} y="225" textAnchor="middle" className="text-[8px] fill-slate-500 font-mono">
                  #{item.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  // 2. Median Boxplot with Mean vs Median Comparison
  if (topicId === 'median') {
    return (
      <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-600">
          <span className="font-semibold text-slate-800">Visual Chart · Price Distribution: Median (₹525) vs Mean (₹915)</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-semibold text-emerald-600">
              <span className="w-3 h-0.5 bg-emerald-500 inline-block"></span> Median = ₹525
            </span>
            <span className="flex items-center gap-1 font-semibold text-red-600">
              <span className="w-3 h-0.5 bg-red-500 border-b border-dashed border-red-500 inline-block"></span> Mean = ₹915
            </span>
          </div>
        </div>

        <svg viewBox="0 0 520 180" className="w-full h-auto">
          {/* Coordinate Axis: 0 to 3200 (scale: 440px wide, 0 starts at 40, 3200 at 480) */}
          <line x1="40" y1="130" x2="480" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
          {[0, 500, 1000, 1500, 2000, 2500, 3000].map((val) => {
            const x = 40 + (val / 3200) * 440;
            return (
              <g key={val}>
                <line x1={x} y1="130" x2={x} y2="136" stroke="#94a3b8" />
                <text x={x} y="150" textAnchor="middle" className="text-[9px] fill-slate-500 font-mono">
                  ₹{val}
                </text>
              </g>
            );
          })}

          {/* Boxplot for Prices: Min 80, Q1 ~238, Median 525, Q3 ~1450, Max 3200 */}
          {/* Scale formula: x(p) = 40 + (p / 3200) * 440 */}
          {/* x(80) = 51, x(238) = 72.7, x(525) = 112.2, x(1450) = 239.4, x(3200) = 480 */}
          {/* Whiskers */}
          <line x1="51" y1="75" x2="72.7" y2="75" stroke="#475569" strokeWidth="1.5" />
          <line x1="51" y1="60" x2="51" y2="90" stroke="#475569" strokeWidth="1.5" />
          <line x1="239.4" y1="75" x2="480" y2="75" stroke="#475569" strokeWidth="1.5" />
          <line x1="480" y1="60" x2="480" y2="90" stroke="#475569" strokeWidth="1.5" />

          {/* Box (Q1 to Q3) */}
          <rect x="72.7" y="50" width={239.4 - 72.7} height="50" rx="3" fill="#c7d2fe" stroke="#6366f1" strokeWidth="2" />

          {/* Median vertical line (₹525) */}
          <line x1="112.2" y1="45" x2="112.2" y2="105" stroke="#10b981" strokeWidth="3" />
          <text x="112.2" y="38" textAnchor="middle" className="text-[10px] font-bold fill-emerald-700">
            Median: ₹525
          </text>

          {/* Mean vertical dashed line (₹915) -> x(915) = 40 + (915/3200)*440 = 165.8 */}
          <line x1="165.8" y1="45" x2="165.8" y2="105" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3 3" />
          <text x="165.8" y="38" textAnchor="middle" className="text-[10px] font-bold fill-red-600">
            Mean: ₹915
          </text>

          {/* Right Tail arrow highlighting skew */}
          <path d="M 240 75 L 470 75" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
          <text x="360" y="68" textAnchor="middle" className="text-[9px] font-medium fill-red-500">
            Long tail pulls mean rightward →
          </text>
        </svg>
      </div>
    );
  }

  // 3. Mode Bar Chart (Table 2 Cricket Runs)
  if (topicId === 'mode') {
    const scores = [35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90];
    const freqs = [1, 2, 2, 2, 2, 2, 3, 2, 1, 1, 1, 1]; // 65 has 3!

    return (
      <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-800">Visual Chart · Frequency of Each Cricket Score</span>
          <span className="font-semibold text-amber-600">Mode = 65 runs (Tallest Tower = 3 players)</span>
        </div>

        <svg viewBox="0 0 520 200" className="w-full h-auto">
          {/* Baseline */}
          <line x1="30" y1="160" x2="490" y2="160" stroke="#cbd5e1" />
          <line x1="30" y1="115" x2="490" y2="115" stroke="#e2e8f0" strokeDasharray="2 2" />
          <text x="15" y="118" className="text-[9px] fill-slate-400">1</text>
          <line x1="30" y1="70" x2="490" y2="70" stroke="#e2e8f0" strokeDasharray="2 2" />
          <text x="15" y="73" className="text-[9px] fill-slate-400">2</text>
          <line x1="30" y1="25" x2="490" y2="25" stroke="#e2e8f0" strokeDasharray="2 2" />
          <text x="15" y="28" className="text-[9px] fill-slate-400">3</text>

          {scores.map((score, idx) => {
            const count = freqs[idx];
            const h = count * 45;
            const x = 45 + idx * 37;
            const y = 160 - h;
            const isMode = score === 65;

            return (
              <g key={score}>
                <rect
                  x={x}
                  y={y}
                  width="26"
                  height={h}
                  rx="3"
                  fill={isMode ? '#f59e0b' : '#94a3b8'}
                  stroke={isMode ? '#d97706' : '#64748b'}
                  strokeWidth="1.5"
                />
                <text x={x + 13} y={y - 6} textAnchor="middle" className={`text-[10px] font-bold ${isMode ? 'fill-amber-600' : 'fill-slate-600'}`}>
                  {count}
                </text>
                <text x={x + 13} y="176" textAnchor="middle" className={`text-[9px] font-mono ${isMode ? 'font-bold fill-amber-700' : 'fill-slate-500'}`}>
                  {score}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  // 4. Standard Deviation & Bell Curve / Rejection Regions
  if (type === 'bell' || topicId === 'std_dev' || topicId === 'clt' || topicId === 'hypothesis_testing_intro' || topicId === 'z_test') {
    const isZTest = topicId === 'z_test';
    const isHypothesis = topicId === 'hypothesis_testing_intro';

    return (
      <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-800">
            {isZTest ? 'Z-Distribution · Critical Region (±1.96) vs Calculated Z (+1.48)' : 'Normal Bell Curve · 68% - 95% Empirical Rule'}
          </span>
          <span className="font-medium text-indigo-600">
            {isZTest ? 'Calculated Z = +1.48' : 'Mean = 60 runs, σ = 15.47'}
          </span>
        </div>

        <svg viewBox="0 0 520 200" className="w-full h-auto">
          {/* Axis */}
          <line x1="30" y1="165" x2="490" y2="165" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Bell curve path */}
          {/* Peak at x=260, y=30. Inflection at x=210 and x=310 (sigma=50px). */}
          <path
            d="M 40 165 C 130 165, 180 150, 210 110 C 235 75, 245 30, 260 30 C 275 30, 285 75, 310 110 C 340 150, 390 165, 480 165"
            fill="none"
            stroke="#0f172a"
            strokeWidth="2.5"
          />

          {isZTest ? (
            <>
              {/* Critical Rejection Left tail (Z <= -1.96 -> x < 162) */}
              <path
                d="M 40 165 C 100 165, 140 160, 162 145 L 162 165 Z"
                fill="#ef4444"
                opacity="0.6"
              />
              {/* Critical Rejection Right tail (Z >= +1.96 -> x > 358) */}
              <path
                d="M 358 145 C 380 160, 420 165, 480 165 L 358 165 Z"
                fill="#ef4444"
                opacity="0.6"
              />
              <text x="120" y="155" textAnchor="middle" className="text-[9px] fill-red-700 font-bold">Reject (2.5%)</text>
              <text x="400" y="155" textAnchor="middle" className="text-[9px] fill-red-700 font-bold">Reject (2.5%)</text>

              {/* Our test statistic line Z = +1.48 -> x = 260 + 1.48*50 = 334 */}
              <line x1="334" y1="40" x2="334" y2="165" stroke="#6366f1" strokeWidth="3" strokeDasharray="4 2" />
              <text x="334" y="32" textAnchor="middle" className="text-[10px] font-bold fill-indigo-700">
                Our Z = +1.48
              </text>
              <text x="260" y="180" textAnchor="middle" className="text-[10px] font-semibold fill-slate-700">
                Center: μ0 = ₹700 (Safe Retain Region)
              </text>
            </>
          ) : (
            <>
              {/* Shaded ±1 sigma central region (x=210 to 310) */}
              <path
                d="M 210 110 C 235 75, 245 30, 260 30 C 275 30, 285 75, 310 110 L 310 165 L 210 165 Z"
                fill="#38bdf8"
                opacity="0.35"
              />
              <line x1="260" y1="30" x2="260" y2="165" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 3" />
              <text x="260" y="105" textAnchor="middle" className="text-[11px] font-bold fill-sky-950">
                68% of Data (±1σ)
              </text>
              <text x="260" y="180" textAnchor="middle" className="text-[10px] font-mono fill-slate-600">
                Mean (60 runs)
              </text>
              <text x="210" y="180" textAnchor="middle" className="text-[9px] font-mono fill-slate-500">
                -1σ (44.5)
              </text>
              <text x="310" y="180" textAnchor="middle" className="text-[9px] font-mono fill-slate-500">
                +1σ (75.5)
              </text>
            </>
          )}
        </svg>
      </div>
    );
  }

  // 5. Scatter Plot (Price vs Units Sold, negative correlation)
  if (topicId === 'covariance_correlation' || type === 'scatter') {
    return (
      <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-800">Visual Chart · Price vs Units Sold (Pearson r = -0.70)</span>
          <span className="font-bold text-red-600">Downhill Trend (Negative Correlation)</span>
        </div>

        <svg viewBox="0 0 520 220" className="w-full h-auto">
          {/* Axis: X is Price (0 to 3500), Y is Units Sold (0 to 110) */}
          <line x1="45" y1="180" x2="490" y2="180" stroke="#94a3b8" />
          <line x1="45" y1="20" x2="45" y2="180" stroke="#94a3b8" />
          <text x="25" y="25" textAnchor="middle" className="text-[9px] fill-slate-500 font-mono">100</text>
          <text x="25" y="100" textAnchor="middle" className="text-[9px] fill-slate-500 font-mono">50</text>
          <text x="25" y="180" textAnchor="middle" className="text-[9px] fill-slate-500 font-mono">0</text>
          <text x="490" y="196" textAnchor="end" className="text-[9px] fill-slate-500 font-mono">Price (₹3.5k)</text>

          {/* Regression line going downhill: from (Price=80, Units=85) to (Price=3200, Units=15) */}
          <line x1="55" y1="45" x2="460" y2="155" stroke="#ef4444" strokeWidth="2.5" />

          {/* Scatter dots */}
          {TABLE_1_ONLINE_SALES.map((item, idx) => {
            const cx = 45 + (item.price / 3500) * 430;
            const cy = 180 - (item.units_sold / 110) * 155;

            return (
              <g key={item.id}>
                <circle
                  cx={cx}
                  cy={cy}
                  r="5"
                  fill="#6366f1"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="hover:r-7 transition-all cursor-pointer"
                />
              </g>
            );
          })}

          {/* Correlation Callout Box */}
          <rect x="290" y="30" width="180" height="42" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
          <text x="380" y="47" textAnchor="middle" className="text-[10px] font-bold fill-red-800">
            Pearson r = -0.70
          </text>
          <text x="380" y="62" textAnchor="middle" className="text-[9px] fill-red-700">
            As Price ↑, Units Sold ↓
          </text>
        </svg>
      </div>
    );
  }

  // 6. Skewness KDE Comparison
  if (topicId === 'skewness') {
    return (
      <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-xs font-bold text-slate-800 block mb-1">Table 1 Prices: Positive Skew (+1.18)</span>
            <span className="text-[11px] text-slate-500 block mb-2">Tail stretches far to the right (Mean &gt; Median)</span>
            <svg viewBox="0 0 240 110" className="w-full h-auto">
              <path d="M 10 95 C 40 95, 60 20, 80 20 C 110 20, 160 85, 230 95" fill="none" stroke="#6366f1" strokeWidth="2.5" />
              <line x1="80" y1="20" x2="80" y2="95" stroke="#10b981" strokeWidth="2" strokeDasharray="2 2" />
              <line x1="110" y1="35" x2="110" y2="95" stroke="#ef4444" strokeWidth="2" strokeDasharray="2 2" />
              <text x="80" y="105" textAnchor="middle" className="text-[8px] font-bold fill-emerald-600">Med (525)</text>
              <text x="120" y="105" textAnchor="middle" className="text-[8px] font-bold fill-red-600">Mean (915)</text>
            </svg>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-xs font-bold text-slate-800 block mb-1">Table 2 Cricket Runs: Zero Skew (+0.14)</span>
            <span className="text-[11px] text-slate-500 block mb-2">Symmetric mirror image (Mean = Median = 60)</span>
            <svg viewBox="0 0 240 110" className="w-full h-auto">
              <path d="M 10 95 C 60 95, 90 20, 120 20 C 150 20, 180 95, 230 95" fill="none" stroke="#0284c7" strokeWidth="2.5" />
              <line x1="120" y1="20" x2="120" y2="95" stroke="#047857" strokeWidth="2" />
              <text x="120" y="105" textAnchor="middle" className="text-[8px] font-bold fill-emerald-700">Mean = Med (60)</text>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // 7. Frequency Polygon Overlay (Topic E)
  if (topicId === 'frequency_distribution' || type === 'polygon') {
    return (
      <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-800">Visual Chart · Histogram (Bars) + Frequency Polygon (Connecting Line)</span>
          <span className="font-medium text-blue-600">Cricket Runs Binned</span>
        </div>

        <svg viewBox="0 0 520 200" className="w-full h-auto">
          {/* 4 bins: [30-45]:5, [46-60]:6, [61-75]:6, [76-90]:3 */}
          <line x1="40" y1="160" x2="480" y2="160" stroke="#94a3b8" />
          <line x1="40" y1="40" x2="40" y2="160" stroke="#94a3b8" />
          <text x="25" y="45" className="text-[9px] fill-slate-400">6</text>
          <text x="25" y="100" className="text-[9px] fill-slate-400">3</text>

          {/* Histogram Bars */}
          <rect x="50" y="60" width="100" height="100" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
          <rect x="150" y="40" width="100" height="120" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
          <rect x="250" y="40" width="100" height="120" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
          <rect x="350" y="100" width="100" height="60" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />

          {/* Polygon line connecting midpoints: (100,60), (200,40), (300,40), (400,100) */}
          <polyline
            points="50,160 100,60 200,40 300,40 400,100 450,160"
            fill="none"
            stroke="#1d4ed8"
            strokeWidth="3"
          />
          {/* Dots on midpoints */}
          <circle cx="100" cy="60" r="4.5" fill="#1d4ed8" />
          <circle cx="200" cy="40" r="4.5" fill="#1d4ed8" />
          <circle cx="300" cy="40" r="4.5" fill="#1d4ed8" />
          <circle cx="400" cy="100" r="4.5" fill="#1d4ed8" />

          <text x="100" y="175" textAnchor="middle" className="text-[9px] fill-slate-600 font-mono">30-45 (5)</text>
          <text x="200" y="175" textAnchor="middle" className="text-[9px] fill-slate-600 font-mono">46-60 (6)</text>
          <text x="300" y="175" textAnchor="middle" className="text-[9px] fill-slate-600 font-mono">61-75 (6)</text>
          <text x="400" y="175" textAnchor="middle" className="text-[9px] fill-slate-600 font-mono">76-90 (3)</text>
        </svg>
      </div>
    );
  }

  // 8. T-Test Group Comparison (Topic K: India vs Australia)
  if (topicId === 't_test') {
    return (
      <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-800">Visual Chart · India (Mean 68) vs Australia (Mean 54)</span>
          <span className="font-medium text-slate-600">Overlap explains why p-value = 0.267 (Not Significant)</span>
        </div>

        <svg viewBox="0 0 520 180" className="w-full h-auto">
          {/* Axis */}
          <line x1="50" y1="140" x2="470" y2="140" stroke="#94a3b8" />
          {[30, 45, 60, 75, 90].map((v) => (
            <g key={v}>
              <line x1={50 + ((v - 30) / 65) * 400} y1="140" x2={50 + ((v - 30) / 65) * 400} y2="145" stroke="#94a3b8" />
              <text x={50 + ((v - 30) / 65) * 400} y="158" textAnchor="middle" className="text-[9px] fill-slate-500 font-mono">
                {v} runs
              </text>
            </g>
          ))}

          {/* India strip (blue dots): [40, 55, 70, 85, 90] */}
          <text x="40" y="55" className="text-[11px] font-bold fill-sky-800">India</text>
          <rect x="50 + 60" y="45" width="220" height="2" fill="#0284c7" opacity="0.3" />
          {[40, 55, 70, 85, 90].map((run, i) => (
            <circle
              key={i}
              cx={50 + ((run - 30) / 65) * 400}
              cy="55"
              r="6"
              fill="#0284c7"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          ))}
          <line x1={50 + ((68 - 30) / 65) * 400} y1="35" x2={50 + ((68 - 30) / 65) * 400} y2="75" stroke="#0369a1" strokeWidth="2.5" />
          <text x={50 + ((68 - 30) / 65) * 400} y="30" textAnchor="middle" className="text-[9px] font-bold fill-sky-900">
            India Mean: 68
          </text>

          {/* Australia strip (amber dots): [35, 45, 50, 65, 75] */}
          <text x="35" y="105" className="text-[11px] font-bold fill-amber-800">Australia</text>
          {[35, 45, 50, 65, 75].map((run, i) => (
            <circle
              key={i}
              cx={50 + ((run - 30) / 65) * 400}
              cy="105"
              r="6"
              fill="#f59e0b"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          ))}
          <line x1={50 + ((54 - 30) / 65) * 400} y1="85" x2={50 + ((54 - 30) / 65) * 400} y2="125" stroke="#d97706" strokeWidth="2.5" />
          <text x={50 + ((54 - 30) / 65) * 400} y="80" textAnchor="middle" className="text-[9px] font-bold fill-amber-900">
            Aus Mean: 54
          </text>
        </svg>
      </div>
    );
  }

  // 9. Chi-Square Contingency Grid (Topic L)
  if (topicId === 'chi_square_test') {
    return (
      <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-600">
          <span className="font-semibold text-slate-800">Visual Chart · 4x2 Contingency Heatmap Matrix (Observed Counts)</span>
          <span className="font-medium text-emerald-700">χ² = 0.606, p = 0.895 (Uniform/Independent)</span>
        </div>

        <div className="grid grid-cols-3 max-w-sm mx-auto text-xs text-center border border-slate-200 rounded-lg overflow-hidden font-mono">
          <div className="bg-slate-200 p-2 font-bold text-slate-700 text-left">Category</div>
          <div className="bg-slate-100 p-2 font-bold text-slate-700">High (≥45)</div>
          <div className="bg-slate-100 p-2 font-bold text-slate-700">Low (&lt;45)</div>

          <div className="bg-slate-50 p-2.5 text-slate-800 font-medium text-left border-t border-slate-200">Clothing</div>
          <div className="bg-sky-50 p-2.5 font-bold text-sky-900 border-t border-slate-200">2</div>
          <div className="bg-sky-100 p-2.5 font-bold text-sky-900 border-t border-slate-200">3</div>

          <div className="bg-slate-50 p-2.5 text-slate-800 font-medium text-left border-t border-slate-200">Electronics</div>
          <div className="bg-sky-50 p-2.5 font-bold text-sky-900 border-t border-slate-200">2</div>
          <div className="bg-sky-100 p-2.5 font-bold text-sky-900 border-t border-slate-200">3</div>

          <div className="bg-slate-50 p-2.5 text-slate-800 font-medium text-left border-t border-slate-200">Grocery</div>
          <div className="bg-sky-50 p-2.5 font-bold text-sky-900 border-t border-slate-200">2</div>
          <div className="bg-sky-100 p-2.5 font-bold text-sky-900 border-t border-slate-200">3</div>

          <div className="bg-slate-50 p-2.5 text-slate-800 font-medium text-left border-t border-slate-200">Stationery</div>
          <div className="bg-sky-100 p-2.5 font-bold text-sky-900 border-t border-slate-200">3</div>
          <div className="bg-sky-50 p-2.5 font-bold text-sky-900 border-t border-slate-200">2</div>
        </div>
      </div>
    );
  }

  // Fallback boxplot
  return (
    <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-200 text-center text-xs text-slate-500">
      <span>Interactive chart generated for {topicId}</span>
    </div>
  );
};
