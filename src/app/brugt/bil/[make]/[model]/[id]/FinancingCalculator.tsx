"use client";

import { useState, useMemo } from "react";
import { Calculator } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Props {
  price: number;
}

export function FinancingCalculator({ price }: Props) {
  const [downPayment, setDownPayment] = useState(Math.round(price * 0.2));
  const [months, setMonths] = useState(60);
  const [rate, setRate] = useState(5.5);

  const monthlyPayment = useMemo(() => {
    const principal = price - downPayment;
    if (principal <= 0) return 0;
    const monthlyRate = rate / 100 / 12;
    if (monthlyRate === 0) return principal / months;
    return Math.round(
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
    );
  }, [price, downPayment, months, rate]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-primary" />
        Finansieringsberegner
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Udbetaling (kr.)
          </label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(parseInt(e.target.value) || 0)}
            min={0}
            max={price}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Løbetid (måneder)
          </label>
          <select
            value={months}
            onChange={(e) => setMonths(parseInt(e.target.value))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white"
          >
            {[12, 24, 36, 48, 60, 72, 84, 96].map((m) => (
              <option key={m} value={m}>{m} måneder ({m / 12} år)</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rente (% p.a.)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
            min={0}
            max={25}
            step={0.1}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      <div className="bg-primary-light rounded-lg p-4 text-center">
        <p className="text-sm text-gray-600 mb-1">Estimeret månedlig ydelse</p>
        <p className="text-3xl font-bold text-primary">{formatPrice(monthlyPayment)}</p>
        <p className="text-xs text-gray-500 mt-2">
          Beregningen er vejledende og inkluderer ikke forsikring, ejerafgift eller andre omkostninger.
        </p>
      </div>
    </div>
  );
}
