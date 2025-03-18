import { colorAtom } from '@/stores/atoms.tsx'
import { formatCss } from 'culori/fn'
import { useAtom } from 'jotai'
import { Images, Trash2 } from 'lucide-react'

export default function OklchDisplay() {
    const [color, setColor] = useAtom(colorAtom)

    function handleDuplicate() {}
    function handleRemove() {}

    return (
        <div className='flex h-full flex-col px-3'>
            <div className='sticky top-0 flex flex-row items-center justify-between p-2'>
                <h2 className='text-xl md:text-2xl'>&gt;&nbsp;Color</h2>
                <div className='mt-1 space-x-3'>
                    <button
                        onClick={handleDuplicate}
                        className='btn btn-circle btn-ghost'
                    >
                        <Images />
                    </button>
                    <button
                        onClick={handleRemove}
                        className='btn btn-circle btn-xs btn-ghost'
                    >
                        <Trash2 />
                    </button>
                </div>
            </div>
            <div className=''>
                <canvas
                    className=''
                    style={{
                        backgroundColor: formatCss(color?.oklch),
                    }}
                />
                <canvas
                    className='grow'
                    style={{
                        backgroundColor: formatCss(color?.oklch),
                    }}
                />
            </div>
        </div>
    )
}
