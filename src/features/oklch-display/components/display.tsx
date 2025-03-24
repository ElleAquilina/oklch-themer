import { inRgb } from '@/helpers/colors.tsx'
import { colorAtom } from '@/stores/atoms.tsx'
import { formatCss } from 'culori'
import { clampChroma } from 'culori/fn'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { Copy } from 'lucide-react'

export default function Display() {
    const [color, setColor] = useAtom(colorAtom)

    /**
     * Set the selected color to the fallback color (an OKLCH color that
     * works with RGB displays
     */
    function handleFallback() {
        // TODO: Fix fallback rounding issues
        if (color) {
            setColor(clampChroma(color))
        }
    }

    return (
        <>
            <div className='flex h-3/10 w-full flex-row gap-1 text-sm'>
                {/* Color Displays */}
                {color && inRgb(color) ?
                    <>
                        <motion.div
                            className='rounded-box border-neutral h-full w-full border-1 md:w-1/2'
                            style={{ backgroundColor: formatCss(color) }}
                            initial={{
                                width: 0,
                                backgroundColor: formatCss(color),
                            }}
                            animate={{
                                width: '100%',
                                backgroundColor: formatCss(color),
                            }}
                            transition={{
                                width: { duration: 0.5 },
                                backgroundColor: { duration: 0.5 },
                            }}
                        />
                    </>
                :   <>
                        <div className='rounded-box border-neutral flex h-full w-full justify-center border-2 border-dotted'>
                            <div>
                                <button className='btn btn-disabled btn-xs m-2'>
                                    {color ?
                                        'unavailable'
                                    :   'no color selected'}
                                </button>
                            </div>
                        </div>
                    </>
                }
                {/* Additional Color Display: RGB Out of Range */}
                {color && !inRgb(color) ?
                    <>
                        <motion.div
                            className='rounded-box border-neutral flex h-full w-full justify-center border-1 md:w-1/2'
                            style={{
                                backgroundColor: formatCss(clampChroma(color)),
                            }}
                            initial={{
                                width: 0,
                                backgroundColor: formatCss(clampChroma(color)),
                            }}
                            animate={{
                                width: '100%',
                                backgroundColor: formatCss(clampChroma(color)),
                            }}
                            transition={{
                                width: { duration: 0.5 },
                                backgroundColor: { duration: 0.5 },
                            }}
                        >
                            <div>
                                <button
                                    onClick={handleFallback}
                                    className={`btn btn-xs m-2`}
                                >
                                    fallback
                                </button>
                            </div>
                        </motion.div>
                    </>
                :   ''}
            </div>

            {/* Color Information */}
            <div className='flex flex-row items-center justify-center gap-2 pt-2'>
                <p className='inline text-sm'>{formatCss(color)}</p>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(
                            color ? formatCss(color) : '',
                        )
                    }}
                    className='btn btn-sm btn-square btn-ghost'
                >
                    <Copy />
                </button>
            </div>
        </>
    )
}
