import ColorList from '@/features/color-list/color-list'
import Footer from '@/features/footer/footer'
import Header from '@/features/header/header'
import OklchDisplay from '@/features/oklch-display/oklch-display'

function App() {
    return (
        <div className='flex h-dvh flex-col items-center'>
            <Header />
            <div className='m-5 flex h-[calc(100%)] w-4/5 grow flex-col-reverse justify-end gap-5 sm:h-[calc(100%-11rem)] sm:flex-row lg:w-4/5 2xl:w-3/5'>
                <div className='card bg-base-300 h-1/2 sm:h-full sm:w-1/2 md:w-2/5 lg:w-1/3'>
                    <ColorList />
                </div>
                <div className='card bg-base-300 h-1/2 sm:h-full sm:w-1/2 md:w-3/5 lg:w-2/3'>
                    <OklchDisplay />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default App
