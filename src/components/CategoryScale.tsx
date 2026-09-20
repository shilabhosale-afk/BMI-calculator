import { BMI_CATEGORIES } from '../bmiData';
import { BMICategoryType } from '../types';

interface CategoryScaleProps {
  activeCategoryType?: BMICategoryType;
}

export function CategoryScale({ activeCategoryType }: CategoryScaleProps) {
  return (
    <div id="category-scale-container" className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 id="category-scale-title" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          BMI Categories Reference
        </h3>
      </div>
      <div id="category-grid" className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {BMI_CATEGORIES.map((cat) => {
          const isActive = activeCategoryType === cat.type;
          return (
            <div
              key={cat.type}
              id={`category-card-${cat.type}`}
              className={`p-3 rounded-xl border transition-all duration-200 text-left ${
                isActive
                  ? `${cat.colorClass.bg} ${cat.colorClass.border} shadow-sm ring-2 ring-offset-1 ring-slate-400`
                  : 'bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${cat.colorClass.indicator}`}
                />
                <span
                  id={`category-label-${cat.type}`}
                  className={`text-xs font-medium truncate ${
                    isActive ? cat.colorClass.text : 'text-slate-700'
                  }`}
                >
                  {cat.label}
                </span>
              </div>
              <p
                id={`category-range-${cat.type}`}
                className={`text-xs font-semibold ${
                  isActive ? cat.colorClass.text : 'text-slate-500'
                }`}
              >
                {cat.rangeText}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
