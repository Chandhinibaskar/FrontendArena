import { useState } from 'react'
import { Check } from 'lucide-react'
import { COUNTRIES, FIELDS, LEVELS } from '../data/scholarships'
import { useStore } from '../store/useStore'
import { useT } from '../lib/i18n'
import type { Level } from '../types'

export default function Profile() {
  const t = useT()
  const { profile, setProfile } = useStore()
  const [p, setP] = useState(profile)
  const [ok, setOk] = useState(false)
  const Opt = ({ k, label, opts }: { k: 'level' | 'field' | 'country'; label: string; opts: string[] }) => (
    <label className="label">{label}<select className="field mt-1 font-normal" value={p[k]} onChange={(e) => setP({ ...p, [k]: e.target.value as Level })}>
      {opts.map((o) => <option key={o}>{o}</option>)}</select></label>
  )
  return (
    <form className="panel mx-auto grid max-w-2xl gap-4 p-5 sm:grid-cols-2"
      onSubmit={(e) => { e.preventDefault(); setProfile(p); setOk(true); setTimeout(() => setOk(false), 2000) }}>
      <div className="sm:col-span-2"><h1 className="font-pixel text-xl">{t('profile')}</h1><p className="text-sm text-slate-600">{t('profileHint')}</p></div>
      <label className="label sm:col-span-2">{t('name')}<input className="field mt-1 font-normal" value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} /></label>
      <Opt k="level" label={t('level')} opts={LEVELS} />
      <Opt k="field" label={t('field')} opts={FIELDS.slice(1)} />
      <Opt k="country" label={t('country')} opts={COUNTRIES.slice(1)} />
      <label className="label">{t('gpa')}<input className="field mt-1 font-normal" type="number" min={0} max={4} step={0.1} value={p.gpa} onChange={(e) => setP({ ...p, gpa: Number(e.target.value) })} /></label>
      <label className="label sm:col-span-2">{t('income')}<input className="field mt-1 font-normal" type="number" min={0} step={1000} value={p.income} onChange={(e) => setP({ ...p, income: Number(e.target.value) })} /></label>
      <div className="flex items-center gap-3 sm:col-span-2">
        <button className="pix pix-blue" type="submit">{t('saveProfile')}</button>
        {ok && <span role="status" className="flex items-center gap-1 text-sm font-bold text-emerald-700"><Check size={16} aria-hidden="true" />{t('profileSaved')}</span>}
      </div>
    </form>
  )
}
