export type RGBColor = {
    red: number;
    green: number;
    blue: number;
}

export type CMYKColor = {
    cyan: number;
    magenta: number;
    yellow: number;
    key: number;
}

export type HSLColor = {
    hue: number;
    saturation: number;
    luminance: number;
}

export type Color = {
    hex: string;
    rgb: RGBColor;
    cmyk: CMYKColor;
    hsv: HSLColor;
}