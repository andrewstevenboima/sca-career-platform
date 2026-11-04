import { PublicPageLayout } from '@/components/layout/PublicPageLayout';

const SOURCE_GROUPS = [
  {
    title: 'African country portals',
    items: [
      { label: 'careers.sl', sub: 'Sierra Leone', href: 'https://careers.sl' },
      { label: 'JobInRwanda', sub: 'Rwanda', href: 'https://www.jobinrwanda.com' },
      { label: 'BrighterMonday', sub: 'Kenya', href: 'https://www.brightermonday.co.ke' },
      { label: 'Jobberman', sub: 'Nigeria, Ghana', href: 'https://jobberman.com' },
      { label: 'ALU Careers', sub: 'African Leadership University', href: 'https://job-boards.greenhouse.io/alu' },
    ],
  },
  {
    title: 'UN & multilateral',
    items: [
      { label: 'UN Careers', href: 'https://careers.un.org' },
      { label: 'UN Volunteers (UNV)', href: 'https://app.unv.org/opportunities' },
      { label: 'UN Online Volunteering', href: 'https://www.onlinevolunteering.org' },
      { label: 'UNDP Jobs', href: 'https://jobs.undp.org' },
      { label: 'UNICEF Careers', href: 'https://jobs.unicef.org' },
      { label: 'UN Women Careers', href: 'https://jobs.unwomen.org' },
      { label: 'ReliefWeb Jobs', sub: 'humanitarian', href: 'https://reliefweb.int/jobs' },
    ],
  },
  {
    title: 'Scholarship databases',
    items: [
      { label: 'Opportunities For Africans', href: 'https://www.opportunitiesforafricans.com' },
      { label: 'Opportunity Desk', href: 'https://opportunitydesk.org' },
      { label: 'Mastercard Foundation', href: 'https://mastercardfdn.org' },
      { label: 'Rhodes Trust', href: 'https://www.rhodeshouse.ox.ac.uk' },
      { label: 'DAAD Scholarship Database', href: 'https://www2.daad.de/deutschland/stipendium/datenbank/en/' },
    ],
  },
  {
    title: 'Fellowship pipelines',
    items: [
      { label: 'One Young World', href: 'https://www.oneyoungworld.com' },
      { label: 'Acumen Academy', href: 'https://www.acumen.org/academy/' },
      { label: 'Millennium Fellowship', href: 'https://millenniumfellows.org' },
      { label: 'Obama Foundation Leaders', href: 'https://obamafoundation.org/leaders/africa/' },
    ],
  },
  {
    title: 'Tech & startup roles',
    items: [
      { label: 'Zipline', sub: 'Kigali + pan-African', href: 'https://www.zipline.com/open-roles' },
      { label: 'AmaliTech', sub: 'Rwanda apprenticeship', href: 'https://jobs.smartrecruiters.com/AmaliTech' },
      { label: 'Moniepoint', sub: 'Nigerian fintech', href: 'https://apply.workable.com/moniepoint/' },
    ],
  },
  {
    title: 'Competitions & prizes',
    items: [
      { label: 'ECOWAS Youth Programmes', href: 'https://ecowas.int' },
      { label: 'Opportunity Desk', sub: 'global competitions', href: 'https://opportunitydesk.org' },
      { label: 'Hult Prize', href: 'https://www.hult-prize.org/' },
    ],
  },
];

export default function Sources() {
  return (
    <PublicPageLayout>
      <section className="bg-[#1A1A1A] text-white py-16 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">Sources</h1>
          <p className="mt-3 text-white/60 text-lg max-w-2xl">
            We pull opportunities from 50+ trusted sources across Africa and globally. Here are the ones
            we recommend most for browsing directly.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-14">
        <p className="text-[#1A1A1A]/70 max-w-2xl mb-10">
          Our platform curates the highest-quality opportunities from these sources. Every listing started
          with careful review from one of these portals. If you want to browse the raw firehose, these are
          the sources to bookmark.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SOURCE_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold text-sm uppercase tracking-wide text-[#B8941F] mb-3">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener"
                      className="text-sm text-[#1A1A1A]/80 hover:text-[#1A1A1A] underline decoration-[#E8DDB0] underline-offset-2"
                    >
                      {item.label}
                    </a>
                    {item.sub && <span className="text-sm text-[#1A1A1A]/40"> — {item.sub}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-[#E8DDB0] pt-8">
          <h3 className="font-semibold mb-2">Suggest a source</h3>
          <p className="text-[#1A1A1A]/70">
            Know a great source we should add? Email us at{' '}
            <a
              href="mailto:africa@studentcompanionai.xyz"
              className="text-[#B8941F] underline hover:text-[#D4AF37]"
            >
              africa@studentcompanionai.xyz
            </a>{' '}
            — we personally review every suggestion.
          </p>
        </div>
      </section>
    </PublicPageLayout>
  );
}
