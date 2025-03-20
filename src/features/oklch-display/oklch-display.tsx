import Display from './components/display'
import Header from './components/header'

export default function OklchDisplay() {
    // TODO: Make color name a component that types out the color name

    return (
        <div className='flex h-full flex-col px-3'>
            <Header />
            <Display />
        </div>
    )
}
