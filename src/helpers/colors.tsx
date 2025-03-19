import 'culori/css'
import {
    clampChroma,
    Color,
    colorsNamed,
    differenceEuclidean,
    modeRgb,
    nearest,
    Oklch,
    random,
    round,
    useMode,
} from 'culori/fn'

import { Color as ColorType } from '@/types/color.tsx'

const COLOR_SPACE_GAP = 0.0001

export let roundChannel = round(2)

export let rgb = useMode(modeRgb)

export function getRandomOklchColor(): Oklch {
    return roundOklch(clampChroma(random('oklch', { l: [0.4, 1], alpha: 1 })))
}

export function inRgb(color: Color): boolean {
    let check = rgb(color)
    return (
        check.r >= -COLOR_SPACE_GAP &&
        check.r <= 1 + COLOR_SPACE_GAP &&
        check.g >= -COLOR_SPACE_GAP &&
        check.g <= 1 + COLOR_SPACE_GAP &&
        check.b >= -COLOR_SPACE_GAP &&
        check.b <= 1 + COLOR_SPACE_GAP
    )
}

export function roundOklch(oklch: Oklch): Oklch {
    return {
        ...oklch,
        l: roundChannel(oklch.l),
        c: roundChannel(oklch.c),
        h: oklch.h !== undefined ? roundChannel(oklch.h) : undefined,
        alpha:
            oklch.alpha !== undefined ? roundChannel(oklch.alpha) : undefined,
    }
}

export function getNearestNamedColor(color: Color): string {
    const colors = Object.keys(colorsNamed)
    const nearestNamedColor = nearest(colors, differenceEuclidean())
    return nearestNamedColor(color, 1)[0]
}

export function getNextColorName(color: string, colors: ColorType[]): string {
    const nameExists = (name: string) => colors.some((c) => c.name === name)
    const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
    let newName = color

    // Try base name
    if (!nameExists(newName)) {
        return newName
    }

    // Try step names ([name]-50, [name]-100, [name]-200, etc.)
    for (const step of steps) {
        newName = `${newName}-${step}`

        if (!nameExists(newName)) {
            return newName
        }
    }

    // Increment up from 1000 by 100 until new name is found
    for (let i = 1000; nameExists(newName); i += 100) {
        newName = `${newName}-${i}`

        if (!nameExists(newName)) {
            return newName
        }
    }

    return newName
}
