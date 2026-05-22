// In-memory database (for demo; replace with real DB like Prisma + PostgreSQL for production)
let leadsDatabase: any[] = [];

export interface Lead {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    budget: string;
    createdAt: Date;
    hubspotId: string | null;
    syncStatus: 'pending' | 'synced' | 'failed';
}

export async function saveLead(lead: Omit<Lead, 'id'>): Promise<Lead> {
    const newLead: Lead = {
        id: Date.now().toString(),
        ...lead
    };
    leadsDatabase.push(newLead);
    return newLead;
}

export async function updateLeadSyncStatus(
    leadId: string,
    status: 'pending' | 'synced' | 'failed',
    hubspotId?: string
) {
    const lead = leadsDatabase.find(l => l.id === leadId);
    if (lead) {
        lead.syncStatus = status;
        if (hubspotId) lead.hubspotId = hubspotId;
    }
}

export async function getLeads(): Promise<Lead[]> {
    return leadsDatabase;
}

export async function getAnalytics() {
    const totalLeads = leadsDatabase.length;
    const syncedLeads = leadsDatabase.filter(l => l.syncStatus === 'synced').length;

    const budgetMap: { [key: string]: number } = {
        'Under $10k': 5000,
        '$10k-$50k': 30000,
        'Greater than $50k': 100000
    };

    const totalPipelineValue = leadsDatabase.reduce((sum, lead) => {
        return sum + (budgetMap[lead.budget] || 0);
    }, 0);

    return {
        totalLeads,
        syncedLeads,
        pendingLeads: leadsDatabase.filter(l => l.syncStatus === 'pending').length,
        failedLeads: leadsDatabase.filter(l => l.syncStatus === 'failed').length,
        totalPipelineValue,
        averageDealSize: totalLeads > 0 ? totalPipelineValue / totalLeads : 0
    };
}