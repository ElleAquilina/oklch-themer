import Github from '@/assets/icons/github'
import ThemeToggle from '@/components/theme-toggle'

function Header() {
    return (
        <>
            <header className='flex flex-row w-full justify-between'>
                <Github className='w-10 h-10 md:hidden' />
                <div>
                    <h4>TailwindCSS OKLCH Color Generator</h4>
                </div>
                <div className='flex flex-row'>
                    <Github className='w-10 h-10 hidden md:block' />
                    <ThemeToggle />
                </div>
            </header>
        </>
    )
}

export default Header
