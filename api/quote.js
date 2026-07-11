// Vercel Edge Function — receives the quote form submission (with optional photo
// attachment) and emails it via Resend. Requires a RESEND_API_KEY env var set in
// the Vercel project settings, and a RESEND_TO_EMAIL / RESEND_FROM_EMAIL if you
// want to override the defaults below.
export const config = { runtime: 'edge' }

const TO_EMAIL = process.env.RESEND_TO_EMAIL || 'santosh10392@gmail.com'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

function escapeHtml(str = '') {
  return str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, message: 'Method not allowed' }), { status: 405 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ success: false, message: 'Server not configured' }), { status: 500 })
  }

  let formData
  try {
    formData = await request.formData()
  } catch {
    return new Response(JSON.stringify({ success: false, message: 'Invalid form data' }), { status: 400 })
  }

  // Honeypot — silently accept so bots don't learn anything, but skip sending.
  if (formData.get('botcheck')) {
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  }

  const name = formData.get('name')?.toString().trim() || ''
  const phone = formData.get('phone')?.toString().trim() || ''
  const postcode = formData.get('postcode')?.toString().trim() || ''
  const service = formData.get('service')?.toString().trim() || ''
  const message = formData.get('message')?.toString().trim() || ''

  if (!name || !phone) {
    return new Response(JSON.stringify({ success: false, message: 'Name and phone are required' }), { status: 400 })
  }

  const attachments = []
  const photo = formData.get('attachment')
  if (photo && typeof photo === 'object' && photo.size > 0) {
    const buf = await photo.arrayBuffer()
    attachments.push({
      filename: photo.name || 'photo.jpg',
      content: Buffer.from(buf).toString('base64'),
    })
  }

  const rows = [
    ['Name', name],
    ['Phone', phone],
    ['Postcode', postcode || '—'],
    ['Service needed', service || '—'],
    ['Message', message || '—'],
  ]
  const html = `
    <h2>New quote request</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows.map(([label, value]) => `
        <tr>
          <td style="font-weight:bold;vertical-align:top">${escapeHtml(label)}</td>
          <td>${escapeHtml(value).replace(/\n/g, '<br/>')}</td>
        </tr>
      `).join('')}
    </table>
    ${attachments.length ? '<p>Customer attached a photo of the problem — see attachment.</p>' : ''}
  `

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `247 Emergency Plumber Norwich <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      reply_to: phone,
      subject: `New quote request from ${name}`,
      html,
      attachments,
    }),
  })

  if (!resendRes.ok) {
    const detail = await resendRes.text().catch(() => '')
    return new Response(JSON.stringify({ success: false, message: 'Email send failed', detail }), { status: 502 })
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 })
}
