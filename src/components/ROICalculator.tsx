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
  const [years, setYears] = useState(5);

  /* compute */
  const totalRent = investment * (rentalYield / 100) * years;
  const futureValue = investment * Math.pow(1 + appreciation / 100, years);
  const capitalGain = futureValue - investment;
  const grossExit = futureValue;
  const totalReturn = totalRent + capitalGain;
  const roiPct = ((totalReturn / investment) * 100);
  const isPositive = roiPct > 0;

  /* bar proportions */
  const rentalBar = grossExit > 0 ? (totalRent / grossExit) * 100 : 0;
  const appreciationBar = grossExit > 0 ? (capitalGain / grossExit) * 100 : 0;

  return (
    <section className="relative overflow-hidden">
      {/* Ghost kanji */}
      <div
        className="absolute -bottom-[5%] -right-[1%] font-['Noto_Serif_JP'] font-extralight leading-none pointer-events-none select-none z-0"
        style={{ fontSize: "38vw", color: "rgba(28,35,64,0.025)" }}
        aria-hidden="true"
      >
        益
      </div>

      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 sm:mb-16 relative z-[2]">
        <div>
          <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3">
            Investment Projection
          </p>
          <h2 className="font-cormorant font-extralight text-[clamp(1.9rem,2.6vw,2.6rem)] leading-[1.1] text-[#1c2340]">
            ROI <em className="italic text-[#3a5299]">Calculator</em>
          </h2>
          <div className="w-7 h-px bg-[#c49a3c] mt-3" />
        </div>
        <p className="text-[0.6rem] leading-[1.9] tracking-[0.07em] text-[#8b91a8] max-w-[30ch] sm:text-right mt-4 sm:mt-0">
          Estimate potential returns based on<br className="hidden sm:block" />
          current market averages. Figures are<br className="hidden sm:block" />
          indicative and not guaranteed.
        </p>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#dde1ee] relative z-[2]">

        {/* ── LEFT: INPUTS ── */}
        <div className="bg-[#f8f7f4] pr-0 lg:pr-14 py-4 lg:py-0">
          <Slider
            label="Capital Outlay"
            value={investment}
            min={2000000}
            max={100000000}
            step={500000}
            onChange={setInvestment}
            displayValue={<>{fmt(investment)}</>}
          />
          <Slider
            label="Annual Yield"
            value={rentalYield}
            min={4}
            max={15}
            step={0.5}
            onChange={setRentalYield}
            displayValue={
              <>
                {rentalYield}
                <span className="font-montserrat font-extralight text-[0.6rem] tracking-[0.1em] text-[#8b91a8] ml-0.5">
                  %
                </span>
              </>
            }
          />
          <Slider
            label="Annual Capital Growth"
            value={appreciation}
            min={2}
            max={20}
            step={1}
            onChange={setAppreciation}
            displayValue={
              <>
                {appreciation}
                <span className="font-montserrat font-extralight text-[0.6rem] tracking-[0.1em] text-[#8b91a8] ml-0.5">
                  %
                </span>
              </>
            }
          />
          <Slider
            label="Hold Period"
            value={years}
            min={1}
            max={20}
            step={1}
            onChange={setYears}
            displayValue={
              <>
                {years}
                <span className="font-montserrat font-extralight text-[0.6rem] tracking-[0.1em] text-[#8b91a8] ml-0.5">
                  {years === 1 ? " Year" : " Years"}
                </span>
              </>
            }
          />
        </div>

        {/* ── RIGHT: RESULTS ── */}
        <div className="bg-[#f8f7f4] pl-0 lg:pl-14 py-4 lg:py-0 flex flex-col">
          <ResultRow
            label={`Rental Income (over ${years} year${years > 1 ? "s" : ""})`}
            amount={fmt(totalRent)}
            barPct={rentalBar}
          />
          <ResultRow
            label="Capital Appreciation"
            amount={fmt(capitalGain)}
            barPct={appreciationBar}
          />
          <ResultRow
            label={`Gross Value at Exit (Year ${years})`}
            amount={fmt(grossExit)}
            barPct={100}
          />

          {/* ── TOTAL ROI (hero) ── */}
          <div className="mt-auto pt-8 border-t border-[#dde1ee]">
            <p className="text-[0.5rem] tracking-[0.38em] uppercase text-[#2e4480] mb-2">
              Total ROI
            </p>
            <div
              className={`font-cormorant font-extralight leading-none tracking-[-0.02em] flex items-baseline gap-[0.1em] transition-colors duration-300 ${
                isPositive ? "text-[#2e4480]" : "text-[#1c2340]"
              }`}
              style={{ fontSize: "clamp(3.5rem, 6vw, 5.5rem)" }}
            >
              {roiPct.toFixed(1)}
              <span className="text-[0.4em] text-[#c49a3c] font-light">%</span>
            </div>
            <p className="text-[0.5rem] tracking-[0.22em] uppercase text-[#8b91a8] mt-2">
              Over {years} year{years > 1 ? "s" : ""} · {fmt(investment)} invested
            </p>

            {/* Profit line */}
            <div className="flex items-center gap-4 mt-5 pt-5 border-t border-[#dde1ee]">
              <div className="w-6 h-px bg-[#c49a3c] shrink-0" />
              <span className="text-[0.46rem] tracking-[0.26em] uppercase text-[#8b91a8]">
                Net Profit
              </span>
              <span className="font-cormorant font-light text-base text-[#1c2340] ml-auto">
                {fmt(totalReturn)}
              </span>
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
