import {RGBColor} from "@/types/color";

export function RGBToHex(rgb: RGBColor) {
    return "#" + (1 << 24 | rgb.red << 16 | rgb.green << 8 | rgb.blue).toString(16).slice(1);
}

export function HexToRGB(hex: string) {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}