import { getRandomOklchColor } from '@/helpers/colors.tsx'
import { atom } from 'jotai'

export const oklchAtom = atom(getRandomOklchColor())
