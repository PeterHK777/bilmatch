"use client";

const MESSAGES_KEY = "bilmatch_messages";

export interface Message {
  from: "me" | "them";
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  sellerId: string;
  sellerName: string;
  listingId: string;
  listingTitle: string;
  messages: Message[];
  createdAt: string;
}

export function getConversations(): Conversation[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(MESSAGES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function sendMessage(
  sellerId: string,
  sellerName: string,
  listingId: string,
  listingTitle: string,
  text: string
): Conversation {
  const convos = getConversations();
  const existing = convos.find((c) => c.listingId === listingId);

  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  const msg: Message = { from: "me", text, time: timeStr };

  if (existing) {
    existing.messages.push(msg);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(convos));
    return existing;
  } else {
    const convo: Conversation = {
      id: "conv-" + Date.now().toString(36),
      sellerId,
      sellerName,
      listingId,
      listingTitle,
      messages: [msg],
      createdAt: now.toISOString(),
    };
    convos.push(convo);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(convos));
    return convo;
  }
}

export function addReplyToConversation(convoId: string, text: string) {
  const convos = getConversations();
  const convo = convos.find((c) => c.id === convoId);
  if (!convo) return;
  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  convo.messages.push({ from: "me", text, time: timeStr });
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(convos));
}
