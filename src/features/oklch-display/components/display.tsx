import { colorAtom } from '@/stores/atoms.tsx'
import { clampChroma, formatCss } from 'culori/fn'
import { useAtomValue } from 'jotai'
import { Copy } from 'lucide-react'

export default function Display() {
    const color = useAtomValue(colorAtom)

    return (
        <>
            <div className='flex h-1/5 flex-row gap-3'>
                <div className='w-full max-w-1/3'>
                    <p>OKLCH:</p>
                    <p>{color ? formatCss(color.color) : ''}</p>
                    <Copy />
                </div>
                <div>
                    <canvas
                        className='border-primary chess rounded-box h-full w-full'
                        style={{}}
                    />
                </div>
                <div>
                    <canvas
                        className='border-primary rounded-box h-full w-full'
                        style={{
                            // TODO: Fix canvas display conditions
                            backgroundColor: formatCss(
                                clampChroma(color?.color, 'oklch'),
                            ),
                        }}
                    />
                </div>
            </div>
        </>
    )
}
