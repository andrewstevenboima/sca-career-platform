import { PublicPageLayout } from '@/components/layout/PublicPageLayout';

function Table({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-[#E8DDB0]">
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([k, v], i) => (
            <tr key={i} className={i > 0 ? 'border-t border-[#E8DDB0]' : ''}>
              <th className="text-left font-semibold p-3 bg-[#FBF7E9] w-48 align-top">{k}</th>
              <td className="p-3 align-top text-[#1A1A1A]/80">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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

export default function Privacy() {
  return (
    <PublicPageLayout>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#B8941F]">Legal</p>
        <h1 className="text-3xl sm:text-4xl font-bold mt-2">Privacy &amp; Data Protection Policy</h1>
        <p className="mt-3 text-sm text-[#1A1A1A]/50">
          Version 2.0 · Effective {new Date().toISOString().slice(0, 10)}
          <br />
          Aligned with: Rwanda DPPL · AU AI Framework · GDPR Principles
        </p>

        <div className="mt-8 rounded-xl border border-[#E8DDB0] bg-[#FBF7E9] p-5">
          <h2 className="font-bold mb-2">Plain-language summary</h2>
          <p className="text-[#1A1A1A]/80 mb-2">
            <strong>Student Companion AI is a free account-based platform.</strong> To use it you create an
            account (name, email, password, or Google sign-in), and we store your profile, your chat
            questions, any documents you choose to upload, and your course enrollment/progress in our
            database. We use this only to run the product for you — to answer your questions, track your
            course progress, and remember who you are between visits.
          </p>
          <p className="text-[#1A1A1A]/80">
            We never sell your data. Paid courses are processed by Flutterwave — we never see or store
            your card details. You can ask us to delete your account and data at any time.
          </p>
        </div>

        <H2>1. Who we are</H2>
        <P>
          This Privacy Policy is issued by <strong>Student Companion AI</strong>, publisher of this
          platform (opportunities feed, AI chat assistant, and course library) at{' '}
          <code className="text-sm bg-[#F5F5F5] px-1.5 py-0.5 rounded">career.studentcompanionai.rw</code>.
          We are the data controller responsible for personal data collected here.
        </P>
        <Table
          rows={[
            ['Organisation', 'Student Companion AI'],
            ['Data Controller', 'Andrew Steven Boima, Founder'],
            ['Contact', <a key="e" href="mailto:africa@studentcompanionai.xyz" className="text-[#B8941F] underline">africa@studentcompanionai.xyz</a>],
            ['Based in', 'Kigali, Rwanda'],
          ]}
        />

        <H2>2. Who this policy applies to</H2>
        <P>This policy applies to anyone who creates an account, signs in, or otherwise uses this platform — the AI chat assistant, the opportunities feed, the course library, and the admin tools.</P>

        <H2>3. What data we collect</H2>
        <P>We practise data minimisation: we collect what the product actually needs to work, and nothing beyond that.</P>
        <Table
          rows={[
            ['Account info', 'Name and email address, via email/password sign-up or Google sign-in. Firebase Authentication issues and stores your credentials; we never see or store your password in plain text.'],
            ['Profile data', 'Your display name and account settings, stored in our Firestore database.'],
            ['Chat content', "Questions you ask the AI assistant are sent to our backend and to Anthropic's Claude API to generate a grounded answer, and may also be sent to Google's Gemini API when you use the in-course AI tutor. We do not sell or share this content."],
            ['Uploaded documents', 'Files you choose to upload (e.g. for the AI to reference) are stored in Firebase Storage, tied to your account.'],
            ['Course & enrollment data', 'Which courses you enroll in, your progress percentage, and completion status, stored in Firestore.'],
            ['Payment data', "For paid courses, payment is processed entirely by Flutterwave. We store only a transaction reference to confirm your enrollment — we never receive or store your card number, expiry, or CVV."],
            ['Technical metadata', 'Standard hosting/server logs (IP address, browser, visit time) from our hosting provider, used only for security and availability.'],
          ]}
        />
        <div className="rounded-lg border border-[#1A1A1A]/10 bg-[#F5F5F5] p-4 my-4">
          <P>
            <strong>Opportunities browsing itself needs no account data</strong> — the opportunities feed
            is public information curated from public sources, and we don't track what you click.
          </P>
        </div>

        <H2>4. How we use your data</H2>
        <List
          items={[
            'To run your account: sign you in, show your profile, and remember your course progress.',
            'To answer your questions through the AI assistant, grounded in the relevant knowledge base.',
            "To process course payments and confirm enrollment, via Flutterwave.",
            'To improve the product — e.g. aggregate, de-identified usage trends shown on our internal admin dashboards.',
          ]}
        />
        <div className="rounded-lg border border-[#1A1A1A]/10 bg-[#F5F5F5] p-4 my-4">
          <p className="font-semibold mb-2">We will NEVER:</p>
          <List
            items={[
              'Sell your data to third parties.',
              'Share it with recruiters, employers, or organisations listed as opportunities, without your explicit action (e.g. clicking "Apply").',
              'Use your chat content or documents for advertising.',
              'Store your card or payment details — that stays with Flutterwave.',
            ]}
          />
        </div>

        <H2>5. Legal basis for processing</H2>
        <P>
          Under the Rwanda Data Protection and Privacy Law (DPPL) and GDPR principles, we process your
          account and course data on the basis of your <strong>consent</strong> (given when you create an
          account) and <strong>contractual necessity</strong> (we need this data to provide the service
          you signed up for). Technical/server logs rely on our <strong>legitimate interest</strong> in
          keeping the platform secure.
        </P>

        <H2>6. Your rights</H2>
        <P>You have the following rights, which we will honour within 30 days of your request:</P>
        <Table
          rows={[
            ['Right to access', 'Ask us what data we hold about you.'],
            ['Right to deletion', 'Ask us to permanently delete your account and associated data.'],
            ['Right to correction', 'Update your profile information at any time from Settings.'],
            ['Right to portability', 'Get your data in a machine-readable format.'],
            ['Right to object', "Stop any processing you're uncomfortable with."],
            ['Right to withdraw consent', 'Delete your account at any time.'],
          ]}
        />
        <P>
          To exercise any of these rights, email{' '}
          <a href="mailto:africa@studentcompanionai.xyz" className="text-[#B8941F] underline">africa@studentcompanionai.xyz</a>{' '}
          with the subject line "Data rights request."
        </P>

        <H2>7. How long we keep your data</H2>
        <Table
          rows={[
            ['Account data', 'Kept while your account is active, deleted within 30 days of account deletion.'],
            ['Chat history', 'Kept to maintain conversation context; deletable on request.'],
            ['Uploaded documents', 'Kept until you remove them or delete your account.'],
            ['Server logs', "Held per our hosting providers' standard retention policy (typically 30–90 days)."],
          ]}
        />

        <H2>8. How we protect your data</H2>
        <List
          items={[
            <><strong>Authentication</strong> — handled by Firebase Authentication; we never see your raw password.</>,
            <><strong>Storage</strong> — account, course, and chat data live in Firestore, access-restricted by security rules tied to your signed-in identity.</>,
            <><strong>Transmission</strong> — all traffic uses HTTPS encryption.</>,
            <><strong>Payments</strong> — handled entirely by Flutterwave, a licensed, PCI-DSS-compliant payment processor; we never touch your card data.</>,
            <><strong>Breach notification</strong> — in the unlikely event of a data breach affecting your account, we will notify affected users within 72 hours of discovery.</>,
          ]}
        />

        <H2>9. Third parties we rely on</H2>
        <Table
          rows={[
            ['Firebase (Google)', "Authentication, database (Firestore), and file storage. Google's privacy policy applies to this processing."],
            ['Anthropic (Claude API)', 'Powers AI chat answers. Your questions are sent to Claude to generate a response; Anthropic does not use this content to train its models by default for API customers.'],
            ['Google Gemini API', 'Powers the in-course AI tutor.'],
            ['Flutterwave', 'Processes course payments. Your payment details go directly to Flutterwave, not to us.'],
            ['Vercel', 'Hosts this website.'],
          ]}
        />
        <P>
          We do not share your data with advertisers or with organisations listed as opportunities. When
          you click "Apply" on an opportunity, you leave our platform and that organisation's own privacy
          policy applies from that point.
        </P>

        <H2>10. External links</H2>
        <P>
          Every opportunity listed links out to a third-party website. We are not responsible for the
          content, accuracy, or privacy practices of those external sites. Always verify deadlines and
          requirements on the source site before applying.
        </P>

        <H2>11. Cross-border data transfers</H2>
        <P>
          Because we use Firebase, Anthropic, Google, Flutterwave, and Vercel, your data may be processed
          in data centres outside Rwanda, including the EU and United States. These providers maintain
          GDPR-aligned safeguards and Standard Contractual Clauses where applicable.
        </P>

        <H2>12. Children &amp; young people</H2>
        <P>
          This platform is intended for university undergraduate students (generally aged 18+). We do not
          knowingly create accounts for children under 13. If you believe a child under 13 has an account,
          contact us immediately and we will delete it.
        </P>

        <H2>13. Your right to complain</H2>
        <P>
          If you're unhappy with how we've handled your data, email us first at{' '}
          <a href="mailto:africa@studentcompanionai.xyz" className="text-[#B8941F] underline">africa@studentcompanionai.xyz</a>{' '}
          so we can resolve it directly. You also have the right to lodge a formal complaint with the{' '}
          <strong>Rwanda National Cyber Security Authority (NCSA)</strong> (
          <a href="https://www.ncsa.rw" target="_blank" rel="noopener" className="text-[#B8941F] underline">www.ncsa.rw</a>
          ) or, for EU residents, your national data protection authority.
        </P>

        <H2>14. Changes to this policy</H2>
        <P>
          We may update this policy as the platform grows. Significant changes will be announced at the
          top of this page. Continued use after changes take effect constitutes acceptance of the updated
          policy.
        </P>

        <H2>15. Contact us</H2>
        <Table
          rows={[
            ['Email', <a key="e" href="mailto:africa@studentcompanionai.xyz" className="text-[#B8941F] underline">africa@studentcompanionai.xyz</a>],
            ['Website', <a key="w" href="https://studentcompanionai.xyz" target="_blank" rel="noopener" className="text-[#B8941F] underline">studentcompanionai.xyz</a>],
            ['Response time', 'Within 5 business days'],
          ]}
        />
      </div>
    </PublicPageLayout>
  );
}
