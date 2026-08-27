'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function CheckoutFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const draftId = searchParams.get('draftId');

  const handlePayment = () => {
    // In a real app, integrate payment gateway here.
    // For now, we simulate a successful payment routing.
    router.push(`/appointment/confirmed?draftId=${draftId}`);
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-sm border mt-10 text-center">
      <h1 className="text-2xl font-bold mb-4 text-slate-800">Secure Payment</h1>
      <p className="text-slate-600 mb-6">
        Application Reference: <strong>{draftId}</strong>
      </p>
      <div className="bg-slate-50 p-6 rounded mb-6 text-left border">
        <p className="flex justify-between mb-2"><span>Passport Service Fee:</span> <span>₹1,500</span></p>
        <p className="flex justify-between mb-2"><span>SMS Updates:</span> <span>₹50</span></p>
        <hr className="my-2" />
        <p className="flex justify-between font-bold text-lg text-slate-800"><span>Total Payable:</span> <span>₹1,550</span></p>
      </div>
      <button 
        onClick={handlePayment} 
        className="w-full bg-green-600 text-white font-medium py-3 rounded hover:bg-green-700 transition"
      >
        Pay ₹1,550 & Confirm Appointment
      </button>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading Payment Gateway...</div>}>
      <CheckoutFlow />
    </Suspense>
  );
}