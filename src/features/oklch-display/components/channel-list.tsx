import { getRandomOklchColor, inRgb } from '@/helpers/colors.tsx'
import { colorAtom, colorsAtom, nameAtom } from '@/stores/atoms.tsx'
import { clampChroma, formatCss, Oklch } from 'culori/fn'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useRef } from 'react'

export default function ChannelList() {
    const [colors, setColors] = useAtom(colorsAtom)
    const [color, setColor] = useAtom(colorAtom)
    const name = useAtomValue(nameAtom)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // On first load, update the input thumb color
    useEffect(() => {
        if (color) {
            document.documentElement.style.setProperty(
                '--color-thumb',
                formatCss(clampChroma(color)),
            )
        }
    })

    useEffect(() => {
        drawGradient()
    }, [color?.l, color?.c])

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

    function drawGradient() {
        if (!canvasRef || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const colorStops = 360
        const colorWidth = canvas.width / colorStops

        if (!ctx || !color) return

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Loop through color stops and draw rectangle
        for (let i = 0; i < colorStops; i++) {
            let gradientColor: Oklch = {
                mode: 'oklch',
                c: color.c,
                h: i,
                l: color.l,
            }

            if (inRgb(gradientColor)) {
                ctx.fillStyle = formatCss(clampChroma(gradientColor))
            } else {
                ctx.fillStyle = 'rgba(0,0,0,0)'
            }

            ctx.fillRect(i * colorWidth, 0, colorWidth, canvas.height)
        }
    }

    return (
        <>
            {color && (
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-row items-center justify-between gap-5'>
                        <div className='flex flex-row gap-2'>
                            <kbd className='kbd'>L</kbd>
                            <p>Luminosity</p>
                        </div>
                        <input type='text' className='input w-15 text-center' />
                    </div>
                    <div className='relative flex w-full flex-col items-center justify-center'>
                        <canvas
                            ref={canvasRef}
                            width={360}
                            className='rounded-box border-neutral h-10 w-full border-1 border-solid'
                        />
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
                    </div>
                </div>
            )}
        </>
    )
}
