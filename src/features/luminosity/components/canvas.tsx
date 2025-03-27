import { inRgb } from '@/helpers/colors.tsx'
import { colorAtom } from '@/stores/atoms.tsx'
import { clampChroma, formatCss, Oklch } from 'culori/fn'
import { useAtomValue } from 'jotai/index'
import { useEffect, useRef } from 'react'

export default function Canvas() {
    const color = useAtomValue(colorAtom)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        drawGradient()
    }, [color?.c, color?.h])

    function drawGradient() {
        if (!canvasRef || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const colorStops = 1000
        const colorWidth = canvas.width / colorStops

        if (!ctx || !color) return

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Loop through color stops and draw rectangle
        for (let i = 0; i < colorStops; i++) {
            let gradientColor: Oklch = {
                mode: 'oklch',
                c: color.c,
                h: color.h,
                l: i / 1000,
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
            <canvas
                ref={canvasRef}
                width={1000}
                className='bg-base-100 rounded-box border-neutral h-10 w-full border-1 border-solid'
            />
        </>
    )
}
