export type Level = 'Undergraduate' | 'Postgraduate' | 'PhD'
export type Status = 'saved' | 'progress' | 'submitted' | 'awarded' | 'rejected'
export type Lang = 'en' | 'hi' | 'ta' | 'es' | 'fr' | 'ar'

export interface Scholarship {
  id: string; name: string; provider: string; country: string; level: Level; field: string
  amount: number; days: number; minGpa: number; maxIncome: number
  description: string; docs: string[]; steps: string[]
}
export interface Profile { name: string; level: Level; field: string; country: string; gpa: number; income: number }
export interface AppEntry { status: Status; checked: string[] }
