'use client';

import { useEffect, useState } from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Lead {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    budget_range: string;
    createdAt: string;
    syncStatus: 'pending' | 'synced' | 'failed';
}

export default function LeadFeed() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeads();
        const interval = setInterval(fetchLeads, 3000);
        return () => clearInterval(interval);
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await fetch('/api/leads');
            const data = await res.json();
            setLeads(data.leads.reverse());
        } catch (error) {
            console.error('Failed to fetch leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'synced':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'failed':
                return <AlertCircle className="w-5 h-5 text-red-600" />;
            default:
                return <Clock className="w-5 h-5 text-yellow-600" />;
        }
    };

    const getStatusBadge = (status: string) => {
        const statusClasses = {
            synced: 'bg-green-100 text-green-800',
            failed: 'bg-red-100 text-red-800',
            pending: 'bg-yellow-100 text-yellow-800'
        };

        return statusClasses[status as keyof typeof statusClasses] || statusClasses.pending;
    };

    if (loading) {
        return <div className="text-center py-8 text-gray-500">Loading leads...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Live Lead Feed</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Company</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Budget</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Submitted</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {leads.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                No leads yet
                            </td>
                        </tr>
                    ) : (
                        leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium text-gray-900">
                                        {lead.firstName} {lead.lastName}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-600">{lead.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-600">{lead.company}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-600">{lead.budget_range}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-600">
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(lead.syncStatus)}
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(lead.syncStatus)}`}>
                        {lead.syncStatus.charAt(0).toUpperCase() + lead.syncStatus.slice(1)}
                      </span>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}