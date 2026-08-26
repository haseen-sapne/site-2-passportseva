"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  QrCode,
  Smartphone,
  Building,
  AlertCircle,
  Lock,
  ChevronRight,
  Info,
} from "lucide-react";
import { ApplicationRecord } from "@/lib/mockStore";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawDraftId = searchParams.get("draftId") || "PSK-ARN-8923411";
  const [draftData, setDraftData] = useState<ApplicationRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<"UPI" | "NETBANKING" | "CARD">("UPI");
  const [upiId, setUpiId] = useState("applicant@upi");
  const [selectedBank, setSelectedBank] = useState("State Bank of India (SBI)");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    async function fetchDraft() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/appointments/${encodeURIComponent(rawDraftId)}`);
        const data = await res.json();
        if (data?.draft) {
          setDraftData(data.draft);
        }
      } catch (err) {
        console.warn("Failed to fetch draft from API, using fallback:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDraft();
  }, [rawDraftId]);

  // Fallback defaults if loading or API delay
  const applicantName =
    draftData?.applicant_name ||
    draftData?.applicantName ||
    (rawDraftId.includes("9988234") ? "Priya Patel" : "Ramesh Sharma");
  const dob =
    draftData?.dob || (rawDraftId.includes("9988234") ? "1988-10-22" : "1990-05-15");
  const rpoLocation =
    draftData?.rpo_location ||
    draftData?.rpoLocation ||
    (rawDraftId.includes("9988234")
      ? "Mumbai PSK - Bandra Kurla Complex"
      : "Delhi PSK - Herald House, ITO");
  const serviceType =
    draftData?.service_type ||
    draftData?.serviceType ||
    "Normal Scheme (36 Pages) - ₹1,500";
  const appointmentDate = draftData?.appointment_date || draftData?.appointmentDate || "2026-03-05";
  const feeAmount =
    draftData?.fee_amount ||
    draftData?.feeAmount ||
    (serviceType.includes("3,500") || serviceType.includes("Tatkaal")
      ? "₹3,500"
      : "₹1,500");
  const idProof = draftData?.id_proof || draftData?.idProof || "[Aadhaar Redacted]";

  const handlePayAndConfirm = async () => {
    setIsProcessingPayment(true);

    const paymentLabel =
      selectedPaymentMode === "UPI"
        ? `UPI / QR Code (${upiId})`
        : selectedPaymentMode === "NETBANKING"
        ? `Net Banking (${selectedBank})`
        : `Debit/Credit Card (RuPay/Visa ending in 8841)`;

    try {
      // 1. Confirm appointment with backend API (updates status: "CONFIRMED", payment_status: "PAID")
      const res = await fetch(`/api/appointments/${encodeURIComponent(rawDraftId)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMode: paymentLabel,
          appointmentTime: "09:45 AM - 10:15 AM",
        }),
      });

      const data = await res.json();
      const confirmedArn = data?.draft?.applicationRef || rawDraftId;

      // 2. Redirect to official confirmation receipt page
      router.push(`/appointment/confirmed?arn=${encodeURIComponent(confirmedArn)}&draftId=${encodeURIComponent(rawDraftId)}`);
    } catch (err) {
      console.error("Payment confirmation failed:", err);
      router.push(`/appointment/confirmed?arn=${encodeURIComponent(rawDraftId)}&draftId=${encodeURIComponent(rawDraftId)}`);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* 1. Verified Handoff Security Ribbon */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-[#002244] text-white p-4 sm:p-5 rounded-2xl border border-emerald-500/40 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm sm:text-base text-white">JanSeva AI Gateway Handoff Verified</h2>
              <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Session Active
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Pre-filled draft loaded securely via server-to-server gateway integration.
            </p>
          </div>
        </div>

        <div className="text-right self-end sm:self-auto text-xs font-mono bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
          <span className="text-slate-400">Draft ARN: </span>
          <span className="text-amber-400 font-bold">{rawDraftId}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Pre-filled Application Summary Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#003366] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Pre-filled Application Summary</h3>
                  <p className="text-[11px] text-slate-500">Ministry of External Affairs Official Draft</p>
                </div>
              </div>
              <span className="bg-blue-100 text-[#003366] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                Verified Draft
              </span>
            </div>

            {/* Summary Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-500 text-[11px] block font-medium">Applicant Name</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">{applicantName}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-500 text-[11px] block font-medium">Date of Birth (DOB)</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">{dob}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 sm:col-span-2">
                <span className="text-slate-500 text-[11px] block font-medium">Selected RPO Center</span>
                <div className="flex items-center gap-1.5 font-bold text-[#003366] text-xs sm:text-sm mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{rpoLocation}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-500 text-[11px] block font-medium">Appointment Slot Date</span>
                <div className="flex items-center gap-1.5 font-bold text-emerald-800 text-sm mt-0.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{appointmentDate}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-500 text-[11px] block font-medium">Scheme Type</span>
                <span className="font-semibold text-slate-800 block mt-0.5">{serviceType}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 sm:col-span-2">
                <span className="text-slate-500 text-[11px] block font-medium">Redacted Identity Document</span>
                <span className="font-mono font-bold text-amber-800 text-xs block mt-0.5">{idProof}</span>
              </div>
            </div>
          </div>

          {/* PSK Biometric Reporting Instructions */}
          <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-xl text-xs text-[#003366] space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Reporting Window:
            </div>
            <p className="text-slate-700 leading-relaxed">
              Batch A Reporting Time: <strong>09:30 AM (Slot: 09:45 AM – 10:15 AM)</strong>. Please arrive 15 minutes prior to your reporting time with original documents.
            </p>
          </div>
        </div>

        {/* Right Column: Fee Breakdown & Simulated Payment Gateway */}
        <div className="lg:col-span-5 space-y-6">
          {/* Fee Breakdown Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#003366]">
              <CreditCard className="w-4 h-4 text-[#FF9933]" />
              <span>Official Fee Assessment</span>
            </div>
            <h3 className="font-bold text-slate-900 text-base">Fee Breakdown Table</h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-600 pb-1 border-b border-slate-100">
                <span>Application Processing Fee:</span>
                <span className="font-semibold text-slate-900">{feeAmount}</span>
              </div>
              <div className="flex justify-between text-slate-600 pb-1 border-b border-slate-100">
                <span>Convenience Fee:</span>
                <span className="font-semibold text-emerald-700">₹0</span>
              </div>
              <div className="flex justify-between text-slate-600 pb-1 border-b border-slate-100">
                <span>Biometric & SMS Service Charges:</span>
                <span className="font-semibold text-emerald-700">₹0 (Included)</span>
              </div>

              <div className="pt-2 flex justify-between items-center bg-blue-50/70 p-3 rounded-xl border border-blue-200">
                <span className="font-bold text-sm text-[#003366]">Total Payable:</span>
                <span className="text-2xl font-black text-[#003366]">{feeAmount}</span>
              </div>
            </div>
          </div>

          {/* Simulated Payment Gateway */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Simulated Payment Gateway</h3>

            {/* Radio Buttons for Payment Method */}
            <div className="space-y-2.5">
              {/* Option 1: UPI / QR Code */}
              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPaymentMode === "UPI"
                    ? "border-[#003366] bg-blue-50/40 shadow-xs ring-2 ring-[#003366]/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="UPI"
                    checked={selectedPaymentMode === "UPI"}
                    onChange={() => setSelectedPaymentMode("UPI")}
                    className="w-4 h-4 text-[#003366] border-slate-300 focus:ring-[#003366]"
                  />
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#003366]" />
                    <span className="text-xs font-bold text-slate-800">UPI / QR Code</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Instant
                </span>
              </label>

              {/* Option 2: Net Banking */}
              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPaymentMode === "NETBANKING"
                    ? "border-[#003366] bg-blue-50/40 shadow-xs ring-2 ring-[#003366]/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="NETBANKING"
                    checked={selectedPaymentMode === "NETBANKING"}
                    onChange={() => setSelectedPaymentMode("NETBANKING")}
                    className="w-4 h-4 text-[#003366] border-slate-300 focus:ring-[#003366]"
                  />
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#003366]" />
                    <span className="text-xs font-bold text-slate-800">Net Banking</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-slate-500">All Major Banks</span>
              </label>

              {/* Option 3: Debit/Credit Card */}
              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPaymentMode === "CARD"
                    ? "border-[#003366] bg-blue-50/40 shadow-xs ring-2 ring-[#003366]/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="CARD"
                    checked={selectedPaymentMode === "CARD"}
                    onChange={() => setSelectedPaymentMode("CARD")}
                    className="w-4 h-4 text-[#003366] border-slate-300 focus:ring-[#003366]"
                  />
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#003366]" />
                    <span className="text-xs font-bold text-slate-800">Debit / Credit Card</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-slate-500">RuPay / Visa</span>
              </label>
            </div>

            {/* UPI Details Box */}
            {selectedPaymentMode === "UPI" && (
              <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                <label className="block font-semibold text-slate-700">UPI Virtual Payment Address (VPA):</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-mono text-slate-900 focus:ring-2 focus:ring-[#003366]"
                  placeholder="username@bank"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Supported: BHIM, GPay, PhonePe, Paytm</span>
                  <button
                    type="button"
                    onClick={() => setShowQrModal(!showQrModal)}
                    className="text-[#003366] font-bold underline hover:text-[#002244] cursor-pointer"
                  >
                    {showQrModal ? "Hide QR" : "Show QR Code"}
                  </button>
                </div>

                {showQrModal && (
                  <div className="p-3 bg-white border border-slate-200 rounded-lg text-center space-y-1 mt-2">
                    <QrCode className="w-24 h-24 mx-auto text-slate-900" />
                    <span className="text-[10px] text-slate-500 block">Scan to simulate immediate payment</span>
                  </div>
                )}
              </div>
            )}

            {/* Net Banking Details Box */}
            {selectedPaymentMode === "NETBANKING" && (
              <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                <label className="block font-semibold text-slate-700">Select Bank:</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#003366]"
                >
                  <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="Punjab National Bank (PNB)">Punjab National Bank (PNB)</option>
                  <option value="Bank of Baroda">Bank of Baroda</option>
                  <option value="Axis Bank">Axis Bank</option>
                </select>
              </div>
            )}

            {/* Card Details Box */}
            {selectedPaymentMode === "CARD" && (
              <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                <label className="block font-semibold text-slate-700">Card Number:</label>
                <input
                  type="text"
                  defaultValue="4532 •••• •••• 8841"
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-mono text-slate-900"
                />
              </div>
            )}

            {/* Action Button: "Pay {fee_amount} & Confirm Biometric Appointment" */}
            <button
              type="button"
              onClick={handlePayAndConfirm}
              disabled={isProcessingPayment}
              className="w-full bg-[#138808] hover:bg-[#0E6606] text-white font-black text-xs sm:text-sm py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50"
            >
              {isProcessingPayment ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Recording Payment & Updating Appointment Database...
                </span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay {feeAmount} & Confirm Biometric Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Certified Government Payment Gateway Simulation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs text-slate-500">
          <div className="w-6 h-6 border-2 border-[#003366] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          Hydrating Gateway Draft Session...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
