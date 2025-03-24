import {
    getNearestNamedColor,
    getNextColorName,
    getRandomOklchColor,
} from '@/helpers/colors.tsx'
import { colorAtom, colorsAtom } from '@/stores/atoms.tsx'
import { clampChroma, Color, formatCss } from 'culori/fn'
import { useAtom } from 'jotai'
import { Dices } from 'lucide-react'

export default function Header() {
    const [color, setColor] = useAtom(colorAtom)
    const [colors, setColors] = useAtom(colorsAtom)

    function handleRandomize() {
        const oklch: Color = getRandomOklchColor()
        const name =
            color?.name ?
                color?.name
            :   getNextColorName(getNearestNamedColor(oklch), colors)
        const updatedColors = colors.map((color) => {
            return color.name === name ? { name: name, color: oklch } : color
        })

        setColor({
            name: name,
            color: oklch,
        })
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
                                backgroundColor: formatCss(
                                    clampChroma(color?.color),
                                ),
                            }}
                        />
                        &nbsp;{color.name}
                    </>
                :   'OKLCH'}
            </h2>
            <button
                onClick={handleRandomize}
                className='btn btn-square btn-ghost -mb-1'
            >
                <Dices />
            </button>
        </div>
    )
}
