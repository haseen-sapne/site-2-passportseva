"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Printer,
  Download,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  FileText,
  ShieldCheck,
  QrCode,
  ArrowLeft,
  AlertCircle,
  Home,
  CheckCircle,
} from "lucide-react";
import { ApplicationRecord } from "@/lib/mockStore";

function ConfirmationReceiptContent() {
  const searchParams = useSearchParams();
  const rawDraftId = searchParams.get("draftId") || searchParams.get("arn") || "PSK-ARN-8923411";
  const rawArn = searchParams.get("arn") || rawDraftId;

  const [data, setData] = useState<ApplicationRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/appointments/${encodeURIComponent(rawDraftId)}`);
        const json = await res.json();
        if (json?.draft) {
          setData(json.draft);
        }
      } catch (err) {
        console.warn("Failed to load confirmed slip details:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDetails();
  }, [rawDraftId]);

  const applicant =
    data?.applicant_name ||
    data?.applicantName ||
    (rawDraftId.includes("9988234") ? "Priya Patel" : "Ramesh Sharma");
  const dob =
    data?.dob || (rawDraftId.includes("9988234") ? "1988-10-22" : "1990-05-15");
  const rpo =
    data?.rpo_location ||
    data?.rpoLocation ||
    (rawDraftId.includes("9988234")
      ? "Mumbai PSK - Bandra Kurla Complex"
      : "Delhi PSK - Herald House, ITO");
  const serviceType =
    data?.service_type ||
    data?.serviceType ||
    "Normal Scheme (36 Pages) - ₹1,500";
  const appointmentDate =
    data?.appointment_date || data?.appointmentDate || "2026-03-05";
  const appointmentTime = data?.appointmentTime || "09:45 AM - 10:15 AM";
  const feeAmount = data?.fee_amount || data?.feeAmount || "₹1,500";
  const transactionId =
    data?.transactionId || `PSP-TXN-${Date.now().toString().slice(-6)}-9821`;
  const paymentMode = data?.paymentMode || "UPI (BHIM / Bharat Gateway)";
  const batchNumber = data?.batchNumber || "BATCH-A12";
  const reportingTime = data?.reportingTime || "09:30 AM";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* 1. Official Top Action Bar (Hidden on Print) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs no-print">
        {/* "Return to Dashboard" button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-lg shadow-xs transition-all hover:scale-105"
        >
          <Home className="w-4 h-4 text-[#003366]" />
          <span>Return to Dashboard</span>
        </Link>

        {/* "Print / Download PDF Receipt" button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="bg-[#003366] hover:bg-[#002244] text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-md flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#FF9933]" />
            <span>Print / Download PDF Receipt</span>
          </button>
        </div>
      </div>

      {/* 2. Official Green Checkmark Success Badge */}
      <div className="bg-emerald-50 border-2 border-emerald-500/40 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-emerald-950 no-print shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md ring-4 ring-emerald-100">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <div className="font-extrabold text-base text-emerald-900 flex items-center gap-2">
              <span>Appointment Confirmed & Slot Booked Successfully</span>
              <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Active
              </span>
            </div>
            <div className="text-emerald-800 text-xs mt-0.5">
              Your Application Reference Number (ARN) has been generated and pre-allocated in the Passport Seva Kendra registry.
            </div>
          </div>
        </div>

        <div className="text-right self-end sm:self-auto font-mono text-xs bg-emerald-100/80 px-3 py-1.5 rounded-lg border border-emerald-300">
          <span className="text-emerald-800 font-medium">Status: </span>
          <span className="font-black text-emerald-950">CONFIRMED / PAID</span>
        </div>
      </div>

      {/* 3. Official Appointment Confirmation & ARN Slip (Printable Format) */}
      <div className="printable-slip bg-white rounded-2xl border-2 border-slate-300 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Ministry Letterhead Header */}
        <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
          <div className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#003366]">
            <span>भारत सरकार • GOVERNMENT OF INDIA</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            MINISTRY OF EXTERNAL AFFAIRS
          </h1>
          <p className="text-xs font-semibold text-slate-700">
            Consular, Passport & Visa (CPV) Division • Passport Seva Kendra (PSK)
          </p>
          <div className="inline-block bg-[#003366] text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider mt-1.5 shadow-xs">
            Official Appointment Confirmation & ARN Slip
          </div>
        </div>

        {/* Barcode, QR Code & ARN Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 items-center">
          <div className="md:col-span-8 space-y-1">
            <span className="text-[11px] text-slate-500 uppercase font-semibold">
              Application Reference Number (ARN)
            </span>
            <div className="text-2xl font-mono font-black text-[#003366] tracking-wider">
              {rawArn}
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-600 pt-1">
              <span>Batch Number: <strong className="text-slate-900">{batchNumber}</strong></span>
              <span>•</span>
              <span>Reporting Counter: <strong className="text-slate-900">Gate 2 (Biometric Wing)</strong></span>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-center justify-center p-2 bg-white rounded-lg border border-slate-200">
            <QrCode className="w-20 h-20 text-slate-900" />
            <span className="text-[9px] font-mono font-bold text-slate-500 mt-1">SCAN AT PSK ENTRY GATE</span>
          </div>
        </div>

        {/* 4. Official Summary Table (ARN, PSK Venue Address, Reporting Time 09:30 AM) */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#003366]">
            Appointment Particulars Table
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-slate-50/80">
                  <td className="py-3 px-4 font-semibold text-slate-600 w-1/3">Application Reference Number (ARN):</td>
                  <td className="py-3 px-4 font-mono font-black text-sm text-[#003366]">{rawArn}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-600">Applicant Full Name:</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{applicant}</td>
                </tr>
                <tr className="bg-slate-50/80">
                  <td className="py-3 px-4 font-semibold text-slate-600">Date of Birth (DOB):</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{dob}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-600">Service Category:</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{serviceType}</td>
                </tr>
                <tr className="bg-slate-50/80">
                  <td className="py-3 px-4 font-semibold text-slate-600">PSK Venue Address:</td>
                  <td className="py-3 px-4 font-bold text-[#003366] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span>{rpo}</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-600">Appointment Date:</td>
                  <td className="py-3 px-4 font-black text-emerald-800 text-sm">{appointmentDate}</td>
                </tr>
                <tr className="bg-emerald-50/80">
                  <td className="py-3 px-4 font-bold text-emerald-900">Reporting Time (Sharp):</td>
                  <td className="py-3 px-4 font-black text-emerald-900 text-sm flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-700" />
                    <span>09:30 AM (Slot: {appointmentTime})</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Confirmation Stamp */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/80 space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-slate-800 border-b border-slate-200 pb-2">
            <span>Payment Receipt Particulars</span>
            <span className="text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded text-[10px] uppercase font-black">
              PAID - ₹1,500
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
            <div>
              <span className="text-slate-500 text-[11px] block">Amount Paid:</span>
              <span className="font-bold text-slate-900 text-sm">{feeAmount}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[11px] block">Payment Mode:</span>
              <span className="font-semibold text-slate-800">{paymentMode}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[11px] block">Transaction Reference:</span>
              <span className="font-mono text-slate-800 text-[11px] font-semibold">{transactionId}</span>
            </div>
          </div>
        </div>

        {/* 5. Required Documents Checklist (Birth Certificate, Address Proof, Original ID) */}
        <div className="border-2 border-amber-300 bg-amber-50/70 rounded-xl p-5 space-y-3 text-xs text-amber-950">
          <div className="font-bold text-amber-900 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0" />
            <span>Required Documents Checklist to Carry on Appointment Day:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-white p-3 rounded-lg border border-amber-200 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>1. Original ID Proof</span>
              </div>
              <p className="text-[11px] text-slate-600">Aadhaar Card, Voter ID, or PAN Card in original.</p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-amber-200 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>2. Birth Certificate</span>
              </div>
              <p className="text-[11px] text-slate-600">Birth Certificate or Class 10th School Leaving Certificate.</p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-amber-200 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>3. Address Proof</span>
              </div>
              <p className="text-[11px] text-slate-600">Utility Bill, Rent Agreement, or Bank Passbook.</p>
            </div>
          </div>

          <div className="text-[11px] text-amber-900 pt-1">
            * Please also carry 2 passport-size color photographs (white background) and 1 set of self-attested photocopies.
          </div>
        </div>

        {/* Footer Seal & Timestamp */}
        <div className="pt-4 border-t-2 border-dashed border-slate-300 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            <div>System Generated Electronic Slip • NIC Verified</div>
            <div className="text-[10px] text-slate-400" suppressHydrationWarning>
              Status: Active Registry Record • Government of India
            </div>
          </div>

          <div className="text-right">
            <div className="font-bold text-slate-800">Passport Seva Project (PSP) Division</div>
            <div className="text-[10px] text-slate-500">Ministry of External Affairs, Government of India</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmedAppointmentPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs text-slate-500">
          <div className="w-6 h-6 border-2 border-[#003366] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          Generating Official Appointment Slip...
        </div>
      }
    >
      <ConfirmationReceiptContent />
    </Suspense>
  );
}
