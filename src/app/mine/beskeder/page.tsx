"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Send } from "lucide-react";
import { getConversations, addReplyToConversation, type Conversation } from "@/lib/messages-store";
import Link from "next/link";
import { slugify } from "@/lib/utils";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const convos = getConversations();
    setConversations(convos);
    if (convos.length > 0 && !selectedId) {
      setSelectedId(convos[0].id);
    }
  }, []);

  const selected = conversations.find((c) => c.id === selectedId);

  function handleSend() {
    if (!newMessage.trim() || !selectedId) return;
    addReplyToConversation(selectedId, newMessage.trim());
    setConversations(getConversations());
    setNewMessage("");
  }

  function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} min siden`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} timer siden`;
    const days = Math.floor(hours / 24);
    return `${days} dage siden`;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Beskeder</h1>

      {conversations.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <MessageCircle className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">Du har ingen beskeder endnu.</p>
          <p className="text-sm text-gray-400 mt-1">Send en besked til en sælger for at starte en samtale.</p>
          <Link href="/brugt/bil" className="inline-block mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
            Søg efter biler
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex" style={{ minHeight: "500px" }}>
          {/* Conversations list */}
          <div className="w-full lg:w-80 border-r border-gray-200 shrink-0">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedId(conv.id)}
                className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  selectedId === conv.id ? "bg-primary-light" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">{conv.sellerName}</p>
                    <p className="text-xs text-gray-500 truncate">{conv.listingTitle}</p>
                    <p className="text-sm mt-1 truncate text-gray-500">
                      {conv.messages[conv.messages.length - 1]?.text}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">{timeAgo(conv.createdAt)}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col hidden lg:flex">
            {selected ? (
              <>
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="font-semibold text-gray-900">{selected.sellerName}</p>
                  <p className="text-xs text-gray-500">{selected.listingTitle}</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {selected.messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs rounded-lg px-3 py-2 text-sm ${
                          msg.from === "me"
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.from === "me" ? "text-blue-200" : "text-gray-400"}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Skriv en besked..."
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newMessage.trim()) {
                          handleSend();
                        }
                      }}
                    />
                    <button
                      onClick={handleSend}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3" />
                  <p>Vælg en samtale for at læse beskeder</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
