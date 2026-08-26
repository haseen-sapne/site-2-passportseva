"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  UserCheck,
  FileText,
  MapPin,
  CreditCard,
  Building,
  Truck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Lock,
} from "lucide-react";

interface StepItem {
  id: number;
  title: string;
  subtitle: string;
  icon: any;
}

function WizardGuideContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawType = (searchParams.get("type") || searchParams.get("category") || "").toLowerCase();
  
  let initialScheme = "Normal Scheme (36 Pages) - ₹1,500";
  let initialCategoryLabel = "Fresh / Reissue Ordinary Passport";
  let initialFee = "₹1,500";

  if (rawType.includes("tatkaal")) {
    initialScheme = "Tatkaal Scheme (36 Pages) - ₹3,500";
    initialCategoryLabel = "Tatkaal Expedited Passport";
    initialFee = "₹3,500";
  } else if (rawType.includes("diplomatic")) {
    initialScheme = "Diplomatic / Official Scheme (36 Pages) - Exempted";
    initialCategoryLabel = "Diplomatic / Official Passport";
    initialFee = "Exempted";
  } else if (rawType.includes("identity")) {
    initialScheme = "Identity Certificate (36 Pages) - ₹1,000";
    initialCategoryLabel = "Identity Certificate";
    initialFee = "₹1,000";
  }

  // Active accordion step (default Step 2 expanded for form filling)
  const [activeStep, setActiveStep] = useState<number>(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    applicant_name: "Ramesh Sharma",
    dob: "1990-05-15",
    gender: "Male",
    marital_status: "Married",
    id_proof: "[Aadhaar Redacted]",
    rpo_location: searchParams.get("rpo") || "Delhi PSK - Herald House, ITO",
    service_type: initialScheme,
    appointment_date: searchParams.get("date") || "2026-03-05",
    appointment_time: "09:45 AM - 10:15 AM",
    address: "B-42, Janakpuri, New Delhi, 110058",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110058",
    phone: "+91 98765 43210",
    email: "ramesh.sharma@example.gov.in",
  });

  const updateField = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleStep = (stepNumber: number) => {
    setActiveStep((prev) => (prev === stepNumber ? 0 : stepNumber));
  };

  const handleProceedToPayment = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/appointments/draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "hackathon-internal-secret-2026",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data?.draftId) {
        router.push(`/checkout?draftId=${encodeURIComponent(data.draftId)}`);
      } else {
        router.push("/checkout?draftId=PSK-ARN-8923411");
      }
    } catch (err) {
      console.error("Failed to submit draft form:", err);
      router.push("/checkout?draftId=PSK-ARN-8923411");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps: StepItem[] = [
    {
      id: 1,
      title: "Step 1: Register & Login",
      subtitle: "Citizen profile authentication & Aadhaar e-KYC verification",
      icon: UserCheck,
    },
    {
      id: 2,
      title: "Step 2: Fill Application Form",
      subtitle: "Applicant particulars, residential address, & identity declaration",
      icon: FileText,
    },
    {
      id: 3,
      title: "Step 3: Select RPO/PSK",
      subtitle: "Choose jurisdictional Regional Passport Office & nearest PSK center",
      icon: MapPin,
    },
    {
      id: 4,
      title: "Step 4: Pay & Schedule Appointment",
      subtitle: "Online fee payment & biometric slot confirmation",
      icon: CreditCard,
    },
    {
      id: 5,
      title: "Step 5: Visit PSK",
      subtitle: "Original document verification & digital biometric fingerprint capture",
      icon: Building,
    },
    {
      id: 6,
      title: "Step 6: Receive Passport",
      subtitle: "Police verification clearance & India Post Speed Post delivery",
      icon: Truck,
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between">
        <Link
          href="/apply"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#003366] hover:text-[#002244] bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Category Selector</span>
        </Link>

        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg text-xs">
          <span className="text-slate-500 font-semibold">Selected Category:</span>
          <span className="font-bold text-[#003366]">{initialCategoryLabel}</span>
        </div>
      </div>

      {/* Header Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#003366]">
            <FileText className="w-4 h-4 text-[#FF9933]" />
            <span>Official 6-Step Passport Process Guide</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Step-by-Step Passport Application Wizard
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Expand the accordion steps below to complete your application particulars, choose your PSK center, schedule your slot, and review post-application procedures.
          </p>
        </div>
      </div>

      {/* Accordion Steps List */}
      <div className="space-y-3">
        {/* ================= STEP 1: Register & Login ================= */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-xs">
          <button
            type="button"
            onClick={() => toggleStep(1)}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">Step 1: Register & Login</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-slate-500">{steps[0].subtitle}</p>
              </div>
            </div>
            <div className="text-slate-400">
              {activeStep === 1 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>

          {activeStep === 1 && (
            <div className="p-5 sm:p-6 border-t border-slate-100 bg-slate-50/50 space-y-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-slate-500 text-[11px] block">Citizen Account:</span>
                  <span className="font-bold text-slate-900">ramesh.sharma@gov.in</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Aadhaar e-KYC Status:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> OTP Verified (Redacted)
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Session Token:</span>
                  <span className="font-mono text-slate-600">PSP-SES-2026-OK</span>
                </div>
              </div>
              <p className="text-slate-600 text-xs">
                Your citizen credentials and digital Aadhaar match have been authenticated. Proceed to Step 2 to verify applicant details.
              </p>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="bg-[#003366] text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1"
                >
                  <span>Continue to Step 2</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= STEP 2: Fill Application Form ================= */}
        <div className={`bg-white rounded-2xl border-2 overflow-hidden shadow-xs transition-colors ${
          activeStep === 2 ? "border-[#003366]" : "border-slate-200"
        }`}>
          <button
            type="button"
            onClick={() => toggleStep(2)}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#003366] flex items-center justify-center font-bold flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">Step 2: Fill Application Form</h3>
                  <span className="bg-blue-100 text-[#003366] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    In Progress
                  </span>
                </div>
                <p className="text-xs text-slate-500">{steps[1].subtitle}</p>
              </div>
            </div>
            <div className="text-slate-400">
              {activeStep === 2 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>

          {activeStep === 2 && (
            <div className="p-5 sm:p-6 border-t border-slate-100 bg-white space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Applicant Full Name (Given Name + Surname) *
                  </label>
                  <input
                    type="text"
                    value={formData.applicant_name}
                    onChange={(e) => updateField("applicant_name", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-[#003366]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Birth (DOB) *
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => updateField("dob", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-[#003366]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => updateField("gender", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-[#003366]"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Marital Status *</label>
                  <select
                    value={formData.marital_status}
                    onChange={(e) => updateField("marital_status", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-[#003366]"
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Present Residential Address (for Police Verification) *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-[#003366]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Identity Proof (UIDAI Aadhaar)
                  </label>
                  <input
                    type="text"
                    value={formData.id_proof}
                    disabled
                    className="w-full bg-slate-100 border border-slate-300 rounded-lg p-2.5 text-xs text-amber-800 font-semibold cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Mobile Number *
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-[#003366]"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="bg-slate-100 text-slate-700 font-semibold px-4 py-2 rounded-lg text-xs"
                >
                  Step 1
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="bg-[#003366] text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1"
                >
                  <span>Continue to Step 3: Select RPO/PSK</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= STEP 3: Select RPO/PSK ================= */}
        <div className={`bg-white rounded-2xl border-2 overflow-hidden shadow-xs transition-colors ${
          activeStep === 3 ? "border-[#003366]" : "border-slate-200"
        }`}>
          <button
            type="button"
            onClick={() => toggleStep(3)}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#E67E22]" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900">Step 3: Select RPO/PSK</h3>
                <p className="text-xs text-slate-500">{steps[2].subtitle}</p>
              </div>
            </div>
            <div className="text-slate-400">
              {activeStep === 3 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>

          {activeStep === 3 && (
            <div className="p-5 sm:p-6 border-t border-slate-100 bg-white space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Select Passport Seva Kendra (PSK / POPSK) Center *
                </label>
                <select
                  value={formData.rpo_location}
                  onChange={(e) => updateField("rpo_location", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-[#003366]"
                >
                  <option value="Delhi PSK - Herald House, ITO">Delhi PSK - Herald House, ITO (Central Delhi)</option>
                  <option value="Mumbai PSK - Bandra Kurla Complex">Mumbai PSK - Bandra Kurla Complex (BKC, Mumbai)</option>
                  <option value="Mumbai PSK - Andheri">Mumbai PSK - Andheri MIDC (Western Suburbs)</option>
                  <option value="Bengaluru PSK - Lalbagh Road">Bengaluru PSK - Lalbagh Road (Bengaluru Urban)</option>
                  <option value="Hyderabad PSK - Begumpet">Hyderabad PSK - Begumpet (Hyderabad)</option>
                  <option value="Chennai PSK - Saligramam">Chennai PSK - Saligramam (Chennai)</option>
                  <option value="Kolkata PSK - EM Bypass">Kolkata PSK - EM Bypass (Kolkata)</option>
                  <option value="Pune PSK - Mundhwa">Pune PSK - Mundhwa (Pune Industrial Area)</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl text-xs space-y-1">
                <div className="font-bold text-[#003366] flex items-center gap-1.5">
                  <Building className="w-4 h-4" /> Selected Center Details:
                </div>
                <div className="text-slate-700 font-medium">{formData.rpo_location}</div>
                <div className="text-[11px] text-slate-500">
                  Counters open: 09:00 AM – 04:30 PM (Monday to Friday, excluding Gazetted Holidays).
                </div>
              </div>

              <div className="flex justify-between pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="bg-slate-100 text-slate-700 font-semibold px-4 py-2 rounded-lg text-xs"
                >
                  Step 2
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(4)}
                  className="bg-[#003366] text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1"
                >
                  <span>Continue to Step 4: Pay & Schedule</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= STEP 4: Pay & Schedule Appointment ================= */}
        <div className={`bg-white rounded-2xl border-2 overflow-hidden shadow-xs transition-colors ${
          activeStep === 4 ? "border-[#FF9933] ring-2 ring-[#FF9933]/20" : "border-slate-200"
        }`}>
          <button
            type="button"
            onClick={() => toggleStep(4)}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#E67E22] flex items-center justify-center font-bold flex-shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">Step 4: Pay & Schedule Appointment</h3>
                  <span className="bg-[#FF9933]/20 text-[#E67E22] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Action Required
                  </span>
                </div>
                <p className="text-xs text-slate-500">{steps[3].subtitle}</p>
              </div>
            </div>
            <div className="text-slate-400">
              {activeStep === 4 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>

          {activeStep === 4 && (
            <div className="p-5 sm:p-6 border-t border-slate-100 bg-white space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Appointment Date *
                  </label>
                  <input
                    type="date"
                    value={formData.appointment_date}
                    onChange={(e) => updateField("appointment_date", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-[#003366]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Reporting Time Batch *
                  </label>
                  <select
                    value={formData.appointment_time}
                    onChange={(e) => updateField("appointment_time", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-[#003366]"
                  >
                    <option value="09:45 AM - 10:15 AM">Batch A: 09:45 AM - 10:15 AM (Reporting: 09:30 AM)</option>
                    <option value="11:15 AM - 11:45 AM">Batch B: 11:15 AM - 11:45 AM (Reporting: 11:00 AM)</option>
                    <option value="02:00 PM - 02:30 PM">Batch C: 02:00 PM - 02:30 PM (Reporting: 01:45 PM)</option>
                    <option value="03:30 PM - 04:00 PM">Batch D: 03:30 PM - 04:00 PM (Reporting: 03:15 PM)</option>
                  </select>
                </div>
              </div>

              {/* Fee Breakdown Summary */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Application Scheme:</span>
                  <span className="font-semibold text-slate-900">{formData.service_type}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Prescribed Govt Fee:</span>
                  <span className="font-bold text-slate-900 text-sm">{initialFee}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Biometric Capture & Speed Post Delivery:</span>
                  <span className="font-semibold text-emerald-700">Included (Free)</span>
                </div>
              </div>

              {/* Primary Call to Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  disabled={isSubmitting}
                  className="w-full bg-[#FF9933] hover:bg-[#E67E22] text-slate-950 font-black text-xs sm:text-sm py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                      Submitting Application Draft to Database...
                    </span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Proceed to Payment & Checkout ({initialFee})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= STEP 5: Visit PSK ================= */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-xs">
          <button
            type="button"
            onClick={() => toggleStep(5)}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold flex-shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900">Step 5: Visit PSK</h3>
                <p className="text-xs text-slate-500">{steps[4].subtitle}</p>
              </div>
            </div>
            <div className="text-slate-400">
              {activeStep === 5 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>

          {activeStep === 5 && (
            <div className="p-5 sm:p-6 border-t border-slate-100 bg-slate-50/50 space-y-3 text-xs">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Mandatory Documents to Carry on Appointment Day:</span>
              </div>
              <ul className="list-disc list-inside space-y-1.5 text-slate-600 pl-1">
                <li>Printed Appointment Confirmation Slip (ARN Slip) or digital SMS pass.</li>
                <li>Original Proof of Date of Birth (Birth Certificate / Class 10th Certificate).</li>
                <li>Original Proof of Identity & Address (Aadhaar / Voter ID / Utility Bill).</li>
                <li>Two recent passport size color photographs with plain white background.</li>
                <li>One set of self-attested photocopies of all original documents.</li>
              </ul>
              <div className="text-[11px] text-slate-500 bg-white p-3 rounded-lg border border-slate-200 mt-2">
                <strong>Counter Flow:</strong> Counter A (Token & Biometrics) ➔ Counter B (Document Verification) ➔ Counter C (Granting Officer).
              </div>
            </div>
          )}
        </div>

        {/* ================= STEP 6: Receive Passport ================= */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-xs">
          <button
            type="button"
            onClick={() => toggleStep(6)}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#003366] flex items-center justify-center font-bold flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900">Step 6: Receive Passport</h3>
                <p className="text-xs text-slate-500">{steps[5].subtitle}</p>
              </div>
            </div>
            <div className="text-slate-400">
              {activeStep === 6 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>

          {activeStep === 6 && (
            <div className="p-5 sm:p-6 border-t border-slate-100 bg-slate-50/50 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Police Verification</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Local police verification initiated automatically within 48 hours of PSK appointment clearance.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#003366]" />
                    <span>Speed Post Dispatch</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Passport booklet printed at India Security Press and delivered via Speed Post tracking number.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WizardPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs text-slate-500">
          <div className="w-6 h-6 border-2 border-[#003366] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          Loading 6-Step Application Wizard...
        </div>
      }
    >
      <WizardGuideContent />
    </Suspense>
  );
}
