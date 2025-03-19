import { ColorNameSchema } from '@/schemas/color-name'
import { colorAtom, colorsAtom } from '@/stores/atoms.tsx'
import { Color } from '@/types/color.tsx'
import { clampChroma, formatCss } from 'culori/fn'
import { motion, Reorder } from 'framer-motion'
import { useAtom } from 'jotai'
import { Images, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { fromError } from 'zod-validation-error'

export default function ColorListRow({ color }: { color: Color }) {
    const [colors, setColors] = useAtom(colorsAtom)
    const [selected, setSelected] = useAtom(colorAtom)
    const [isEdit, setIsEdit] = useState(false)
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    function handleEdit() {
        setIsEdit(true)
        setName(color.name)
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            submit()
        }
    }

    function submit() {
        try {
            if (name !== color.name) {
                // TODO: Edge Case; Disallow certain characters, etc.
                let valid = ColorNameSchema(colors).parse(name)

                if (valid) {
                    const newColors = colors.map((c) => {
                        if (c.name === color.name) {
                            return { ...c, name: name }
                        } else {
                            return c
                        }
                    })

                    setColors(newColors)
                }
            }

            setIsEdit(false)
            setName('')
            setError('')
        } catch (e) {
            if (e instanceof z.ZodError) {
                setError(fromError(e).toString())
            }
        }
    }

    function handleDeselect() {
        setIsEdit(false)
        setName('')
        setError('')
    }

    function handleDuplicate() {}
    function handleRemove() {
        // Remove color from color list using name
        setColors(colors.filter((c) => c.name !== color.name))

        // Remove color from selected
        if (color.name === selected?.name) {
            setSelected(null)
        }
    }

    return (
        <Reorder.Item
            key={color.name}
            value={color}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(color)}
            className={`list-row group mb-1 items-center p-1 sm:p-2 ${selected?.name === color.name ? 'bg-base-100' : ''}`}
        >
            <div
                className='badge badge-outline'
                style={{
                    backgroundColor: formatCss(clampChroma(color.color)),
                }}
            />
            <div>
                <p onClick={handleEdit} className='inline'>
                    {isEdit ?
                        <motion.input
                            key='input'
                            id={color.name}
                            type='text'
                            value={name}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            onBlur={handleDeselect}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className={`input input-sm ${error ? 'input-error' : ''}`}
                        />
                    :   color.name}
                </p>
            </div>
            <div
                className={`flex-col space-x-3 opacity-0 transition-opacity duration-400 group-hover:opacity-100 ${isEdit || selected?.name === color.name ? 'opacity-100' : ''}`}
            >
                <button
                    onClick={handleDuplicate}
                    className='btn btn-circle btn-xs btn-ghost'
                >
                    <Images />
                </button>
                <button
                    onClick={handleRemove}
                    className='btn btn-circle btn-xs btn-ghost'
                >
                    <Trash2 />
                </button>
            </div>
        </Reorder.Item>
    )
}
