"use client";

import { useState } from "react";

export default function ROICalculator() {
  const [investment, setInvestment] = useState(15000000);
  const [rentalYield, setRentalYield] = useState(7);
  const [appreciation, setAppreciation] = useState(8);
  const [years, setYears] = useState(5);

  const annualRent = investment * (rentalYield / 100);
  const totalRent = annualRent * years;
  const futureValue = investment * Math.pow(1 + appreciation / 100, years);
  const capitalGain = futureValue - investment;
  const totalReturn = totalRent + capitalGain;
  const totalROI = ((totalReturn / investment) * 100).toFixed(1);

  const formatKES = (n: number) =>
    `KES ${(n / 1000000).toFixed(1)}M`;

  return (
    <div className="bg-white rounded-sm border border-[#eaeff3] p-8 shadow-sm">
      <h3 className="font-playfair text-2xl text-[#2f4858] mb-2">
        Investment Calculator
      </h3>
      <p className="text-sm text-[#6b7c8a] mb-8">
        Estimate potential returns on your Kenyan property investment.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs uppercase tracking-wide text-[#6b7c8a] font-medium">
                Investment Amount
              </label>
              <span className="text-sm font-semibold text-[#2f4858]">
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
              className="w-full accent-[#5a73d7]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs uppercase tracking-wide text-[#6b7c8a] font-medium">
                Annual Rental Yield
              </label>
              <span className="text-sm font-semibold text-[#2f4858]">
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
              className="w-full accent-[#5a73d7]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs uppercase tracking-wide text-[#6b7c8a] font-medium">
                Annual Appreciation
              </label>
              <span className="text-sm font-semibold text-[#2f4858]">
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
              className="w-full accent-[#5a73d7]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs uppercase tracking-wide text-[#6b7c8a] font-medium">
                Hold Period
              </label>
              <span className="text-sm font-semibold text-[#2f4858]">
                {years} years
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={1}
              value={years}
              onChange={(e) => setYears(+e.target.value)}
              className="w-full accent-[#5a73d7]"
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-[#f5f8fa] rounded-sm p-8">
          <p className="text-xs uppercase tracking-wide text-[#6b7c8a] font-medium mb-6">
            Projected Returns
          </p>

          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-[#eaeff3]">
              <span className="text-sm text-[#6b7c8a]">Rental Income ({years}yr)</span>
              <span className="text-sm font-semibold text-[#131110]">
                {formatKES(totalRent)}
              </span>
            </div>

            <div className="flex justify-between py-3 border-b border-[#eaeff3]">
              <span className="text-sm text-[#6b7c8a]">Capital Appreciation</span>
              <span className="text-sm font-semibold text-[#131110]">
                {formatKES(capitalGain)}
              </span>
            </div>

            <div className="flex justify-between py-3 border-b border-[#eaeff3]">
              <span className="text-sm text-[#6b7c8a]">Property Value</span>
              <span className="text-sm font-semibold text-[#131110]">
                {formatKES(futureValue)}
              </span>
            </div>

            <div className="flex justify-between py-4 mt-4 bg-[#2f4858] rounded-sm px-4">
              <span className="text-sm text-white/80">Total ROI</span>
              <span className="text-lg font-bold text-[#ffc14d]">
                {totalROI}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
