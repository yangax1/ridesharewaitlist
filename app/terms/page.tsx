import Link from "next/link";

export const metadata = {
  title: "Waitlist Terms · HRide",
  description: "Terms of Service for joining the HRide waitlist.",
};

export default function TermsPage() {
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
          Waitlist Terms of Service
        </h1>
        <p className="text-sm text-gray-500 mt-2">Last updated: June 8, 2026</p>

        <Section title="1. What this covers">
          These terms govern your use of the HRide waitlist page and the
          email signup form on that page. They do not cover the HRide
          mobile or web application itself — separate terms will apply
          when the app launches.
        </Section>

        <Section title="2. Who can join">
          The waitlist is open to current Hamilton College students. By
          submitting the form, you confirm that you are a current student,
          at least 18 years old, and that the information you provided
          (name, school email, class year, and intended use) is accurate.
        </Section>

        <Section title="3. What joining the waitlist means">
          Joining the waitlist signals interest. It is not a binding
          contract, does not guarantee access to the HRide app at launch,
          and does not entitle you to any rewards, payments, or services.
          We may invite waitlist members in any order, including by class
          year, signup date, or intended use.
        </Section>

        <Section title="4. Your submission">
          You are responsible for the accuracy of the information you
          provide. Submitting false information, signing up other people
          without their consent, or submitting the form repeatedly with
          the intent to disrupt the service may result in your entry being
          removed from the waitlist.
        </Section>

        <Section title="5. Communications">
          By joining, you agree that HRide may email you using the address
          you provided, solely to update you about the HRide waitlist and
          product launch. You can ask to be removed at any time by
          emailing the contact address in our Privacy Policy.
        </Section>

        <Section title="6. No affiliation with Hamilton College">
          HRide is an independent project built by Hamilton students. We
          are not affiliated with, endorsed by, or operated by Hamilton
          College. References to Hamilton, including the &ldquo;@hamilton.edu&rdquo;
          email format, are used only to identify our community of users.
        </Section>

        <Section title="7. Intellectual property">
          The HRide name, logo, and waitlist page design are the property
          of the HRide team. You may not copy, reproduce, or create
          derivative works of the page without written permission.
        </Section>

        <Section title="8. Changes to the waitlist or these terms">
          We may update these terms or change how the waitlist works at
          any time. Material changes will be reflected by an updated
          &ldquo;Last updated&rdquo; date at the top of this page. Continuing to keep
          your information on the waitlist after a change means you accept
          the updated terms.
        </Section>

        <Section title="9. Disclaimer of warranties">
          The waitlist page is provided &ldquo;as is&rdquo; without warranties of any
          kind, express or implied. We do not warrant that the page will
          be available without interruption, free of errors, or secure
          against unauthorized access.
        </Section>

        <Section title="10. Limitation of liability">
          To the maximum extent permitted by law, the HRide team will not
          be liable for any indirect, incidental, or consequential damages
          arising out of your use of the waitlist page, including lost
          data, missed launch invitations, or any inability to access the
          page.
        </Section>

        <Section title="11. Governing law">
          These terms are governed by the laws of the State of New York,
          without regard to its conflict of laws principles. Any dispute
          arising from these terms or your use of the waitlist will be
          resolved in the state or federal courts located in Oneida
          County, New York.
        </Section>

        <Section title="12. Contact">
          Questions about these terms? Email{" "}
          <a href="mailto:hello@hride.app" className="underline underline-offset-2">
            hello@hride.app
          </a>
          .
        </Section>

        <p className="text-xs text-gray-400 mt-12 pt-8 border-t border-gray-100">
          See also: <Link href="/privacy" className="underline underline-offset-2">Privacy Policy</Link>.
        </p>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold tracking-tight text-gray-900">{title}</h2>
      <p className="text-sm text-gray-700 mt-2 leading-relaxed">{children}</p>
    </section>
  );
}
