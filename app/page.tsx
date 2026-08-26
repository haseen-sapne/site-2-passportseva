"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Calendar,
  MessageSquareText,
  Bell,
  Shield,
  FileText,
  CreditCard,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  Users,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Zap,
  Home as HomeIcon,
  User,
  Megaphone,
} from "lucide-react";

interface SlotData {
  rpo: string;
  pskName: string;
  scheme: "Normal" | "Tatkaal";
  earliestDate: string;
  slotsAvailable: number;
  location: string;
}

const MOCK_SLOTS: SlotData[] = [
  {
    rpo: "Delhi",
    pskName: "Delhi PSK - Herald House, ITO",
    scheme: "Normal",
    earliestDate: "05 Mar 2026",
    slotsAvailable: 42,
    location: "Bahadur Shah Zafar Marg, ITO, New Delhi",
  },
  {
    rpo: "Delhi",
    pskName: "Delhi PSK - Herald House, ITO",
    scheme: "Tatkaal",
    earliestDate: "28 Feb 2026",
    slotsAvailable: 14,
    location: "Bahadur Shah Zafar Marg, ITO, New Delhi",
  },
  {
    rpo: "Mumbai",
    pskName: "Mumbai PSK - Bandra Kurla Complex",
    scheme: "Normal",
    earliestDate: "08 Mar 2026",
    slotsAvailable: 56,
    location: "BKC Complex, Bandra East, Mumbai",
  },
  {
    rpo: "Mumbai",
    pskName: "Mumbai PSK - Andheri",
    scheme: "Tatkaal",
    earliestDate: "01 Mar 2026",
    slotsAvailable: 19,
    location: "MIDC, Andheri East, Mumbai",
  },
  {
    rpo: "Bengaluru",
    pskName: "Bengaluru PSK - Lalbagh Road",
    scheme: "Normal",
    earliestDate: "06 Mar 2026",
    slotsAvailable: 38,
    location: "Lalbagh Main Road, Bengaluru",
  },
  {
    rpo: "Bengaluru",
    pskName: "Bengaluru PSK - Lalbagh Road",
    scheme: "Tatkaal",
    earliestDate: "02 Mar 2026",
    slotsAvailable: 11,
    location: "Lalbagh Main Road, Bengaluru",
  },
  {
    rpo: "Hyderabad",
    pskName: "Hyderabad PSK - Begumpet",
    scheme: "Normal",
    earliestDate: "07 Mar 2026",
    slotsAvailable: 63,
    location: "Rasoolpura, Begumpet, Hyderabad",
  },
  {
    rpo: "Chennai",
    pskName: "Chennai PSK - Saligramam",
    scheme: "Normal",
    earliestDate: "09 Mar 2026",
    slotsAvailable: 29,
    location: "Arcot Road, Saligramam, Chennai",
  },
  {
    rpo: "Kolkata",
    pskName: "Kolkata PSK - EM Bypass",
    scheme: "Normal",
    earliestDate: "10 Mar 2026",
    slotsAvailable: 34,
    location: "Kasba Industrial Estate, Kolkata",
  },
  {
    rpo: "Pune",
    pskName: "Pune PSK - Mundhwa",
    scheme: "Normal",
    earliestDate: "04 Mar 2026",
    slotsAvailable: 47,
    location: "Mundhwa Industrial Area, Pune",
  },
];

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const [selectedScheme, setSelectedScheme] = useState<"All" | "Normal" | "Tatkaal">("All");

  // Track status state
  const [trackArn, setTrackArn] = useState("PSK-ARN-8923411");
  const [statusResult, setStatusResult] = useState<any>(null);
  const [isTracking, setIsTracking] = useState(false);

  // Fee calculator state
  const [calcService, setCalcService] = useState("fresh-adult-36");
  const [calcTatkaal, setCalcTatkaal] = useState(false);

  // Feedback banner state
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const filteredSlots = MOCK_SLOTS.filter((slot) => {
    const cityMatch = slot.rpo.toLowerCase() === selectedCity.toLowerCase();
    const schemeMatch = selectedScheme === "All" || slot.scheme === selectedScheme;
    return cityMatch && schemeMatch;
  });

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
    setTimeout(() => {
      setIsTracking(false);
      setStatusResult({
        arn: trackArn,
        applicant: trackArn.includes("9988234") ? "Priya Patel" : "Ramesh Sharma",
        status: "Draft Ready for Biometric Booking & Payment",
        rpo: trackArn.includes("9988234") ? "Mumbai PSK - BKC" : "Delhi PSK - Herald House, ITO",
        appointmentDate: "05 Mar 2026",
        stage: "Stage 2 of 4: Payment Pending",
      });
    }, 400);
  };

  const calculateFee = () => {
    let base = 1500;
    if (calcService === "fresh-adult-60") base = 2000;
    if (calcService === "minor-36") base = 1000;
    if (calcService === "pcc") base = 500;
    if (calcService === "duplicate-lost") base = 3000;

    const tatkaalFee = calcTatkaal && calcService !== "pcc" ? 2000 : 0;
    return {
      base,
      tatkaalFee,
      total: base + tatkaalFee,
    };
  };

  const feeSummary = calculateFee();

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Top Header Bar: Government Emblem / Shield, "Passport Seva", Notification icon */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 px-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#003366] text-[#FF9933] flex items-center justify-center shadow-inner">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-lg sm:text-xl text-[#003366] tracking-tight">
                Passport Seva
              </h2>
              <span className="bg-blue-100 text-[#003366] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Citizen Portal
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Ministry of External Affairs, Government of India
            </p>
          </div>
        </div>

        {/* Notification Icon */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="relative p-2 rounded-full text-slate-600 hover:text-[#003366] hover:bg-slate-100 transition-colors cursor-pointer"
            title="Notifications & Advisories"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF9933] ring-2 ring-white animate-pulse"></span>
          </button>

          <Link
            href="/apply"
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-all shadow-xs hover:scale-105"
          >
            <span>New Application</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Important Update Banner regarding Tatkaal processing times */}
      <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border-l-4 border-[#FF9933] bg-white rounded-xl p-4 shadow-xs flex items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start sm:items-center gap-3 text-slate-800">
          <div className="p-2 rounded-lg bg-amber-100 text-amber-900 flex-shrink-0">
            <Megaphone className="w-4 h-4 text-[#E67E22]" />
          </div>
          <div>
            <strong className="text-slate-900 font-bold block sm:inline mr-1">
              Important Update on Tatkaal Scheme:
            </strong>
            <span className="text-slate-700">
              Tatkaal passport processing times have been expedited to <strong>1 to 3 working days</strong> across all 530+ Passport Seva Kendras (PSK & POPSK). Mandatory 3 original identity documents required during biometric capture.
            </span>
          </div>
        </div>

        <Link
          href="/apply"
          className="text-xs font-bold text-[#003366] hover:underline whitespace-nowrap hidden md:inline-flex items-center gap-1"
        >
          <span>View Guidelines</span>
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* 3. Hero Card: "Welcome to Passport Seva — Streamlined passport services for Indian citizens." */}
      <section className="relative overflow-hidden rounded-2xl bg-[#002244] text-white shadow-xl border border-blue-900/40">
        {/* Background Graphic */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: "url('/passport_hero_banner.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001830] via-[#002855]/90 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9933]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#FF9933]/20 border border-[#FF9933]/40 text-[#FF9933] text-xs font-bold px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Government Portal • PSP Division</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
              Welcome to Passport Seva — <br />
              <span className="text-[#FF9933]">Streamlined passport services for Indian citizens.</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              Apply for fresh or renewal passports, schedule biometric appointments at your preferred PSK/POPSK office, and track real-time application processing.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/apply"
                className="bg-[#FF9933] hover:bg-[#E67E22] text-slate-950 font-black text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <span>Apply for Passport</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#track"
                className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl backdrop-blur-sm border border-white/20 flex items-center gap-2 transition-all"
              >
                <Search className="w-4 h-4 text-amber-300" />
                <span>Track Application Status</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:flex flex-col justify-center items-end">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-xs space-y-3 max-w-xs text-left">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#FF9933] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Security Assurance</span>
              </div>
              <p className="text-slate-200 text-xs leading-snug">
                All citizen appointment bookings and payments are encrypted with 256-Bit SSL protection.
              </p>
              <div className="text-[11px] text-slate-300 pt-1 border-t border-white/10">
                Helpline: <strong className="text-white">1800-258-1800</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quick Grid:
          - Track Application Status (Card with compass icon)
          - Check Appointments (Card with calendar icon)
          - Register Feedback (Banner with chat bubble icon)
      */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Track Application Status (Compass Icon) */}
        <a
          href="#track"
          className="bg-white p-6 rounded-2xl border-2 border-slate-200 hover:border-[#003366] hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#003366] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#003366] transition-colors">
              Track Application Status
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Lookup file progression, police verification clearance, and speed post dispatch status using your ARN.
            </p>
          </div>
          <div className="mt-5 flex items-center text-xs font-bold text-[#003366]">
            <span>Check Status Now</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>

        {/* Card 2: Check Appointments (Calendar Icon) */}
        <a
          href="#availability"
          className="bg-white p-6 rounded-2xl border-2 border-slate-200 hover:border-[#FF9933] hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#E67E22] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#E67E22] transition-colors">
              Check Appointments
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Explore real-time slot availability across 530+ Passport Seva Kendras with Normal & Tatkaal quotas.
            </p>
          </div>
          <div className="mt-5 flex items-center text-xs font-bold text-[#E67E22]">
            <span>Explore Slots</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>

        {/* Card 3: Register Feedback (Chat Bubble Icon) */}
        <div
          onClick={() => {
            const feedbackElem = document.getElementById("feedback-section");
            feedbackElem?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-white p-6 rounded-2xl border-2 border-slate-200 hover:border-emerald-600 hover:shadow-md transition-all group flex flex-col justify-between cursor-pointer"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <MessageSquareText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              Register Feedback
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Submit public grievances, share your counter service experience, or request assistance from MEA officials.
            </p>
          </div>
          <div className="mt-5 flex items-center text-xs font-bold text-emerald-700">
            <span>Share Feedback</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </section>

      {/* 5. Appointment Slot Availability Finder */}
      <section id="availability" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#003366]">
              <Calendar className="w-4 h-4 text-[#FF9933]" />
              <span>Real-Time Biometric Slot Matrix</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Check Appointment Availability
            </h2>
            <p className="text-xs text-slate-500">
              Live quota updates from Regional Passport Offices (RPO) and Passport Seva Kendras.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="city-select" className="text-xs font-semibold text-slate-600">
                City / RPO:
              </label>
              <select
                id="city-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#003366]"
              >
                <option value="Delhi">Delhi RPO</option>
                <option value="Mumbai">Mumbai RPO</option>
                <option value="Bengaluru">Bengaluru RPO</option>
                <option value="Hyderabad">Hyderabad RPO</option>
                <option value="Chennai">Chennai RPO</option>
                <option value="Kolkata">Kolkata RPO</option>
                <option value="Pune">Pune RPO</option>
              </select>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setSelectedScheme("All")}
                className={`px-2.5 py-1 rounded font-semibold transition-all ${
                  selectedScheme === "All" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All Schemes
              </button>
              <button
                type="button"
                onClick={() => setSelectedScheme("Normal")}
                className={`px-2.5 py-1 rounded font-semibold transition-all ${
                  selectedScheme === "Normal" ? "bg-white text-[#003366] shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Normal
              </button>
              <button
                type="button"
                onClick={() => setSelectedScheme("Tatkaal")}
                className={`px-2.5 py-1 rounded font-semibold transition-all ${
                  selectedScheme === "Tatkaal" ? "bg-white text-amber-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Tatkaal
              </button>
            </div>
          </div>
        </div>

        {/* Slot Results Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase text-[11px] tracking-wider">
                <th className="py-3 px-4">Passport Seva Kendra</th>
                <th className="py-3 px-4">Scheme</th>
                <th className="py-3 px-4">Next Available Slot</th>
                <th className="py-3 px-4">Daily Quota Left</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSlots.length > 0 ? (
                filteredSlots.map((slot, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{slot.pskName}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{slot.location}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          slot.scheme === "Tatkaal"
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : "bg-blue-100 text-blue-800 border border-blue-200"
                        }`}
                      >
                        {slot.scheme} Scheme
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-emerald-700 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slot.earliestDate}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Reporting Time: 09:30 AM</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-slate-800">{slot.slotsAvailable} Slots</div>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/apply/wizard?rpo=${encodeURIComponent(slot.pskName)}&scheme=${slot.scheme}&date=${encodeURIComponent(slot.earliestDate)}`}
                        className="inline-flex items-center gap-1 bg-[#003366] hover:bg-[#002244] text-white font-bold text-xs px-3 py-1.5 rounded shadow-xs transition-all hover:scale-105"
                      >
                        <span>Book Slot</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 text-xs">
                    No active slots found for the selected city and scheme filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Interactive Fee Calculator & Application Status Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Fee Calculator Widget */}
        <div id="calculator" className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#003366]">
            <CreditCard className="w-4 h-4 text-[#FF9933]" />
            <span>Official Government Tariff</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Passport Fee Calculator
          </h3>

          <div className="space-y-4 pt-2">
            <div>
              <label htmlFor="service-type-calc" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Select Service Category:
              </label>
              <select
                id="service-type-calc"
                value={calcService}
                onChange={(e) => setCalcService(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#003366]"
              >
                <option value="fresh-adult-36">Fresh / Re-issue Passport (Adult, 36 Pages, 10-Yr Validity)</option>
                <option value="fresh-adult-60">Fresh / Re-issue Passport (Adult, 60 Pages Jumbo Booklet)</option>
                <option value="minor-36">Fresh Passport for Minor (Below 18 Years, 36 Pages)</option>
                <option value="pcc">Police Clearance Certificate (PCC)</option>
                <option value="duplicate-lost">Replacement of Lost / Damaged Passport</option>
              </select>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <input
                type="checkbox"
                id="tatkaal-toggle"
                checked={calcTatkaal}
                onChange={(e) => setCalcTatkaal(e.target.checked)}
                className="w-4 h-4 text-[#003366] rounded border-slate-300 focus:ring-[#003366]"
              />
              <label htmlFor="tatkaal-toggle" className="text-xs text-slate-700 cursor-pointer">
                <span className="font-bold text-slate-900">Include Tatkaal Expedited Surcharge (+₹2,000)</span>
                <span className="block text-[11px] text-slate-500">Enables urgent processing within 1-3 working days.</span>
              </label>
            </div>

            {/* Calculated Fee Breakdown */}
            <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-xl space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Standard Application Fee:</span>
                <span className="font-semibold text-slate-900">₹{feeSummary.base.toLocaleString("en-IN")}</span>
              </div>
              {calcTatkaal && (
                <div className="flex justify-between text-xs text-amber-800">
                  <span>Tatkaal Out-of-Turn Surcharge:</span>
                  <span className="font-semibold">₹{feeSummary.tatkaalFee.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between text-xs text-slate-600">
                <span>SMS Updates & Courier Dispatch:</span>
                <span className="font-semibold text-emerald-700">Included (Free)</span>
              </div>
              <div className="border-t border-blue-200/80 pt-2 flex justify-between items-center">
                <span className="font-bold text-sm text-[#003366]">Total Payable Amount:</span>
                <span className="text-lg font-black text-[#003366]">₹{feeSummary.total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick ARN Status Tracker */}
        <div id="track" className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#003366]">
              <Compass className="w-4 h-4 text-[#FF9933]" />
              <span>Direct Verification</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Track Application (ARN)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your Application Reference Number or JanSeva Draft ID to check live verification status.
            </p>

            <form onSubmit={handleTrackSubmit} className="mt-4 space-y-3">
              <div>
                <label htmlFor="track-arn-input" className="block text-xs font-semibold text-slate-700 mb-1">
                  ARN / File Number:
                </label>
                <input
                  id="track-arn-input"
                  type="text"
                  value={trackArn}
                  onChange={(e) => setTrackArn(e.target.value)}
                  placeholder="e.g. PSK-ARN-8923411"
                  required
                  className="w-full text-xs font-mono font-medium bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#003366]"
                />
              </div>

              <button
                type="submit"
                disabled={isTracking}
                className="w-full bg-[#003366] hover:bg-[#002244] text-white font-bold text-xs py-2.5 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isTracking ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Querying Ministry Database...
                  </span>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    <span>Track Status Now</span>
                  </>
                )}
              </button>
            </form>

            {/* Status Result Display */}
            {statusResult && (
              <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{statusResult.arn}</span>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    Active Draft
                  </span>
                </div>
                <div className="text-xs text-slate-600">
                  Applicant: <strong className="text-slate-900">{statusResult.applicant}</strong>
                </div>
                <div className="text-xs text-slate-600">
                  Jurisdiction: <span className="font-medium text-slate-800">{statusResult.rpo}</span>
                </div>
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] text-amber-700 font-semibold">{statusResult.stage}</span>
                  <Link
                    href={`/checkout?draftId=${encodeURIComponent(statusResult.arn)}`}
                    className="text-xs text-[#003366] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            For assistance with lost ARN slips, contact the National Helpdesk at <strong>1800-258-1800</strong>.
          </div>
        </div>
      </section>

      {/* 7. Register Feedback Banner Section */}
      <section id="feedback-section" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <MessageSquareText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Citizen Feedback & Grievance Registration</h3>
            <p className="text-xs text-slate-500">Your feedback helps us refine counter wait times and delivery efficiency.</p>
          </div>
        </div>

        {feedbackSubmitted ? (
          <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>Thank you for your feedback. Your grievance reference ticket has been logged with the CPV Division.</span>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (feedbackText.trim()) {
                setFeedbackSubmitted(true);
              }
            }}
            className="space-y-3"
          >
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Enter your experience or suggestion regarding PSK appointment booking..."
              rows={3}
              required
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-[#003366]"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
              >
                Submit Citizen Feedback
              </button>
            </div>
          </form>
        )}
      </section>

      {/* 8. Bottom Navigation Bar (Home, Services, Track, Profile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl py-2 px-4 no-print">
        <div className="max-w-md mx-auto grid grid-cols-4 gap-1 text-center">
          {/* Home */}
          <Link
            href="/"
            className="flex flex-col items-center justify-center py-1 text-[#003366] font-bold text-[11px] group"
          >
            <HomeIcon className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" />
            <span>Home</span>
          </Link>

          {/* Services */}
          <Link
            href="/apply"
            className="flex flex-col items-center justify-center py-1 text-slate-600 hover:text-[#003366] font-medium text-[11px] group transition-colors"
          >
            <FileText className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" />
            <span>Services</span>
          </Link>

          {/* Track */}
          <a
            href="#track"
            className="flex flex-col items-center justify-center py-1 text-slate-600 hover:text-[#003366] font-medium text-[11px] group transition-colors"
          >
            <Compass className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" />
            <span>Track</span>
          </a>

          {/* Profile / Handoff */}
          <Link
            href="/checkout?draftId=PSK-ARN-8923411"
            className="flex flex-col items-center justify-center py-1 text-slate-600 hover:text-[#003366] font-medium text-[11px] group transition-colors"
          >
            <User className="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" />
            <span>Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
