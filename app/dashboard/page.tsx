import LeadFeed from '@/app/components/LeadFeed';
import HubSpotStatus from '@/app/components/HubSpotStatus';
import Analytics from '@/app/components/Analytics';

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Lead Distribution Dashboard</h1>
                    <p className="text-gray-600 mt-2">Real-time monitoring and analytics</p>
                </div>

                <div className="mb-8">
                    <Analytics />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2">
                        <LeadFeed />
                    </div>
                    <div>
                        <HubSpotStatus />
                    </div>
                </div>
            </div>
        </div>
    );
}