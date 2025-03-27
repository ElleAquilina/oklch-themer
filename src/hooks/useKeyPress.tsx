import { useEffect } from 'react'

export function useKeyPress(callback: () => void, keycodes: string[]) {
    function handler(e: KeyboardEvent) {
        if (keycodes.includes(e.key)) {
            e.preventDefault()
            callback()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handler)
        return () => {
            window.removeEventListener('keydown', handler)
        }
    }, [])
}
