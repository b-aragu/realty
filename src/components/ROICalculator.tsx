"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface ROICalculatorProps {
  defaultInvestment?: number;
}

/* ── Format helpers ── */
function fmt(n: number): string {
  if (n >= 1e9) return `KES ${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `KES ${(n / 1e6).toFixed(2)}M`;
  return `KES ${n.toLocaleString()}`;
}

function pct(val: number, min: number, max: number): number {
  return ((val - min) / (max - min)) * 100;
}

/* ── Slider component ── */
function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  displayValue,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  displayValue: React.ReactNode;
}) {
  const fillPct = pct(value, min, max);
  const [active, setActive] = useState(false);

  return (
    <div className="py-6 border-b border-[#dde1ee] first:border-t first:border-[#dde1ee]">
      {/* Label + value */}
      <div className="flex items-baseline justify-between mb-4">
        <span className="text-[0.5rem] tracking-[0.3em] uppercase text-[#8b91a8]">
          {label}
        </span>
        <span
          className={`font-cormorant font-light text-[1.5rem] leading-none transition-colors duration-200 ${
            active ? "text-[#2e4480]" : "text-[#1c2340]"
          }`}
        >
          {displayValue}
        </span>
      </div>

      {/* Track */}
      <div className="relative h-5 flex items-center">
        {/* Gold fill */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-[#c49a3c] pointer-events-none z-[1] transition-[width] duration-100"
          style={{ width: `${fillPct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(+e.target.value)}
          onPointerDown={() => setActive(true)}
          onPointerUp={() => setActive(false)}
          onPointerLeave={() => setActive(false)}
          className="roi-range w-full"
        />
      </div>

      {/* Min/max labels */}
      <div className="flex justify-between mt-2">
        <span className="text-[0.42rem] tracking-[0.18em] text-[#dde1ee]">
          {label === "Capital Outlay" ? `KES ${(min / 1e6).toFixed(0)}M` : `${min}${label.includes("Period") ? " yr" : "%"}`}
        </span>
        <span className="text-[0.42rem] tracking-[0.18em] text-[#dde1ee]">
          {label === "Capital Outlay" ? `KES ${(max / 1e6).toFixed(0)}M` : `${max}${label.includes("Period") ? " yrs" : "%"}`}
        </span>
      </div>
    </div>
  );
}

