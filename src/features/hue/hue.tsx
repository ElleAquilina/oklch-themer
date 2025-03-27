import { colorAtom } from '@/stores/atoms.tsx'
import { useAtomValue } from 'jotai/index'
import Canvas from './components/canvas'
import RangeInput from './components/range-input'
import TextInput from './components/text-input'

export default function Hue() {
    const color = useAtomValue(colorAtom)

    return (
        <>
            {color && (
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-row items-center justify-between gap-5'>
                        <div className='flex flex-row gap-2'>
                            <kbd className='kbd'>H</kbd>
                            <p>Hue</p>
                        </div>
                        <TextInput />
                    </div>
                    <div className='relative flex w-full flex-col items-center justify-center'>
                        <Canvas />
                        <RangeInput />
                    </div>
                </div>
            )}
        </>
    )
}
