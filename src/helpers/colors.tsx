import 'culori/css'
import {
    Color,
    formatHex,
    formatRgb,
    Lch,
    modeRgb,
    Oklch,
    round,
    toGamut,
    useMode,
} from 'culori/fn'

export function colorFormatRgb(color: Oklch) {
    //let color: AnyLch = valueToColor(value)
    let rgbColor: Color = inRGB(color) ? color : toRgb(color)
    return formatRgb(rgbColor)
}

export function colorFormatHex(color: Oklch) {
    let rgbColor: Color = inRGB(color) ? color : toRgb(color)
    return formatHex(rgbColor)
}

export type AnyLch = Lch | Oklch

export let roundChannel = round(2)

export let rgb = useMode(modeRgb)

const COLOR_SPACE_GAP = 0.0001

let toRgb = toGamut('rgb', 'oklch')

export function inRGB(color: Color): boolean {
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
