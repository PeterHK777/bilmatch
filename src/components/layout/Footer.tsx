import Link from "next/link";
import { Car } from "lucide-react";
import { POPULAR_MAKES, REGIONS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      {/* SEO Footer - Popular makes */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h3 className="text-white font-semibold mb-4">Populære bilmærker</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {POPULAR_MAKES.map((make) => (
              <Link
                key={make}
                href={`/brugt/bil?make=${encodeURIComponent(make)}`}
                className="hover:text-white transition-colors"
              >
                {make}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Footer - Categories & Regions */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Kategorier</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/brugt/bil?category=PERSONBIL" className="hover:text-white transition-colors">Personbiler</Link></li>
              <li><Link href="/brugt/bil?category=VAREBIL_INKL_MOMS" className="hover:text-white transition-colors">Varebiler inkl. moms</Link></li>
              <li><Link href="/brugt/bil?category=VAREBIL_EKSKL_MOMS" className="hover:text-white transition-colors">Varebiler ekskl. moms</Link></li>
              <li><Link href="/brugt/bil?category=AUTOCAMPER" className="hover:text-white transition-colors">Autocampere</Link></li>
              <li><Link href="/brugt/bil?category=BUS" className="hover:text-white transition-colors">Busser</Link></li>
              <li><Link href="/brugt/bil?category=LASTBIL" className="hover:text-white transition-colors">Lastbiler</Link></li>
              <li><Link href="/brugt/bil?fuelType=EL" className="hover:text-white transition-colors">Elbiler</Link></li>
              <li><Link href="/brugt/bil?fuelType=HYBRID" className="hover:text-white transition-colors">Hybridbiler</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Regioner</h3>
            <ul className="space-y-2 text-sm">
              {REGIONS.map((region) => (
                <li key={region}>
                  <Link
                    href={`/brugt/bil?region=${encodeURIComponent(region)}`}
                    className="hover:text-white transition-colors"
                  >
                    {region}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">BilMatch</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/saelg" className="hover:text-white transition-colors">Sælg din bil</Link></li>
              <li><Link href="/brugt/bil" className="hover:text-white transition-colors">Køb bil</Link></li>
              <li><Link href="/bilvurdering" className="hover:text-white transition-colors">Bilvurdering</Link></li>
              <li><Link href="/nummerpladetjek" className="hover:text-white transition-colors">Nummerpladetjek</Link></li>
              <li><Link href="/finansiering" className="hover:text-white transition-colors">Bilfinansiering</Link></li>
              <li><Link href="/find-en-forhandler" className="hover:text-white transition-colors">Find forhandler</Link></li>
              <li><Link href="/forum" className="hover:text-white transition-colors">Forum</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/support" className="hover:text-white transition-colors">Kundeservice</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white">BilMatch</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
            <Link href="/brugervilkaar" className="hover:text-white transition-colors">Brugervilkår</Link>
            <Link href="/persondatapolitik" className="hover:text-white transition-colors">Persondatapolitik</Link>
            <Link href="/sikkerhedsguide" className="hover:text-white transition-colors">Sikkerhedsguide</Link>
            <Link href="/salgsguide" className="hover:text-white transition-colors">Salgsguide</Link>
            <Link href="/koebsguide" className="hover:text-white transition-colors">Købsguide</Link>
          </div>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} BilMatch. Alle rettigheder forbeholdes.
          </p>
        </div>
      </div>
    </footer>
  );
}
