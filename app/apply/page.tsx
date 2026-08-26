"use client";

import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Zap,
  Building2,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Info,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function ApplyCategoryPage() {
  const categories = [
    {
      id: "fresh",
      title: "Fresh / Reissue Ordinary Passport",
      badge: "Standard Scheme",
      badgeColor: "bg-blue-100 text-[#003366] border-blue-200",
      description:
        "Standard application for a new passport or renewal. Processing time is standard.",
      fee: "₹1,500",
      timeline: "7 - 12 Working Days",
      link: "/apply/wizard?type=fresh",
      enabled: true,
      icon: FileText,
    },
    {
      id: "tatkaal",
      title: "Tatkaal Passport",
      badge: "Urgent Expedited",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      description: "Expedited processing for urgent travel needs.",
      fee: "₹3,500",
      timeline: "1 - 3 Working Days",
      link: "/apply/wizard?type=tatkaal",
      enabled: true,
      icon: Zap,
    },
    {
      id: "diplomatic",
      title: "Diplomatic / Official Passport",
      badge: "Government Official",
      badgeColor: "bg-purple-100 text-purple-900 border-purple-200",
      description: "For designated government officials.",
      fee: "Exempted",
      timeline: "Official Protocol",
      link: "/apply/wizard?type=diplomatic",
      enabled: true,
      icon: Building2,
    },
    {
      id: "identity-certificate",
      title: "Identity Certificate",
      badge: "Stateless Persons",
      badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
      description: "For stateless persons residing in India.",
      fee: "₹1,000",
      timeline: "15 - 20 Working Days",
      link: "/apply/wizard?type=identity_certificate",
      enabled: true,
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Top Left Back Button to / */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#003366] hover:text-[#002244] bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="text-[11px] text-slate-500 font-medium">
          Ministry of External Affairs • Form SP-1
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#003366]">
            <FileText className="w-4 h-4 text-[#FF9933]" />
            <span>Passport Application Category Selector</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Select Your Application Category
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Please choose the appropriate passport category below. Each selection applies the official Ministry fee schedule, document criteria, and appointment booking queue.
          </p>
        </div>
      </div>

      {/* List of Passport Categories */}
      <div className="space-y-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.id}
              href={cat.link}
              className="block bg-white rounded-2xl border-2 border-slate-200 hover:border-[#003366] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#003366] flex items-center justify-center font-bold flex-shrink-0 group-hover:bg-[#003366] group-hover:text-white transition-colors shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-base text-slate-900 group-hover:text-[#003366] transition-colors">
                        {cat.title}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${cat.badgeColor}`}
                      >
                        {cat.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Timeline: <strong>{cat.timeline}</strong></span>
                      </span>
                      <span>•</span>
                      <span className="text-[#003366] font-bold">
                        Fee: {cat.fee}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end sm:self-center">
                  <span className="inline-flex items-center gap-1.5 bg-[#003366] group-hover:bg-[#002244] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all group-hover:scale-105">
                    <span>Select & Continue</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Helpful Note / AI Handoff Shortcut */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-100 text-amber-800 flex-shrink-0">
            <Sparkles className="w-4 h-4 text-[#E67E22]" />
          </div>
          <div>
            <div className="font-bold text-amber-950 text-sm">
              JanSeva AI Form Handoff
            </div>
            <p className="text-amber-800 text-xs">
              If your application details were already generated via Site 1 AI assistant, you can directly access your pre-filled draft.
            </p>
          </div>
        </div>

        <Link
          href="/checkout?draftId=PSK-ARN-8923411"
          className="bg-[#FF9933] hover:bg-[#E67E22] text-slate-950 font-bold text-xs px-4 py-2 rounded-lg shadow-xs whitespace-nowrap self-end sm:self-auto transition-all"
        >
          Hydrate Draft
        </Link>
      </div>
    </div>
  );
}
