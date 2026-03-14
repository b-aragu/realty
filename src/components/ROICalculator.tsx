"use client";

import { useState } from "react";

interface ROICalculatorProps {
  defaultInvestment?: number;
}

export default function ROICalculator({ defaultInvestment = 15000000 }: ROICalculatorProps) {
  const [investment, setInvestment] = useState(defaultInvestment);
  const [rentalYield, setRentalYield] = useState(7.5);
  const [appreciation, setAppreciation] = useState(8);
  const [years, setYears] = useState(5);

  const annualRent = investment * (rentalYield / 100);
  const totalRent = annualRent * years;
  const futureValue = investment * Math.pow(1 + appreciation / 100, years);
  const capitalGain = futureValue - investment;
  const totalReturn = totalRent + capitalGain;
  const totalROI = ((totalReturn / investment) * 100).toFixed(1);

  const formatKES = (n: number) => {
    if (n >= 1000000) return `KES ${(n / 1000000).toFixed(1)}M`;
    return `KES ${n.toLocaleString()}`;
  };

  return (
    <div className="border border-[#dde1ee] bg-white">
      {/* Header */}
      <div className="p-8 pb-6 border-b border-[#dde1ee] flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <p className="text-[0.46rem] tracking-[0.38em] uppercase text-[#c49a3c] mb-3">
            Investment Projection
          </p>
          <h3 className="font-cormorant font-light text-[2rem] leading-[1.1] text-[#1c2340]">
            ROI <em className="italic text-[#3a5299]">Calculator</em>
          </h3>
        </div>
        <p className="text-[0.6rem] leading-[1.8] tracking-[0.08em] text-[#8b91a8] max-w-[28ch] sm:text-right">
          Estimate potential returns based on current market averages.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Controls */}
        <div className="p-8 lg:border-r border-[#dde1ee] space-y-8 bg-[#f8f7f4]">
          {/* Investment Amount */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <label className="text-[0.52rem] tracking-[0.2em] uppercase text-[#1c2340]">
                Capital Outlay
              </label>
              <span className="font-cormorant font-light text-[1.4rem] text-[#1c2340]">
                {formatKES(investment)}
              </span>
            </div>
            <input
              type="range"
              min={2000000}
              max={100000000}
              step={1000000}
              value={investment}
              onChange={(e) => setInvestment(+e.target.value)}
              className="w-full h-px bg-[#dde1ee] appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1c2340] cursor-pointer"
            />
          </div>

          {/* Rental Yield */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <label className="text-[0.52rem] tracking-[0.2em] uppercase text-[#1c2340]">
                Annual Yield
              </label>
              <span className="font-cormorant font-light text-[1.4rem] text-[#2e4480]">
                {rentalYield}%
              </span>
            </div>
            <input
              type="range"
              min={3}
              max={15}
              step={0.5}
              value={rentalYield}
              onChange={(e) => setRentalYield(+e.target.value)}
              className="w-full h-px bg-[#dde1ee] appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#2e4480] cursor-pointer"
            />
          </div>

          {/* Appreciation */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <label className="text-[0.52rem] tracking-[0.2em] uppercase text-[#1c2340]">
                Annual Growth
              </label>
              <span className="font-cormorant font-light text-[1.4rem] text-[#8b91a8]">
                {appreciation}%
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={20}
              step={1}
              value={appreciation}
              onChange={(e) => setAppreciation(+e.target.value)}
              className="w-full h-px bg-[#dde1ee] appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#8b91a8] cursor-pointer"
            />
          </div>

          {/* Years */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <label className="text-[0.52rem] tracking-[0.2em] uppercase text-[#1c2340]">
                Hold Period
              </label>
              <span className="font-cormorant font-light text-[1.4rem] text-[#1c2340]">
                {years} Years
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={1}
              value={years}
              onChange={(e) => setYears(+e.target.value)}
              className="w-full h-px bg-[#dde1ee] appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1c2340] cursor-pointer"
            />
          </div>
        </div>

        {/* Results */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between border-b border-[#dde1ee] pb-4 mb-4">
              <span className="text-[0.6rem] tracking-[0.1em] text-[#8b91a8]">Rental Income ({years} yr)</span>
              <span className="font-cormorant font-light text-[1.35rem] text-[#1c2340]">
                {formatKES(totalRent)}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#dde1ee] pb-4 mb-4">
              <span className="text-[0.6rem] tracking-[0.1em] text-[#8b91a8]">Capital Appreciation</span>
              <span className="font-cormorant font-light text-[1.35rem] text-[#1c2340]">
                {formatKES(capitalGain)}
              </span>
            </div>
            <div className="flex justify-between pb-4">
              <span className="text-[0.6rem] tracking-[0.1em] text-[#8b91a8]">Gross Value (Year {years})</span>
              <span className="font-cormorant font-light text-[1.35rem] text-[#1c2340]">
                {formatKES(futureValue)}
              </span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[#c49a3c]/30 flex items-center justify-between">
            <span className="text-[0.46rem] tracking-[0.38em] uppercase text-[#2e4480]">
              Total ROI
            </span>
            <span className="font-cormorant font-light text-[3.5rem] leading-none text-[#1c2340]">
              {totalROI}<span className="text-[1.8rem] text-[#c49a3c]">%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
