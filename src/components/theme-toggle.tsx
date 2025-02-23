import Moon from '@/assets/icons/moon'
import Sun from '@/assets/icons/sun'
import { useEffect, useState } from 'react'

function ThemeToggle() {
    const [theme, setTheme] = useState('dark')

    const Icon = theme === 'light' ? Sun : Moon

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        setTheme(storedTheme ? storedTheme : 'dark')
    }, [])

    useEffect(() => {
        document.body.className = theme
    }, [theme])

    function toggleTheme() {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    }

    return (
        <button onClick={() => toggleTheme()}>
            <Icon className='w-8 h-8' />
        </button>
    )
}

export default ThemeToggle
