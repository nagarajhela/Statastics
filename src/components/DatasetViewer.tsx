import React, { useState } from 'react';
import { TABLE_1_ONLINE_SALES, TABLE_2_CRICKET_STATS, PYTHON_SETUP_CODE } from '../data/datasets';
import { Copy, Check, Table as TableIcon, Code2, ArrowUpDown, Filter } from 'lucide-react';

export const DatasetViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'table1' | 'table2' | 'python'>('table1');
  const [table1Filter, setTable1Filter] = useState<string>('All');
  const [table2Filter, setTable2Filter] = useState<string>('All');
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const copyCode = () => {
    navigator.clipboard.writeText(PYTHON_SETUP_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredSales = TABLE_1_ONLINE_SALES.filter(
    item => table1Filter === 'All' || item.category === table1Filter
  ).sort((a, b) => {
    if (!sortCol) return 0;
    if (sortCol === 'price') return sortAsc ? a.price - b.price : b.price - a.price;
    if (sortCol === 'units_sold') return sortAsc ? a.units_sold - b.units_sold : b.units_sold - a.units_sold;
    if (sortCol === 'product_name') return sortAsc ? a.product_name.localeCompare(b.product_name) : b.product_name.localeCompare(a.product_name);
    return 0;
  });

  const filteredCricket = TABLE_2_CRICKET_STATS.filter(
    item => table2Filter === 'All' || item.team === table2Filter
  ).sort((a, b) => {
    if (!sortCol) return 0;
    if (sortCol === 'runs_scored') return sortAsc ? a.runs_scored - b.runs_scored : b.runs_scored - a.runs_scored;
    if (sortCol === 'strike_rate') return sortAsc ? a.strike_rate - b.strike_rate : b.strike_rate - a.strike_rate;
    if (sortCol === 'player_name') return sortAsc ? a.player_name.localeCompare(b.player_name) : b.player_name.localeCompare(a.player_name);
    return 0;
  });

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(col);
      setSortAsc(true);
    }
  };

  return (
    <section id="step0_datasets" className="py-8 scroll-mt-20">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1">
          <span>Step 0 · Ground Truth Data</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Two Fixed Datasets (Used Across All Topics)
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl">
          These two tables remain completely fixed for every single topic, manual calculation, Python code snippet,
          and chart in this entire notes notebook. No numbers will change.
        </p>
      </div>

      {/* Dataset selector controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => { setActiveTab('table1'); setSortCol(null); }}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'table1'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Table 1: Online Store Sales (20 rows)
          </button>
          <button
            onClick={() => { setActiveTab('table2'); setSortCol(null); }}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'table2'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Table 2: Cricket Player Stats (20 rows)
          </button>
          <button
            onClick={() => setActiveTab('python')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'python'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Python Setup Code</span>
          </button>
        </div>

        {activeTab === 'table1' && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter Category:
            </span>
            <select
              value={table1Filter}
              onChange={(e) => setTable1Filter(e.target.value)}
              className="bg-white border border-slate-200 rounded-md px-2.5 py-1 text-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="All">All Categories (20)</option>
              <option value="Electronics">Electronics (5)</option>
              <option value="Grocery">Grocery (5)</option>
              <option value="Clothing">Clothing (5)</option>
              <option value="Stationery">Stationery (5)</option>
            </select>
          </div>
        )}

        {activeTab === 'table2' && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter Team:
            </span>
            <select
              value={table2Filter}
              onChange={(e) => setTable2Filter(e.target.value)}
              className="bg-white border border-slate-200 rounded-md px-2.5 py-1 text-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="All">All Teams (20)</option>
              <option value="India">India (5)</option>
              <option value="Australia">Australia (5)</option>
              <option value="England">England (5)</option>
              <option value="Pakistan">Pakistan (5)</option>
            </select>
          </div>
        )}
      </div>

      {/* Table 1 View */}
      {activeTab === 'table1' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              <span className="font-semibold text-slate-800">TABLE 1: Online Store Sales</span>
              <span className="text-slate-400 mx-2">·</span>
              <span>20 products across 4 retail categories</span>
            </div>
            <div className="flex items-center gap-3 font-mono tabular-nums">
              <span>Total Revenue: <strong className="text-slate-900 font-semibold">₹18,300</strong></span>
              <span className="text-slate-300">|</span>
              <span>Total Units: <strong className="text-slate-900 font-semibold">880</strong></span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs uppercase font-medium">
                <tr>
                  <th className="py-2.5 px-4 font-mono w-12 text-slate-400">#</th>
                  <th className="py-2.5 px-4 cursor-pointer hover:text-slate-800" onClick={() => handleSort('product_name')}>
                    <div className="flex items-center gap-1">
                      <span>Product_Name</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-4">Category</th>
                  <th className="py-2.5 px-4 text-right cursor-pointer hover:text-slate-800" onClick={() => handleSort('price')}>
                    <div className="flex items-center justify-end gap-1">
                      <span>Price (₹)</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-4 text-right cursor-pointer hover:text-slate-800" onClick={() => handleSort('units_sold')}>
                    <div className="flex items-center justify-end gap-1">
                      <span>Units_Sold</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSales.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 font-mono text-slate-400 text-xs">{item.id}</td>
                    <td className="py-2.5 px-4 font-medium text-slate-900">{item.product_name}</td>
                    <td className="py-2.5 px-4 text-slate-600">{item.category}</td>
                    <td className="py-2.5 px-4 text-right font-mono tabular-nums font-semibold text-slate-900">₹{item.price.toLocaleString()}</td>
                    <td className="py-2.5 px-4 text-right font-mono tabular-nums text-slate-700">{item.units_sold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Table 2 View */}
      {activeTab === 'table2' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              <span className="font-semibold text-slate-800">TABLE 2: Cricket Player Stats</span>
              <span className="text-slate-400 mx-2">·</span>
              <span>20 international batsmen across 4 nations</span>
            </div>
            <div className="flex items-center gap-3 font-mono tabular-nums">
              <span>Total Runs: <strong className="text-slate-900 font-semibold">1,200</strong></span>
              <span className="text-slate-300">|</span>
              <span>Avg Strike Rate: <strong className="text-slate-900 font-semibold">141.28</strong></span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs uppercase font-medium">
                <tr>
                  <th className="py-2.5 px-4 font-mono w-12 text-slate-400">#</th>
                  <th className="py-2.5 px-4 cursor-pointer hover:text-slate-800" onClick={() => handleSort('player_name')}>
                    <div className="flex items-center gap-1">
                      <span>Player_Name</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-4">Team</th>
                  <th className="py-2.5 px-4 text-right cursor-pointer hover:text-slate-800" onClick={() => handleSort('runs_scored')}>
                    <div className="flex items-center justify-end gap-1">
                      <span>Runs_Scored</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-4 text-right cursor-pointer hover:text-slate-800" onClick={() => handleSort('strike_rate')}>
                    <div className="flex items-center justify-end gap-1">
                      <span>Strike_Rate</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCricket.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 font-mono text-slate-400 text-xs">{item.id}</td>
                    <td className="py-2.5 px-4 font-medium text-slate-900">{item.player_name}</td>
                    <td className="py-2.5 px-4 text-slate-600">{item.team}</td>
                    <td className="py-2.5 px-4 text-right font-mono tabular-nums font-semibold text-slate-900">{item.runs_scored}</td>
                    <td className="py-2.5 px-4 text-right font-mono tabular-nums text-slate-700">{item.strike_rate.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Python Code View */}
      {activeTab === 'python' && (
        <div className="bg-slate-900 text-slate-100 rounded-xl border border-slate-800 overflow-hidden shadow-xs">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
            <span className="text-xs font-mono text-slate-400">setup_fixed_datasets.py</span>
            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Python Code'}</span>
            </button>
          </div>
          <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed text-slate-200">
            <code>{PYTHON_SETUP_CODE}</code>
          </pre>
        </div>
      )}
    </section>
  );
};
