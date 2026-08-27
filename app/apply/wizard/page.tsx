'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WizardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    givenName: '',
    surname: '',
    dob: '',
    address: '',
    serviceType: 'Fresh',
    rpoLocation: 'Delhi - RPO Herald House, ITO',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send data to our new MongoDB backend endpoint
      const response = await fetch('/api/appointments/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.givenName,
          lastName: formData.surname,
          dob: formData.dob,
          address: formData.address,
          serviceType: formData.serviceType,
          pskLocation: formData.rpoLocation,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Route to checkout with the live Database Application ID
        router.push(`/checkout?draftId=${result.draftId}`);
      } else {
        alert('Error: ' + result.error);
        setLoading(false);
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-sm border mt-10">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Passport Application Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input required name="givenName" onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input required name="surname" onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth</label>
          <input required type="date" name="dob" onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Full Address</label>
          <input required name="address" onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Service Type</label>
            <select name="serviceType" onChange={handleChange} className="w-full border p-2 rounded">
              <option value="Fresh">Normal / Fresh</option>
              <option value="Tatkaal">Tatkaal (Express)</option>
              <option value="Re-issue">Re-issue</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Preferred PSK Location</label>
            <select name="rpoLocation" onChange={handleChange} className="w-full border p-2 rounded">
              <option value="Delhi - RPO Herald House, ITO">Delhi - RPO Herald House</option>
              <option value="Mumbai - RPO Bandra Kurla Complex">Mumbai - RPO BKC</option>
              <option value="Bengaluru - RPO Koramangala">Bengaluru - RPO Koramangala</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 text-white font-medium py-3 rounded hover:bg-blue-700 transition mt-6"
        >
          {loading ? 'Connecting to Database...' : 'Save & Proceed to Payment'}
        </button>
      </form>
    </div>
  );
}