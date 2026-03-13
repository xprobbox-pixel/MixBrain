
import React from 'react';

interface DropdownProps<T extends string> {
  label: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
}

export const Dropdown = <T extends string,>({ label, options, value, onChange }: DropdownProps<T>) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="bg-slate-900 border border-slate-800 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all cursor-pointer hover:bg-slate-800/80"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
