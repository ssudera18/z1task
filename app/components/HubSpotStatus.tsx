'use client';

import { useEffect, useState } from 'react';
import { Activity, AlertCircle } from 'lucide-react';

interface Status {
    connected: boolean;
    lastChecked: string;
    message: string;
}

export default function HubSpotStatus() {
    const [status, setStatus] = useState<Status | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkStatus();
        const interval = setInterval(checkStatus, 10000);
        return () => clearInterval(interval);
    }, []);

    const checkStatus = async () => {
        try {
            const res = await fetch('/api/hubspot-status');
            const data = await res.json();
            setStatus(data);
        } catch (error) {
            console.error('Failed to check HubSpot status:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-gray-500">Checking connection...</div>;
    }

    return (
        <div className={`rounded-lg p-6 ${status?.connected ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center gap-3 mb-2">
                {status?.connected ? (
                    <Activity className="w-6 h-6 text-green-600" />
                ) : (
                    <AlertCircle className="w-6 h-6 text-red-600" />
                )}
                <h3 className={`text-lg font-semibold ${status?.connected ? 'text-green-900' : 'text-red-900'}`}>
                    HubSpot Router Control
                </h3>
            </div>
            <p className={`text-sm ${status?.connected ? 'text-green-700' : 'text-red-700'}`}>
                {status?.message || 'Connection status unknown'}
            </p>
            <div className="mt-3 text-xs text-gray-600">
                Last checked: {new Date(status?.lastChecked || '').toLocaleTimeString()}
            </div>
        </div>
    );
}