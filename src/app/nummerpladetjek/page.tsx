"use client";

import { useState } from "react";
import { Search, Shield, Calendar, Wrench, FileCheck, AlertTriangle } from "lucide-react";

export default function PlateCheckPage() {
  const [plate, setPlate] = useState("");
  const [result, setResult] = useState<boolean>(false);

  function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    if (plate) setResult(true);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Nummerpladetjek</h1>
        <p className="text-gray-500">Slå en nummerplade op og se bilens historik</p>
      </div>

      <form onSubmit={handleLookup} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-2">Indtast nummerplade</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase())}
            placeholder="AB 12 345"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-lg uppercase tracking-wider focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <button type="submit" className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
            <Search className="w-5 h-5" />
            Slå op
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-8 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Køretøjsinformation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Mærke", value: "Volkswagen" },
                { label: "Model", value: "Golf" },
                { label: "Variant", value: "1.4 TSI Comfortline" },
                { label: "Første registrering", value: "15-03-2019" },
                { label: "Farve", value: "Sort" },
                { label: "Drivmiddel", value: "Benzin" },
                { label: "Status", value: "Registreret" },
                { label: "Sidst synet", value: "22-01-2025" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="text-sm font-medium text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-primary" />
              Synshistorik
            </h2>
            <div className="space-y-3">
              {[
                { date: "22-01-2025", result: "Godkendt", notes: "Ingen anmærkninger" },
                { date: "18-01-2023", result: "Godkendt", notes: "Mindre anmærkning: Bremseslanger" },
                { date: "10-01-2021", result: "Godkendt", notes: "Ingen anmærkninger" },
              ].map((syn, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${syn.result === "Godkendt" ? "bg-green-100" : "bg-red-100"}`}>
                    {syn.result === "Godkendt" ? (
                      <FileCheck className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{syn.date} - {syn.result}</p>
                    <p className="text-xs text-gray-500">{syn.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
