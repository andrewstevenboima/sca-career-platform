import { useState, useRef } from 'react';
import { PublicPageLayout } from '@/components/layout/PublicPageLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { readCvFile } from '@/lib/cvFileReader';
import {
  COUNTRIES,
  LANGUAGES,
  LEVELS,
  extractSkills,
  runAssessment,
  type AssessmentResult,
  type CareerOpportunity,
  type Profile,
  type ReadinessStatus,
  type SkillHit,
} from '@/lib/cvChecker';

const STATUS_META: Record<ReadinessStatus, { label: string; chip: string; bar: string }> = {
  ready: { label: 'Open to you', chip: 'bg-green-100 text-green-700', bar: 'border-l-green-500' },
  stretch: { label: 'Stretch', chip: 'bg-amber-100 text-amber-700', bar: 'border-l-amber-500' },
  blocked: { label: 'Not yet', chip: 'bg-red-100 text-red-700', bar: 'border-l-red-400' },
};

type Filter = 'all' | ReadinessStatus;

export default function CvChecker() {
  const [cvStatus, setCvStatus] = useState<{ text: string; tone: 'idle' | 'ok' | 'error' | 'working' }>({
    text: 'Nothing loaded.',
    tone: 'idle',
  });
  const [cvSkills, setCvSkills] = useState<SkillHit[]>([]);
  const [pasteText, setPasteText] = useState('');
  const [country, setCountry] = useState('');
  const [level, setLevel] = useState('');
  const [years, setYears] = useState('');
  const [languages, setLanguages] = useState<string[]>(['English']);
  const [results, setResults] = useState<AssessmentResult[] | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [checking, setChecking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function applyCvText(text: string, label: string) {
    const skills = extractSkills(text);
    setCvSkills(skills);
    setCvStatus({
      text: `Read ${label} — ${skills.length} skill area${skills.length === 1 ? '' : 's'} detected. Nothing was uploaded.`,
      tone: 'ok',
    });
  }

  async function handleFile(file: File) {
    setCvStatus({ text: 'Reading on your device…', tone: 'working' });
    try {
      const text = await readCvFile(file);
      if (text.trim().length < 80) {
        throw new Error("Couldn't read much text from that file. Try pasting your CV instead.");
      }
      applyCvText(text, file.name);
    } catch (err) {
      setCvStatus({ text: err instanceof Error ? err.message : 'Could not read that file.', tone: 'error' });
    }
  }

  function handlePasteUse() {
    if (pasteText.trim().length < 80) {
      setCvStatus({ text: 'Please paste a bit more of your CV.', tone: 'error' });
      return;
    }
    applyCvText(pasteText, 'pasted text');
  }

  function toggleLanguage(lang: string, checked: boolean) {
    setLanguages((prev) => (checked ? [...prev, lang] : prev.filter((l) => l !== lang)));
  }

  async function handleCheck() {
    setChecking(true);
    try {
      const res = await fetch('/opportunities.json');
      const data = (await res.json()) as { opportunities?: CareerOpportunity[] } | CareerOpportunity[];
      const list = Array.isArray(data) ? data : data.opportunities || [];
      const live = list.filter((o) => String(o.status || 'live').toLowerCase() === 'live');
      const profile: Profile = { country, level, years, languages };
      const assessed = runAssessment(live, profile, cvSkills);
      setResults(assessed);
      setExpanded(new Set());
      document.getElementById('cv-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch {
      setCvStatus({ text: 'Could not load opportunities right now. Please try again shortly.', tone: 'error' });
    } finally {
      setChecking(false);
    }
  }

  function handleClear() {
    setCvSkills([]);
    setPasteText('');
    setCvStatus({ text: 'Nothing loaded.', tone: 'idle' });
    setResults(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  const counts = results
    ? results.reduce(
        (acc, r) => ({ ...acc, [r.status]: acc[r.status] + 1 }),
        { ready: 0, stretch: 0, blocked: 0 } as Record<ReadinessStatus, number>,
      )
    : null;

  const shown = results ? (filter === 'all' ? results : results.filter((r) => r.status === filter)) : [];

  const statusToneClass = {
    idle: 'text-[#1A1A1A]/50',
    ok: 'text-green-700',
    error: 'text-red-600',
    working: 'text-[#B8941F]',
  }[cvStatus.tone];

  return (
    <PublicPageLayout>
      <section className="bg-[#1A1A1A] text-white py-16 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">CV Readiness Checker</h1>
          <p className="mt-3 text-white/60 text-lg">
            See which opportunities you can actually apply for right now — and exactly what is blocking
            the rest.
          </p>
          <p className="mt-4 text-sm text-[#D4AF37]">
            <strong>Your CV never leaves your device.</strong> It's read in your browser, nothing is
            uploaded, nothing is stored. Close this tab and it's gone.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 sm:px-8 py-14">
        {/* Step 1 — CV */}
        <div className="mb-10">
          <h2 className="font-bold text-lg mb-3">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#D4AF37] text-[#1A1A1A] text-sm font-bold mr-2">1</span>
            Add your CV
          </h2>
          <label className="flex items-center justify-center border-2 border-dashed border-[#E8DDB0] rounded-xl py-6 cursor-pointer hover:border-[#D4AF37] transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
            <span className="text-sm text-[#1A1A1A]/70">Choose a file (PDF, Word or text)</span>
          </label>
          <p className="text-center text-xs text-[#1A1A1A]/40 my-3">or paste the text</p>
          <Textarea
            rows={5}
            placeholder="Paste your CV here…"
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
          />
          <div className="mt-2 flex items-center justify-between gap-3">
            <Button type="button" variant="outline" size="sm" onClick={handlePasteUse}>
              Use pasted text
            </Button>
            <p className={`text-sm ${statusToneClass}`}>{cvStatus.text}</p>
          </div>

          {cvSkills.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-[#1A1A1A]/70 mb-2">Skill areas found in your CV</h3>
              <div className="flex flex-wrap gap-2">
                {cvSkills.slice(0, 10).map((s) => (
                  <span key={s.domain} className="text-xs font-medium bg-[#FBF7E9] text-[#B8941F] px-2.5 py-1 rounded-full border border-[#E8DDB0]">
                    {s.domain}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step 2 — profile facts */}
        <div className="mb-10">
          <h2 className="font-bold text-lg mb-1">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#D4AF37] text-[#1A1A1A] text-sm font-bold mr-2">2</span>
            A few facts we can't read from a CV
          </h2>
          <p className="text-sm text-[#1A1A1A]/50 mb-4 ml-8">
            These are the things that actually block eligibility. Guessing them from a CV is unreliable, so we ask.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-8">
            <div>
              <label className="block text-sm font-medium mb-1.5">Your nationality / where you can work</label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                <SelectContent>
                  {[...COUNTRIES].map(([name]) => name).sort().map((name) => (
                    <SelectItem key={name} value={name}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Where you are in your studies</label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                <SelectContent>
                  {LEVELS.map((l) => (
                    <SelectItem key={l.key} value={l.key}>{l.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Years of professional experience</label>
              <Select value={years} onValueChange={setYears}>
                <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None yet</SelectItem>
                  <SelectItem value="1">1 year</SelectItem>
                  <SelectItem value="2">2 years</SelectItem>
                  <SelectItem value="3">3 years</SelectItem>
                  <SelectItem value="5">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Languages you can work in</label>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                {LANGUAGES.map((lang) => (
                  <label key={lang} className="flex items-center gap-1.5 text-sm cursor-pointer">
                    <Checkbox
                      checked={languages.includes(lang)}
                      onCheckedChange={(c) => toggleLanguage(lang, c === true)}
                    />
                    {lang}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={handleCheck} disabled={checking} className="bg-[#1A1A1A] hover:bg-[#D4AF37] hover:text-[#1A1A1A]">
            {checking ? 'Checking…' : 'Check my readiness'}
          </Button>
          <Button type="button" variant="ghost" onClick={handleClear}>Clear everything</Button>
        </div>

        {counts && (
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div><div className="text-2xl font-bold">{counts.ready}</div><div className="text-xs text-[#1A1A1A]/50">open to you</div></div>
            <div><div className="text-2xl font-bold">{counts.stretch}</div><div className="text-xs text-[#1A1A1A]/50">stretch</div></div>
            <div><div className="text-2xl font-bold">{counts.blocked}</div><div className="text-xs text-[#1A1A1A]/50">blocked</div></div>
          </div>
        )}
      </section>

      {results && (
        <section id="cv-results" className="max-w-3xl mx-auto px-5 sm:px-8 pb-20">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h2 className="text-xl font-bold">Your results</h2>
            <Select value={filter} onValueChange={(v) => setFilter(v as Filter)}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Show all</SelectItem>
                <SelectItem value="ready">Open to you</SelectItem>
                <SelectItem value="stretch">Stretch</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-[#1A1A1A]/60 mb-6">
            <strong>Open to you</strong> means we found no eligibility barrier — not that it's a strong
            fit. <strong>Stretch</strong> means you fall short on experience or study level.{' '}
            <strong>Blocked</strong> means something hard stands in the way. Always read the listing
            itself before applying.
          </p>

          {shown.length === 0 ? (
            <p className="text-[#1A1A1A]/50 text-sm">Nothing in this group.</p>
          ) : (
            <div className="space-y-4">
              {shown.map((r) => {
                const meta = STATUS_META[r.status];
                const isOpen = expanded.has(r.o.id);
                return (
                  <article key={r.o.id} className={`border border-[#E8DDB0] border-l-4 ${meta.bar} rounded-xl p-4`}>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${meta.chip}`}>{meta.label}</span>
                      <span className="text-xs text-[#1A1A1A]/40">{r.o.category}</span>
                    </div>
                    <h3 className="font-semibold">{r.o.title}</h3>
                    <p className="text-sm text-[#1A1A1A]/50">
                      {r.o.organization}
                      {r.o.location ? ` · ${r.o.location}` : ''}
                    </p>

                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">{r.met.length} met</span>
                      {r.gaps.length > 0 && (
                        <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                          {r.gaps.length} gap{r.gaps.length > 1 ? 's' : ''}
                        </span>
                      )}
                      {r.blockers.length > 0 && (
                        <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                          {r.blockers.length} blocker{r.blockers.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    {isOpen && (
                      <div className="mt-3 space-y-3 text-sm">
                        {r.blockers.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-red-600 mb-1">Why you can't apply yet</h4>
                            {r.blockers.map((b, i) => (
                              <p key={i}><strong>{b.t}</strong> — <span className="text-[#1A1A1A]/60">{b.d}</span></p>
                            ))}
                          </div>
                        )}
                        {r.gaps.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-amber-700 mb-1">Gaps to close</h4>
                            {r.gaps.map((g, i) => (
                              <p key={i}><strong>{g.t}</strong> — <span className="text-[#1A1A1A]/60">{g.d}</span></p>
                            ))}
                          </div>
                        )}
                        {r.met.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-green-700 mb-1">You already meet</h4>
                            {r.met.map((m, i) => <p key={i} className="text-[#1A1A1A]/70">{m}</p>)}
                          </div>
                        )}
                        <a
                          href={r.o.apply_link || '#'}
                          target="_blank"
                          rel="noopener"
                          className="inline-block mt-1 text-[#B8941F] font-semibold hover:text-[#D4AF37]"
                        >
                          View listing →
                        </a>
                      </div>
                    )}

                    <button
                      type="button"
                      className="mt-2 text-xs font-semibold text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
                      onClick={() =>
                        setExpanded((prev) => {
                          const next = new Set(prev);
                          if (next.has(r.o.id)) next.delete(r.o.id);
                          else next.add(r.o.id);
                          return next;
                        })
                      }
                    >
                      {isOpen ? 'Hide detail ▲' : 'Why? ▼'}
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}
    </PublicPageLayout>
  );
}
