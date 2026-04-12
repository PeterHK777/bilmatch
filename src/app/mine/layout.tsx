"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Heart, Search, MessageCircle, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/mine/annoncer", label: "Mine annoncer", icon: FileText },
  { href: "/mine/favoritter", label: "Favoritter", icon: Heart },
  { href: "/gemte-soegninger", label: "Gemte søgninger", icon: Search },
  { href: "/mine/beskeder", label: "Beskeder", icon: MessageCircle },
  { href: "/bruger/opdater", label: "Profil", icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-56 shrink-0">
          <nav className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium border-b border-gray-100 last:border-0 transition-colors",
                  pathname === item.href
                    ? "bg-primary-light text-primary"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
