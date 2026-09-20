import React, { useState } from 'react';
import { Scale, Ruler, Calculator, RotateCcw, AlertCircle } from 'lucide-react';
import { computeBMI } from './bmiData';
import { BMIResult } from './types';
import { ResultCard } from './components/ResultCard';
import { CategoryScale } from './components/CategoryScale';

export default function App() {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weightError, setWeightError] = useState<string | null>(null);
  const [heightError, setHeightError] = useState<string | null>(null);
  const [result, setResult] = useState<BMIResult | null>(null);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
    if (weightError) setWeightError(null);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
    if (heightError) setHeightError(null);
  };

  const validateAndCalculate = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    let isValid = true;
    const trimmedWeight = weight.trim();
    const trimmedHeight = height.trim();

    // Validate weight
    if (!trimmedWeight) {
      setWeightError('Please enter your weight in kg.');
      isValid = false;
    } else {
      const numWeight = parseFloat(trimmedWeight);
      if (isNaN(numWeight) || numWeight <= 0) {
        setWeightError('Weight must be a positive number.');
        isValid = false;
      } else if (numWeight < 10 || numWeight > 500) {
        setWeightError('Please enter a realistic weight (10–500 kg).');
        isValid = false;
      } else {
        setWeightError(null);
      }
    }

    // Validate height
    if (!trimmedHeight) {
      setHeightError('Please enter your height in cm.');
      isValid = false;
    } else {
      const numHeight = parseFloat(trimmedHeight);
      if (isNaN(numHeight) || numHeight <= 0) {
        setHeightError('Height must be a positive number.');
        isValid = false;
      } else if (numHeight < 40 || numHeight > 300) {
        setHeightError('Please enter a realistic height (40–300 cm).');
        isValid = false;
      } else {
        setHeightError(null);
      }
    }

    if (!isValid) {
      setResult(null);
      return;
    }

    const calculated = computeBMI(parseFloat(trimmedWeight), parseFloat(trimmedHeight));
    setResult(calculated);
  };

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setWeightError(null);
    setHeightError(null);
    setResult(null);
  };

  return (
    <div
      id="app-root-container"
      className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col justify-center items-center p-4 sm:p-6"
    >
      <main
        id="bmi-calculator-main-card"
        className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8"
      >
        {/* Header */}
        <header id="app-header" className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mb-3 border border-indigo-100">
            <Scale className="w-6 h-6" />
          </div>
          <h1
            id="app-title"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            BMI Calculator
          </h1>
          <p
            id="app-subtitle"
            className="text-sm text-slate-500 mt-1 max-w-sm mx-auto"
          >
            Enter your weight and height below to calculate your Body Mass Index (BMI).
          </p>
        </header>

        {/* Form Inputs */}
        <form
          id="bmi-calculator-form"
          onSubmit={validateAndCalculate}
          noValidate
          className="space-y-4"
        >
          {/* Weight Input */}
          <div id="weight-input-container">
            <label
              htmlFor="weight-input"
              id="weight-label"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              Weight
            </label>
            <div className="relative rounded-xl shadow-xs">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Scale className="h-4 w-4" />
              </div>
              <input
                id="weight-input"
                type="number"
                step="any"
                min="1"
                placeholder="e.g. 70"
                value={weight}
                onChange={handleWeightChange}
                aria-invalid={!!weightError}
                aria-describedby={weightError ? 'weight-error-msg' : undefined}
                className={`block w-full rounded-xl py-2.5 pl-10 pr-12 text-sm text-slate-900 placeholder:text-slate-400 bg-white border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  weightError
                    ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500'
                    : 'border-slate-300 hover:border-slate-400'
                }`}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs font-semibold text-slate-500">
                kg
              </div>
            </div>
            {weightError && (
              <p
                id="weight-error-msg"
                className="mt-1.5 text-xs text-rose-600 flex items-center gap-1"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{weightError}</span>
              </p>
            )}
          </div>

          {/* Height Input */}
          <div id="height-input-container">
            <label
              htmlFor="height-input"
              id="height-label"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              Height
            </label>
            <div className="relative rounded-xl shadow-xs">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Ruler className="h-4 w-4" />
              </div>
              <input
                id="height-input"
                type="number"
                step="any"
                min="1"
                placeholder="e.g. 175"
                value={height}
                onChange={handleHeightChange}
                aria-invalid={!!heightError}
                aria-describedby={heightError ? 'height-error-msg' : undefined}
                className={`block w-full rounded-xl py-2.5 pl-10 pr-12 text-sm text-slate-900 placeholder:text-slate-400 bg-white border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  heightError
                    ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500'
                    : 'border-slate-300 hover:border-slate-400'
                }`}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs font-semibold text-slate-500">
                cm
              </div>
            </div>
            {heightError && (
              <p
                id="height-error-msg"
                className="mt-1.5 text-xs text-rose-600 flex items-center gap-1"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{heightError}</span>
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div id="action-buttons-container" className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              id="calculate-bmi-btn"
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate BMI</span>
            </button>

            <button
              id="reset-form-btn"
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-medium text-sm rounded-xl transition-colors cursor-pointer border border-slate-200/80"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Reset</span>
            </button>
          </div>
        </form>

        {/* Calculation Result */}
        {result && (
          <ResultCard
            result={result}
            onReset={handleReset}
          />
        )}

        {/* Reference Categories Scale */}
        <div id="reference-scale-wrapper" className="mt-6 pt-6 border-t border-slate-100">
          <CategoryScale activeCategoryType={result?.category.type} />
        </div>

        {/* Footer Note */}
        <footer id="app-footer" className="mt-6 text-center text-xs text-slate-400">
          <p id="app-formula-note">
            Formula: BMI = weight (kg) ÷ [height (m)]²
          </p>
        </footer>
      </main>
    </div>
  );
}
