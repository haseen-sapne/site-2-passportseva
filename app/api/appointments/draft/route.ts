import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { PassportApplication } from "@/lib/models/PassportApplication";
import { mockStore, ApplicationRecord } from "@/lib/mockStore";

export async function POST(req: NextRequest) {
  try {
    // 1. Security Check: Validate x-api-key header
    const apiKey = req.headers.get("x-api-key");
    const expectedSecret =
      process.env.HACKATHON_SECRET_KEY || "hackathon-internal-secret-2026";

    if (!apiKey || apiKey !== expectedSecret) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
          message: "Invalid or missing 'x-api-key' header.",
        },
        { status: 401 }
      );
    }

    // 2. Parse and Validate Inbound JSON Body
    const body = await req.json().catch(() => ({}));
    const {
      applicant_name,
      applicantName,
      dob,
      id_proof,
      idProof,
      rpo_location,
      rpoLocation,
      service_type,
      serviceType,
      appointment_date,
      appointmentDate,
      fee_amount,
      feeAmount,
    } = body;

    const resolvedName = applicant_name || applicantName;
    const resolvedRpo = rpo_location || rpoLocation;
    const resolvedDate = appointment_date || appointmentDate;

    if (!resolvedName || !resolvedRpo || !resolvedDate) {
      return NextResponse.json(
        {
          success: false,
          error: "Bad Request",
          message: "Missing required fields: 'applicant_name', 'rpo_location', and 'appointment_date' are mandatory.",
        },
        { status: 400 }
      );
    }

    const resolvedDob = dob || "1990-01-01";
    // Strict Aadhaar Privacy Rule: Always enforce [Aadhaar Redacted]
    const resolvedIdProof = "[Aadhaar Redacted]";
    const resolvedServiceType =
      service_type || serviceType || "Normal Scheme (36 Pages) - ₹1,500";

    // 3. Generate Unique Application Reference Number (ARN)
    const draftId = "PSK-ARN-" + Math.floor(1000000 + Math.random() * 9000000);

    // 4. Determine fee_amount
    const isTatkaal =
      resolvedServiceType.toLowerCase().includes("tatkaal") ||
      resolvedServiceType.includes("3,500");
    const resolvedFee = fee_amount || feeAmount || (isTatkaal ? "₹3,500" : "₹1,500");

    const portalBaseUrl =
      process.env.NEXT_PUBLIC_PORTAL_BASE_URL || "http://localhost:3002";
    const portalUrl = `${portalBaseUrl.replace(/\/$/, "")}/checkout?draftId=${draftId}`;

    const recordData: ApplicationRecord = {
      draftId,
      applicant_name: resolvedName,
      applicantName: resolvedName,
      dob: resolvedDob,
      id_proof: resolvedIdProof,
      idProof: resolvedIdProof,
      rpo_location: resolvedRpo,
      rpoLocation: resolvedRpo,
      service_type: resolvedServiceType,
      serviceType: resolvedServiceType,
      appointment_date: resolvedDate,
      appointmentDate: resolvedDate,
      appointmentTime: "09:45 AM - 10:15 AM",
      fee_amount: resolvedFee,
      feeAmount: resolvedFee,
      status: "DRAFT_PENDING_PAYMENT",
      payment_status: "UNPAID",
      applicationRef: draftId,
      batchNumber: "BATCH-A12",
      reportingTime: "09:30 AM",
      gateNumber: "Gate 2 (Biometric Wing)",
      passportCategory: isTatkaal ? "Tatkaal Scheme" : "Fresh Normal",
      address: body.address || "Residential Address Verified on File",
      phone: body.phone || "+91 98765 43210",
      email: body.email || "citizen.applicant@gov.in",
      source: "SITE_1_AI_GATEWAY",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 5. In-Memory Store (Resilient Fallback)
    mockStore.set(draftId, recordData);

    // 6. Save Record in MongoDB PassportApplication collection
    try {
      const db = await connectToDatabase();
      if (db) {
        await PassportApplication.create({
          draftId,
          applicant_name: resolvedName,
          dob: resolvedDob,
          id_proof: resolvedIdProof,
          rpo_location: resolvedRpo,
          service_type: resolvedServiceType,
          appointment_date: resolvedDate,
          fee_amount: resolvedFee,
          status: "DRAFT_PENDING_PAYMENT",
          payment_status: "UNPAID",
        });
      }
    } catch (dbErr: any) {
      console.warn("[Draft API] MongoDB write skipped, cached in memory:", dbErr?.message);
    }

    // 7. Return HTTP 201 Created with exact structure
    return NextResponse.json(
      {
        success: true,
        status: "APPOINTMENT_DRAFTED",
        draftId: draftId,
        message: `Passport application draft created for ${resolvedName}. Biometric slot pre-booked at ${resolvedRpo}.`,
        details: {
          applicant_name: resolvedName,
          rpo_location: resolvedRpo,
          service_type: resolvedServiceType,
          appointment_date: resolvedDate,
          id_proof: resolvedIdProof,
          application_ref: draftId,
          portal_url: portalUrl,
          fee_amount: resolvedFee,
          expires_in_minutes: 30,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[API Error /api/appointments/draft]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        message: error?.message || "Failed to process passport draft request.",
      },
      { status: 500 }
    );
  }
}
