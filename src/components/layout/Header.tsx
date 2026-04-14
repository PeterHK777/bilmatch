"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, User, Menu, X, Car, LogOut, FileText } from "lucide-react";
import { useAuth } from "@/lib/auth";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-primary hidden sm:block">
              BilMatch
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/brugt/bil" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Køb bil
            </Link>
            <Link href="/saelg" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Sælg bil
            </Link>
            <Link href="/bilvurdering" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Bilvurdering
            </Link>
            <Link href="/find-en-forhandler" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Find forhandler
            </Link>
            <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Blog
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/mine/favoritter"
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span>Favoritter</span>
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/mine/annoncer"
                  className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  <span>Mine annoncer</span>
                </Link>
                <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                  <Link
                    href="/bruger/opdater"
                    className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-primary transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">
                        {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium">{user.name.split(" ")[0]}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    title="Log ud"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/bruger/log-ind"
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Log ind</span>
              </Link>
            )}

            <Link
              href="/saelg"
              className="ml-2 px-4 py-2 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors"
            >
              Sælg din bil
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-primary"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-3">
            <Link href="/brugt/bil" className="block py-2 text-gray-700 hover:text-primary font-medium" onClick={() => setMobileMenuOpen(false)}>
              Køb bil
            </Link>
            <Link href="/saelg" className="block py-2 text-gray-700 hover:text-primary font-medium" onClick={() => setMobileMenuOpen(false)}>
              Sælg bil
            </Link>
            <Link href="/bilvurdering" className="block py-2 text-gray-700 hover:text-primary font-medium" onClick={() => setMobileMenuOpen(false)}>
              Bilvurdering
            </Link>
            <Link href="/find-en-forhandler" className="block py-2 text-gray-700 hover:text-primary font-medium" onClick={() => setMobileMenuOpen(false)}>
              Find forhandler
            </Link>
            <Link href="/blog" className="block py-2 text-gray-700 hover:text-primary font-medium" onClick={() => setMobileMenuOpen(false)}>
              Blog
            </Link>
            <hr className="border-gray-200" />
            <Link href="/mine/favoritter" className="flex items-center gap-2 py-2 text-gray-700 hover:text-primary font-medium" onClick={() => setMobileMenuOpen(false)}>
              <Heart className="w-5 h-5" /> Favoritter
            </Link>
            {user ? (
              <>
                <Link href="/mine/annoncer" className="flex items-center gap-2 py-2 text-gray-700 hover:text-primary font-medium" onClick={() => setMobileMenuOpen(false)}>
                  <FileText className="w-5 h-5" /> Mine annoncer
                </Link>
                <Link href="/bruger/opdater" className="flex items-center gap-2 py-2 text-gray-700 hover:text-primary font-medium" onClick={() => setMobileMenuOpen(false)}>
                  <User className="w-5 h-5" /> {user.name}
                </Link>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 py-2 text-red-600 font-medium w-full"
                >
                  <LogOut className="w-5 h-5" /> Log ud
                </button>
              </>
            ) : (
              <Link href="/bruger/log-ind" className="flex items-center gap-2 py-2 text-gray-700 hover:text-primary font-medium" onClick={() => setMobileMenuOpen(false)}>
                <User className="w-5 h-5" /> Log ind
              </Link>
            )}
            <Link
              href="/saelg"
              className="block w-full text-center py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sælg din bil
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
