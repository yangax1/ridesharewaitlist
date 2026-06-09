"use client";

import { useState } from "react";

/**
 * HRide — waitlist landing page.
 *
 * Black & white scheme. Features are deliberately high-level so the page
 * communicates value without giving away the full product spec.
 */
const CLASS_YEARS = ["2026", "2027", "2028", "2029"] as const;
type ClassYear = (typeof CLASS_YEARS)[number] | "";

type UsePlan = "offer" | "take";

export default function WaitlistPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [classYear, setClassYear] = useState<ClassYear>("");
  const [usePlan, setUsePlan] = useState<UsePlan[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const toggleUse = (plan: UsePlan) =>
    setUsePlan((prev) =>
      prev.includes(plan) ? prev.filter((p) => p !== plan) : [...prev, plan]
    );

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const namesOk = firstName.trim().length > 0 && lastName.trim().length > 0;
  const yearOk = classYear !== "";
  const useOk = usePlan.length > 0;
  const isValid = emailOk && namesOk && yearOk && useOk;
  const submitted = status === "submitted";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || status === "submitting") return;
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          classYear,
          usePlan: usePlan
            .map((p) => (p === "offer" ? "offer rides" : "take rides"))
            .join(", "),
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("submitted");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Top nav */}
      <header className="w-full border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-bold tracking-tight text-lg">HRide</span>
          </div>
          <a
            href="#join"
            className="hidden sm:inline-flex items-center justify-center bg-black text-white text-sm font-semibold rounded-full px-4 py-2 hover:opacity-90 transition"
          >
            Join the waitlist
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto w-full px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500 border border-gray-200 rounded-full px-3 py-1 mb-6">
              Now boarding · Hamilton College
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Rides between
              <br /> students,
              <br /> not strangers.
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mt-6 max-w-md leading-relaxed">
              HRide is a campus-only carpool board. Post where you&apos;re going,
              find a verified classmate heading the same way, and split the trip.
            </p>

            {/* Signup */}
            <form
              id="join"
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-2 max-w-md"
            >
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  autoComplete="given-name"
                  className="bg-white border border-gray-300 rounded-full px-5 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-black"
                  aria-label="First name"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  autoComplete="family-name"
                  className="bg-white border border-gray-300 rounded-full px-5 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-black"
                  aria-label="Last name"
                />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@hamilton.edu"
                autoComplete="email"
                className="bg-white border border-gray-300 rounded-full px-5 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-black"
                aria-label="Email address"
              />

              {/* Class year */}
              <div className="relative">
                <select
                  value={classYear}
                  onChange={(e) => setClassYear(e.target.value as ClassYear)}
                  className={`appearance-none w-full bg-white border border-gray-300 rounded-full px-5 py-3 pr-10 text-sm focus:outline-none focus:border-black ${
                    classYear === "" ? "text-gray-400" : "text-gray-900"
                  }`}
                  aria-label="Class year"
                >
                  <option value="" disabled>
                    Class year
                  </option>
                  {CLASS_YEARS.map((y) => (
                    <option key={y} value={y} className="text-gray-900">
                      Class of {y}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6b7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {/* How they plan to use the app */}
              <div className="mt-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  How do you plan to use HRide?
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "offer" as const, label: "Offer rides" },
                    { key: "take" as const, label: "Take rides" },
                  ].map((opt) => {
                    const active = usePlan.includes(opt.key);
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => toggleUse(opt.key)}
                        aria-pressed={active}
                        className={`rounded-full px-4 py-2 text-sm font-medium border transition ${
                          active
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-gray-400 mt-2">Pick one or both.</p>
              </div>

              <button
                type="submit"
                disabled={!isValid || status === "submitting" || submitted}
                className={`mt-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
                  submitted
                    ? "bg-gray-100 text-gray-500 cursor-default"
                    : isValid && status !== "submitting"
                    ? "bg-black text-white hover:opacity-90"
                    : "bg-black text-white opacity-40 cursor-not-allowed"
                }`}
              >
                {submitted
                  ? "You're on the list"
                  : status === "submitting"
                  ? "Joining…"
                  : "Join waitlist"}
              </button>
            </form>

            {submitted ? (
              <p className="text-xs text-gray-500 mt-3">
                Thanks — you&apos;re on the list.{" "}
                <button
                  type="button"
                  onClick={() => {
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setClassYear("");
                    setUsePlan([]);
                    setStatus("idle");
                    setError(null);
                  }}
                  className="underline underline-offset-2 text-gray-700 hover:text-black font-medium"
                >
                  Sign up someone else
                </button>
              </p>
            ) : (
              <p className="text-xs text-gray-400 mt-3">
                {status === "error" && error
                  ? `Couldn't submit: ${error}. Try again.`
                  : "We'll only email you when HRide launches at your school."}
              </p>
            )}

            {!submitted && (
              <p className="text-[11px] text-gray-400 mt-2 max-w-md leading-relaxed">
                By joining, you agree to our{" "}
                <a href="/terms" className="underline underline-offset-2 hover:text-gray-700">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="underline underline-offset-2 hover:text-gray-700">
                  Privacy Policy
                </a>
                .
              </p>
            )}
          </div>

          {/* Right column — visual placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] w-full max-w-sm mx-auto bg-gray-100 border border-gray-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-black text-white px-5 py-4 flex items-center gap-2">
                <Logo color="white" />
                <span className="font-bold tracking-tight">HRide</span>
              </div>
              <div className="flex-1 p-5 flex flex-col gap-3">
                <PreviewCard from="Campus" to="Albany Airport" date="Fri · 3:30 PM" seats="2 seats" price="$18" />
                <PreviewCard from="Campus" to="NYC — Penn"     date="Sat · 9:00 AM" seats="3 seats" price="$45" />
                <PreviewCard from="Campus" to="Hannaford"      date="Sun · 11:00 AM" seats="1 seat"  price="$4" dim />
                <div className="mt-auto text-[11px] text-gray-400 text-center pt-3">
                  Preview · Not real rides
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Built for campus, not the open road.
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl">
            HRide stays inside your school&apos;s community — every member
            is a verified student, and every ride goes somewhere your classmates
            actually need to be.
          </p>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Feature title="Students only" body="Sign-in is gated to a verified school email so you always know who's behind the wheel." />
            <Feature title="See where people are going" body="A live board of upcoming trips around campus — airports, home, errands, weekend plans." />
            <Feature title="Split the cost, simply" body="Drivers set a fair seat price. Riders pay through the tag they already use." />
            <Feature title="Profiles you can trust" body="Each student has a profile with on-time history, cancellations, and ratings from past rides." />
            <Feature title="Designed for the trips you actually take" body="From a quick grocery run to a holiday trip home — both fit on the same simple board." />
            <Feature title="Quiet by default" body="No spammy notifications. Just a heads-up when something matters: a match, a message, a confirmed seat." />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">How it works</h2>
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            <Step n={1} title="Verify with your school email" body="Confirms you're a current student. Takes a minute." />
            <Step n={2} title="Post or browse a trip" body="Heading somewhere? Post it. Need a ride? Tap a card." />
            <Step n={3} title="Match and go" body="Message in-app, agree on a pickup, and split the cost." />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-gray-100 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Be first when HRide opens at your school.
          </h2>
          <p className="text-gray-300 mt-3 max-w-lg">
            Early waitlist members get priority access during launch week.
          </p>
          <a
            href="#join"
            className="mt-8 inline-flex items-center justify-center bg-white text-black text-sm font-semibold rounded-full px-6 py-3 hover:opacity-90 transition"
          >
            Join the waitlist
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Logo size={16} />
            <span>© {new Date().getFullYear()} HRide. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="/terms" className="hover:text-black underline-offset-2 hover:underline">Terms</a>
            <a href="/privacy" className="hover:text-black underline-offset-2 hover:underline">Privacy</a>
            <span>Built by students, for students</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ── Small presentational helpers ───────────────────────── */

function Logo({ size = 22, color = "black" }: { size?: number; color?: "black" | "white" }) {
  const stroke = color === "white" ? "white" : "black";
  const fill = color === "white" ? "white" : "black";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="1" y="1" width="30" height="30" rx="8" stroke={stroke} strokeWidth="2" />
      <path
        d="M9 21 L9 12 L14 12 A4 4 0 0 1 14 20 L11 20 L11 17 L13.5 17 A1.5 1.5 0 0 0 13.5 14 L11 14 L11 21 Z"
        fill={fill}
      />
      <circle cx="22" cy="20" r="2" fill={fill} />
    </svg>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-sm transition-shadow">
      <div className="w-9 h-9 rounded-lg bg-black flex items-center justify-center mb-4">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3 className="font-semibold text-base text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{body}</p>
    </div>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="flex flex-col">
      <div className="w-10 h-10 rounded-full border-2 border-black text-black font-bold flex items-center justify-center text-sm">
        {n}
      </div>
      <h3 className="font-semibold text-base text-gray-900 mt-4">{title}</h3>
      <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{body}</p>
    </div>
  );
}

function PreviewCard({
  from, to, date, seats, price, dim = false,
}: {
  from: string; to: string; date: string; seats: string; price: string; dim?: boolean;
}) {
  return (
    <div className={`bg-white border border-gray-200 rounded-2xl p-3 flex items-center justify-between ${dim ? "opacity-60" : ""}`}>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="font-medium text-gray-700">{from}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="font-medium text-gray-900 truncate">{to}</span>
        </div>
        <div className="text-[11px] text-gray-400 mt-1">{date} · {seats}</div>
      </div>
      <div className="text-sm font-bold text-gray-900 flex-shrink-0 ml-3">{price}</div>
    </div>
  );
}
