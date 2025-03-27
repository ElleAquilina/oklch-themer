import { getRandomOklchColor } from '@/helpers/colors.tsx'
import { colorAtom, colorsAtom, nameAtom } from '@/stores/atoms.tsx'
import { clampChroma, formatCss, Oklch } from 'culori/fn'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect } from 'react'

export default function RangeInput() {
    const [colors, setColors] = useAtom(colorsAtom)
    const [color, setColor] = useAtom(colorAtom)
    const name = useAtomValue(nameAtom)

    useEffect(() => {
        if (color) {
            document.documentElement.style.setProperty(
                '--color-thumb',
                formatCss(clampChroma(color)),
            )
        }
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const oklch: Oklch =
            color ?
                { ...color, h: parseFloat(e.target.value) }
            :   getRandomOklchColor() // Should always return color value
        const updatedColors = colors.map((c) => {
            return c.name === name ? { ...c, color: oklch } : c
        })

        setColor(oklch)
        setColors(updatedColors)
        document.documentElement.style.setProperty(
            '--color-thumb',
            formatCss(clampChroma(oklch)),
        )
    }

    return (
        <>
            {color && (
                <input
                    type='range'
                    name='h'
                    value={color.h}
                    onChange={(e) => handleChange(e)}
                    min='0'
                    max='360'
                    step='1'
                    className='range-input absolute top-0 right-0 left-0 z-10 h-10 w-full'
                />
            )}
        </>
    )
}
