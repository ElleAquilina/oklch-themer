import '@/styles/prism.css'
import Prism from 'prismjs'
import { useEffect } from 'react'

export default function CodeCard() {
    useEffect(() => {
        Prism.highlightAll()
    }, [])

    return (
        <pre>
            <code className={`language-css`}>{`@theme inline {}`}</code>
        </pre>
    )
}
