/* =============================================================
   CV Readiness Checker — matching engine.

   Ported from the career.studentcompanionai.rw static site's
   match.js (same product, same logic), kept framework-agnostic
   (no DOM) so it's independently testable. Operates on the raw
   opportunities.json shape served from career.studentcompanionai.rw
   (see public/opportunities.json), not the slimmer Opportunity type
   used by src/services/opportunitiesService.ts elsewhere in the app —
   this needs the detailed eligibility_year/eligibility_nationality/
   field columns that only the career-site feed has.
   ============================================================= */

export interface CareerOpportunity {
  id: string;
  category?: string;
  title: string;
  organization?: string;
  location?: string;
  remote?: string;
  deadline?: string;
  eligibility_year?: string;
  eligibility_nationality?: string;
  field?: string;
  tags?: string;
  description?: string;
  apply_link?: string;
  source?: string;
  status?: string;
}

export interface Profile {
  country: string;
  level: string;
  years: string;
  languages: string[];
}

export interface SkillHit {
  domain: string;
  hits: number;
  evidence: string[];
}

export type ReadinessStatus = 'ready' | 'stretch' | 'blocked';

export interface ReasonItem {
  t: string;
  d: string;
}

export interface AssessmentResult {
  o: CareerOpportunity;
  status: ReadinessStatus;
  met: string[];
  gaps: ReasonItem[];
  blockers: ReasonItem[];
  score: number;
}

export const COUNTRIES: [string, string[]][] = [
  ['Rwanda', ['rwanda', 'rwandan', 'kigali', 'huye', 'musanze']],
  ['Sierra Leone', ['sierra leone', 'sierra leonean', 'freetown', 'kono', 'koidu', 'makeni', 'njala']],
  ['Kenya', ['kenya', 'kenyan', 'nairobi', 'mombasa', 'kisumu', 'kwale']],
  ['Nigeria', ['nigeria', 'nigerian', 'lagos', 'abuja']],
  ['Ghana', ['ghana', 'ghanaian', 'accra', 'kumasi', 'legon']],
  ['South Africa', ['south africa', 'south african', 'johannesburg', 'pretoria', 'cape town', 'durban']],
  ['Uganda', ['uganda', 'ugandan', 'kampala', 'makerere']],
  ['Ethiopia', ['ethiopia', 'ethiopian', 'addis ababa']],
  ['Egypt', ['egypt', 'egyptian', 'cairo']],
  ['Morocco', ['morocco', 'moroccan', 'rabat', 'casablanca']],
  ['Senegal', ['senegal', 'senegalese', 'dakar']],
  ['Tanzania', ['tanzania', 'tanzanian', 'dar es salaam', 'zanzibar']],
  ['Cameroon', ['cameroon', 'cameroonian', 'yaound', 'douala']],
  ["Côte d'Ivoire", ['ivoire', 'ivory coast', 'ivorian', 'abidjan']],
  ['Liberia', ['liberia', 'liberian', 'monrovia']],
  ['Zambia', ['zambia', 'zambian', 'lusaka']],
  ['Zimbabwe', ['zimbabwe', 'zimbabwean', 'harare']],
  ['Botswana', ['botswana', 'gaborone']],
  ['Togo', ['togo', 'togolese', 'lomé', 'lome']],
  ['Mauritius', ['mauritius', 'mauritian']],
  ['Mozambique', ['mozambique', 'mozambican', 'maputo']],
  ['Malawi', ['malawi', 'malawian', 'lilongwe']],
  ['The Gambia', ['gambia', 'gambian', 'banjul']],
  ['Burkina Faso', ['burkina', 'burkinab', 'ouagadougou', 'bobo-dioulasso']],
  ['DR Congo', ['democratic republic of the congo', 'dr congo', 'drc', 'kinshasa', 'goma', 'beni']],
  ['Burundi', ['burundi', 'burundian', 'bujumbura']],
  ['Chad', ['chad', 'chadian', "n'djamena"]],
  ['Libya', ['libya', 'libyan', 'tripoli']],
  ['Sudan', ['sudan', 'sudanese', 'khartoum', 'kassala']],
  ['South Sudan', ['south sudan', 'juba']],
  ['Mauritania', ['mauritania', 'nouakchott']],
  ['Namibia', ['namibia', 'windhoek']],
  ['Benin', ['benin', 'cotonou']],
  ['Mali', ['mali', 'malian', 'bamako']],
  ['Tunisia', ['tunisia', 'tunisian', 'tunis']],
  ['Algeria', ['algeria', 'algerian', 'algiers']],
];

