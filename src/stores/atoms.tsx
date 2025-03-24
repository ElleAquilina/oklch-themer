import { Color } from '@/types/color.tsx'
import { Oklch } from 'culori/fn'
import { atom } from 'jotai'

export const oklchAtom = atom<Oklch>()

export const nameAtom = atom<string>()
export const colorAtom = atom<Oklch>()
export const colorsAtom = atom<Color[]>([])
