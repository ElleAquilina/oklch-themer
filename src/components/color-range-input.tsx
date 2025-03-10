import { inRgb } from '@/helpers/colors.tsx'
import { oklchAtom } from '@/stores/atoms.tsx'
import { clampChroma, formatCss, Oklch } from 'culori/fn'
import { useAtom } from 'jotai/index'
import { useEffect, useRef } from 'react'

interface ColorInputProps {
    channel: 'l' | 'c' | 'h' | 'alpha'
    min: number
    max: number
    step: number
}

export default function ColorRangeInput({ channel }: ColorInputProps) {
    const [oklch] = useAtom(oklchAtom)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        drawGradient(channel)
    }, [oklch.l, oklch.c, oklch.h])

    function drawGradient(channel: string) {
        if (!canvasRef || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const colorStops = 360
        const stripWidth = canvas.width / colorStops

        // Clear previous drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Loop through each color stop and draw rectangle on canvas
        for (let i = 0; i < colorStops; i++) {
            let color: Oklch = {
                mode: 'oklch',
                c: oklch.c,
                h: i,
                l: oklch.l,
            }

            // If color is in gamut, draw it (else convert it), else draw as transparent
            if (inRgb(color)) {
                ctx.fillStyle = formatCss(clampChroma(color))
            } else {
                ctx.fillStyle = 'rgba(0,0,0,0)'
            }

            ctx.fillRect(i * stripWidth, 0, stripWidth, canvas.height)
        }
    }

    return (
        <div className='flex flex-col'>
            <canvas
                ref={canvasRef}
                className='border-solid border-1'
                width='360'
                height='40'
            />
        </div>
    )
}
