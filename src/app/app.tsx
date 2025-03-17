import ColorList from '@/components/color-list.tsx'
import Header from '@/components/header.tsx'

function App() {
    return (
        <div className='flex h-dvh flex-col'>
            <Header />
            <div className='bg-base-200 m-5 flex grow flex-col space-x-5 rounded-lg p-5 md:flex-row'>
                <div className='card bg-base-300 max-h-100 w-full p-2 md:w-1/2'>
                    <ColorList />
                </div>
                <div className='card bg-base-300 grow p-3'>Color Selector</div>
            </div>
        </div>
    )
}

export default App
