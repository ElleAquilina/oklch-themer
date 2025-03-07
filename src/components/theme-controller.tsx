import { useEffect, useState } from 'react'

function ThemeController() {
    const [theme, setTheme] = useState(
        JSON.parse(localStorage.getItem('theme')),
    )

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        setTheme(storedTheme ? storedTheme : 'dark')
    }, [])

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme))
        document.body.className = theme
    }, [theme])

    function handleThemeChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTheme(e.target.value)
    }

    return (
        <div className='dropdown mb-72'>
            <div tabIndex={0} role='button' className='btn m-1'>
                Theme
                <svg
                    width='12px'
                    height='12px'
                    className='inline-block h-2 w-2 fill-current opacity-60'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 2048 2048'
                >
                    <path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z'></path>
                </svg>
            </div>
            <ul
                tabIndex={0}
                className='dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl'
            >
                <li>
                    <input
                        type='radio'
                        name='theme-dropdown'
                        className='theme-controller w-full btn btn-sm btn-block btn-ghost justify-start'
                        aria-label='Light'
                        value='light'
                        onChange={handleThemeChange}
                    />
                </li>
                <li>
                    <input
                        type='radio'
                        name='theme-dropdown'
                        className='theme-controller w-full btn btn-sm btn-block btn-ghost justify-start'
                        aria-label='Dim'
                        value='dim'
                        onChange={handleThemeChange}
                    />
                </li>
                <li>
                    <input
                        type='radio'
                        name='theme-dropdown'
                        className='theme-controller w-full btn btn-sm btn-block btn-ghost justify-start'
                        aria-label='Dark'
                        value='dark'
                        onChange={handleThemeChange}
                    />
                </li>
                <li>
                    <input
                        type='radio'
                        name='theme-dropdown'
                        className='theme-controller w-full btn btn-sm btn-block btn-ghost justify-start'
                        aria-label='Black'
                        value='black'
                        onChange={handleThemeChange}
                    />
                </li>
            </ul>
        </div>
    )
}

export default ThemeController
