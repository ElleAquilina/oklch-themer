import { useKeyPress } from '@/hooks/useKeyPress.tsx'
import { OklchSchema } from '@/schemas/oklch.tsx'
import { colorAtom, colorsAtom, nameAtom } from '@/stores/atoms.tsx'
import { Oklch } from 'culori/fn'
import { useAtom, useAtomValue } from 'jotai/index'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { fromError } from 'zod-validation-error'

interface ChannelTextInputProps {
    channel: 'l' | 'c' | 'h' | 'alpha'
}

export default function TextInput({ channel }: ChannelTextInputProps) {
    const [colors, setColors] = useAtom(colorsAtom)
    const [color, setColor] = useAtom(colorAtom)
    const name = useAtomValue(nameAtom)
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)

    useKeyPress(() => inputRef.current?.focus(), [channel])

    useEffect(() => {
        if (color && color[channel]) {
            setInputValue(color[channel].toString())
        }
    }, [color?.[channel]])

    function submit() {
        try {
            let valid = OklchSchema[channel].parse(inputValue)

            if (valid && color) {
                const oklch: Oklch = { ...color, [channel]: valid }
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
                        name={channel}
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
