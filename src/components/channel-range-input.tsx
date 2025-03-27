import { getRandomOklchColor } from '@/helpers/colors.tsx'
import { colorAtom, colorsAtom, nameAtom } from '@/stores/atoms.tsx'
import { clampChroma, formatCss, Oklch } from 'culori/fn'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect } from 'react'

interface ChannelRangeInputProps {
    channel: 'l' | 'c' | 'h' | 'alpha'
    min: number
    max: number
    step: number
}

export default function ChannelRangeInput({
    channel,
    min,
    max,
    step,
}: ChannelRangeInputProps) {
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
                { ...color, [channel]: parseFloat(e.target.value) }
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
                    name={channel}
                    value={color[channel]}
                    onChange={(e) => handleChange(e)}
                    min={min}
                    max={max}
                    step={step}
                    className='range-input absolute top-0 right-0 left-0 z-10 h-10 w-full'
                />
            )}
        </>
    )
}
