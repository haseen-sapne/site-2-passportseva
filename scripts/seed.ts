import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// We define the schemas here locally in the script to ensure it runs completely standalone
const ApplicationSchema = new mongoose.Schema({
    appId: String,
    userId: String,
    serviceType: String,
    status: String,
    personalDetails: {
        firstName: String,
        lastName: String,
        dob: String,
        address: String,
        aadhaarId: String
    }
}, { timestamps: true });

const AppointmentSchema = new mongoose.Schema({
    appointmentId: String,
    appId: String,
    pskLocation: String,
    dateTime: Date,
    tokenNumber: String,
    paymentStatus: String
}, { timestamps: true });

const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);

async function seedDatabase() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error('❌ MONGODB_URI is missing in .env.local');
        process.exit(1);
    }

    try {
        console.log(`⏳ Connecting to MongoDB Atlas (${uri.split('@')[1].split('?')[0]})...`);
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB Atlas.');

        // Clear existing data to prevent duplicates during testing
        console.log('🧹 Clearing old mock data...');
        await Application.deleteMany({});
        await Appointment.deleteMany({});

        // Inject Mock Data
        console.log('🌱 Seeding Passport Applications...');

        // Record 1: Rahul (Under Review - Has Upcoming Appointment)
        const app1 = await Application.create({
            appId: 'APP-2026-112233',
            userId: 'USR-998877',
            serviceType: 'Fresh',
            status: 'Under Review',
            personalDetails: {
                firstName: 'Rahul',
                lastName: 'Sharma',
                dob: '1995-08-15',
                address: '42, Vasant Kunj, New Delhi 110070',
                aadhaarId: '[Aadhaar Redacted]' // Strict Privacy Compliance
            }
        });

        await Appointment.create({
            appointmentId: 'APT-884422',
            appId: app1.appId,
            pskLocation: 'Delhi - RPO Herald House, ITO',
            dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
            tokenNumber: 'TKN-402',
            paymentStatus: 'PAID'
        });

        // Record 2: Priya (Dispatched - Completed, No Appointment Needed)
        await Application.create({
            appId: 'APP-2026-445566',
            userId: 'USR-334455',
            serviceType: 'Tatkaal',
            status: 'Dispatched',
            personalDetails: {
                firstName: 'Priya',
                lastName: 'Patel',
                dob: '1992-11-20',
                address: 'Bandra West, Mumbai 400050',
                aadhaarId: '[Aadhaar Redacted]' // Strict Privacy Compliance
            }
        });

        console.log('✅ Seed complete! Mock passport records successfully injected into site_1_passport.');
        process.exit(0);

    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    }
}

seedDatabase();