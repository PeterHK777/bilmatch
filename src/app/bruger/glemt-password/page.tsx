"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Car, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSent(true);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Glemt password</h1>
          <p className="text-gray-500 mt-1">Vi sender dig et link til at nulstille dit password</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-accent mx-auto mb-3" />
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Email sendt!</h2>
              <p className="text-sm text-gray-500 mb-4">
                Hvis der findes en konto med {email}, har vi sendt et link til at nulstille dit password.
              </p>
              <Link href="/bruger/log-ind" className="text-primary font-medium hover:underline">
                Tilbage til log ind
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="din@email.dk"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                Send nulstillingslink
              </button>
            </form>
          )}
        </div>

        <p className="text-center mt-6">
          <Link href="/bruger/log-ind" className="text-sm text-primary hover:underline flex items-center justify-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Tilbage til log ind
          </Link>
        </p>
      </div>
    </div>
  );
}
