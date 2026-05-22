'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Users, CheckCircle, AlertCircle } from 'lucide-react';

interface AnalyticsData {
    totalLeads: number;
    syncedLeads: number;
    pendingLeads: number;
    failedLeads: number;
    totalPipelineValue: number;
    averageDealSize: number;
}

export default function Analytics() {
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
        const interval = setInterval(fetchAnalytics, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchAnalytics = async () => {
        try {
            const res = await fetch('/api/analytics');
            const data = await res.json();
            setAnalytics(data);
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-gray-500">Loading analytics...</div>;
    }

    const badges = [
        {
            title: 'Total Leads',
            value: analytics?.totalLeads || 0,
            icon: Users,
            color: 'bg-blue-100 text-blue-600',
            iconColor: 'text-blue-600'
        },
        {
            title: 'Synced Leads',
            value: analytics?.syncedLeads || 0,
            icon: CheckCircle,
            color: 'bg-green-100 text-green-600',
            iconColor: 'text-green-600'
        },
        {
            title: 'Pending Leads',
            value: analytics?.pendingLeads || 0,
            icon: AlertCircle,
            color: 'bg-yellow-100 text-yellow-600',
            iconColor: 'text-yellow-600'
        },
        {
            title: 'Pipeline Value',
            value: `$${((analytics?.totalPipelineValue || 0) / 1000).toFixed(0)}K`,
            icon: TrendingUp,
            color: 'bg-purple-100 text-purple-600',
            iconColor: 'text-purple-600'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {badges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                    <div key={idx} className={`${badge.color} rounded-lg p-6 shadow`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium opacity-75">{badge.title}</p>
                                <p className="text-3xl font-bold mt-1">{badge.value}</p>
                            </div>
                            <Icon className={`w-12 h-12 opacity-20`} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}