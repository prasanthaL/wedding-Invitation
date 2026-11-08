import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Replace this with your deployed Google Apps Script Web App URL (or set GOOGLE_SCRIPT_URL in .env.local)
const DEFAULT_GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';
const SPREADSHEET_ID = '1Bd40QMmEGLkJxzTfDF6daoekLbShVeVdK3UqlNKDOOs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = {
      spreadsheetId: SPREADSHEET_ID,
      timestamp: new Date().toLocaleString('en-GB', { timeZone: 'Asia/Colombo' }),
      name: body.name || '',
      phone: body.phone || '',
      attending: body.attending === 'yes' ? 'Yes (සහභාගී වේ)' : 'No (සහභාගී නොවේ)',
      guests: body.attending === 'no' ? 0 : Number(body.guests ?? 1),
    };

    if (DEFAULT_GOOGLE_SCRIPT_URL) {
      const response = await fetch(DEFAULT_GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        redirect: 'follow',
      });

      if (!response.ok) {
        throw new Error(`Google Script responded with status ${response.status}`);
      }
    } else {
      // Local fallback backup until GOOGLE_SCRIPT_URL is configured
      try {
        const backupPath = path.join(process.cwd(), 'rsvp-submissions.json');
        let existing: unknown[] = [];
        try {
          const content = await fs.readFile(backupPath, 'utf8');
          existing = JSON.parse(content);
        } catch {
          existing = [];
        }
        existing.push(payload);
        await fs.writeFile(backupPath, JSON.stringify(existing, null, 2), 'utf8');
      } catch {
        // Ignore filesystem write errors in serverless environments
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('RSVP submission error:', error);
    return NextResponse.json({ ok: false, error: 'Failed to save RSVP' }, { status: 500 });
  }
}

