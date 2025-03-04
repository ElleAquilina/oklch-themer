import ColorCard from '@/components/color-card.tsx'
import Header from '@/components/header'

function App() {
    return (
        <>
            <Header />
            <div>color-list</div>
            <div>
                color-picker
                <ColorCard />
            </div>
        </>
    )
}

export default App
