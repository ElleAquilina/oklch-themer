import { oklchAtom } from '@/stores/atoms.tsx'
import { Schema } from '@/types/oklch.schema.tsx'
import { useAtom } from 'jotai'
import { ChevronsDown, ChevronsUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { fromError } from 'zod-validation-error'

interface ColorInputProps {
    channel: 'l' | 'c' | 'h' | 'alpha'
}

export default function ColorTextInput({ channel }: ColorInputProps) {
    const [oklch, setOklch] = useAtom(oklchAtom)
    const [value, setValue] = useState(oklch[channel]?.toString() || '')
    const [error, setError] = useState('')

    // Watch for changes in oklch to update input
    useEffect(() => {
        setValue(oklch[channel]?.toString() || '')
    }, [oklch])

    // Handle input change
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
    }

    // Handle input submission (hitting enter or leaving focus) with validation
    function handleSubmit() {
        try {
            let schema = Schema[channel as keyof typeof Schema]
            let valid = schema.parse(value)

            if (valid) {
                setOklch((oklch) => ({
                    ...oklch,
                    [channel]: value,
                }))
                setError('')
            }
        } catch (e) {
            if (e instanceof z.ZodError) {
                const err = fromError(e)
                setError(err.toString())
            }
        }
    }

    return (
        <>
            <div className='join w-44'>
                <button className='btn rounded-l-full p-2 w-10 h-10 join-item'>
                    <ChevronsDown />
                </button>
                <input
                    type='text'
                    name={channel}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleSubmit}
                    onKeyDown={(e) =>
                        e.key === 'Enter' ? handleSubmit() : null
                    }
                    className={`join-item input text-center text-lg ${error ? 'input-error' : ''}`}
                />
                <button className='btn rounded-r-full w-10 h-10 p-2 join-item'>
                    <ChevronsUp />
                </button>
            </div>
        </>
    )
}
