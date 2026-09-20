import { BMIResult } from '../types';
import { RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';

interface ResultCardProps {
  result: BMIResult;
  onReset: () => void;
}

export function ResultCard({ result, onReset }: ResultCardProps) {
  const { bmi, category, weightKg, heightCm, heightM } = result;

  // Calculate approximate percentage position on a scale from 15 to 35
  // min 15 = 0%, max 35 = 100%
  const scaleMin = 15;
  const scaleMax = 35;
  const clampedBMI = Math.min(Math.max(bmi, scaleMin), scaleMax);
  const positionPercent = Math.round(((clampedBMI - scaleMin) / (scaleMax - scaleMin)) * 100);

  return (
    <div
      id="bmi-result-card"
      className="mt-6 p-6 bg-slate-50 border border-slate-200/90 rounded-2xl transition-all animate-in fade-in duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span
            id="bmi-result-category-badge"
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${category.colorClass.badge}`}
          >
            {category.type === 'normal' ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5" />
            )}
            {category.label}
          </span>
          <p id="bmi-result-description" className="text-xs text-slate-600 mt-1.5">
            {category.description}
          </p>
        </div>

        <button
          id="bmi-result-reset-btn"
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
          title="Reset calculation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Main BMI Display */}
      <div id="bmi-display-section" className="my-5 text-center sm:text-left">
        <p id="bmi-value-label" className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          Your Body Mass Index (BMI)
        </p>
        <div className="flex items-baseline justify-center sm:justify-start gap-2 mt-1">
          <span
            id="bmi-value-number"
            className="text-5xl font-bold tracking-tight text-slate-900 font-mono"
          >
            {bmi.toFixed(1)}
          </span>
          <span id="bmi-unit-label" className="text-sm font-medium text-slate-500">
            kg/m²
          </span>
        </div>
      </div>

      {/* Visual Bar Scale */}
      <div id="bmi-visual-meter-section" className="space-y-1.5 pt-1 pb-3">
        <div className="flex justify-between text-[11px] font-medium text-slate-500 px-0.5">
          <span>15 (Under)</span>
          <span>18.5</span>
          <span>25.0</span>
          <span>30.0 (Obese)</span>
          <span>35+</span>
        </div>

        <div
          id="bmi-meter-track"
          className="relative h-3 w-full rounded-full overflow-hidden bg-gradient-to-r from-sky-300 via-emerald-300 via-amber-300 to-rose-400 p-[1px]"
        >
          {/* Active pointer marker */}
          <div
            id="bmi-meter-pointer"
            className="absolute top-0 bottom-0 w-2.5 bg-slate-900 border-2 border-white rounded-full shadow-md -translate-x-1/2 transition-all duration-500"
            style={{ left: `${positionPercent}%` }}
            title={`Your BMI: ${bmi}`}
          />
        </div>
      </div>

      {/* Math breakdown for beginners */}
      <div
        id="bmi-math-breakdown"
        className="mt-3 p-3 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
      >
        <div>
          <span className="font-semibold text-slate-700">Calculation: </span>
          <span>
            {weightKg} kg ÷ ({heightM.toFixed(2)} m)² = <strong className="text-slate-900">{bmi.toFixed(1)}</strong>
          </span>
        </div>
        <span className="text-[11px] text-slate-500">
          Height: {heightCm} cm ({heightM.toFixed(2)} m)
        </span>
      </div>
    </div>
  );
}
