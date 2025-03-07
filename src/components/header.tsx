import Github from '@/assets/icons/github'
import ThemeController from '@/components/theme-controller.tsx'

export default function Header() {
    return (
        <>
            <header className='flex flex-row w-full justify-between'>
                <div>
                    <Github className='w-10 h-10 md:hidden' />
                </div>
                <div>
                    <h4>TailwindCSS OKLCH Color Generator</h4>
                </div>
                <div className='flex flex-row'>
                    <Github className='w-10 h-10 hidden md:block' />
                    <ThemeController />
                </div>
            </header>
        </>
    )
}
