export interface ApplicationRecord {
  draftId: string;
  applicant_name: string;
  applicantName?: string; // alias
  dob: string;
  id_proof: string;
  idProof?: string; // alias
  rpo_location: string;
  rpoLocation?: string; // alias
  service_type: string;
  serviceType?: string; // alias
  appointment_date: string;
  appointmentDate?: string; // alias
  appointmentTime?: string;
  fee_amount: string;
  feeAmount?: string; // alias
  status: "DRAFT_PENDING_PAYMENT" | "CONFIRMED" | "POLICE_VERIFICATION";
  payment_status: "UNPAID" | "PAID";
  paymentMode?: string;
  transactionId?: string;
  applicationRef?: string;
  batchNumber?: string;
  reportingTime?: string;
  gateNumber?: string;
  passportCategory?: string;
  address?: string;
  phone?: string;
  email?: string;
  emergencyContact?: string;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

// Global in-memory singleton store for high-reliability fallback and demoing
const globalStore = global as unknown as {
  __PASSPORT_DRAFT_STORE__?: Map<string, ApplicationRecord>;
};

if (!globalStore.__PASSPORT_DRAFT_STORE__) {
  globalStore.__PASSPORT_DRAFT_STORE__ = new Map<string, ApplicationRecord>();

  // Pre-seed with mock profiles for instant checkout preview if needed
  const defaultSeeds: ApplicationRecord[] = [
    {
      draftId: "PSK-ARN-8923411",
      applicant_name: "Ramesh Sharma",
      applicantName: "Ramesh Sharma",
      dob: "1990-05-15",
      id_proof: "[Aadhaar Redacted]",
      idProof: "[Aadhaar Redacted]",
      rpo_location: "Delhi PSK - Herald House, ITO",
      rpoLocation: "Delhi PSK - Herald House, ITO",
      service_type: "Normal Scheme (36 Pages) - ₹1,500",
      serviceType: "Normal Scheme (36 Pages) - ₹1,500",
      appointment_date: "2026-03-05",
      appointmentDate: "2026-03-05",
      appointmentTime: "09:45 AM - 10:15 AM",
      fee_amount: "₹1,500",
      feeAmount: "₹1,500",
      status: "DRAFT_PENDING_PAYMENT",
      payment_status: "UNPAID",
      applicationRef: "PSK-ARN-8923411",
      batchNumber: "BATCH-A12",
      reportingTime: "09:30 AM",
      gateNumber: "Gate 2 (Biometric Wing)",
      passportCategory: "Fresh Normal",
      address: "B-42, Janakpuri, New Delhi, 110058",
      phone: "+91 98765 43210",
      email: "ramesh.sharma@example.gov.in",
      source: "SITE_1_AI_GATEWAY",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      draftId: "PSK-ARN-9988234",
      applicant_name: "Priya Patel",
      applicantName: "Priya Patel",
      dob: "1988-10-22",
      id_proof: "[Aadhaar Redacted]",
      idProof: "[Aadhaar Redacted]",
      rpo_location: "Mumbai PSK - Bandra Kurla Complex",
      rpoLocation: "Mumbai PSK - Bandra Kurla Complex",
      service_type: "Normal Scheme (36 Pages) - ₹1,500",
      serviceType: "Normal Scheme (36 Pages) - ₹1,500",
      appointment_date: "2026-03-08",
      appointmentDate: "2026-03-08",
      appointmentTime: "11:15 AM - 11:45 AM",
      fee_amount: "₹1,500",
      feeAmount: "₹1,500",
      status: "DRAFT_PENDING_PAYMENT",
      payment_status: "UNPAID",
      applicationRef: "PSK-ARN-9988234",
      batchNumber: "BATCH-B08",
      reportingTime: "11:00 AM",
      gateNumber: "Gate 1 (FastTrack Wing)",
      passportCategory: "Fresh Normal",
      address: "Flat 304, Green Palms, Andheri East, Mumbai, 400069",
      phone: "+91 91234 56789",
      email: "priya.patel@example.gov.in",
      source: "SITE_1_AI_GATEWAY",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  for (const seed of defaultSeeds) {
    globalStore.__PASSPORT_DRAFT_STORE__.set(seed.draftId, seed);
  }
}

export const mockStore = {
  get: (draftId: string): ApplicationRecord | undefined => {
    return globalStore.__PASSPORT_DRAFT_STORE__?.get(draftId);
  },
  set: (draftId: string, record: ApplicationRecord): void => {
    globalStore.__PASSPORT_DRAFT_STORE__?.set(draftId, record);
  },
  list: (): ApplicationRecord[] => {
    return Array.from(globalStore.__PASSPORT_DRAFT_STORE__?.values() || []);
  },
  update: (draftId: string, updates: Partial<ApplicationRecord>): ApplicationRecord | null => {
    const existing = globalStore.__PASSPORT_DRAFT_STORE__?.get(draftId);
    if (!existing) return null;
    const updated: ApplicationRecord = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    globalStore.__PASSPORT_DRAFT_STORE__?.set(draftId, updated);
    return updated;
  },
};
