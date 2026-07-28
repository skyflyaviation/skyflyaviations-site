/**
 * SkyFly Aviations - Contact Form API
 * Vercel Serverless Function
 * Uses Resend SDK to send enquiries to info@skyflyaviations.in
 */

import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = 'info@skyflyaviations.in';
const FROM_EMAIL = 'contact@skyflyaviations.in';

function esc(text) {
  if (!text) return '';
  var s = String(text);
  var a = String.fromCharCode(38);
  var l = String.fromCharCode(60);
  var g = String.fromCharCode(62);
  var q = String.fromCharCode(34);
  var ap = String.fromCharCode(39);
  var map = {};
  map[a] = a + 'amp;';
  map[l] = a + 'lt;';
  map[g] = a + 'gt;';
  map[q] = a + 'quot;';
  map[ap] = a + '#039;';
  return s.replace(/[&<>"']/g, function(m) { return map[m]; });
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate API key is configured
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY environment variable is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const { name, email, organization, interestedIn, subject, message } = req.body;

    // Use interestedIn as subject if subject is not provided
    const emailSubject = subject || interestedIn || 'General Enquiry';

    // Server-side validation
    const errors = [];
    if (!name || name.trim().length < 2) {
      errors.push('Name is required (minimum 2 characters)');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('A valid email address is required');
    }
    if (!message || message.trim().length < 10) {
      errors.push('Message is required (minimum 10 characters)');
    }

    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join('. ') });
    }

    // Build email HTML
    var html = '<!DOCTYPE html><html><head><meta charset="utf-8">';
    html += '<style>body{font-family:Segoe UI,sans-serif;margin:0;padding:0;background:#f4f4f4}';
    html += '.container{max-width:600px;margin:20px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1)}';
    html += '.header{background:linear-gradient(135deg,#0a0a2e,#1a1a4e);padding:30px;text-align:center}';
    html += '.header h1{color:#fff;margin:0;font-size:24px}';
    html += '.header p{color:#a0a0d0;margin:5px 0 0;font-size:14px}';
    html += '.body{padding:30px}';
    html += '.field{margin-bottom:20px}';
    html += '.field-label{font-size:12px;text-transform:uppercase;color:#888;font-weight:600;letter-spacing:0.5px;margin-bottom:4px}';
    html += '.field-value{font-size:16px;color:#333;background:#f9f9f9;padding:10px 14px;border-radius:8px;border-left:3px solid #4f46e5}';
    html += '.footer{background:#f9f9f9;padding:20px 30px;text-align:center;font-size:12px;color:#999;border-top:1px solid #eee}';
    html += '</style></head><body>';
    html += '<div class="container">';
    html += '<div class="header"><h1>New Contact Enquiry</h1><p>SkyFly Aviations - Website Contact Form</p></div>';
    html += '<div class="body">';
    html += '<div class="field"><div class="field-label">Name</div><div class="field-value">' + esc(name) + '</div></div>';
    html += '<div class="field"><div class="field-label">Email</div><div class="field-value"><a href="mailto:' + esc(email) + '">' + esc(email) + '</a></div></div>';
    html += '<div class="field"><div class="field-label">Organization</div><div class="field-value">' + esc(organization || 'Not provided') + '</div></div>';
    html += '<div class="field"><div class="field-label">Subject</div><div class="field-value">' + esc(emailSubject) + '</div></div>';
    html += '<div class="field"><div class="field-label">Message</div><div class="field-value">' + esc(message) + '</div></div>';
    html += '</div>';
    html += '<div class="footer">Sent via skyflyaviations.in contact form</div>';
    html += '</div></body></html>';

    // Initialize Resend SDK
    const resend = new Resend(RESEND_API_KEY);

    // Send via Resend SDK
    const { data, error } = await resend.emails.create({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: 'New Enquiry from ' + name + ' - ' + emailSubject,
      html: html,
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(500).json({ error: 'Unable to send your message. Please try again.' });
    }

    console.log('Email sent successfully:', data.id);
    return res.status(200).json({
      success: true,
      message: 'Thank you for contacting SkyFly Aviations. We will get back to you shortly.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Unable to send your message. Please try again.' });
  }
}