export const SKILL_VOCAB: Record<string, string[]> = {
  'Data analysis': ['data analysis', 'data analyst', 'excel', 'spss', 'stata', ' r ', 'python', 'power bi', 'tableau', 'dashboards', 'statistics', 'quantitative'],
  'Monitoring & Evaluation': ['monitoring and evaluation', 'm&e', 'mel', 'impact evaluation', 'indicators', 'logframe', 'theory of change', 'data quality'],
  Research: ['research', 'enumerator', 'survey', 'interviews', 'qualitative', 'literature review', 'field research', 'kii'],
  'Software engineering': ['software', 'developer', 'javascript', 'typescript', 'react', 'node', 'next.js', 'java', 'c++', 'git', 'github', 'api', 'backend', 'frontend', 'full-stack'],
  Design: ['graphic design', 'figma', 'photoshop', 'illustrator', 'canva', 'adobe', 'ui', 'ux', 'visual'],
  Communications: ['communications', 'content', 'copywriting', 'social media', 'press release', 'newsletter', 'storytelling', 'public relations'],
  Marketing: ['marketing', 'seo', 'campaign', 'growth', 'branding', 'digital marketing', 'audience'],
  'Project management': ['project management', 'programme', 'program management', 'workplan', 'coordination', 'stakeholder', 'deliverables', 'timeline'],
  Operations: ['operations', 'logistics', 'procurement', 'inventory', 'administration', 'scheduling', 'office management'],
  Finance: ['finance', 'accounting', 'budget', 'reconciliation', 'audit', 'bookkeeping', 'financial reporting', 'payroll'],
  Education: ['education', 'teaching', 'curriculum', 'training', 'facilitation', 'lms', 'canvas', 'tutoring', 'pedagogy'],
  'Public health': ['public health', 'health', 'clinical', 'epidemiology', 'nutrition', 'maternal', 'tb ', 'hiv', 'nursing'],
  'Human resources': ['human resources', 'recruitment', 'talent', 'onboarding', 'hr '],
  Policy: ['policy', 'governance', 'public administration', 'advocacy', 'human rights', 'diplomacy'],
  Entrepreneurship: ['entrepreneur', 'startup', 'venture', 'business model', 'pitch', 'founder'],
  Agriculture: ['agriculture', 'agribusiness', 'farming', 'food security', 'supply chain'],
  Engineering: ['engineering', 'mechanical', 'civil', 'electrical', 'hardware', 'iot'],
  Environment: ['environment', 'climate', 'conservation', 'sustainability', 'renewable', 'wildlife'],
};

export const LANGUAGES = ['English', 'French', 'Portuguese', 'Arabic', 'Swahili', 'Kinyarwanda'];

export const LEVELS: { key: string; label: string }[] = [
  { key: 'Year 1', label: 'Year 1 student' },
  { key: 'Year 2', label: 'Year 2 student' },
  { key: 'Year 3', label: 'Year 3 student' },
  { key: 'Year 4', label: 'Year 4 student' },
  { key: 'Final Year', label: 'Final year student' },
  { key: 'Recent Grad', label: 'Recent graduate' },
];

export function extractSkills(text: string): SkillHit[] {
  const hay = ' ' + text.toLowerCase().replace(/\s+/g, ' ') + ' ';
  const found: SkillHit[] = [];
  Object.entries(SKILL_VOCAB).forEach(([domain, terms]) => {
    const hits = terms.filter((t) => hay.includes(t));
    if (hits.length) found.push({ domain, hits: hits.length, evidence: hits.slice(0, 3) });
  });
  return found.sort((a, b) => b.hits - a.hits);
}

