"use client";

import { useState } from "react";
import { Phone, Mail, MessageCircle, Heart, Share2, Flag, MapPin, Building2, User } from "lucide-react";
import type { MockUser, MockListing } from "@/lib/mock-data";

interface Props {
  seller: MockUser;
  listing: MockListing;
}

export function ContactSection({ seller, listing }: Props) {
  const [showPhone, setShowPhone] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const isDealer = seller.role === "DEALER";

  function handleSendMessage() {
    if (!messageText.trim()) return;
    setMessageSent(true);
    setMessageText("");
  }

  return (
    <div className="space-y-4">
      {/* Seller info */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            {isDealer ? (
              <Building2 className="w-6 h-6 text-primary" />
            ) : (
              <User className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {isDealer ? seller.dealership!.companyName : seller.name}
            </h3>
            {isDealer ? (
              <span className="text-xs px-2 py-0.5 bg-primary-light text-primary rounded font-medium">
                Forhandler
              </span>
            ) : (
              <span className="text-xs text-gray-500">Privatsælger</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4" />
          <span>{listing.region}, {listing.zipCode}</span>
        </div>

        {/* Phone */}
        <button
          onClick={() => setShowPhone(true)}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors mb-2"
        >
          <Phone className="w-5 h-5" />
          {showPhone ? seller.phone : "Vis telefonnummer"}
        </button>

        {/* Email */}
        <a
          href={`mailto:${seller.email}`}
          className="w-full flex items-center justify-center gap-2 py-2.5 border border-primary text-primary font-semibold rounded-lg hover:bg-primary-light transition-colors"
        >
          <Mail className="w-5 h-5" />
          Send email
        </a>
      </div>

      {/* Quick message */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Skriv besked
        </h3>
        {messageSent ? (
          <div className="text-center py-4">
            <p className="text-accent font-medium">Besked sendt!</p>
            <p className="text-sm text-gray-500 mt-1">Sælger vender tilbage hurtigst muligt.</p>
            <button
              onClick={() => setMessageSent(false)}
              className="text-sm text-primary hover:underline mt-2"
            >
              Send ny besked
            </button>
          </div>
        ) : (
          <>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={`Hej, jeg er interesseret i din ${listing.make} ${listing.model}. Er den stadig til salg?`}
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary resize-none"
            />
            <button
              onClick={handleSendMessage}
              className="mt-2 w-full py-2.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors"
            >
              Send besked
            </button>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
            isFavorite
              ? "bg-red-50 border-red-200 text-red-600"
              : "border-gray-300 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          {isFavorite ? "Gemt" : "Gem"}
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors">
          <Share2 className="w-4 h-4" />
          Del
        </button>
        <button className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-gray-300 text-gray-400 hover:text-red-500 hover:bg-gray-50 transition-colors">
          <Flag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
