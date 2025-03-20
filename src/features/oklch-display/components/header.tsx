import { colorAtom } from '@/stores/atoms.tsx'
import { clampChroma, formatCss } from 'culori/fn'
import { useAtomValue } from 'jotai'

export default function Header() {
    const color = useAtomValue(colorAtom)

    // TODO: Add double click edit of name

    return (
        <div className='sticky top-0 flex flex-row items-center justify-between p-3'>
            <h2 className='text-xl md:text-2xl'>
                &gt;&nbsp;
                {color ?
                    <>
                        <div
                            className='badge badge-outline'
                            style={{
                                backgroundColor: formatCss(
                                    clampChroma(color?.color),
                                ),
                            }}
                        />
                        &nbsp;{color.name}
                    </>
                :   'OKLCH'}
            </h2>
        </div>
    )
}