/* ── Result row ── */
function ResultRow({
  label,
  amount,
  barPct,
}: {
  label: string;
  amount: string;
  barPct: number;
}) {
  return (
    <div className="py-6 border-b border-[#dde1ee] first:border-t first:border-[#dde1ee] flex flex-col gap-1">
      <span className="text-[0.5rem] tracking-[0.3em] uppercase text-[#8b91a8]">
        {label}
      </span>
      <span className="font-cormorant font-extralight text-[1.8rem] leading-none text-[#1c2340]">
        {amount}
      </span>
      <div className="mt-2 h-px bg-[#dde1ee] relative overflow-visible">
        <div
          className="absolute left-0 top-0 h-px bg-[#c49a3c] transition-[width] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ width: `${barPct}%` }}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function ROICalculator({ defaultInvestment = 16500000 }: ROICalculatorProps) {
  const [investment, setInvestment] = useState(defaultInvestment);
  const [rentalYield, setRentalYield] = useState(7.5);
  const [appreciation, setAppreciation] = useState(8);
  const [mgmtFee, setMgmtFee] = useState(10); // 10% standard wande fee
  const [years, setYears] = useState(5);

  /* compute logic */
  const annualGrossRent = investment * (rentalYield / 100);
  const monthlyGrossRent = annualGrossRent / 12;
  const annualMgmtFee = annualGrossRent * (mgmtFee / 100);
  const annualMaintenance = investment * 0.005; // 0.5% est maintenance
  
  const annualNetRent = annualGrossRent - annualMgmtFee - annualMaintenance;
  const totalNetRent = annualNetRent * years;
  
  const futureValue = investment * Math.pow(1 + appreciation / 100, years);
  const capitalGain = futureValue - investment;
  const totalReturn = totalNetRent + capitalGain;
  const netRoiPct = (totalReturn / investment) * 100;
  const netYield = (annualNetRent / investment) * 100;

  return (
    <section className="relative overflow-hidden bg-[#f8f7f4] border border-[#dde1ee] p-8 lg:p-14">
      {/* Ghost kanji — 'Profit/Gain' */}
      <div
        className="absolute -bottom-[5%] -right-[1%] font-['Noto_Serif_JP'] font-extralight leading-none pointer-events-none select-none z-0"
        style={{ fontSize: "32vw", color: "rgba(28,35,64,0.022)" }}
        aria-hidden="true"
      >
        益
      </div>

      {/* ── HEADER ── */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 sm:mb-16 relative z-[2]">
        <div>
          <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3">
            Investment Performance
          </p>
          <h2 className="font-cormorant font-extralight text-[clamp(2rem,2.8vw,2.8rem)] leading-[1.1] text-[#1c2340]">
            Financial <em className="italic text-[#3a5299]">Dashboard</em>
          </h2>
          <div className="w-7 h-px bg-[#c49a3c] mt-4" />
        </div>
        <div className="flex flex-col lg:items-end gap-1 mt-6 lg:mt-0">
          <p className="text-[0.6rem] leading-[1.8] tracking-[0.06em] text-[#8b91a8] max-w-[32ch] lg:text-right">
            Calculations account for the **{mgmtFee}% Wande Management Fee** and estimated maintenance preserves.
          </p>
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[450px_1fr] gap-16 lg:gap-24 relative z-[2]">

        {/* ── LEFT: REFINED INPUTS ── */}
        <div className="flex flex-col">
          <Slider
            label="Capital Outlay"
            value={investment}
            min={5000000}
            max={150000000}
            step={1000000}
            onChange={setInvestment}
            displayValue={<>{fmt(investment)}</>}
          />
          <Slider
            label="Gross Rental Yield"
            value={rentalYield}
            min={4}
            max={15}
            step={0.5}
            onChange={setRentalYield}
            displayValue={<>{rentalYield}<span className="text-[0.6rem] ml-0.5">%</span></>}
          />
          <Slider
            label="Management Fee"
            value={mgmtFee}
            min={0}
            max={20}
            step={1}
            onChange={setMgmtFee}
            displayValue={<>{mgmtFee}<span className="text-[0.6rem] ml-0.5">%</span></>}
          />
          <Slider
            label="Annual Growth"
            value={appreciation}
            min={3}
            max={15}
            step={0.5}
            onChange={setAppreciation}
            displayValue={<>{appreciation}<span className="text-[0.6rem] ml-0.5">%</span></>}
          />
          <Slider
            label="Hold Period"
            value={years}
            min={1}
            max={15}
            step={1}
            onChange={setYears}
            displayValue={<>{years}<span className="text-[0.6rem] ml-1">{years === 1 ? "Year" : "Years"}</span></>}
          />
        </div>

        {/* ── RIGHT: PERFORMANCE DASHBOARD ── */}
        <div className="flex flex-col lg:pt-4">
          
          {/* Main Net ROI Hero */}
          <div className="mb-12">
            <p className="text-[0.46rem] tracking-[0.34em] uppercase text-[#c49a3c] mb-3">Projected Net ROI</p>
            <div className="flex items-baseline gap-2">
              <span className="font-cormorant font-extralight text-[clamp(4.5rem,8vw,7.5rem)] leading-[0.85] text-[#1c2340] tracking-tight">
                {netRoiPct.toFixed(1)}
              </span>
              <span className="font-cormorant text-[clamp(2rem,4vw,3rem)] text-[#c49a3c]">%</span>
            </div>
            <p className="text-[0.62rem] tracking-[0.08em] text-[#8b91a8] mt-6 max-w-[40ch]">
              Total return inclusive of net rental income and capital appreciation over a {years}-year horizon.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-y-10 gap-x-12 border-t border-[#dde1ee] pt-12 mt-4">
            <div>
              <p className="text-[0.42rem] tracking-[0.3em] uppercase text-[#8b91a8] mb-2">Net Monthly Rent</p>
              <p className="font-cormorant text-[1.6rem] text-[#1c2340] leading-none">{fmt(annualNetRent / 12)}</p>
              <p className="text-[0.4rem] text-[#3a5299] mt-2 opacity-60">After all fees</p>
            </div>
            <div>
              <p className="text-[0.42rem] tracking-[0.3em] uppercase text-[#8b91a8] mb-2">Year {years} Valuation</p>
              <p className="font-cormorant text-[1.6rem] text-[#1c2340] leading-none">{fmt(futureValue)}</p>
              <p className="text-[0.4rem] text-[#3a5299] mt-2 opacity-60">Est. Growth</p>
            </div>
            <div>
              <p className="text-[0.42rem] tracking-[0.3em] uppercase text-[#8b91a8] mb-2">Total Capital Gain</p>
              <p className="font-cormorant text-[1.6rem] text-[#2e4480] leading-none">+{fmt(capitalGain)}</p>
            </div>
            <div>
              <p className="text-[0.42rem] tracking-[0.3em] uppercase text-[#8b91a8] mb-2">Net Rental Yield</p>
              <p className="font-cormorant text-[1.6rem] text-[#1c2340] leading-none">{netYield.toFixed(2)}%</p>
            </div>
          </div>

          {/* Growth Summary Bar */}
          <div className="mt-16 bg-white border border-[#dde1ee] p-7 lg:p-8 relative overflow-hidden">
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p className="text-[0.42rem] tracking-[0.3em] uppercase text-[#3a5299] mb-1.5">Net Profit Breakdown</p>
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#1c2340]/20" />
                     <span className="text-[0.4rem] tracking-[0.1em] text-[#8b91a8]">Rent: {fmt(totalNetRent)}</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#c49a3c]" />
                     <span className="text-[0.4rem] tracking-[0.1em] text-[#8b91a8]">Growth: {fmt(capitalGain)}</span>
                   </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[0.42rem] tracking-[0.3em] uppercase text-[#8b91a8] mb-1">Total Net Return</p>
                <p className="font-cormorant text-2xl text-[#1c2340]">{fmt(totalReturn)}</p>
              </div>
            </div>
            {/* Visual Bar Graph */}
            <div className="mt-6 h-1 w-full bg-[#f8f7f4] flex">
              <div className="h-full bg-[#1c2340]/20 transition-all duration-700" style={{ width: `${(totalNetRent/totalReturn)*100}%` }} />
              <div className="h-full bg-[#c49a3c] transition-all duration-700" style={{ width: `${(capitalGain/totalReturn)*100}%` }} />
            </div>
          </div>

        </div>
      </div>

      {/* ── DISCLAIMER ── */}
      <p className="mt-8 pt-6 border-t border-[#dde1ee] text-[0.46rem] leading-[1.9] tracking-[0.07em] text-[#8b91a8] max-w-[48ch] relative z-[2]">
        Projections are estimates based on current Kenyan real estate market
        averages and are for illustrative purposes only. Actual returns may vary
        depending on market conditions, location, and property type.
      </p>

      {/* ── CUSTOM SLIDER STYLES ── */}
      <style>{`
        .roi-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 1px;
          background: #dde1ee;
          outline: none;
          cursor: pointer;
          position: relative;
          z-index: 2;
        }
        .roi-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #f8f7f4;
          border: 1.5px solid #1c2340;
          box-shadow: 0 1px 6px rgba(28,35,64,0.15);
          cursor: pointer;
          transition: border-color 0.2s, transform 0.2s;
        }
        .roi-range::-webkit-slider-thumb:hover,
        .roi-range:active::-webkit-slider-thumb {
          border-color: #c49a3c;
          transform: scale(1.25);
        }
        .roi-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #f8f7f4;
          border: 1.5px solid #1c2340;
          box-shadow: 0 1px 6px rgba(28,35,64,0.15);
          cursor: pointer;
        }
        .roi-range::-moz-range-thumb:hover {
          border-color: #c49a3c;
        }
        .roi-range::-moz-range-track {
          height: 1px;
          background: #dde1ee;
          border: none;
        }
      `}</style>
    </section>
  );
}
