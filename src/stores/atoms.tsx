import { Color } from '@/types/color.tsx'
import { Oklch } from 'culori/fn'
import { atom } from 'jotai'

export const oklchAtom = atom<Oklch>()

export const colorAtom = atom<Color | null>(null)
export const colorsAtom = atom<Color[]>([])
