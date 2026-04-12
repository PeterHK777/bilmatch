import { filterListings } from "@/lib/mock-data";
import { SearchFilters } from "./SearchFilters";
import { SearchResults } from "./SearchResults";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  // Normalize searchParams
  const normalized: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(params)) {
    normalized[key] = Array.isArray(value) ? value[0] : value;
  }

  const { listings, total } = filterListings(normalized);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {normalized.make
            ? `${normalized.make}${normalized.model ? ` ${normalized.model}` : ""} til salg`
            : "Brugte biler til salg"}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {total} biler fundet
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters sidebar */}
        <aside className="lg:w-72 shrink-0">
          <SearchFilters currentFilters={normalized} />
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <SearchResults
            listings={listings}
            total={total}
            currentPage={parseInt(normalized.page || "1")}
            currentSort={normalized.sort || "newest"}
          />
        </div>
      </div>
    </div>
  );
}
