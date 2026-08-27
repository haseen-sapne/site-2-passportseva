import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Application, Appointment } from '@/lib/models';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      dob,
      address,
      serviceType = 'Fresh',
      pskLocation = 'Delhi - RPO Herald House, ITO',
      appointmentDate,
    } = body;

    // Validation
    if (!firstName || !lastName || !dob || !address) {
      return NextResponse.json(
        { error: 'Missing required applicant fields: firstName, lastName, dob, and address are required.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Generate unique public IDs
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const appId = `APP-${new Date().getFullYear()}-${randomNum}`;
    const appointmentId = `APT-${Date.now().toString().slice(-6)}`;
    const tokenNumber = `TKN-${Math.floor(100 + Math.random() * 900)}`;

    // 1. Create Application Document
    const newApplication = await Application.create({
      appId,
      userId: `USR-${randomNum}`,
      serviceType: ['Fresh', 'Re-issue', 'Tatkaal'].includes(serviceType) ? serviceType : 'Fresh',
      status: 'Submitted',
      personalDetails: {
        firstName,
        lastName,
        dob,
        address,
        aadhaarId: '[Aadhaar Redacted]',
      },
    });

    // 2. Create Appointment Document
    const slotDate = appointmentDate ? new Date(appointmentDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const newAppointment = await Appointment.create({
      appointmentId,
      appId,
      pskLocation,
      dateTime: slotDate,
      tokenNumber,
      paymentStatus: 'PAID',
    });

    return NextResponse.json({
      success: true,
      message: 'Passport application submitted and appointment slot reserved.',
      draftId: appId,
      data: {
        appId: newApplication.appId,
        applicantName: `${firstName} ${lastName}`,
        serviceType: newApplication.serviceType,
        status: newApplication.status,
        appointment: {
          appointmentId: newAppointment.appointmentId,
          pskLocation: newAppointment.pskLocation,
          dateTime: newAppointment.dateTime,
          tokenNumber: newAppointment.tokenNumber,
        },
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating passport application draft:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}