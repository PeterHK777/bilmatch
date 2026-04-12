"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

const demoConversations = [
  {
    id: "1",
    name: "Lars Nielsen",
    listing: "BMW 3-serie 2.0 TDI - 2021",
    lastMessage: "Hej, er bilen stadig til salg?",
    time: "2 timer siden",
    unread: true,
    messages: [
      { from: "them", text: "Hej, er bilen stadig til salg?", time: "14:32" },
    ],
  },
  {
    id: "2",
    name: "Mette Hansen",
    listing: "Audi A4 Sport - 2020",
    lastMessage: "Tak for info! Kan jeg komme forbi i morgen?",
    time: "1 dag siden",
    unread: false,
    messages: [
      { from: "them", text: "Hej, hvad er den laveste pris du vil gå?", time: "10:15" },
      { from: "me", text: "Hej Mette, prisen er fast, men vi kan altid tale om det ved en prøvekørsel.", time: "10:45" },
      { from: "them", text: "Tak for info! Kan jeg komme forbi i morgen?", time: "11:02" },
    ],
  },
  {
    id: "3",
    name: "AutoCenter København",
    listing: "VW Golf 1.0 TSI - 2022",
    lastMessage: "Vi har opdateret prisen som aftalt.",
    time: "3 dage siden",
    unread: false,
    messages: [
      { from: "me", text: "Hej, jeg er interesseret i jeres VW Golf.", time: "09:00" },
      { from: "them", text: "Hej! Den er stadig til salg. Vil du komme forbi?", time: "09:30" },
      { from: "them", text: "Vi har opdateret prisen som aftalt.", time: "10:00" },
    ],
  },
];

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const selected = demoConversations.find((c) => c.id === selectedId);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Beskeder</h1>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex" style={{ minHeight: "500px" }}>
        {/* Conversations list */}
        <div className="w-full lg:w-80 border-r border-gray-200 shrink-0">
          {demoConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedId(conv.id)}
              className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selectedId === conv.id ? "bg-primary-light" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className={`text-sm font-medium ${conv.unread ? "text-gray-900" : "text-gray-700"}`}>
                    {conv.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{conv.listing}</p>
                  <p className={`text-sm mt-1 truncate ${conv.unread ? "font-medium text-gray-900" : "text-gray-500"}`}>
                    {conv.lastMessage}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-xs text-gray-400">{conv.time}</span>
                  {conv.unread && (
                    <span className="w-2.5 h-2.5 bg-primary rounded-full" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col hidden lg:flex">
          {selected ? (
            <>
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="font-semibold text-gray-900">{selected.name}</p>
                <p className="text-xs text-gray-500">{selected.listing}</p>
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
                        setNewMessage("");
                      }
                    }}
                  />
                  <button
                    onClick={() => setNewMessage("")}
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
    </div>
  );
}
