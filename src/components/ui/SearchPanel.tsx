"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import { CAR_MAKES, FUEL_TYPE_LABELS, CATEGORY_LABELS } from "@/lib/constants";

export function SearchPanel() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");

  const models = make ? CAR_MAKES[make] || [] : [];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const priceOptions = [
    25000, 50000, 75000, 100000, 150000, 200000, 250000, 300000, 400000, 500000,
    600000, 750000, 1000000, 1500000,
  ];

  const mileageOptions = [
    5000, 10000, 25000, 50000, 75000, 100000, 125000, 150000, 200000, 250000, 300000,
  ];

  function handleSearch() {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (make) params.set("make", make);
    if (model) params.set("model", model);
    if (fuelType) params.set("fuelType", fuelType);
    if (yearFrom) params.set("yearFrom", yearFrom);
    if (yearTo) params.set("yearTo", yearTo);
    if (priceFrom) params.set("priceFrom", priceFrom);
    if (priceTo) params.set("priceTo", priceTo);
    if (mileageFrom) params.set("mileageFrom", mileageFrom);
    if (mileageTo) params.set("mileageTo", mileageTo);
    router.push(`/brugt/bil?${params.toString()}`);
  }

  // Reset model when make changes
  useEffect(() => {
    setModel("");
  }, [make]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Category */}
        <SelectField
          label="Køretøjstype"
          value={category}
          onChange={setCategory}
          options={Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value, label }))}
          placeholder="Alle typer"
        />

        {/* Make */}
        <SelectField
          label="Mærke"
          value={make}
          onChange={setMake}
          options={Object.keys(CAR_MAKES).sort().map((m) => ({ value: m, label: m }))}
          placeholder="Alle mærker"
        />

        {/* Model */}
        <SelectField
          label="Model"
          value={model}
          onChange={setModel}
          options={models.map((m) => ({ value: m, label: m }))}
          placeholder={make ? "Vælg model" : "Vælg mærke først"}
          disabled={!make}
        />

        {/* Fuel Type */}
        <SelectField
          label="Drivmiddel"
          value={fuelType}
          onChange={setFuelType}
          options={Object.entries(FUEL_TYPE_LABELS).map(([value, label]) => ({ value, label }))}
          placeholder="Alle drivmidler"
        />

        {/* Year Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Årgang</label>
          <div className="flex gap-2">
            <select
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white"
            >
              <option value="">Fra</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <select
              value={yearTo}
              onChange={(e) => setYearTo(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white"
            >
              <option value="">Til</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pris</label>
          <div className="flex gap-2">
            <select
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white"
            >
              <option value="">Fra</option>
              {priceOptions.map((p) => (
                <option key={p} value={p}>{p.toLocaleString("da-DK")} kr.</option>
              ))}
            </select>
            <select
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white"
            >
              <option value="">Til</option>
              {priceOptions.map((p) => (
                <option key={p} value={p}>{p.toLocaleString("da-DK")} kr.</option>
              ))}
            </select>
          </div>
        </div>

        {/* Mileage Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kørte km</label>
          <div className="flex gap-2">
            <select
              value={mileageFrom}
              onChange={(e) => setMileageFrom(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white"
            >
              <option value="">Fra</option>
              {mileageOptions.map((m) => (
                <option key={m} value={m}>{m.toLocaleString("da-DK")} km</option>
              ))}
            </select>
            <select
              value={mileageTo}
              onChange={(e) => setMileageTo(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white"
            >
              <option value="">Til</option>
              {mileageOptions.map((m) => (
                <option key={m} value={m}>{m.toLocaleString("da-DK")} km</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Search button */}
      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={handleSearch}
          className="w-full sm:w-auto px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          Søg biler
        </button>
        <a
          href="/brugt/bil"
          className="text-sm text-primary hover:underline"
        >
          Udvidet søgning
        </a>
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white disabled:bg-gray-50 disabled:text-gray-400"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
