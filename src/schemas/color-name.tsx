import { Color } from '@/types/color.tsx'
import { z } from 'zod'

export const ColorNameSchema = (colors: Color[]) =>
    z.string().refine(
        (value) => {
            return !colors.find((c) => c.name === value)
        },
        {
            message: 'Name already exists',
        },
    )
