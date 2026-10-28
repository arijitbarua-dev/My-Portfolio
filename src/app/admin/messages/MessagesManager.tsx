"use client";

import React, { useState } from "react";
import { ContactMessage } from "@/types";
import { updateMessageStatus, deleteMessage } from "@/lib/actions";
import { Mail, Trash2, CheckCircle, Clock, Reply } from "lucide-react";

interface MessagesManagerProps {
  initialMessages: ContactMessage[];
}

export function MessagesManager({ initialMessages }: MessagesManagerProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);

  const handleStatusChange = async (id?: string, status: "new" | "read" | "replied" = "read") => {
    if (!id) return;
    try {
      await updateMessageStatus(id, status);
      setMessages(messages.map((m) => (m._id === id ? { ...m, status } : m)));
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Delete this inquiry record?")) return;
    try {
      await deleteMessage(id);
      setMessages(messages.filter((m) => m._id !== id));
    } catch (err) {
      alert("Failed to delete message.");
    }
  };

  if (messages.length === 0) {
    return (
      <div className="border-3 border-[#111111] bg-[#FFFFFF] p-12 text-center shadow-brutal space-y-3">
        <Mail className="w-8 h-8 text-[#555555] mx-auto" />
        <div className="font-heading uppercase text-lg text-[#111111]">
          Inbox Clear
        </div>
        <p className="font-sans text-sm text-[#555555]">
          No inquiries have been recorded yet. Submissions from the contact form will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`border-3 border-[#111111] bg-[#FFFFFF] shadow-brutal p-6 sm:p-7 space-y-4 ${
            msg.status === "new" ? "border-l-8 border-l-[#FF5722]" : ""
          }`}
        >
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#111111] pb-3">
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg uppercase text-[#111111]">
                {msg.name}
              </span>
              <a
                href={`mailto:${msg.email}`}
                className="font-mono text-xs text-[#FF5722] hover:underline"
              >
                &lt;{msg.email}&gt;
              </a>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span
                className={`px-2 py-0.5 border border-black font-bold uppercase text-[10px] ${
                  msg.status === "new"
                    ? "bg-[#FF5722] text-[#111111]"
                    : msg.status === "replied"
                    ? "bg-[#83E52B] text-[#111111]"
                    : "bg-[#F5F3E9] text-[#555555]"
                }`}
              >
                {msg.status}
              </span>
              <span className="text-[#555555]">
                {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ""}
              </span>
            </div>
          </div>

          {/* Subject & Body */}
          <div className="space-y-2">
            <div className="font-mono text-xs uppercase font-bold text-[#555555]">
              SUBJECT: <span className="text-[#111111]">{msg.subject}</span>
            </div>
            <div className="p-4 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm whitespace-pre-wrap text-[#222222]">
              {msg.message}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              {msg.status !== "read" && (
                <button
                  onClick={() => handleStatusChange(msg._id, "read")}
                  className="px-3 py-1 bg-[#F5F3E9] border border-black hover:bg-[#83E52B] transition-colors"
                >
                  Mark as Read
                </button>
              )}
              {msg.status !== "replied" && (
                <button
                  onClick={() => handleStatusChange(msg._id, "replied")}
                  className="px-3 py-1 bg-[#F5F3E9] border border-black hover:bg-[#83E52B] transition-colors"
                >
                  Mark Replied
                </button>
              )}
              <a
                href={`mailto:${msg.email}?subject=Re:%20${encodeURIComponent(msg.subject)}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#111111] text-[#FFFBEA] border border-black hover:bg-[#222222]"
              >
                <Reply className="w-3.5 h-3.5 text-[#83E52B]" />
                <span>Reply by Email</span>
              </a>
            </div>

            <button
              onClick={() => handleDelete(msg._id)}
              className="inline-flex items-center gap-1 px-3 py-1 text-[#FF5722] hover:text-black hover:bg-[#FF5722]/10 border border-transparent hover:border-[#FF5722]"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

