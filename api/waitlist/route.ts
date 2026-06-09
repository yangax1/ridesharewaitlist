import { NextResponse } from "next/server";

/**
 * POST /api/waitlist
 *
 * Accepts { firstName, lastName, email, classYear, usePlan, submittedAt }
 * from the waitlist form and forwards each row to the spreadsheet webhook
 * configured in `.env.local`:
 *
 *   WAITLIST_WEBHOOK_URL  — webhook URL that accepts JSON POST. Works
 *                           with Google Apps Script (Sheets), Microsoft
 *                           Power Automate (Excel Online), SheetMonkey,
 *                           Sheety, Sheet.best, Zapier, or Make.com.
 *
 * If the env var isn't set, the endpoint still returns 200 and logs the
 * submission to the server console — so you can test the form end-to-end
 * before finishing the sheet wiring.
 */

interface Submission {
  firstName: string;
  lastName: string;
  email: string;
  classYear: string;
  usePlan: string; // e.g. "offer rides, take rides"
  submittedAt: string;
}

function isValid(body: unknown): body is Submission {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.firstName === "string" &&
    b.firstName.trim().length > 0 &&
    typeof b.lastName === "string" &&
    b.lastName.trim().length > 0 &&
    typeof b.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.classYear === "string" &&
    b.classYear.trim().length > 0 &&
    typeof b.usePlan === "string" &&
    b.usePlan.trim().length > 0 &&
    typeof b.submittedAt === "string"
  );
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const submission = body as Submission;
  const webhook = process.env.WAITLIST_WEBHOOK_URL;

  if (!webhook) {
    console.log("[waitlist] (no webhook set)", submission);
    return NextResponse.json({ ok: true, forwarded: false });
  }

  try {
    // Google Apps Script returns a 302 to script.googleusercontent.com on
    // success — `doPost` has already run by the time the redirect fires.
    // Disable follow so we don't lose the POST body on the redirected GET,
    // and treat 2xx OR 302 (Apps Script's success signature) as success.
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
      redirect: "manual",
    });
    const ok = res.ok || res.status === 302 || res.status === 0;
    if (!ok) {
      const text = await res.text().catch(() => "");
      console.error("[waitlist] webhook responded", res.status, text.slice(0, 200));
      return NextResponse.json(
        { error: `Webhook returned ${res.status}` },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true, forwarded: true });
  } catch (err) {
    console.error("[waitlist] webhook fetch failed", err);
    return NextResponse.json({ error: "Webhook fetch failed" }, { status: 502 });
  }
}
