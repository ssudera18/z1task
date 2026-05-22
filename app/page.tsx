import LeadForm from '@/app/components/LeadForm';
import Link from 'next/link';

export default function Home() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold text-white">Lead Distribution Portal</h1>
            <Link
                href="/dashboard"
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              View Dashboard
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold">✓</span>
                  Quick lead capture form
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold">✓</span>
                  Automatic HubSpot synchronization
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold">✓</span>
                  Real-time dashboard analytics
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold">✓</span>
                  Live sync status monitoring
                </li>
              </ul>
            </div>

            <LeadForm />
          </div>
        </div>
      </div>
  );
}