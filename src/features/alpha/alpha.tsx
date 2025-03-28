import ChannelRangeInput from '@/components/channel-range-input'
import ChannelTextInput from '@/components/channel-text-input'
import { colorAtom } from '@/stores/atoms.tsx'
import { useAtomValue } from 'jotai/index'
import Canvas from './components/canvas'

export default function Alpha() {
    const color = useAtomValue(colorAtom)

    return (
        <>
            {color && (
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-row items-center justify-between gap-5'>
                        <div className='flex flex-row gap-2'>
                            <kbd className='kbd'>A</kbd>
                            <p>Alpha</p>
                        </div>
                        <ChannelTextInput channel='alpha' />
                    </div>
                    <div className='relative flex w-full flex-col items-center justify-center'>
                        <Canvas />
                        <ChannelRangeInput
                            channel='alpha'
                            min={0}
                            max={1}
                            step={0.001}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
