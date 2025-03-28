import Chroma from '@/features/chroma/chroma'
import Hue from '@/features/hue/hue'
import Luminosity from '@/features/luminosity/luminosity'
import Display from './components/display'
import Header from './components/header'
import Alpha from '@/features/alpha/alpha.tsx'

export default function OklchDisplay() {
    // TODO: Make color name a component that types out the color name

    return (
        <div className='flex h-full flex-col gap-2 px-3'>
            <Header />
            <Display />
            <div className='divider divider-vertical mt-1 text-sm'>
                channels
            </div>
            <div className='flex h-full w-full flex-col gap-5'>
                <Hue />
                <Luminosity />
                <Chroma />
                <Alpha />
            </div>
        </div>
    )
}
