import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppEntry, Lang, Profile, Status } from '../types'

interface State {
  lang: Lang
  profile: Profile
  apps: Record<string, AppEntry>
  coins: number
  earned: string[]
  setLang: (l: Lang) => void
  setProfile: (p: Profile) => void
  save: (id: string) => void
  remove: (id: string) => void
  setStatus: (id: string, s: Status) => void
  toggleDoc: (id: string, doc: string) => void
}

const REWARD: Partial<Record<Status, number>> = { saved: 5, progress: 20, submitted: 50, awarded: 200 }

export const useStore = create<State>()(
  persist(
    (set) => {
      // award coins once per (scholarship, status)
      const earn = (s: State, id: string, st: Status) => {
        const key = `${id}:${st}`
        const n = REWARD[st] ?? 0
        return n && !s.earned.includes(key) ? { coins: s.coins + n, earned: [...s.earned, key] } : {}
      }
      return {
        lang: 'en',
        profile: { name: 'Scholar', level: 'Undergraduate', field: 'Engineering', country: 'India', gpa: 3.4, income: 30000 },
        apps: {},
        coins: 100,
        earned: [],
        setLang: (lang) => set({ lang }),
        setProfile: (profile) => set({ profile }),
        save: (id) => set((s) => (s.apps[id] ? s : { apps: { ...s.apps, [id]: { status: 'saved', checked: [] } }, ...earn(s, id, 'saved') })),
        remove: (id) => set((s) => { const apps = { ...s.apps }; delete apps[id]; return { apps } }),
        setStatus: (id, st) => set((s) => ({
          apps: { ...s.apps, [id]: { checked: s.apps[id]?.checked ?? [], status: st } },
          ...earn(s, id, st),
        })),
        toggleDoc: (id, doc) => set((s) => {
          const cur = s.apps[id]; if (!cur) return s
          const checked = cur.checked.includes(doc) ? cur.checked.filter((d) => d !== doc) : [...cur.checked, doc]
          return { apps: { ...s.apps, [id]: { ...cur, checked } } }
        }),
      }
    },
    { name: 'grantly-store' },
  ),
)
