import Footer from '@/components/footer'
import Header from '@/components/header'
import ColorList from '@/features/color-list/color-list'
import OklchDisplay from '@/features/oklch-display/oklch-display'

function App() {
    return (
        <div className='flex h-dvh flex-col items-center'>
            <Header />
            <div className='m-5 flex w-4/5 grow flex-col space-y-5 sm:flex-row sm:space-x-5 lg:w-4/5 2xl:w-3/5'>
                <div className='card bg-base-300 h-1/2 sm:h-[calc(100%-2rem)] sm:w-1/2 md:w-2/5 lg:w-1/3'>
                    <ColorList />
                </div>
                <div className='card bg-base-300 grow sm:h-[calc(100%-2rem)] sm:w-1/2 md:w-3/5 lg:w-2/3'>
                    <OklchDisplay />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default App
