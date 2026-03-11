import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 })
    }

    const apiKey = process.env.MAILCHIMP_API_KEY
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID
    const server = process.env.MAILCHIMP_API_SERVER || 'us1'

    // If Mailchimp credentials are not configured, return success (dev mode)
    if (!apiKey || apiKey === 'your-mailchimp-api-key' || !audienceId || audienceId === 'your-audience-id') {
      console.log(`[Newsletter] Would subscribe: ${email} (Mailchimp not configured)`)
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed! (Demo mode)',
      })
    }

    const url = `https://${server}.api.mailchimp.com/3.0/lists/${audienceId}/members`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `apikey ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        tags: ['website-signup'],
      }),
    })

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Successfully subscribed!' })
    }

    if (data.title === 'Member Exists') {
      return NextResponse.json({ error: 'This email is already subscribed!' }, { status: 400 })
    }

    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 })
  } catch (err) {
    console.error('Newsletter subscription error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
