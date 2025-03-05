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
    // Use clampChroma to get a valid RGB colour
    let randomColor = clampChroma(
        random('oklch', { l: [0.25, 1], h: [0, 360] }),
    )

    return {
        mode: 'oklch',
        l: roundChannel(randomColor.l),
        c: roundChannel(randomColor.c),
        h: roundChannel(randomColor.h),
    }
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
