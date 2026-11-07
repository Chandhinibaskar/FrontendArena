import { lazy, Suspense, useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarClock, Coins, Compass, LayoutDashboard, ListChecks, UserRound } from 'lucide-react'
import { useStore } from '../store/useStore'
import { LANGS, useT } from '../lib/i18n'
import type { Lang } from '../types'
import type { Theme } from '../scene/World'
import Nudge from './Nudge'

const World = lazy(() => import('../scene/World'))

const NAV = [
  { to: '/', key: 'dashboard', Icon: LayoutDashboard },
  { to: '/discover', key: 'discover', Icon: Compass },
  { to: '/tracker', key: 'tracker', Icon: ListChecks },
  { to: '/deadlines', key: 'deadlines', Icon: CalendarClock },
  { to: '/profile', key: 'profile', Icon: UserRound },
]

const themeFor = (p: string): Theme =>
  p.startsWith('/tracker') ? 'sunset' : p === '/' || p.startsWith('/deadlines') ? 'city' : 'cosmos'

function Clock() {
  const lang = useStore((s) => s.lang)
  const [now, setNow] = useState(new Date())
  useEffect(() => { const i = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(i) }, [])
  return <div className="pix hidden sm:inline-flex" role="timer">{now.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' })}</div>
}

export default function Layout() {
  const t = useT()
  const loc = useLocation()
  const { lang, setLang, coins } = useStore()
  const theme = themeFor(loc.pathname)

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  return (
    <div className="relative min-h-screen">
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-[#0b1a2a]" />}>
        <World key={theme} theme={theme} />
      </Suspense>

      <header className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 pt-4">
        <Link to="/" className="me-auto">
          <span className="block font-pixel text-2xl font-bold tracking-widest text-white drop-shadow-[0_3px_0_rgba(0,0,0,.45)] sm:text-3xl">GRANTLY</span>
          <span className="block max-w-56 text-[.65rem] font-bold uppercase tracking-wider text-white/80">{t('tagline')}</span>
        </Link>
        <div className="pix pix-gold" aria-label={`${coins} ${t('coins')}`}><Coins size={14} aria-hidden="true" />{coins}</div>
        <Clock />
        <label className="sr-only" htmlFor="lang">{t('language')}</label>
        <select id="lang" className="pix" value={lang} onChange={(e) => setLang(e.target.value as Lang)}>
          {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
        </select>
      </header>

      <nav aria-label="Main" className="mx-auto mt-3 max-w-6xl px-4">
        <ul className="panel flex gap-2 overflow-x-auto p-2">
          {NAV.map(({ to, key, Icon }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} className={({ isActive }) => `pix ${isActive ? 'pix-blue' : ''}`}>
                <Icon size={14} aria-hidden="true" />{t(key)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <motion.main key={loc.pathname} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
        className="mx-auto max-w-6xl px-4 pb-32 pt-5">
        <Outlet />
      </motion.main>
      <Nudge />
    </div>
  )
}
