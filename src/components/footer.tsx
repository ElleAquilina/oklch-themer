export default function Footer() {
    return (
        <footer className='footer footer-center items-center p-4'>
            <aside className='grid-flow-col items-center'>
                <p>
                    Copyright © {new Date().getFullYear()} - All right reserved
                </p>
            </aside>
        </footer>
    )
}
