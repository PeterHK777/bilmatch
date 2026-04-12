"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Filter, X } from "lucide-react";
import {
  CAR_MAKES,
  FUEL_TYPE_LABELS,
  BODY_TYPE_LABELS,
  TRANSMISSION_LABELS,
  CATEGORY_LABELS,
  REGIONS,
  COLORS,
} from "@/lib/constants";

interface Props {
  currentFilters: Record<string, string | undefined>;
}

export function SearchFilters({ currentFilters }: Props) {
  const router = useRouter();
  const [filters, setFilters] = useState(currentFilters);
  const [mobileOpen, setMobileOpen] = useState(false);

  const models = filters.make ? CAR_MAKES[filters.make] || [] : [];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const priceOptions = [25000, 50000, 75000, 100000, 150000, 200000, 250000, 300000, 400000, 500000, 750000, 1000000, 1500000];
  const mileageOptions = [5000, 10000, 25000, 50000, 75000, 100000, 150000, 200000, 250000, 300000];
  const hpOptions = [50, 75, 100, 125, 150, 175, 200, 250, 300, 400, 500];

  function updateFilter(key: string, value: string) {
    const next = { ...filters, [key]: value || undefined };
    if (key === "make") delete next.model;
    delete next.page;
    setFilters(next);
  }

  function applyFilters() {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value) params.set(key, value);
    }
    router.push(`/brugt/bil?${params.toString()}`);
    setMobileOpen(false);
  }

  function clearFilters() {
    setFilters({});
    router.push("/brugt/bil");
    setMobileOpen(false);
  }

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const filterContent = (
    <div className="space-y-5">
      {/* Category */}
      <FilterSelect
        label="Køretøjstype"
        value={filters.category}
        onChange={(v) => updateFilter("category", v)}
        options={Object.entries(CATEGORY_LABELS).map(([v, l]) => ({ value: v, label: l }))}
      />

      {/* Make */}
      <FilterSelect
        label="Mærke"
        value={filters.make}
        onChange={(v) => updateFilter("make", v)}
        options={Object.keys(CAR_MAKES).sort().map((m) => ({ value: m, label: m }))}
      />

      {/* Model */}
      <FilterSelect
        label="Model"
        value={filters.model}
        onChange={(v) => updateFilter("model", v)}
        options={models.map((m) => ({ value: m, label: m }))}
        disabled={!filters.make}
      />

      {/* Fuel */}
      <FilterSelect
        label="Drivmiddel"
        value={filters.fuelType}
        onChange={(v) => updateFilter("fuelType", v)}
        options={Object.entries(FUEL_TYPE_LABELS).map(([v, l]) => ({ value: v, label: l }))}
      />

      {/* Body type */}
      <FilterSelect
        label="Karosseritype"
        value={filters.bodyType}
        onChange={(v) => updateFilter("bodyType", v)}
        options={Object.entries(BODY_TYPE_LABELS).map(([v, l]) => ({ value: v, label: l }))}
      />

      {/* Transmission */}
      <FilterSelect
        label="Gearkasse"
        value={filters.transmission}
        onChange={(v) => updateFilter("transmission", v)}
        options={Object.entries(TRANSMISSION_LABELS).map(([v, l]) => ({ value: v, label: l }))}
      />

      {/* Year range */}
      <FilterRange
        label="Årgang"
        fromValue={filters.yearFrom}
        toValue={filters.yearTo}
        onFromChange={(v) => updateFilter("yearFrom", v)}
        onToChange={(v) => updateFilter("yearTo", v)}
        options={years.map((y) => ({ value: String(y), label: String(y) }))}
      />

      {/* Price range */}
      <FilterRange
        label="Pris"
        fromValue={filters.priceFrom}
        toValue={filters.priceTo}
        onFromChange={(v) => updateFilter("priceFrom", v)}
        onToChange={(v) => updateFilter("priceTo", v)}
        options={priceOptions.map((p) => ({ value: String(p), label: `${p.toLocaleString("da-DK")} kr.` }))}
      />

      {/* Mileage range */}
      <FilterRange
        label="Kørte km"
        fromValue={filters.mileageFrom}
        toValue={filters.mileageTo}
        onFromChange={(v) => updateFilter("mileageFrom", v)}
        onToChange={(v) => updateFilter("mileageTo", v)}
        options={mileageOptions.map((m) => ({ value: String(m), label: `${m.toLocaleString("da-DK")} km` }))}
      />

      {/* HP range */}
      <FilterRange
        label="HK"
        fromValue={filters.hpFrom}
        toValue={filters.hpTo}
        onFromChange={(v) => updateFilter("hpFrom", v)}
        onToChange={(v) => updateFilter("hpTo", v)}
        options={hpOptions.map((h) => ({ value: String(h), label: `${h} HK` }))}
      />

      {/* Color */}
      <FilterSelect
        label="Farve"
        value={filters.color}
        onChange={(v) => updateFilter("color", v)}
        options={COLORS.map((c) => ({ value: c, label: c }))}
      />

      {/* Region */}
      <FilterSelect
        label="Region"
        value={filters.region}
        onChange={(v) => updateFilter("region", v)}
        options={REGIONS.map((r) => ({ value: r, label: r }))}
      />

      {/* Seller type */}
      <FilterSelect
        label="Sælgertype"
        value={filters.sellerType}
        onChange={(v) => updateFilter("sellerType", v)}
        options={[
          { value: "PRIVATE", label: "Privat" },
          { value: "DEALER", label: "Forhandler" },
        ]}
      />

      {/* Buttons */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={applyFilters}
          className="flex-1 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors text-sm"
        >
          Anvend filtre
        </button>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="px-3 py-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Nulstil
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile filter toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden w-full flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 mb-4"
      >
        <Filter className="w-4 h-4" />
        Filtre {activeFilterCount > 0 && `(${activeFilterCount})`}
      </button>

      {/* Desktop sidebar */}
      <div className="hidden lg:block bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Filtre</h3>
        {filterContent}
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Filtre</h3>
              <button onClick={() => setMobileOpen(false)} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">{filterContent}</div>
          </div>
        </div>
      )}
    </>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  disabled,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white disabled:bg-gray-50 disabled:text-gray-400 focus:ring-2 focus:ring-primary focus:border-primary"
      >
        <option value="">Alle</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

function FilterRange({
  label,
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  options,
}: {
  label: string;
  fromValue?: string;
  toValue?: string;
  onFromChange: (v: string) => void;
  onToChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <div className="flex gap-2">
        <select
          value={fromValue || ""}
          onChange={(e) => onFromChange(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-2 py-2 text-sm bg-white focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="">Fra</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <select
          value={toValue || ""}
          onChange={(e) => onToChange(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-2 py-2 text-sm bg-white focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="">Til</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
