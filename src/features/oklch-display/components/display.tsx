import { inRgb } from '@/helpers/colors.tsx'
import { colorAtom } from '@/stores/atoms.tsx'
import { formatCss } from 'culori'
import { clampChroma } from 'culori/fn'
import { AnimatePresence, motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { Copy } from 'lucide-react'

export default function Display() {
    const [color, setColor] = useAtom(colorAtom)

    const isUnselected = !color
    const isValid = !!(color && inRgb(color))
    const isUnavailable = !!(color && !inRgb(color))

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
            <div className='flex h-3/10 w-full flex-row justify-between gap-1 text-sm'>
                <AnimatePresence>
                    <motion.div
                        key='modal'
                        initial={{
                            backgroundColor:
                                isValid ?
                                    formatCss(color)
                                :   'oklch(0% 0 0 / 0%)',
                        }}
                        animate={{
                            backgroundColor:
                                isValid ?
                                    formatCss(color)
                                :   'oklch(0% 0 0 / 0%)',
                        }}
                        exit={{
                            backgroundColor:
                                isValid ?
                                    formatCss(color)
                                :   'oklch(0% 0 0 / 0%)',
                        }}
                        transition={{ duration: 1 }}
                        className='rounded-box border-neutral flex h-full w-full justify-center border-1'
                    >
                        <div>
                            {(isUnselected || isUnavailable) && (
                                <motion.button
                                    key='modal-close'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 100 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1 }}
                                    className='btn btn-disabled btn-xs m-2'
                                >
                                    {isUnselected && 'no color selected'}
                                    {isUnavailable && 'unavailable'}
                                </motion.button>
                            )}
                        </div>
                    </motion.div>

                    {/* Fallback Canvas */}
                    {color && !inRgb(color) ?
                        <>
                            <motion.div
                                className='rounded-box border-neutral flex h-full w-full justify-center border-1 md:w-1/2'
                                style={{
                                    backgroundColor: formatCss(
                                        clampChroma(color),
                                    ),
                                }}
                                initial={{
                                    width: 0,
                                    backgroundColor: formatCss(
                                        clampChroma(color),
                                    ),
                                }}
                                animate={{
                                    width: '100%',
                                    backgroundColor: formatCss(
                                        clampChroma(color),
                                    ),
                                }}
                                transition={{
                                    duration: 2,
                                }}
                                exit={{
                                    width: 0,
                                    originX: 0,
                                }}
                            >
                                <div>
                                    <motion.button
                                        onClick={handleFallback}
                                        key='modal-close'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 100 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1 }}
                                        className={`btn btn-xs m-2`}
                                    >
                                        fallback
                                    </motion.button>
                                </div>
                            </motion.div>
                        </>
                    :   ''}
                </AnimatePresence>
            </div>

            {/* Color Information */}
            <div className='flex flex-row items-center justify-center gap-2 pt-2'>
                {(isValid || isUnavailable) && (
                    <>
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
                    </>
                )}
            </div>
        </>
    )
}
