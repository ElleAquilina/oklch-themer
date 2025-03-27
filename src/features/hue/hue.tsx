import ChannelRangeInput from '@/components/channel-range-input'
import ChannelTextInput from '@/components/channel-text-input'
import { colorAtom } from '@/stores/atoms.tsx'
import { useAtomValue } from 'jotai/index'
import Canvas from './components/canvas'

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
                        <ChannelTextInput channel='h' />
                    </div>
                    <div className='relative flex w-full flex-col items-center justify-center'>
                        <Canvas />
                        <ChannelRangeInput
                            channel='h'
                            min={0}
                            max={360}
                            step={0.1}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
