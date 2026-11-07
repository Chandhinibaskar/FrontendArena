import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { COUNTRIES, FIELDS, LEVELS, SCHOLARSHIPS } from '../data/scholarships'
import { useStore } from '../store/useStore'
import { useT } from '../lib/i18n'
import { score } from '../lib/match'
import { ScholarshipCard } from '../components/ui'

export default function Discover() {
  const t = useT()
  const profile = useStore((s) => s.profile)
  const [q, setQ] = useState('')
  const [level, setLevel] = useState('')
  const [field, setField] = useState('')
  const [country, setCountry] = useState('')
  const [sort, setSort] = useState('match')

  const list = useMemo(() => {
    const r = SCHOLARSHIPS.filter((s) =>
      (!q || `${s.name} ${s.provider} ${s.description}`.toLowerCase().includes(q.toLowerCase())) &&
      (!level || s.level === level) && (!field || s.field === field) && (!country || s.country === country))
    return r.sort((a, b) => sort === 'amount' ? b.amount - a.amount : sort === 'deadline' ? a.days - b.days : score(b, profile) - score(a, profile))
  }, [q, level, field, country, sort, profile])

  const Sel = ({ label, value, set, opts }: { label: string; value: string; set: (v: string) => void; opts: string[] }) => (
    <div><label className="label">{label}<select className="field mt-1 font-normal" value={value} onChange={(e) => set(e.target.value)}>
      <option value="">{t('all')}</option>{opts.map((o) => <option key={o}>{o}</option>)}</select></label></div>
  )

  return (
    <div className="grid gap-4">
      <section className="panel grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5" aria-label="Filters">
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="label" htmlFor="q">{t('discover')}</label>
          <div className="relative">
            <Search size={16} aria-hidden="true" className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input id="q" className="field ps-9" placeholder={t('search')} value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>
        <Sel label={t('level')} value={level} set={setLevel} opts={LEVELS} />
        <Sel label={t('field')} value={field} set={setField} opts={FIELDS.slice(1)} />
        <Sel label={t('country')} value={country} set={setCountry} opts={COUNTRIES} />
        <div><label className="label">{t('sort')}<select className="field mt-1 font-normal" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="match">{t('sortMatch')}</option><option value="amount">{t('sortAmount')}</option><option value="deadline">{t('sortDeadline')}</option></select></label></div>
      </section>
      {list.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((s) => <ScholarshipCard key={s.id} s={s} />)}</div>
      ) : <p className="panel p-6 text-center font-semibold" role="status">{t('noResults')}</p>}
    </div>
  )
}
