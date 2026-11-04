import { PublicPageLayout } from '@/components/layout/PublicPageLayout';

export default function About() {
  return (
    <PublicPageLayout>
      <section className="bg-[#1A1A1A] text-white py-16 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">About Student Companion AI</h1>
          <p className="mt-3 text-white/60 text-lg">
            A curated platform built for African undergraduates and recent graduates, by a Sierra Leonean
            student who wanted to build what he wished existed.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 sm:px-8 py-14 space-y-10">
        <div>
          <h2 className="text-xl font-bold mb-3">Our mission</h2>
          <p className="text-[#1A1A1A]/80 leading-relaxed">
            Student Companion AI exists to help African undergraduate students and recent graduates find
            opportunities that actually match their level — without wading through spam, scams, or senior
            roles designed for people 10 years further along. The same platform also answers academic
            and campus-life questions, grounded in each institution's own knowledge base, and now hosts
            career-readiness courses so students can build the skills those opportunities actually require.
          </p>
          <p className="mt-3 text-[#1A1A1A]/80 leading-relaxed">
            We curate internships, jobs, fellowships, scholarships, and competitions from 50+ trusted
            sources across Africa and globally. Every listing is manually reviewed. Every eligibility
            caveat is flagged. Every deadline is verified.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">About the Founder</h2>
          <p className="text-[#1A1A1A]/80 leading-relaxed">
            <strong>Andrew Steven Boima</strong> is from Freetown, Sierra Leone, and graduated from the
            African Leadership University in Kigali with First Class Honours in Entrepreneurial
            Leadership. He built this platform as{' '}
            <a
              href="https://studentcompanionai.xyz"
              target="_blank"
              rel="noopener"
              className="text-[#B8941F] underline hover:text-[#D4AF37]"
            >
              Student Companion AI
            </a>
            , an ethics-first AI-powered student support platform registered in Rwanda.
          </p>
          <p className="mt-3 text-[#1A1A1A]/80 leading-relaxed">
            At graduation in July 2026, he received the <strong>Africa's Opportunity Award</strong> —
            given to the graduate whose passion for the continent resonates across the ALU community —
            and the <strong>Resident Genius Award</strong>, for depth of knowledge and consistently going
            the extra mile. This platform is what both of those look like in practice: a continent-wide
            search, done carefully, one verified listing at a time.
          </p>
          <p className="mt-3 text-[#1A1A1A]/80 leading-relaxed">
            It grew from a personal need. Navigating scholarships, fellowships, and jobs across four
            years of university, Andrew kept hitting the same wall — most aggregators are built for 5–10
            years of experience, not African undergraduates asking a simple question:{' '}
            <em>is this actually open to me?</em> So he built the platform he wished had existed.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">How we curate</h2>
          <p className="text-[#1A1A1A]/80 mb-3">Every opportunity that makes it onto the platform passes a manual review checking:</p>
          <ul className="space-y-2 text-[#1A1A1A]/80">
            <li className="flex gap-2"><span className="text-[#D4AF37]">•</span><span><strong>Fit for African undergraduates</strong> — no work-rights walls, no impossible eligibility, no roles requiring 10 years of experience</span></li>
            <li className="flex gap-2"><span className="text-[#D4AF37]">•</span><span><strong>Verified sources</strong> — real organizations with real websites, not aggregator repostings of stale content</span></li>
            <li className="flex gap-2"><span className="text-[#D4AF37]">•</span><span><strong>Honest eligibility flags</strong> — if a role has language requirements, geographic locks, seniority floors, or hidden costs, we surface them prominently</span></li>
            <li className="flex gap-2"><span className="text-[#D4AF37]">•</span><span><strong>Fresh deadlines</strong> — expired listings are archived, not left on the platform to erode trust</span></li>
            <li className="flex gap-2"><span className="text-[#D4AF37]">•</span><span><strong>Zero scams</strong> — we've caught and filtered out fake UN offers, credential-harvesting "data entry" listings, and paid-to-apply scholarship traps</span></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Who we serve</h2>
          <p className="text-[#1A1A1A]/80 mb-3">
            Our audience is <strong>African undergraduate students and recent graduates with 0–2 years of
            professional experience</strong>. We serve students at:
          </p>
          <ul className="space-y-2 text-[#1A1A1A]/80">
            <li className="flex gap-2"><span className="text-[#D4AF37]">•</span><span>African Leadership University (ALU) — Rwanda and Mauritius</span></li>
            <li className="flex gap-2"><span className="text-[#D4AF37]">•</span><span>Fourah Bay College (FBC), Njala University — Sierra Leone</span></li>
            <li className="flex gap-2"><span className="text-[#D4AF37]">•</span><span>Ashesi University — Ghana</span></li>
            <li className="flex gap-2"><span className="text-[#D4AF37]">•</span><span>Strathmore, USIU-Africa, Kenyatta University — Kenya</span></li>
            <li className="flex gap-2"><span className="text-[#D4AF37]">•</span><span>Universities across Nigeria, Uganda, Egypt, South Africa, Morocco, and 15+ other African countries</span></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">What we don't do</h2>
          <ul className="space-y-2 text-[#1A1A1A]/80">
            <li className="flex gap-2"><span className="text-[#D4AF37]">•</span><span><strong>We don't accept paid listings.</strong> Every opportunity listing is curated on merit.</span></li>
            <li className="flex gap-2"><span className="text-[#D4AF37]">•</span><span><strong>We don't send spam.</strong> Course and account emails are transactional only.</span></li>
            <li className="flex gap-2"><span className="text-[#D4AF37]">•</span><span><strong>We don't compete with your school's career office.</strong> We complement them by covering opportunities they may not surface — pan-African fellowships, remote UN roles, cross-country scholarships.</span></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Get in touch</h2>
          <p className="text-[#1A1A1A]/80">
            Have feedback, want to suggest an opportunity, or interested in partnering? Email us at{' '}
            <a href="mailto:africa@studentcompanionai.xyz" className="text-[#B8941F] underline hover:text-[#D4AF37]">
              africa@studentcompanionai.xyz
            </a>
            . Follow us on{' '}
            <a
              href="https://whatsapp.com/channel/0029VajtyR71SWt02iOsLK2l"
              target="_blank"
              rel="noopener"
              className="text-[#B8941F] underline hover:text-[#D4AF37]"
            >
              WhatsApp
            </a>{' '}
            for weekly updates.
          </p>
        </div>
      </section>
    </PublicPageLayout>
  );
}
