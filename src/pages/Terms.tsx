import { PublicPageLayout } from '@/components/layout/PublicPageLayout';

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-bold mt-10 mb-3">{children}</h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[#1A1A1A]/80 leading-relaxed mb-3">{children}</p>
);
const List = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="space-y-2 mb-3">
    {items.map((item, i) => (
      <li key={i} className="flex gap-2 text-[#1A1A1A]/80">
        <span className="text-[#D4AF37] flex-shrink-0">•</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export default function Terms() {
  return (
    <PublicPageLayout>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#B8941F]">Legal</p>
        <h1 className="text-3xl sm:text-4xl font-bold mt-2">Terms of Use</h1>
        <p className="mt-3 text-sm text-[#1A1A1A]/50">Version 2.0 · Effective {new Date().toISOString().slice(0, 10)}</p>

        <div className="mt-8 rounded-xl border border-[#E8DDB0] bg-[#FBF7E9] p-5">
          <h2 className="font-bold mb-2">Plain-language summary</h2>
          <p className="text-[#1A1A1A]/80 mb-2">
            Student Companion AI is a free-to-join platform: a curated opportunities feed, an AI chat
            assistant, and a course library (some courses free, some paid). We don't run or select
            applicants for any opportunity we list — always verify details on the original source before
            applying. Paid courses are processed securely by Flutterwave.
          </p>
          <p className="text-[#1A1A1A]/80">
            The AI assistant does its best to give accurate, grounded answers, but it can be wrong —
            treat it as a helpful starting point, not an authoritative source for high-stakes decisions.
          </p>
        </div>

        <H2>1. What this service is</H2>
        <P>
          Student Companion AI is a platform offering a curated feed of internships, jobs, fellowships,
          scholarships, and competitions; an AI chat assistant that answers academic and career
          questions; and a library of career-readiness courses. The platform is a product of Student
          Companion AI, based in Kigali, Rwanda.
        </P>
        <P>Browsing the opportunities feed and chatting with the AI assistant are free. Some courses in the course library require payment, processed by Flutterwave.</P>

        <H2>2. Who can use this service</H2>
        <P>
          This platform is designed for university undergraduate students and recent graduates (generally
          aged 18 and older). By creating an account, you confirm you are either 18 or older, or using it
          with the knowledge and consent of a parent or guardian.
        </P>

        <H2>3. Accounts</H2>
        <P>
          Some features (the AI assistant, courses, saved progress) require an account. You're responsible
          for keeping your login credentials confidential and for all activity under your account. Tell us
          immediately if you suspect unauthorised access.
        </P>

        <H2>4. The nature of the opportunities feed</H2>
        <div className="rounded-lg border border-[#1A1A1A]/10 bg-[#F5F5F5] p-4 my-4">
          <p className="font-semibold mb-2">Important: this is a curation service, not an application service.</p>
          <List
            items={[
              'We curate opportunities by researching publicly-available postings.',
              "We link out to the original organisation's application page.",
              'We do not process applications, screen candidates, guarantee outcomes, or act as an intermediary.',
              'We have no formal relationship with most organisations listed, unless explicitly stated.',
            ]}
          />
        </div>
        <P>When you click "Apply" on any opportunity, you leave our platform and enter a relationship with that third party — their terms and decisions apply from that point.</P>

        <H2>5. Accuracy and verification</H2>
        <List
          items={[
            <><strong>Deadlines change.</strong> Organisations sometimes move deadlines, close applications early, or cancel programs — always verify on the source site.</>,
            <><strong>Eligibility can change.</strong> Confirm you qualify before investing time in an application.</>,
            <><strong>AI answers can be wrong.</strong> The assistant is grounded in a knowledge base but can still misstate facts — verify anything important, especially deadlines, policy details, and eligibility.</>,
          ]}
        />

        <H2>6. Paid courses &amp; payments</H2>
        <List
          items={[
            'Course prices are shown in the currency listed on the course page before you pay.',
            'Payment is processed by Flutterwave, a licensed third-party payment processor. We never receive or store your card details.',
            "Enrollment is confirmed once Flutterwave reports a successful transaction; if payment fails, you're not enrolled and are not charged.",
            'Refund requests are handled case-by-case — email us within 7 days of purchase if a course was not as described or you were charged in error.',
          ]}
        />

        <H2>7. Liability and decisions you make</H2>
        <P>This platform is provided "as is," for informational and educational purposes. To the maximum extent permitted by law:</P>
        <List
          items={[
            'We are not liable for decisions you make based on information from the opportunities feed or the AI assistant.',
            'We are not liable for the outcomes of any application, interview, or programme resulting from an opportunity found here.',
            "We are not liable for the conduct of third-party organisations listed as opportunities. If you suspect a listing is misleading or fraudulent, email us immediately so we can investigate.",
            'We are not liable for technical outages or interruptions in service.',
          ]}
        />

        <H2>8. How you may use the platform</H2>
        <P>You may: browse and share opportunities freely; use the AI assistant and courses for your own learning; share links to the platform.</P>
        <P>You may not:</P>
        <List
          items={[
            'Scrape, republish, or commercially resell curated listings without permission.',
            'Use the platform to transmit malware, spam, or exploit technical vulnerabilities.',
            "Share your account credentials or impersonate another person.",
            'Impersonate Student Companion AI or claim to represent the platform.',
          ]}
        />

        <H2>9. Intellectual property</H2>
        <P>
          The platform's design, logo, course content, and curation structure are the intellectual
          property of Student Companion AI. Opportunity listing information (titles, deadlines,
          descriptions) comes from publicly-available sources and belongs to the respective organisations.
          You may reference and link to specific opportunities without attribution; reproducing the
          platform's design, logo, or course content requires our permission.
        </P>

        <H2>10. Reporting issues</H2>
        <P>
          If you find an inaccurate listing, suspect fraud, hit a broken link, or have a payment issue,
          email{' '}
          <a href="mailto:africa@studentcompanionai.xyz" className="text-[#B8941F] underline">africa@studentcompanionai.xyz</a>
          . We read every message and typically respond within 5 business days.
        </P>

        <H2>11. Changes to these terms</H2>
        <P>
          We may update these Terms of Use as the platform grows. Significant changes will be announced
          at the top of this page. Continued use after changes take effect constitutes acceptance of the
          updated terms.
        </P>

        <H2>12. Governing law</H2>
        <P>
          These Terms of Use are governed by the laws of Rwanda. Disputes will be resolved through
          good-faith discussion first; unresolved disputes fall under the jurisdiction of Rwandan courts.
        </P>

        <H2>13. Contact us</H2>
        <P>
          Email{' '}
          <a href="mailto:africa@studentcompanionai.xyz" className="text-[#B8941F] underline">africa@studentcompanionai.xyz</a>
          {' · '}
          <a href="https://studentcompanionai.xyz" target="_blank" rel="noopener" className="text-[#B8941F] underline">studentcompanionai.xyz</a>
        </P>

        <p className="mt-10 italic text-[#1A1A1A]/60">
          Thank you for using Student Companion AI. Apply well, and apply boldly.
        </p>
      </div>
    </PublicPageLayout>
  );
}
