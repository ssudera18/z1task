import { NextRequest, NextResponse } from 'next/server';
import { syncLeadToHubSpot } from '../lib/hubspot';
import { saveLead, getLeads } from '../lib/database';


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const { firstName, lastName, email, company, budget } = body;
    
    // Validate input
    if (!firstName || !lastName || !email || !company || !budget) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Save to local database
    const lead = await saveLead({
      firstName,
      lastName,
      email,
      company,
      budget,
      createdAt: new Date(),
      hubspotId: null,
      syncStatus: 'pending'
    });
    
    // Sync to HubSpot asynchronously
    syncLeadToHubSpot(lead).catch(console.error);
    
    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error('Error saving lead:', error);
    return NextResponse.json(
      { error: 'Failed to save lead' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json({ leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}