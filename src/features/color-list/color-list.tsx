import {
    getNearestNamedColor,
    getNextColorName,
    getRandomOklchColor,
} from '@/helpers/colors.tsx'
import { colorsAtom } from '@/stores/atoms.tsx'
import { Color } from '@/types/color.tsx'
import { AnimatePresence, Reorder } from 'framer-motion'
import { useAtom } from 'jotai'
import { CircleFadingPlus } from 'lucide-react'
import ColorListRow from './components/color-list-row.tsx'

export default function ColorList() {
    const [colors, setColors] = useAtom(colorsAtom)

    function handleAddColor() {
        const oklch = getRandomOklchColor()
        const name = getNextColorName(getNearestNamedColor(oklch), colors)

        const newColor: Color = {
            name: name,
            color: oklch,
        }

        setColors([...colors, newColor])
    }

    return (
        <div className='flex h-full flex-col px-3'>
            <div className='sticky top-0 flex flex-row items-center justify-between p-2'>
                <h2 className='text-xl md:text-2xl'>&gt;&nbsp;Color List</h2>
                <button
                    onClick={handleAddColor}
                    className='btn btn-ghost btn-circle mt-1 -mr-2'
                    title='Add color'
                >
                    <CircleFadingPlus />
                </button>
            </div>
            <Reorder.Group
                values={colors}
                onReorder={setColors}
                className='list grow overflow-y-scroll'
            >
                <AnimatePresence>
                    {colors.map((color) => (
                        <ColorListRow color={color} key={color.name} />
                    ))}
                </AnimatePresence>
            </Reorder.Group>
        </div>
    )
}
