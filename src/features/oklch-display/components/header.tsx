import { getRandomOklchColor } from '@/helpers/colors.tsx'
import { colorAtom, colorsAtom, nameAtom } from '@/stores/atoms.tsx'
import { clampChroma, formatCss, Oklch } from 'culori/fn'
import { useAtom, useAtomValue } from 'jotai'
import { Dices } from 'lucide-react'

export default function Header() {
    const [colors, setColors] = useAtom(colorsAtom)
    const [color, setColor] = useAtom(colorAtom)
    const name = useAtomValue(nameAtom)

    function handleRandomize() {
        const oklch: Oklch = getRandomOklchColor()
        const updatedColors = colors.map((c) => {
            return c.name === name ? { ...c, color: oklch } : c
        })

        setColor(oklch)
        setColors(updatedColors)
    }

    // TODO: Add double click edit of name

    return (
        <div className='sticky top-0 flex flex-row items-center justify-between p-2'>
            <h2 className='text-xl md:text-2xl'>
                &gt;&nbsp;
                {color ?
                    <>
                        &nbsp;
                        <div
                            className='badge badge-outline'
                            style={{
                                backgroundColor: formatCss(clampChroma(color)),
                            }}
                        />
                        &nbsp;{name}
                    </>
                :   'OKLCH'}
            </h2>

            <button
                onClick={handleRandomize}
                className={`btn btn-square btn-ghost ${!color ? 'btn-disabled' : ''} -mb-1`}
            >
                <Dices />
            </button>
        </div>
    )
}
