import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Application, Appointment } from '@/lib/models';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ draftId: string }> }
) {
  try {
    const { draftId } = await params;

    if (!draftId) {
      return NextResponse.json({ error: 'Application ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    const application = await Application.findOne({ appId: draftId });
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    const appointment = await Appointment.findOne({ appId: draftId });

    return NextResponse.json({
      success: true,
      data: {
        appId: application.appId,
        serviceType: application.serviceType,
        status: application.status,
        personalDetails: application.personalDetails,
        appointment: appointment ? {
          appointmentId: appointment.appointmentId,
          pskLocation: appointment.pskLocation,
          dateTime: appointment.dateTime,
          tokenNumber: appointment.tokenNumber,
        } : null,
      },
    });

  } catch (error: any) {
    console.error('Error fetching passport application:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}