function requiredYears(o: CareerOpportunity): number | null {
  const t = `${o.description || ''} ${o.eligibility_year || ''}`;
  const m =
    t.match(/(?:minimum|at least|min\.?|requires?)\s*(?:of\s*)?(\d+)\s*(?:\+|-|to)?\s*\d*\s*years?/i) ||
    t.match(/(\d+)\s*(?:\+|-|–|to)\s*\d*\s*years?['’]?\s*(?:of\s*)?(?:relevant\s*|formal\s*|work\s*|professional\s*)?experience/i);
  return m ? parseInt(m[1], 10) : null;
}

function requiredLanguage(o: CareerOpportunity): string[] {
  const t = `${o.description || ''} ${o.eligibility_nationality || ''} ${o.tags || ''}`.toLowerCase();
  const out: string[] = [];
  if (/french (?:fluency |proficiency )?(?:is )?required|french required|maîtrise du français|francophone|fluent in french/.test(t)) out.push('French');
  if (/portuguese (?:is )?(?:required|likely needed|proficiency)/.test(t)) out.push('Portuguese');
  if (/arabic (?:is )?required/.test(t)) out.push('Arabic');
  if (/kinyarwanda (?:is )?required/.test(t)) out.push('Kinyarwanda');
  return out;
}

function restrictedTo(o: CareerOpportunity): string[] | null {
  const raw = o.eligibility_nationality || '';
  if (!/only|nationals|citizens|residents|restricted/i.test(raw)) return null;
  if (/open to all|worldwide|any nationality/i.test(raw)) return null;
  const hay = raw.toLowerCase();
  const list = COUNTRIES.filter(([, aliases]) => aliases.some((a) => hay.includes(a))).map(([n]) => n);
  return list.length ? list : null;
}

function deadlinePassed(o: CareerOpportunity): boolean {
  const d = String(o.deadline || '').trim();
  if (!d || /rolling|until filled|ongoing|verify|open/i.test(d)) return false;
  const parsed = new Date(d);
  if (Number.isNaN(parsed.getTime())) return false;
  return parsed < new Date(new Date().toDateString());
}

function levelMatches(o: CareerOpportunity, level: string): boolean {
  const e = (o.eligibility_year || '').toLowerCase();
  if (!e || !level) return true;
  const l = level.toLowerCase();
  if (e.includes(l)) return true;
  if (l === 'recent grad' && /recent grad|early career|young professional|graduate/.test(e)) return true;
  if (l === 'final year' && /final year|current student|year 4/.test(e)) return true;
  if (/current student/.test(e) && /^year \d/.test(l)) return true;
  return false;
}

function domainOverlap(o: CareerOpportunity, skills: SkillHit[]): { score: number; shared: string[] } {
  if (!skills.length) return { score: 0, shared: [] };
  const hay = `${o.field || ''} ${o.tags || ''} ${o.title || ''} ${o.category || ''}`.toLowerCase();
  const shared = skills.filter((s) => {
    const words = s.domain.toLowerCase().split(/[\s&]+/).filter((w) => w.length > 3);
    return words.some((w) => hay.includes(w)) || SKILL_VOCAB[s.domain].some((t) => hay.includes(t.trim()));
  });
  return { score: shared.length, shared: shared.map((s) => s.domain) };
}

export function assess(o: CareerOpportunity, profile: Profile, cvSkills: SkillHit[]): AssessmentResult {
  const p = profile;
  const blockers: ReasonItem[] = [];
  const met: string[] = [];
  const gaps: ReasonItem[] = [];

  if (deadlinePassed(o)) blockers.push({ t: 'Deadline has passed', d: `Closed ${o.deadline}` });
  else met.push('Deadline is still open');

  const restricted = restrictedTo(o);
  if (restricted) {
    if (p.country && restricted.includes(p.country)) {
      met.push(`Open to ${p.country} nationals`);
    } else if (p.country) {
      blockers.push({
        t: 'Restricted nationality',
        d: `Open only to: ${restricted.join(', ')}. You selected ${p.country}.`,
      });
    }
  } else if (p.country) {
    met.push('No nationality restriction');
  }

  const langs = requiredLanguage(o);
  langs.forEach((L) => {
    if (p.languages.includes(L)) met.push(`${L} required — you speak it`);
    else blockers.push({ t: `${L} required`, d: `This role needs ${L}. Add it to your profile if you speak it.` });
  });

  const yrs = requiredYears(o);
  const mine = p.years === '' ? null : parseInt(p.years, 10);
  if (yrs !== null && mine !== null) {
    if (mine >= yrs) met.push(`${yrs}+ years experience — you have ${mine}`);
    else gaps.push({ t: `${yrs} years experience required`, d: `You have ${mine}. Gap of ${yrs - mine} year${yrs - mine > 1 ? 's' : ''}.` });
  }

  if (p.level) {
    if (levelMatches(o, p.level)) met.push(`Open to ${p.level}`);
    else gaps.push({ t: 'Study level mismatch', d: `Listed for: ${o.eligibility_year || 'unspecified'}` });
  }

  const dom = domainOverlap(o, cvSkills);
  if (dom.score) met.push(`Field match: ${dom.shared.slice(0, 3).join(', ')}`);
  else if (cvSkills.length) gaps.push({ t: 'Different field', d: 'No clear overlap with your CV.' });

  if (p.country) {
    const loc = `${o.location || ''}`.toLowerCase();
    const entry = COUNTRIES.find(([n]) => n === p.country);
    if (entry && entry[1].some((a) => loc.includes(a))) met.push(`Located in ${p.country}`);
    else if (/remote|home-based|online|worldwide/i.test(loc)) met.push('Remote — location is not a barrier');
  }

  let status: ReadinessStatus;
  if (blockers.length) status = 'blocked';
  else if (gaps.length >= 2) status = 'stretch';
  else status = 'ready';

  const score = met.length * 2 - gaps.length - blockers.length * 5 + dom.score * 2;
  return { o, status, met, gaps, blockers, score };
}

const STATUS_RANK: Record<ReadinessStatus, number> = { ready: 0, stretch: 1, blocked: 2 };

export function runAssessment(
  opportunities: CareerOpportunity[],
  profile: Profile,
  cvSkills: SkillHit[],
): AssessmentResult[] {
  return opportunities
    .map((o) => assess(o, profile, cvSkills))
    .sort((a, b) => {
      if (STATUS_RANK[a.status] !== STATUS_RANK[b.status]) return STATUS_RANK[a.status] - STATUS_RANK[b.status];
      return b.score - a.score;
    });
}
