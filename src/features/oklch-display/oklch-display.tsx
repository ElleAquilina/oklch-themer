import Display from './components/display'
import Header from './components/header'

export default function OklchDisplay() {
    // TODO: Make color name a component that types out the color name

    return (
        <div className='flex h-full flex-col gap-2 px-3'>
            <Header />
            <Display />
            <div className='divider divider-vertical mt-1 text-sm'>
                channels
            </div>
            <div className='h-full w-full'>Inputs</div>
        </div>
    )
}
