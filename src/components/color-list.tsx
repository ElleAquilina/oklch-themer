import { getNearestNamedColor, getRandomOklchColor } from '@/helpers/colors.tsx'
import { ColorNameSchema } from '@/schemas/color-name.tsx'
import { colorsAtom, oklchAtom } from '@/stores/atoms.tsx'
import { Color } from '@/types/color.tsx'
import { clampChroma, formatCss, Oklch } from 'culori/fn'
import { AnimatePresence, motion, Reorder } from 'framer-motion'
import { useAtom } from 'jotai/index'
import { CircleFadingPlus, Images, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { fromError } from 'zod-validation-error'

export default function ColorList() {
    const [colors, setColors] = useAtom(colorsAtom)
    const [oklch, setOklch] = useAtom(oklchAtom)
    const [editColor, setEditColor] = useState<Color | null>(null)
    const [editName, setEditName] = useState('')
    const [error, setError] = useState('')

    function handleAddColor() {
        const color: Oklch = getRandomOklchColor()
        // TODO: Remove edge case: If the same color name is added twice, an error will occur since name is used as list key
        const name = getNearestNamedColor(color)

        setColors([
            ...colors,
            {
                name: name,
                oklch: color,
            },
        ])
        setEditColor(null)
        setEditName('')
        setError('')
    }

    function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
        setEditName(e.target.value)
    }

    function handleDuplicateColor(color: Color) {
        // Match names with 'name-XXX' format
        const extractedName = color.name.match(/^([a-zA-Z]+)-?\d*$/)
        const name = extractedName ? extractedName[1] : color.name
        let nameStep = 100

        // Find next available suffix for name (-XXX)
        // TODO: Remove edge case: 'red-100' is duplicated while 'red' doesnt exist
        if (colors.find((c) => c.name === name)) {
            while (colors.find((c) => c.name === `${name}-${nameStep}`)) {
                nameStep += 100
            }
        }

        setColors([
            ...colors,
            {
                name: `${name}-${nameStep}`,
                oklch: color.oklch,
            },
        ])
    }

    function handleEditName(color: Color) {
        // TODO: Auto-select the text in the input tag
        setEditColor(color)
        setEditName(color.name)
    }

    function handleRemoveColor(color: Color) {
        // Remove color from color list (color names must be unique)
        setColors(colors.filter((c) => c.name !== color.name))

        // Remove color from selected colors (if selected)
        if (color.oklch === oklch) {
            setOklch(undefined)
        }
    }

    function handleSelectColor(color: Color) {
        setOklch(color.oklch)
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            console.log('keydown enter')
            handleSubmitName()
        }
    }

    function handleSubmitName() {
        console.log('submit of new color on enter key')
        console.log(editName)

        // TODO: Ensure name does not already exist
        try {
            console.log('is valid?')
            let valid = ColorNameSchema(colors).parse(editName)

            console.log(valid)
            if (valid) {
                setError('')
                // TODO: Use map to update array (cannot be mutated)
                // https://react.dev/learn/updating-arrays-in-state#replacing-items-in-an-array
            }
        } catch (e) {
            console.log(e)
            if (e instanceof z.ZodError) {
                const err = fromError(e)
                setError(err.toString())
            }
        }
        // TODO: Disallow certain characters
        // TODO: Throw warning for Tailwind name override
    }

    return (
        <div className='flex h-full flex-col overflow-y-scroll'>
            <div className='flex flex-row items-center justify-between'>
                <h2 className='pl-4'>&gt;&nbsp;Color List</h2>
                <button
                    onClick={handleAddColor}
                    className='btn btn-ghost btn-circle mt-1 mr-4'
                    title='Add color'
                >
                    <CircleFadingPlus />
                </button>
            </div>
            <Reorder.Group
                values={colors}
                onReorder={setColors}
                className='list grow'
            >
                <AnimatePresence>
                    {colors.map((color) => (
                        <Reorder.Item
                            key={color.name}
                            value={color}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='list-row items-center pb-1'
                        >
                            <div
                                className='badge'
                                style={{
                                    backgroundColor: formatCss(
                                        clampChroma(color.oklch),
                                    ),
                                }}
                            />
                            <div onClick={() => handleSelectColor(color)}>
                                {/* TODO: Add prefix dropdown (--, _, -, etc.) */}
                                <p
                                    onClick={(e) => e.stopPropagation()}
                                    onDoubleClick={() => handleEditName(color)}
                                    className='inline'
                                >
                                    {editColor?.name === color.name ?
                                        <motion.input
                                            key='input'
                                            id={color.name}
                                            type='text'
                                            value={editName}
                                            onChange={handleChangeName}
                                            onKeyDown={handleKeyDown}
                                            initial={{
                                                opacity: 0,
                                            }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            className='input input-sm'
                                        />
                                    :   color.name}
                                </p>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleDuplicateColor(color)}
                                    className='btn btn-circle btn-ghost'
                                >
                                    <Images />
                                </button>
                                <button
                                    onClick={() => handleRemoveColor(color)}
                                    className='btn btn-circle btn-ghost'
                                >
                                    <Trash2 />
                                </button>
                            </div>
                        </Reorder.Item>
                    ))}
                </AnimatePresence>
            </Reorder.Group>
        </div>
    )
}
