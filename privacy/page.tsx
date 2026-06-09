import Link from "next/link";

export const metadata = {
  title: "Waitlist Privacy Policy · HRide",
  description: "How HRide collects and uses the information you give us when joining the waitlist.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="text-xs text-gray-500 hover:text-black inline-flex items-center gap-1 mb-8"
        >
          ← Back to HRide
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Waitlist Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mt-2">Last updated: June 8, 2026</p>

        <Section title="1. What this covers">
          This Privacy Policy explains what we collect, why, and what we do
          with it when you fill out the HRide waitlist form. It applies
          only to the waitlist page — separate, more detailed privacy
          terms will apply when the HRide app launches.
        </Section>

        <Section title="2. What we collect">
          When you submit the waitlist form, we collect:
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>First name and last name</li>
            <li>Email address (typically a school email)</li>
            <li>Class year</li>
            <li>Whether you plan to offer rides, take rides, or both</li>
            <li>The date and time you submitted the form</li>
          </ul>
          We do not collect passwords, phone numbers, payment details,
          location data, or government-issued IDs at the waitlist stage.
        </Section>

        <Section title="3. How we collect it">
          You enter the information directly into the form. Submissions
          are sent to a server we operate, which forwards them to a
          private database we control. We do not use third-party
          analytics, advertising trackers, or cookies on the waitlist
          page beyond what the platform requires to serve the page itself.
        </Section>

        <Section title="4. Why we collect it">
          We use the information to:
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              Estimate demand and figure out the right time and order to
              invite people when HRide launches.
            </li>
            <li>
              Send you a small number of emails about the waitlist, the
              launch, and early-access invitations — and nothing else.
            </li>
            <li>
              Detect duplicate or bogus signups so the waitlist stays
              useful.
            </li>
          </ul>
        </Section>

        <Section title="5. Who can see it">
          Access to the internal database is limited to the small group of
          students building HRide. We do not sell, rent, or share your
          information with advertisers, data brokers, or any third party
          unrelated to HRide. We may share aggregated, non-identifying
          stats (e.g., &ldquo;X students from Hamilton joined this month&rdquo;) in
          public posts about the project.
        </Section>

        <Section title="6. Where it lives">
          The form data is stored in Google Workspace. Our
          waitlist server runs on standard hosting infrastructure
          (Vercel). Both providers maintain industry-standard security
          practices. No system is perfectly secure — by using the form,
          you accept this risk.
        </Section>

        <Section title="7. How long we keep it">
          We keep your submission until you ask us to delete it, or until
          24 months after the HRide app launches publicly — whichever
          comes first. After that, the row is removed from the database.
        </Section>

        <Section title="8. Your choices">
          You can ask us at any time to:
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>See what we have on file for you</li>
            <li>Correct any of it</li>
            <li>Delete your entry from the waitlist</li>
            <li>Stop receiving waitlist emails</li>
          </ul>
          Email{" "}
          <a href="mailto:hello@hride.app" className="underline underline-offset-2">
            hello@hride.app
          </a>{" "}
          from the address you used to sign up and we&apos;ll handle it within
          a reasonable time.
        </Section>

        <Section title="9. Minors">
          The HRide waitlist is intended for college students aged 18 or
          older. We do not knowingly collect information from anyone under
          13, and we discourage signups from anyone under 18. If you
          believe someone under 13 has submitted the form, email us and
          we&apos;ll delete the entry.
        </Section>

        <Section title="10. Not affiliated with Hamilton College">
          HRide is built by Hamilton students but is not operated by,
          affiliated with, or endorsed by Hamilton College. The use of an
          &ldquo;@hamilton.edu&rdquo; email is only to confirm you&apos;re part of the
          community we&apos;re launching with first.
        </Section>

        <Section title="11. Changes to this policy">
          We may update this policy as the project evolves. Material
          changes will be reflected by an updated &ldquo;Last updated&rdquo; date at
          the top of this page. If we make substantive changes that
          significantly expand how we use your data, we&apos;ll email people on
          the waitlist before applying them.
        </Section>

        <Section title="12. Contact">
          Privacy questions or requests? Email{" "}
          <a href="mailto:hello@hride.app" className="underline underline-offset-2">
            hello@hride.app
          </a>
          .
        </Section>

        <p className="text-xs text-gray-400 mt-12 pt-8 border-t border-gray-100">
          See also: <Link href="/terms" className="underline underline-offset-2">Terms of Service</Link>.
        </p>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold tracking-tight text-gray-900">{title}</h2>
      <div className="text-sm text-gray-700 mt-2 leading-relaxed">{children}</div>
    </section>
  );
}
