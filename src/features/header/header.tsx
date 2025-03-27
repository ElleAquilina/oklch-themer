import ThemeController from './components/theme-controller'

export default function Header() {
    return (
        <>
            <header className='flex w-full flex-row items-center justify-between p-2 pt-5'>
                <div />
                <div>
                    <h1 className='text-2xl md:text-4xl'>
                        OKLCH TailwindCSS Themer
                    </h1>
                </div>
                <div className='flex flex-row'>
                    <ThemeController />
                </div>
            </header>
        </>
    )
}
