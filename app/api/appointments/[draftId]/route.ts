import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { PassportApplication } from "@/lib/models/PassportApplication";
import { mockStore, ApplicationRecord } from "@/lib/mockStore";
import { generateTransactionId } from "@/lib/utils";

interface Params {
  params: Promise<{
    draftId: string;
  }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { draftId } = await params;

    if (!draftId) {
      return NextResponse.json(
        { success: false, error: "Bad Request", message: "Missing 'draftId' parameter." },
        { status: 400 }
      );
    }

    // 1. Query In-Memory Store
    let record: ApplicationRecord | null | undefined = mockStore.get(draftId);

    // 2. Query MongoDB PassportApplication collection
    try {
      const db = await connectToDatabase();
      if (db) {
        const doc: any = await PassportApplication.findOne({ draftId }).lean();
        if (doc) {
          record = {
            draftId: doc.draftId,
            applicant_name: doc.applicant_name,
            applicantName: doc.applicant_name,
            dob: doc.dob,
            id_proof: "[Aadhaar Redacted]",
            idProof: "[Aadhaar Redacted]",
            rpo_location: doc.rpo_location,
            rpoLocation: doc.rpo_location,
            service_type: doc.service_type,
            serviceType: doc.service_type,
            appointment_date: doc.appointment_date,
            appointmentDate: doc.appointment_date,
            appointmentTime: "09:45 AM - 10:15 AM",
            fee_amount: doc.fee_amount || "₹1,500",
            feeAmount: doc.fee_amount || "₹1,500",
            status: doc.status || "DRAFT_PENDING_PAYMENT",
            payment_status: doc.payment_status || "UNPAID",
            paymentMode: "UPI (BHIM)",
            applicationRef: doc.draftId,
            batchNumber: "BATCH-A12",
            reportingTime: "09:30 AM",
            gateNumber: "Gate 2 (Biometric Wing)",
            passportCategory: doc.service_type?.includes("Tatkaal") ? "Tatkaal Scheme" : "Fresh Normal",
            address: "Residential Address Verified on File",
            phone: "+91 98765 43210",
            email: "citizen.applicant@gov.in",
            source: "SITE_1_AI_GATEWAY",
            createdAt: doc.createdAt?.toISOString?.() || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          mockStore.set(draftId, record);
        }
      }
    } catch (dbErr) {
      console.warn("[Single Draft API] DB lookup fallback:", dbErr);
    }

    // 3. Fallback generator for test/demo IDs
    if (!record) {
      const isPriya = draftId.includes("9988234") || draftId.toLowerCase().includes("priya");
      record = {
        draftId,
        applicant_name: isPriya ? "Priya Patel" : "Ramesh Sharma",
        applicantName: isPriya ? "Priya Patel" : "Ramesh Sharma",
        dob: isPriya ? "1988-10-22" : "1990-05-15",
        id_proof: "[Aadhaar Redacted]",
        idProof: "[Aadhaar Redacted]",
        rpo_location: isPriya ? "Mumbai PSK - Bandra Kurla Complex" : "Delhi PSK - Herald House, ITO",
        rpoLocation: isPriya ? "Mumbai PSK - Bandra Kurla Complex" : "Delhi PSK - Herald House, ITO",
        service_type: "Normal Scheme (36 Pages) - ₹1,500",
        serviceType: "Normal Scheme (36 Pages) - ₹1,500",
        appointment_date: "2026-03-05",
        appointmentDate: "2026-03-05",
        appointmentTime: "09:45 AM - 10:15 AM",
        fee_amount: "₹1,500",
        feeAmount: "₹1,500",
        status: "DRAFT_PENDING_PAYMENT",
        payment_status: "UNPAID",
        applicationRef: draftId,
        batchNumber: "BATCH-A12",
        reportingTime: "09:30 AM",
        gateNumber: "Gate 2 (Biometric Wing)",
        passportCategory: "Fresh Normal",
        address: "B-42, Janakpuri, New Delhi, 110058",
        phone: "+91 98765 43210",
        email: "citizen.applicant@gov.in",
        source: "SITE_1_AI_GATEWAY",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockStore.set(draftId, record);
    }

    return NextResponse.json({
      success: true,
      draft: record,
    });
  } catch (error: any) {
    console.error("[API Error /api/appointments/[draftId] GET]:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error", message: "Failed to retrieve draft details." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  try {
    const { draftId } = await params;
    const body = await req.json().catch(() => ({}));

    const paymentMode = body.paymentMode || "UPI (BHIM / UPI ID)";
    const appointmentTime = body.appointmentTime || "09:45 AM - 10:15 AM";
    const transactionId = body.transactionId || generateTransactionId();

    const updates: Partial<ApplicationRecord> = {
      status: "CONFIRMED",
      payment_status: "PAID",
      paymentMode,
      transactionId,
      appointmentTime,
      updatedAt: new Date().toISOString(),
    };

    // Update in-memory store
    const updatedRecord = mockStore.update(draftId, updates);

    // Update MongoDB
    try {
      const db = await connectToDatabase();
      if (db) {
        await PassportApplication.findOneAndUpdate(
          { draftId },
          {
            $set: {
              status: "CONFIRMED",
              payment_status: "PAID",
            },
          },
          { new: true }
        );
      }
    } catch (dbErr) {
      console.warn("[API] DB update fallback:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Appointment confirmed and payment recorded successfully.",
      draft: updatedRecord || {
        draftId,
        ...updates,
      },
    });
  } catch (error: any) {
    console.error("[API Error /api/appointments/[draftId] POST]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to confirm appointment." },
      { status: 500 }
    );
  }
}
