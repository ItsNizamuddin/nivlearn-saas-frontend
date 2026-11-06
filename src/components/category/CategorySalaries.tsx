'use client';

import React, { useState, useMemo } from 'react';
import { TrendingUp, IndianRupee, ArrowUpRight } from 'lucide-react';

interface SalaryRole {
  id: number;
  title: string;
  description?: string | string[];
  graphData?: Array<{ label: string; value: number }>;
}

function formatINR(value: number): string {
  if (value >= 100000) return `${(value / 100000 % 1 === 0 ? (value / 100000).toFixed(0) : (value / 100000).toFixed(1))}L`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return String(value);
}

export default function CategorySalaries({
  categoryName,
  salaries,
}: {
  categoryName: string;
  salaries?: SalaryRole[];
}) {
  if (!salaries || salaries.length === 0) return null;

  const [selectedId, setSelectedId] = useState<number>(salaries[0].id);
  const activeRole = salaries.find((r) => r.id === selectedId) || salaries[0];

  const graphData = activeRole.graphData || [];
  const maxValue = useMemo(
    () => Math.max(...graphData.map((d) => d.value), 1),
    [graphData]
  );

  const descList = useMemo(() => {
    if (!activeRole.description) return [];
    return Array.isArray(activeRole.description)
      ? activeRole.description
      : [activeRole.description];
  }, [activeRole.description]);

  const growthPct = graphData.length >= 2
    ? Math.round(((graphData[graphData.length - 1].value - graphData[0].value) / graphData[0].value) * 100)
    : null;

  return (
    <section className="section-container py-8 sm:py-10 lg:py-16">

      {/* Section header */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-prime/10 text-prime text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Career ROI &amp; Market Demand</span>
        </div>
        <h2 className="font-heading text-lg sm:text-2xl 2xl:text-3xl font-extrabold text-prime-dark tracking-tight leading-snug">
          Soaring Demand and Accelerated Growth for {categoryName}
        </h2>
        <p className="text-text-muted text-xs sm:text-sm mt-1">
          Select a designation below to explore benchmark salary ranges and growth trajectories.
        </p>
      </div>

      {/* Role Tab Buttons: Single swipeable row on mobile, wrapping on tablet/desktop */}
      <div className="flex items-center overflow-x-auto sm:flex-wrap gap-2 mb-4 sm:mb-6 pb-1 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0">
        {salaries.map((role) => {
          const isSelected = role.id === selectedId;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => setSelectedId(role.id)}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer border shrink-0 sm:shrink select-none ${isSelected
                ? 'bg-prime text-on-dark border-prime shadow-xs'
                : 'bg-surface border-border-muted text-text-muted hover:border-prime/40 hover:text-prime-dark'
                }`}
            >
              {role.title}
            </button>
          );
        })}
      </div>

      {/* Main Grid: On mobile, Graph is order-1 (right under tabs); on desktop, Description is left (col-4) and Graph is right (col-8) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-7 items-stretch">

        {/* ── Graph Card: First on Mobile (order-1), Right Column on Desktop (lg:order-2 lg:col-span-8) ── */}
        <div className="order-1 lg:order-2 lg:col-span-8 bg-surface border border-border-muted/70 rounded-lg p-4 sm:p-5 lg:p-6 flex flex-col">

          {/* Chart Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-5">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-prime-dark">Salary Progression</h3>
              <p className="text-[10px] sm:text-[11px] text-text-muted mt-0.5">{activeRole.title} · Monthly (₹)</p>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-3 text-[10px] text-text-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-xs bg-prime/30 inline-block" />
                Mid levels
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-xs bg-prime-yellow inline-block" />
                Peak
              </span>
            </div>
          </div>

          {/* Bars + Grid */}
          {graphData.length > 0 ? (
            <div className="relative flex-1">
              {/* Horizontal dashed grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-7 sm:pb-8">
                {[100, 75, 50, 25, 0].map((pct) => (
                  <div key={pct} className="flex items-center gap-2">
                    <span className="text-[8px] sm:text-[9px] text-text-muted w-6 sm:w-7 text-right shrink-0 tabular-nums">
                      {pct > 0 ? `₹${formatINR(Math.round((maxValue * pct) / 100))}` : '₹0'}
                    </span>
                    <div className="flex-1 border-t border-border-muted/50 border-dashed" />
                  </div>
                ))}
              </div>

              {/* Bar columns */}
              <div className="flex items-end gap-1.5 sm:gap-2.5 lg:gap-3 ml-7 sm:ml-9 h-44 sm:h-52 lg:h-60">
                {graphData.map((bar, index) => {
                  const heightPct = Math.max((bar.value / maxValue) * 100, 4);
                  const isPeak = index === graphData.length - 1;
                  const isNearPeak = bar.value >= maxValue * 0.75;

                  return (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center justify-end gap-1 group h-full"
                    >
                      {/* Hover / Tap Value Label */}
                      <span className="text-[9px] sm:text-xs font-bold text-prime-dark opacity-0 group-hover:opacity-100 transition-opacity duration-150 tabular-nums whitespace-nowrap">
                        ₹{formatINR(bar.value)}
                      </span>

                      {/* Bar Container */}
                      <div
                        className={`w-full rounded-t-md sm:rounded-t-lg relative transition-all duration-500 cursor-default ${isPeak
                          ? 'bg-prime-yellow'
                          : isNearPeak
                            ? 'bg-prime group-hover:bg-prime-outline'
                            : 'bg-prime/30 group-hover:bg-prime/50'
                          }`}
                        style={{ height: `${heightPct}%` }}
                        title={`${bar.label}: ₹${bar.value.toLocaleString('en-IN')}`}
                      >
                        {/* Top Shimmer Accent */}
                        <div className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-md sm:rounded-t-lg ${isPeak ? 'bg-white/40' : 'bg-prime1/50'
                          }`} />

                        {/* Value Inside Tall Bars */}
                        {heightPct > 28 && (
                          <span className={`absolute bottom-1.5 sm:bottom-2 left-0 right-0 text-center text-[8px] sm:text-[10px] font-bold ${isPeak ? 'text-prime-dark' : 'text-on-dark'
                            }`}>
                            ₹{formatINR(bar.value)}
                          </span>
                        )}
                      </div>

                      {/* X-axis Label */}
                      <span className="text-[8px] sm:text-[10px] text-text-muted text-center leading-tight font-medium w-full px-0.5 line-clamp-2">
                        {bar.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-text-muted">
              No salary data available for this role.
            </div>
          )}

          {/* Bottom Scale Legend */}
          {graphData.length > 0 && (
            <div className="flex items-center justify-between mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-border-muted/50 ml-7 sm:ml-9">
              <span className="text-[9px] sm:text-[10px] text-text-muted">Starting</span>
              <span className="text-[9px] sm:text-[10px] text-prime font-semibold">
                ₹{formatINR(maxValue)} peak
              </span>
            </div>
          )}
        </div>

        {/* ── Left on Desktop (lg:order-1 lg:col-span-4), Below Graph on Mobile (order-2): Description + Quick Stats ── */}
        <div className="order-2 lg:order-1 lg:col-span-4 flex flex-col gap-3.5 sm:gap-4">

          {/* Description Card */}
          <div className="bg-surface border border-border-muted/70 rounded-lg p-4 sm:p-5 lg:p-6 flex-1 flex flex-col gap-3">
            <h3 className="text-sm sm:text-base font-extrabold text-prime-dark leading-snug">
              {activeRole.title}
            </h3>

            {descList.length > 0 ? (
              <ul className="space-y-2 sm:space-y-2.5 flex-1">
                {descList.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-prime shrink-0" />
                    <span
                      className="text-xs sm:text-sm text-text-muted leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: point }}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-text-muted leading-relaxed flex-1">
                Explore salary benchmarks for this role across experience levels.
              </p>
            )}

            {/* Growth Badge */}
            {growthPct !== null && (
              <div className="mt-auto pt-3 border-t border-border-muted/60 flex items-center gap-2">
                <div className="inline-flex items-center gap-1 bg-success/10 text-success text-xs font-bold px-2.5 py-1 rounded-full">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{growthPct}% Growth</span>
                </div>
                <span className="text-[11px] text-text-muted">Entry → Senior trajectory</span>
              </div>
            )}
          </div>

          {/* Entry vs Peak Mini-Cards */}
          {graphData.length >= 2 && (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <div className="bg-prime-dark rounded-lg p-3.5 sm:p-4 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-prime1/80 uppercase tracking-widest">Entry</span>
                <span className="text-base sm:text-lg font-extrabold text-prime1 flex items-baseline gap-0.5">
                  <IndianRupee className="w-3.5 h-3.5 shrink-0 self-center" />
                  {formatINR(graphData[0].value)}
                </span>
                <span className="text-[9px] sm:text-[10px] text-on-dark/50 truncate">{graphData[0].label}</span>
              </div>
              <div className="bg-prime-yellow rounded-lg p-3.5 sm:p-4 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-prime-dark/70 uppercase tracking-widest">Peak</span>
                <span className="text-base sm:text-lg font-extrabold text-prime-dark flex items-baseline gap-0.5">
                  <IndianRupee className="w-3.5 h-3.5 shrink-0 self-center" />
                  {formatINR(graphData[graphData.length - 1].value)}
                </span>
                <span className="text-[9px] sm:text-[10px] text-prime-dark/60 truncate">{graphData[graphData.length - 1].label}</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
