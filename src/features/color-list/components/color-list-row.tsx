import { getNextColorName } from '@/helpers/colors.tsx'
import { ColorNameSchema } from '@/schemas/color-name'
import { colorAtom, colorsAtom, nameAtom } from '@/stores/atoms.tsx'
import { Color } from '@/types/color.tsx'
import { clampChroma, formatCss } from 'culori/fn'
import { motion, Reorder } from 'framer-motion'
import { useAtom, useSetAtom } from 'jotai'
import { Check, Images, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { fromError } from 'zod-validation-error'

export default function ColorListRow({ color }: { color: Color}) {
    const [colors, setColors] = useAtom(colorsAtom)
    const setSelected = useSetAtom(colorAtom)
    const [selectedName, setSelectedName] = useAtom(nameAtom)
    const [isEdit, setIsEdit] = useState(false)
    const [inputName, setInputName] = useState('')
    const [error, setError] = useState('')

    function handleEdit() {
        setIsEdit(true)
        setInputName(color.name)
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputName(e.target.value)
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            submit()
        }
    }

    function submit() {
        try {
            if (inputName !== color.name) {
                // TODO: Edge Case; Disallow certain characters, etc.
                let valid = ColorNameSchema(colors).parse(inputName)

                if (valid) {
                    const newColors = colors.map((c) => {
                        if (c.name === color.name) {
                            return { ...c, name: inputName }
                        } else {
                            return c
                        }
                    })

                    setColors(newColors)
                    setSelected(color.color)
                    setSelectedName(inputName)
                }
            }

            setIsEdit(false)
            setInputName('')
            setError('')
        } catch (e) {
            if (e instanceof z.ZodError) {
                setError(fromError(e).toString())
            }
        }
    }

    function handleDuplicate() {
        const newName = getNextColorName(color.name, colors)

        setColors([
            ...colors,
            {
                name: newName,
                color: color.color,
            },
        ])
    }

    function handleSelect() {
        setSelected(color.color)
        setSelectedName(color.name)
    }

    function handleRemove() {
        setSelected(undefined)
        setColors(colors.filter((c) => c.name !== color.name))
    }

    return (
        <Reorder.Item
            key={color.name}
            value={color}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSelect}
            className={`list-row group mb-1 items-center p-1 md:p-2 ${selectedName === name ? 'bg-base-100' : ''}`}
        >
            <div
                className='badge badge-outline'
                style={{
                    backgroundColor: formatCss(clampChroma(color.color)),
                }}
            />
            <div
                onDoubleClick={handleEdit}
                className='flex flex-row items-center'
            >
                {isEdit ?
                    <>
                        <motion.input
                            key='input'
                            id={color.name}
                            type='text'
                            value={inputName}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className={`input input-sm ${error ? 'input-error' : ''}`}
                        />

                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                submit()
                            }}
                            className='btn btn-square btn-sm btn-ghost mx-1'
                        >
                            <Check />
                        </button>
                    </>
                :   color.name}
            </div>
            <div
                className={`m-0 flex-col opacity-0 transition-opacity duration-400 ${!isEdit ? 'group-hover:opacity-100' : 'hidden'} ${!isEdit && selectedName === name && 'opacity-100 group-hover:opacity-100'}`}
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        handleDuplicate()
                    }}
                    className='btn btn-square btn-sm btn-ghost'
                >
                    <Images />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        handleRemove()
                    }}
                    className='btn btn-square btn-sm btn-ghost'
                >
                    <Trash2 />
                </button>
            </div>
        </Reorder.Item>
    )
}
