import { useKeyPress } from '@/hooks/useKeyPress.tsx'
import { HueSchema } from '@/schemas/oklch.tsx'
import { colorAtom, colorsAtom, nameAtom } from '@/stores/atoms.tsx'
import { Oklch } from 'culori/fn'
import { useAtom, useAtomValue } from 'jotai/index'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { fromError } from 'zod-validation-error'

export default function TextInput() {
    const [colors, setColors] = useAtom(colorsAtom)
    const [color, setColor] = useAtom(colorAtom)
    const name = useAtomValue(nameAtom)
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)

    useKeyPress(() => inputRef.current?.focus(), ['h'])

    useEffect(() => {
        if (color && color.h) {
            setInputValue(color.h.toString())
        }
    }, [color?.h])

    function submit() {
        try {
            let valid = HueSchema.parse(inputValue)

            if (valid && color) {
                const oklch: Oklch = { ...color, h: valid }
                const updatedColors = colors.map((c) => {
                    return c.name === name ? { ...c, color: oklch } : c
                })
                setInputValue(valid.toString())
                setColor(oklch)
                setColors(updatedColors)
                setError('')
            }
        } catch (e) {
            if (e instanceof z.ZodError) {
                setError(fromError(e).toString())
            }
        }
    }

    return (
        <>
            {color && (
                <div className='tooltip tooltip-left'>
                    {error && (
                        <div className='tooltip-content tooltip-error'>
                            {error}
                        </div>
                    )}
                    <input
                        type='text'
                        name='h'
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={submit}
                        onKeyDown={(e) =>
                            e.key === 'Enter' ? submit() : undefined
                        }
                        onFocus={(e) => e.target.select()}
                        className={`input w-18 p-0 text-center ${error && 'input-error'}`}
                    />
                </div>
            )}
        </>
    )
}
