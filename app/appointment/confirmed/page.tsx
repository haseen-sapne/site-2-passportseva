'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const draftId = searchParams.get('draftId');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (draftId) {
      fetch(`/api/appointments/${draftId}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.success) setData(result.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [draftId]);

  if (loading) return <div className="text-center mt-20 animate-pulse">Fetching official records from MongoDB...</div>;
  if (!data) return <div className="text-center mt-20 text-red-500">Record not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-sm border mt-10">
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Appointment Confirmed</h1>
        <p className="text-slate-500">Your application has been successfully saved to the Parivahan database.</p>
      </div>

      <div className="bg-slate-50 border rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4 border-b pb-4">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Application ID</p>
            <p className="font-semibold">{data.appId}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Token Number</p>
            <p className="font-semibold text-blue-600">{data.appointment?.tokenNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-b pb-4">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Applicant Name</p>
            <p className="font-medium">{data.personalDetails?.firstName} {data.personalDetails?.lastName}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Aadhaar Verification</p>
            <p className="font-mono text-sm text-slate-700">{data.personalDetails?.aadhaarId}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Appointment Details</p>
          <p className="font-medium">{data.appointment?.pskLocation}</p>
          <p className="text-sm text-slate-600">
            {new Date(data.appointment?.dateTime).toLocaleString('en-IN', {
              dateStyle: 'full',
              timeStyle: 'short',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmedPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading Confirmation...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}