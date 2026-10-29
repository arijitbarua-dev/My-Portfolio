"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/lib/validations";
import { Profile } from "@/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/Button";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Mail, Phone, MessageSquare, Send, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";

interface ContactSectionProps {
  profile: Profile;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const [serverState, setServerState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      honeypot: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerState({ status: "loading" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to submit message.");
      }

      setServerState({
        status: "success",
        message: json.message || "Message sent successfully! I'll reply promptly.",
      });
      reset();
    } catch (err: any) {
      setServerState({
        status: "error",
        message: err.message || "Could not transmit message. Please try the direct email below.",
      });
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Divider */}
        <SectionDivider number="06" label="LET'S CONNECT" variant="lime" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Direct Inquiries & Meta (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatedReveal>
              <SectionHeading
                title="Have a Good"
                italicWord="Project?"
                subtitle="Open for discussions around full-stack development, architectural consulting, or creative collaborations."
                className="mt-3"
              />
            </AnimatedReveal>

            {/* Direct Contact Cards */}
            <AnimatedReveal delay={0.1}>
              <div className="border-3 border-[#111111] bg-[#FFFFFF] shadow-brutal p-6 space-y-4">
                <div className="font-mono text-xs uppercase font-bold text-[#555555] border-b-2 border-[#111111] pb-2">
                  DIRECT ACCESS CHANNELS:
                </div>

                <div className="space-y-3 font-mono text-sm">
                  {/* Email */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2.5 bg-[#FFFBEA] border-2 border-[#111111]">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#FF5722] shrink-0" />
                      <span className="text-xs uppercase font-bold text-[#555555]">EMAIL:</span>
                    </div>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-xs font-bold text-[#111111] hover:text-[#FF5722] transition-colors break-all sm:text-right"
                    >
                      {profile.email}
                    </a>
                  </div>

                  {/* Phone */}
                  {profile.phone && (
                    <div className="flex items-center justify-between p-2.5 bg-[#FFFBEA] border-2 border-[#111111]">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#83E52B]" />
                        <span className="text-xs uppercase font-bold text-[#555555]">PHONE:</span>
                      </div>
                      <a
                        href={`tel:${profile.phone.replace(/[^0-9+]/g, "")}`}
                        className="text-xs font-bold text-[#111111] hover:text-[#83E52B] transition-colors"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  )}

                  {/* WhatsApp */}
                  {profile.whatsapp && (
                    <div className="flex items-center justify-between p-2.5 bg-[#FFFBEA] border-2 border-[#111111]">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-[#83E52B]" />
                        <span className="text-xs uppercase font-bold text-[#555555]">WHATSAPP:</span>
                      </div>
                      <a
                        href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#111111] hover:text-[#83E52B] transition-colors"
                      >
                        {profile.whatsapp}
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    variant="orange"
                    size="md"
                    href={`mailto:${profile.email}?subject=Project%20Inquiry`}
                    icon={<ArrowUpRight className="w-4 h-4" />}
                    className="w-full"
                  >
                    Direct Email Client
                  </Button>
                </div>
              </div>
            </AnimatedReveal>
          </div>

          {/* Right Column: Validated Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatedReveal delay={0.2}>
              <div className="border-3 border-[#111111] bg-[#FFFFFF] shadow-brutal-lg p-6 sm:p-8 relative">
                
                {/* Header Tab */}
                <div className="flex items-center justify-between border-b-2 border-[#111111] pb-3 mb-6">
                  <span className="font-heading uppercase text-lg font-black text-[#111111]">
                    Message Dispatch Form
                  </span>
                  <span className="bg-[#83E52B] text-[#111111] px-2 py-0.5 border border-black font-mono text-[10px] font-bold">
                    ENCRYPTED // ZOD
                  </span>
                </div>

                {/* Status Banners */}
                {serverState.status === "success" && (
                  <div className="mb-6 p-4 bg-[#83E52B]/20 border-2 border-[#83E52B] flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5" />
                    <div className="text-sm font-sans font-bold text-black">
                      {serverState.message}
                    </div>
                  </div>
                )}

                {serverState.status === "error" && (
                  <div className="mb-6 p-4 bg-[#FF5722]/20 border-2 border-[#FF5722] flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[#FF5722] shrink-0 mt-0.5" />
                    <div className="text-sm font-sans font-bold text-[#111111]">
                      {serverState.message}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Honeypot field (hidden from screen readers & users) */}
                  <input
                    type="text"
                    {...register("honeypot")}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Alex Mercer"
                        {...register("name")}
                        className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] text-sm text-[#111111] font-sans focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                      />
                      {errors.name && (
                        <p className="font-mono text-xs text-[#FF5722] font-bold">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="alex@company.com"
                        {...register("email")}
                        className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] text-sm text-[#111111] font-sans focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                      />
                      {errors.email && (
                        <p className="font-mono text-xs text-[#FF5722] font-bold">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
                      Subject *
                    </label>
                    <input
                      type="text"
                      placeholder="Project Inquiry / Full Stack Consultation"
                      {...register("subject")}
                      className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] text-sm text-[#111111] font-sans focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                    />
                    {errors.subject && (
                      <p className="font-mono text-xs text-[#FF5722] font-bold">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
                      Message Details *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Share details regarding the timeline, scope, or technical challenges..."
                      {...register("message")}
                      className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] text-sm text-[#111111] font-sans focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                    />
                    {errors.message && (
                      <p className="font-mono text-xs text-[#FF5722] font-bold">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={serverState.status === "loading"}
                      icon={<Send className="w-4 h-4" />}
                      className="w-full sm:w-auto"
                    >
                      {serverState.status === "loading" ? "Transmitting..." : "Send Message"}
                    </Button>
                  </div>
                </form>

              </div>
            </AnimatedReveal>
          </div>

        </div>

      </div>
    </section>
  );
}

