import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const hubspotToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
    const isConnected = !!hubspotToken && hubspotToken.length > 0;
    
    return NextResponse.json({
      connected: isConnected,
      lastChecked: new Date(),
      message: isConnected ? 'Connected to HubSpot' : 'Not connected'
    });
  } catch (error) {
    return NextResponse.json(
      { connected: false, error: 'Failed to check status' },
      { status: 500 }
    );
  }
}