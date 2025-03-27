import { useKeyPress } from '@/hooks/useKeyPress.tsx'
import { colorAtom, colorsAtom } from '@/stores/atoms.tsx'
import { useAtom } from 'jotai/index'
import { useRef, useState } from 'react'
import Canvas from './components/canvas'

export default function Hue() {
    const [colors, setColors] = useAtom(colorsAtom)
    const [color, setColor] = useAtom(colorAtom)
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)

    useKeyPress(() => inputRef.current?.focus(), ['h'])

    return (
        <>
            {color && (
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-row items-center justify-between gap-5'>
                        <div className='flex flex-row gap-2'>
                            <kbd className='kbd'>H</kbd>
                            <p>Hue</p>
                        </div>
                        <input
                            ref={inputRef}
                            name='h'
                            value={color?.h}
                            type='text'
                            placeholder='10'
                            className='input w-15 text-center'
                        />
                    </div>
                    <Canvas />
                </div>
            )}
        </>
    )
}
