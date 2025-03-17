import ThemeController from '@/components/theme-controller.tsx'

export default function Header() {
    return (
        <>
            <header className='flex w-full flex-row items-center justify-between p-2'>
                <div />
                <div>
                    <h1>TailwindCSS OKLCH</h1>
                    <h4>Theme Maker</h4>
                </div>
                <div className='flex flex-row'>
                    <ThemeController />
                </div>
            </header>
        </>
    )
}
