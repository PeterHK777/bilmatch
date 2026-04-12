"use client";

import { useState, useMemo } from "react";
import { Calculator, CreditCard, Shield, Clock } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function FinancingPage() {
  const [carPrice, setCarPrice] = useState(200000);
  const [downPayment, setDownPayment] = useState(40000);
  const [months, setMonths] = useState(60);
  const [rate, setRate] = useState(5.5);

  const monthlyPayment = useMemo(() => {
    const principal = carPrice - downPayment;
    if (principal <= 0) return 0;
    const monthlyRate = rate / 100 / 12;
    if (monthlyRate === 0) return principal / months;
    return Math.round(
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
    );
  }, [carPrice, downPayment, months, rate]);

  const totalCost = monthlyPayment * months + downPayment;
  const totalInterest = totalCost - carPrice;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Bilfinansiering</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Beregn din månedlige ydelse og find den bedste finansieringsløsning til din nye bil
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            Beregner
          </h2>
          <div className="space-y-5">
            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>Bilens pris</span>
                <span className="text-primary font-semibold">{formatPrice(carPrice)}</span>
              </label>
              <input type="range" min={25000} max={1500000} step={5000} value={carPrice} onChange={(e) => setCarPrice(parseInt(e.target.value))} className="w-full accent-primary" />
            </div>
            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>Udbetaling</span>
                <span className="text-primary font-semibold">{formatPrice(downPayment)}</span>
              </label>
              <input type="range" min={0} max={carPrice * 0.5} step={5000} value={downPayment} onChange={(e) => setDownPayment(parseInt(e.target.value))} className="w-full accent-primary" />
            </div>
            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>Løbetid</span>
                <span className="text-primary font-semibold">{months} måneder ({months / 12} år)</span>
              </label>
              <input type="range" min={12} max={96} step={12} value={months} onChange={(e) => setMonths(parseInt(e.target.value))} className="w-full accent-primary" />
            </div>
            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>Rente (ÅOP)</span>
                <span className="text-primary font-semibold">{rate}%</span>
              </label>
              <input type="range" min={0} max={15} step={0.1} value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="w-full accent-primary" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-primary-light rounded-xl p-6 text-center">
            <p className="text-sm text-gray-600 mb-1">Din månedlige ydelse</p>
            <p className="text-4xl font-bold text-primary">{formatPrice(monthlyPayment)}</p>
            <p className="text-xs text-gray-500 mt-1">pr. måned i {months / 12} år</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-xs text-gray-500">Samlet pris</p>
              <p className="text-lg font-bold text-gray-900">{formatPrice(totalCost)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Samlede renter</p>
              <p className="text-lg font-bold text-gray-900">{formatPrice(totalInterest)}</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center">
            Beregningen er vejledende. Kontakt din bank for et præcist tilbud.
          </p>
        </div>
      </div>

      {/* Info cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { icon: CreditCard, title: "Billån", desc: "Klassisk billån med fast rente og afdrag. Du ejer bilen fra dag ét." },
          { icon: Clock, title: "Leasing", desc: "Privatleasing eller erhvervsleasing med fleksible løbetider og km-pakker." },
          { icon: Shield, title: "Forsikring", desc: "Få et samlet overblik over pris inkl. forsikring, ejerafgift og brændstof." },
        ].map((item) => (
          <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-5">
            <item.icon className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
