import mongoose from 'mongoose';

// 1. Users Collection: Citizen account & authentication
const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    passwordHash: { type: String, required: true },
}, { timestamps: true });

// 2. Applications Collection: Core Passport Records (No Police Verification)
const ApplicationSchema = new mongoose.Schema({
    appId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    serviceType: {
        type: String,
        enum: ['Fresh', 'Re-issue', 'Tatkaal'],
        required: true
    },
    status: {
        type: String,
        enum: ['Submitted', 'Under Review', 'Approved', 'Printed', 'Dispatched'],
        default: 'Submitted'
    },

    // Embedded Personal Details
    personalDetails: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        dob: { type: String, required: true }, // Format: YYYY-MM-DD
        address: { type: String, required: true },
        aadhaarId: { type: String, default: '[Aadhaar Redacted]' } // Strict privacy compliance
    }
}, { timestamps: true });

// 3. Appointments Collection: PSK Verification Slots
const AppointmentSchema = new mongoose.Schema({
    appointmentId: { type: String, required: true, unique: true },
    appId: { type: String, required: true },
    pskLocation: { type: String, required: true },
    dateTime: { type: Date, required: true },
    tokenNumber: { type: String, required: true }
}, { timestamps: true });

// Prevent Mongoose model overwrite errors during Next.js hot reloads
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
export const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);