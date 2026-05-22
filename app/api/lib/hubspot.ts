import axios from 'axios';

const HUBSPOT_API_BASE = 'https://api.hubapi.com';
const HUBSPOT_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;

interface Lead {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    budget: string;
    hubspotId?: string | null;
}

export async function syncLeadToHubSpot(lead: Lead) {
    try {
        if (!HUBSPOT_TOKEN) {
            console.warn('HubSpot token not configured');
            return null;
        }

        // Extract budget value in numbers
        const budgetMap: { [key: string]: string } = {
            'Under $10k': 'Under 10000',
            '$10k-$50k': '10000-50000',
            'Greater than $50k': 'Over 50000'
        };

        const budgetValue = budgetMap[lead.budget] || lead.budget;

        const response = await axios.post(
            `${HUBSPOT_API_BASE}/crm/v3/objects/contacts`,
            {
                properties: {
                    firstname: lead.firstName,
                    lastname: lead.lastName,
                    email: lead.email,
                    company: lead.company,
                    lifecyclestage: 'lead',
                    hs_lead_status: 'NEW',
                    budget_range: budgetValue
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${HUBSPOT_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.id;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('HubSpot API Error:', error.response?.data);
        }
        throw error;
    }
}

export async function checkHubSpotConnection() {
    try {
        if (!HUBSPOT_TOKEN) {
            return false;
        }

        const response = await axios.get(
            `${HUBSPOT_API_BASE}/crm/v3/objects/contacts?limit=1`,
            {
                headers: {
                    Authorization: `Bearer ${HUBSPOT_TOKEN}`
                }
            }
        );

        return response.status === 200;
    } catch (error) {
        console.error('HubSpot connection check failed:', error);
        return false;
    }
}