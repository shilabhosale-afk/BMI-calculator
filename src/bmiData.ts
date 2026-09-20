import { BMICategoryInfo, BMIResult } from './types';

export const BMI_CATEGORIES: BMICategoryInfo[] = [
  {
    type: 'underweight',
    label: 'Underweight',
    rangeText: 'Below 18.5',
    min: 0,
    max: 18.499,
    description: 'Your BMI is lower than the recommended healthy range.',
    colorClass: {
      badge: 'bg-sky-100 text-sky-800 border-sky-200',
      bg: 'bg-sky-50',
      border: 'border-sky-300',
      text: 'text-sky-700',
      indicator: 'bg-sky-500',
    },
  },
  {
    type: 'normal',
    label: 'Normal weight',
    rangeText: '18.5 – 24.9',
    min: 18.5,
    max: 24.9,
    description: 'Your BMI falls within the healthy, ideal weight range.',
    colorClass: {
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
      text: 'text-emerald-700',
      indicator: 'bg-emerald-500',
    },
  },
  {
    type: 'overweight',
    label: 'Overweight',
    rangeText: '25.0 – 29.9',
    min: 25.0,
    max: 29.9,
    description: 'Your BMI is slightly higher than the recommended healthy range.',
    colorClass: {
      badge: 'bg-amber-100 text-amber-800 border-amber-200',
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      text: 'text-amber-700',
      indicator: 'bg-amber-500',
    },
  },
  {
    type: 'obese',
    label: 'Obesity',
    rangeText: '30.0 or above',
    min: 30.0,
    max: 100,
    description: 'Your BMI indicates obesity, which may increase health risks.',
    colorClass: {
      badge: 'bg-rose-100 text-rose-800 border-rose-200',
      bg: 'bg-rose-50',
      border: 'border-rose-300',
      text: 'text-rose-700',
      indicator: 'bg-rose-500',
    },
  },
];

export function getCategoryForBMI(bmi: number): BMICategoryInfo {
  if (bmi < 18.5) {
    return BMI_CATEGORIES[0];
  }
  if (bmi <= 24.94) {
    return BMI_CATEGORIES[1];
  }
  if (bmi <= 29.94) {
    return BMI_CATEGORIES[2];
  }
  return BMI_CATEGORIES[3];
}

export function computeBMI(weightKg: number, heightCm: number): BMIResult {
  const heightM = heightCm / 100;
  const rawBmi = weightKg / (heightM * heightM);
  // Round to 1 decimal place
  const roundedBmi = Math.round(rawBmi * 10) / 10;
  const category = getCategoryForBMI(roundedBmi);

  return {
    bmi: roundedBmi,
    category,
    weightKg,
    heightCm,
    heightM,
  };
}
