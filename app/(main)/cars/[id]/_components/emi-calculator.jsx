"use client";
import React, { useEffect, useState } from "react";
import { IndianRupee, Percent, CalendarDays, Gauge } from "lucide-react";

function EmiCalculator({ price = 1000 }) {
  const safeParse = (v, fallback = 0) => {
    const n = parseFloat(v);
    return isNaN(n) ? fallback : n;
  };

  const [loanAmount, setLoanAmount] = useState(price);
  const [downPayment, setDownPayment] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(0);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTenure, setLoanTenure] = useState(1);
  const [results, setResults] = useState(null);

  const calculateLoan = (principal, down, rate, years) => {
    const loanPrincipal = principal - down;
    if (loanPrincipal <= 0) {
      setResults(null);
      return;
    }

    const monthlyRate = rate / 100 / 12;
    const months = years * 12;

    const emi =
      (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanPrincipal;

    setResults({
      emi,
      totalInterest,
      totalPayment,
      loanPrincipal,
      downPayment: down,
    });
  };

  useEffect(() => {
    calculateLoan(loanAmount, downPayment, interestRate, loanTenure);
  }, []);

  const formatINR = (num) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(num);

  return (
    <div className="max-h-[80vh] overflow-y-auto space-y-6 p-1">

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        EMI Calculator
      </h2>
      <p className="text-sm text-gray-600 text-center">
        Adjust values below to estimate your monthly car loan EMI.
      </p>

      {/* Vehicle Price */}
      <div className="bg-gray-50 p-5 rounded-2xl space-y-4 border">
        <label className="font-semibold text-gray-800 flex items-center gap-2">
          <IndianRupee size={18} /> Vehicle Price
        </label>
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => {
            const value = safeParse(e.target.value, 1000);
            const clean = Math.min(Math.max(value, 1000), 20000000);
            setLoanAmount(clean);
            calculateLoan(clean, downPayment, interestRate, loanTenure);
          }}
          className="w-full px-4 py-2 rounded-lg border"
        />
        <input
          type="range"
          min="1000"
          max="20000000"
          value={loanAmount}
          onChange={(e) => {
            const value = safeParse(e.target.value, 1000);
            setLoanAmount(value);
            calculateLoan(value, downPayment, interestRate, loanTenure);
          }}
          className="w-full"
        />
      </div>

      {/* Down Payment */}
      <div className="bg-gray-50 p-5 rounded-2xl space-y-4 border">
        <label className="font-semibold text-gray-800 flex items-center gap-2">
          <Gauge size={18} /> Down Payment
        </label>
        <input
          type="number"
          value={downPayment}
          onChange={(e) => {
            const value = safeParse(e.target.value, 0);
            const clean = Math.min(Math.max(value, 0), loanAmount);
            setDownPayment(clean);
            setDownPaymentPercent((clean / loanAmount) * 100);
            calculateLoan(loanAmount, clean, interestRate, loanTenure);
          }}
          className="w-full px-4 py-2 rounded-lg border"
        />
        <input
          type="range"
          min="0"
          max={loanAmount}
          value={downPayment}
          onChange={(e) => {
            const value = safeParse(e.target.value);
            setDownPayment(value);
            setDownPaymentPercent((value / loanAmount) * 100);
            calculateLoan(loanAmount, value, interestRate, loanTenure);
          }}
          className="w-full"
        />
        <p className="text-sm text-gray-600">{downPaymentPercent.toFixed(1)}% of vehicle price</p>
      </div>

      {/* Row: Interest + Tenure */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="bg-gray-50 p-5 rounded-2xl border space-y-4">
          <label className="font-semibold text-gray-800 flex items-center gap-2">
            <Percent size={18} /> Interest %
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => {
              const value = safeParse(e.target.value, 5);
              const clean = Math.min(Math.max(value, 1), 25);
              setInterestRate(clean);
              calculateLoan(loanAmount, downPayment, clean, loanTenure);
            }}
            className="w-full px-4 py-2 rounded-lg border"
          />
          <input
            type="range"
            min="1"
            max="25"
            value={interestRate}
            onChange={(e) => {
              const value = safeParse(e.target.value);
              setInterestRate(value);
              calculateLoan(loanAmount, downPayment, value, loanTenure);
            }}
            className="w-full"
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-2xl border space-y-4">
          <label className="font-semibold text-gray-800 flex items-center gap-2">
            <CalendarDays size={18} /> Loan Tenure (Years)
          </label>
          <input
            type="number"
            value={loanTenure}
            onChange={(e) => {
              const value = safeParse(e.target.value, 1);
              const clean = Math.min(Math.max(value, 1), 10);
              setLoanTenure(clean);
              calculateLoan(loanAmount, downPayment, interestRate, clean);
            }}
            className="w-full px-4 py-2 rounded-lg border"
          />
          <input
            type="range"
            min="1"
            max="10"
            value={loanTenure}
            onChange={(e) => {
              const value = safeParse(e.target.value);
              setLoanTenure(value);
              calculateLoan(loanAmount, downPayment, interestRate, value);
            }}
            className="w-full"
          />
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="bg-blue-50 border border-blue-300 p-6 rounded-2xl space-y-5">
          <h3 className="text-center text-lg font-semibold">Estimated EMI</h3>
          <p className="text-center text-3xl font-bold text-blue-700">
            ₹{formatINR(results.emi)}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Loan Amount</p>
              <p className="font-semibold">₹{formatINR(results.loanPrincipal)}</p>
            </div>
            <div>
              <p className="text-gray-600">Total Interest</p>
              <p className="font-semibold">₹{formatINR(results.totalInterest)}</p>
            </div>
            <div className="col-span-2 text-center border-t pt-2 font-semibold">
              Total Payment: ₹{formatINR(results.totalPayment + downPayment)}
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 text-center">
        *Actual EMI may vary based on bank & credit score.
      </p>
    </div>
  );
}

export default EmiCalculator;
