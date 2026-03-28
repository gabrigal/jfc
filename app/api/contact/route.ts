import { NextRequest, NextResponse } from 'next/server'

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL
if (!N8N_WEBHOOK_URL) throw new Error('N8N_WEBHOOK_URL is not set')

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, service, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const n8nRes = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, service, message }),
    })

    if (!n8nRes.ok) {
      console.error('n8n webhook failed:', n8nRes.status)
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
