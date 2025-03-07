import 'culori/css'
import {
    clampChroma,
    Color,
    modeRgb,
    Oklch,
    random,
    round,
    useMode,
} from 'culori/fn'

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
