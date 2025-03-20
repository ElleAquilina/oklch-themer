import { colorAtom, colorsAtom } from '@/stores/atoms.tsx'
import { clampChroma, formatCss } from 'culori/fn'
import { useAtom } from 'jotai'

export default function OklchDisplay() {
    const [color, setColor] = useAtom(colorAtom)
    const [colors, setColors] = useAtom(colorsAtom)

    // TODO: Make color name a component that types out the color name
    console.log('Current selected color:', color)

    return (
        <div className='flex h-full flex-col px-3'>
            <div className='sticky top-0 flex flex-row items-center justify-between p-3'>
                <h2 className='text-xl md:text-2xl'>
                    &gt;&nbsp;
                    {color ?
                        <>
                            <div
                                className='badge badge-outline'
                                style={{
                                    backgroundColor: formatCss(
                                        clampChroma(color?.color),
                                    ),
                                }}
                            />
                            &nbsp;{color.name}
                        </>
                    :   'OKLCH'}
                    {color ? color.name : 'OKLCH'}
                </h2>
            </div>
            <div className='flex h-1/5 flex-row gap-3'>
                <div>{color ? color.name : 'NO COLOR'}</div>
                <div>
                    <canvas
                        className='border-primary rounded-box h-full w-full border-1'
                        style={{
                            backgroundColor: formatCss(color?.color),
                        }}
                    />
                </div>
                <div>
                    <canvas
                        className='border-primary rounded-box h-full w-full border-1'
                        style={{
                            // TODO: Fix canvas display conditions
                            backgroundColor: formatCss(
                                clampChroma(color?.color, 'oklch'),
                            ),
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
