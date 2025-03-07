import { z } from 'zod'

export const LuminositySchema = z.coerce
    .number({
        required_error: 'Luminosity is required',
        invalid_type_error: 'Luminosity must be a percentage number',
    })
    .gte(0)
    .lte(100)
    .transform((value) => {
        // After validating truncate percent to two decimals and return decimal percentage (0-1)
        return Math.floor(value * 100) / 100
    })

export const ChromaSchema = z.coerce
    .number({
        required_error: 'Chroma is required',
        invalid_type_error: 'Chroma must be a decimal number',
    })
    .gte(0)
    .lte(1)
    .transform((value) => {
        return Math.floor(value * 100) / 100
    })

export const HueSchema = z.coerce
    .number({
        required_error: 'Hue is required',
        invalid_type_error: 'Hue must be a number',
    })
    .gte(0)
    .optional()
    .transform((value) => {
        // After validating truncate to two digits, and wrap around if over 360 by applying modulo
        return value ? Math.floor((value % 360) * 100) / 100 : value
    })

export const AlphaSchema = z.coerce
    .number({
        invalid_type_error: 'Alpha must be a number',
    })
    .gte(0)
    .lte(1)
    .optional()
    .transform((value) => {
        return value ? Math.floor(value * 100) / 100 : value
    })

export const Schema = {
    l: LuminositySchema,
    c: ChromaSchema,
    h: HueSchema,
    alpha: AlphaSchema,
}
