import ColorTextInput from '@/components/color-text-input.tsx'
import { inRgb } from '@/helpers/colors.tsx'
import { oklchAtom } from '@/stores/atoms.tsx'
import { clampChroma, formatCss, formatHex, formatRgb } from 'culori/fn'
import { useAtom } from 'jotai'

export default function ColorCardNew() {
    const [oklch, setOklch] = useAtom(oklchAtom)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setOklch((prevState) => ({
            ...prevState,
            [name]: parseFloat(value),
        }))
    }

    return (
        <div className=''>
            {/*INFO*/}
            <div>
                <p>range?: {inRgb(oklch) ? 'yes' : 'no'}</p>
                <p>
                    oklch (input values): ({oklch.l} {oklch.c} {oklch.h})
                </p>
                <p>hex: {formatHex(clampChroma(oklch))}</p>
            </div>
            <div className='flex flex-row'>
                <div className='flex flex-col'>
                    <canvas
                        className='w-48 h-48 ml-2'
                        style={{
                            backgroundColor: formatCss(oklch),
                        }}
                    />
                    <p>CSS + NO CLAMP: {formatCss(oklch)}</p>
                </div>

                <div className='flex flex-col'>
                    <canvas
                        className='w-48 h-48 ml-2'
                        style={{
                            backgroundColor: formatCss(clampChroma(oklch)),
                        }}
                    />
                    <p>CSS + CLAMP: {formatCss(clampChroma(oklch, 'oklch'))}</p>
                </div>
                <div className='flex flex-col'>
                    <canvas
                        className='w-48 h-48 ml-2'
                        style={{
                            backgroundColor: formatRgb(clampChroma(oklch)),
                        }}
                    />
                    <p>RGB + CLAMP: {formatRgb(clampChroma(oklch))}</p>
                </div>
            </div>
            <div className='flex flex-col'>
                {/*LUMINOSITY*/}
                <input
                    type='range'
                    name='l'
                    value={oklch.l}
                    onChange={handleChange}
                    min='0'
                    max='1'
                    step='0.001'
                />
                <ColorTextInput channel='l' />
                {/*CHROMA*/}
                <input
                    type='range'
                    name='c'
                    value={oklch.c}
                    onChange={handleChange}
                    min='0'
                    max='0.4'
                    step='0.001'
                />
                <ColorTextInput channel='c' />
                {/*HUE*/}
                <input
                    type='range'
                    name='h'
                    value={oklch.h}
                    onChange={handleChange}
                    min='0'
                    max='360'
                    step='1'
                />
                <ColorTextInput channel='h' />
                {/*ALPHA*/}
                <input
                    type='range'
                    name='alpha'
                    value={oklch.alpha}
                    onChange={handleChange}
                    min='0'
                    max='1'
                    step='0.01'
                />
                <ColorTextInput channel='alpha' />
            </div>
        </div>
    )
}
