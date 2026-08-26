import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {
  PhoneCall,
  ShieldCheck,
  Globe,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Building2,
  Calendar,
  CreditCard,
  FileText,
  MapPin,
  Clock,
  Menu,
} from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Passport Seva Portal | Ministry of External Affairs, Government of India",
  description:
    "Official Passport Seva Portal mock service for passport applications, biometric slot booking, fee payment, and appointment tracking.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased`}>
        {/* National Tricolor Top Ribbon */}
        <div className="tricolor-bar no-print" />

        {/* 1. Accessibility & Government Hierarchy Topbar */}
        <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800 no-print">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            {/* Government Attribution */}
            <div className="flex items-center gap-3">
              <span className="font-semibold tracking-wide text-amber-400">भारत सरकार</span>
              <span className="text-slate-600">|</span>
              <span className="font-medium text-slate-200">Government of India</span>
              <span className="hidden md:inline text-slate-600">|</span>
              <span className="hidden md:inline text-slate-400">विदेश मंत्रालय (Ministry of External Affairs)</span>
            </div>

            {/* Accessibility & Utilities */}
            <div className="flex items-center gap-4 text-[11px]">
              <div className="hidden sm:flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                <span className="text-slate-400">Text Size:</span>
                <button className="px-1 hover:text-white font-mono">A-</button>
                <button className="px-1 hover:text-white font-mono font-bold">A</button>
                <button className="px-1 hover:text-white font-mono font-extrabold">A+</button>
              </div>

              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-medium text-slate-200">English</span>
                <span className="text-slate-600">/</span>
                <span className="text-slate-400 hover:text-white cursor-pointer">हिन्दी</span>
              </div>

              <div className="hidden lg:flex items-center gap-1 text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Gateway Microservice : Port 3002</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Main Official Header */}
        <header className="bg-white border-b border-slate-200 shadow-xs no-print">
          <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* National Emblem & Portal Title */}
            <Link href="/" className="flex items-center gap-3.5 group text-left">
              {/* Ashoka Emblem SVG Graphic */}
              <div className="w-12 h-14 relative flex-shrink-0 flex items-center justify-center bg-slate-900 rounded-md p-1 shadow-inner border border-amber-500/30">
                <svg
                  viewBox="0 0 100 100"
                  className="w-10 h-10 fill-amber-400"
                  aria-label="Government Emblem"
                >
                  <circle cx="50" cy="40" r="18" fill="none" stroke="currentColor" strokeWidth="4" />
                  <path d="M50 15 L53 30 L47 30 Z M50 65 L53 50 L47 50 Z M25 40 L40 43 L40 37 Z M75 40 L60 43 L60 37 Z" />
                  <circle cx="50" cy="40" r="6" fill="currentColor" />
                  <rect x="25" y="70" width="50" height="12" rx="2" fill="currentColor" />
                  <path d="M30 82 L70 82 L65 92 L35 92 Z" fill="currentColor" />
                  <circle cx="50" cy="76" r="3" fill="#003366" />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#003366] group-hover:text-[#002244] transition-colors">
                    Passport Seva
                  </h1>
                  <span className="bg-[#FF9933]/15 text-[#E67E22] border border-[#FF9933]/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Official PSP
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700">
                  Consular, Passport & Visa Division
                </p>
                <p className="text-[11px] text-slate-500">
                  Ministry of External Affairs, Government of India
                </p>
              </div>
            </Link>

            {/* Quick Contacts & AI Integration Badge */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
              <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg">
                <PhoneCall className="w-4 h-4 text-[#003366]" />
                <div>
                  <div className="text-[10px] text-slate-500 font-medium">National Call Centre</div>
                  <div className="font-bold text-slate-800">1800-258-1800 <span className="text-[10px] font-normal text-emerald-600">(Toll-Free)</span></div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: "6s" }} />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">JanSeva Gateway</div>
                  <div className="font-semibold text-xs text-amber-950">AI Form Handoff Active</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 3. Primary Navigation Bar */}
        <nav className="bg-[#003366] text-white sticky top-0 z-40 shadow-md no-print">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between overflow-x-auto py-0">
              <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium whitespace-nowrap">
                <Link
                  href="/"
                  className="px-3 py-3 hover:bg-[#002244] transition-colors border-b-2 border-transparent hover:border-[#FF9933] flex items-center gap-1.5"
                >
                  <span>Home</span>
                </Link>
                <Link
                  href="/apply"
                  className="px-3 py-3 hover:bg-[#002244] transition-colors border-b-2 border-transparent hover:border-[#FF9933] flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-[#FF9933]" />
                  <span>Apply for Passport</span>
                </Link>
                <Link
                  href="/apply/wizard"
                  className="px-3 py-3 hover:bg-[#002244] transition-colors border-b-2 border-transparent hover:border-[#FF9933] flex items-center gap-1.5"
                >
                  <span>Step-by-Step Wizard</span>
                </Link>
                <Link
                  href="/#availability"
                  className="px-3 py-3 hover:bg-[#002244] transition-colors border-b-2 border-transparent hover:border-[#FF9933] flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4 text-[#FF9933]" />
                  <span>Slot Availability</span>
                </Link>
                <Link
                  href="/#calculator"
                  className="px-3 py-3 hover:bg-[#002244] transition-colors border-b-2 border-transparent hover:border-[#FF9933] flex items-center gap-1.5"
                >
                  <CreditCard className="w-4 h-4 text-[#FF9933]" />
                  <span>Fee Calculator</span>
                </Link>
                <Link
                  href="/#locate"
                  className="px-3 py-3 hover:bg-[#002244] transition-colors border-b-2 border-transparent hover:border-[#FF9933] flex items-center gap-1.5"
                >
                  <MapPin className="w-4 h-4 text-[#FF9933]" />
                  <span>Locate PSK / POPSK</span>
                </Link>
              </div>

              <div className="hidden lg:flex items-center pl-4 py-2">
                <Link
                  href="/checkout?draftId=PSK-ARN-8923411"
                  className="bg-[#FF9933] hover:bg-[#E67E22] text-slate-950 font-bold px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
                >
                  <span>Checkout Demo Draft</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* 4. Public Notification / Advisory Bar */}
        <div className="bg-amber-100 border-b border-amber-200 text-amber-900 text-xs py-1.5 px-4 no-print flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center w-full gap-2">
            <span className="bg-red-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase flex-shrink-0 animate-pulse">
              Advisory
            </span>
            <div className="truncate font-medium text-slate-800">
              Citizens are advised to book appointments and pay fees only through official Passport Seva portal. Never share OTP or biometric details with unauthorized agents.
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8">
          {children}
        </main>

        {/* 5. Authentic Government Footer */}
        <footer className="bg-slate-900 text-slate-400 text-xs mt-auto border-t border-slate-800 no-print">
          {/* Main Footer Links */}
          <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-sm mb-3">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Passport Seva Kendra (PSK)</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                National public service network managed by the Ministry of External Affairs, delivering fast, transparent, and secure citizen passport services.
              </p>
              <div className="text-[11px] text-slate-500">
                Helpline: <span className="text-amber-400 font-semibold">1800-258-1800</span> (08:00 AM - 10:00 PM)
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold text-sm mb-3">Quick Portals</h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/apply" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-slate-600" /> Apply Fresh Passport
                  </Link>
                </li>
                <li>
                  <Link href="/apply" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-slate-600" /> Tatkaal Scheme Booking
                  </Link>
                </li>
                <li>
                  <Link href="/#availability" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-slate-600" /> Appointment Slot Finder
                  </Link>
                </li>
                <li>
                  <Link href="/#calculator" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-slate-600" /> Passport Fee Structure
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-sm mb-3">Government Portals</h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="https://www.mea.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                    <ExternalLink className="w-3 h-3 text-slate-600" /> Ministry of External Affairs (MEA)
                  </a>
                </li>
                <li>
                  <a href="https://www.india.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                    <ExternalLink className="w-3 h-3 text-slate-600" /> National Portal of India
                  </a>
                </li>
                <li>
                  <a href="https://uidai.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                    <ExternalLink className="w-3 h-3 text-slate-600" /> Unique Identification Authority (UIDAI)
                  </a>
                </li>
                <li>
                  <a href="https://indianvisaonline.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                    <ExternalLink className="w-3 h-3 text-slate-600" /> e-Visa / Bureau of Immigration
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-sm mb-3">Service Security</h3>
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/80 mb-3 space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4" /> 256-Bit SSL Encrypted
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Integrated with JanSeva AI Gateway with signature-verified HMAC tokens.
                </p>
              </div>
              <div className="text-[11px] text-slate-500">
                Developed for JanSeva AI Civic Hackathon 2026.
              </div>
            </div>
          </div>

          {/* Bottom Copyright & NIC Attribution Bar */}
          <div className="border-t border-slate-800 bg-slate-950 py-4 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
              <div>
                © 2026 Passport Seva, Ministry of External Affairs, Government of India. All Rights Reserved.
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <span className="hover:underline cursor-pointer">Privacy Policy</span>
                <span>•</span>
                <span className="hover:underline cursor-pointer">Terms & Conditions</span>
                <span>•</span>
                <span className="hover:underline cursor-pointer">Hyperlinking Policy</span>
                <span>•</span>
                <span className="text-slate-300 font-semibold">NIC Hosted</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
