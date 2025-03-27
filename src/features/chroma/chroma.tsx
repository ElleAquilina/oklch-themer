import ChannelRangeInput from '@/components/channel-range-input'
import ChannelTextInput from '@/components/channel-text-input'
import { colorAtom } from '@/stores/atoms.tsx'
import { useAtomValue } from 'jotai/index'
import Canvas from './components/canvas'

export default function Chroma() {
    const color = useAtomValue(colorAtom)

    return (
        <>
            {color && (
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-row items-center justify-between gap-5'>
                        <div className='flex flex-row gap-2'>
                            <kbd className='kbd'>C</kbd>
                            <p>Chroma</p>
                        </div>
                        <ChannelTextInput channel='c' />
                    </div>
                    <div className='relative flex w-full flex-col items-center justify-center'>
                        <Canvas />
                        <ChannelRangeInput
                            channel='c'
                            min={0}
                            max={0.4}
                            step={0.001}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
