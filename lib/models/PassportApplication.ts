import mongoose, { Schema, model, models } from "mongoose";

const PassportApplicationSchema = new Schema({
  draftId: { type: String, required: true, unique: true, index: true }, // e.g. "PSK-ARN-8923411"
  applicant_name: { type: String, required: true },
  dob: { type: String, required: true },
  id_proof: { type: String, default: "[Aadhaar Redacted]" },
  rpo_location: { type: String, required: true },
  service_type: { type: String, required: true },
  appointment_date: { type: String, required: true },
  fee_amount: { type: String, default: "₹1,500" },
  status: { 
    type: String, 
    enum: ["DRAFT_PENDING_PAYMENT", "CONFIRMED", "POLICE_VERIFICATION"], 
    default: "DRAFT_PENDING_PAYMENT" 
  },
  payment_status: { type: String, enum: ["UNPAID", "PAID"], default: "UNPAID" },
  createdAt: { type: Date, default: Date.now, expires: 3600 } // Auto-expires after 1 hour if unpaid
});

export const PassportApplication = models.PassportApplication || model("PassportApplication", PassportApplicationSchema);
