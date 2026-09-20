export type BMICategoryType = 'underweight' | 'normal' | 'overweight' | 'obese';

export interface BMICategoryInfo {
  type: BMICategoryType;
  label: string;
  rangeText: string;
  min: number;
  max: number;
  description: string;
  colorClass: {
    badge: string;
    bg: string;
    border: string;
    text: string;
    indicator: string;
  };
}

export interface BMIResult {
  bmi: number;
  category: BMICategoryInfo;
  weightKg: number;
  heightCm: number;
  heightM: number;
}
