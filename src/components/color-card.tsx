import { getRandomOklchColor, inRgb } from '@/helpers/colors'
import { Schema } from '@/types/oklch.schema.tsx'
import 'culori/css'
import { clampChroma, formatCss, formatHex, formatRgb, Oklch } from 'culori/fn'
import { useState } from 'react'

export default function ColorCard() {
    const [oklch, setOklch] = useState<Oklch>(getRandomOklchColor())

    const [inputData, setInputData] = useState({
        l: oklch.l * 100, // Display as percentage value
        c: oklch.c,
        h: oklch.h,
    })

    const [errors, setErrors] = useState({
        l: '',
        c: '',
        h: '',
    })

    function setOklchProperty(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target

        setInputData((prevState) => ({
            ...prevState,
            [name]: name === 'l' ? parseFloat(value) * 100 : value,
        }))

        setOklch((prevState) => ({
            ...prevState,
            [name]: parseFloat(value),
        }))
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target

        setInputData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    function handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
        const { name } = e.currentTarget
        validate(name)
    }

    function handleOnBlur(e: React.ChangeEvent<HTMLInputElement>) {
        const { name } = e.target
        validate(name)
    }

    function validate(channelName: string) {
        try {
            let valid = Schema.parse(inputData)

            if (valid) {
                setInputData(valid)
                setOklch((prevState) => ({
                    ...prevState,
                    l: valid.l / 100, // Change percentage to Oklch object's decimal format
                    c: valid.c,
                    h: valid.h,
                }))
                setErrors((prevState) => ({
                    ...prevState,
                    [channelName]: '',
                }))
            }
        } catch (e) {
            console.log(e)
            setErrors((prevState) => ({
                ...prevState,
                [channelName]: e,
            }))
        }
    }

    return (
        <>
            <div>
                <p>Color Display</p>
                <canvas
                    className='w-96 h-48'
                    style={{
                        backgroundColor: formatCss(oklch),
                    }}
                />
                <p>in range?: {inRgb(oklch) ? 'yes' : 'no'}</p>
                <p>
                    oklch: ({oklch.l} {oklch.c} {oklch.h})
                </p>
                <p>oklch: {formatCss(clampChroma(oklch, 'oklch'))}</p>
                <p>rgb: {formatRgb(clampChroma(oklch))}</p>
                <p>hex: {formatHex(clampChroma(oklch))}</p>
                <div className='flex flex-row'>
                    <div>
                        <p>0-100</p>
                        <input
                            type='range'
                            name='l'
                            value={oklch.l}
                            onChange={setOklchProperty}
                            min='0'
                            max='1'
                            step='0.001'
                        />
                        <input
                            type='text'
                            name='l'
                            value={inputData.l}
                            onChange={handleChange}
                            onBlur={handleOnBlur}
                            onKeyDown={(e) =>
                                e.key === 'Enter' ? handleSubmit(e) : null
                            }
                        />
                    </div>
                    <div>
                        <p>0-1</p>
                        <input
                            type='range'
                            name='c'
                            value={oklch.c}
                            onChange={setOklchProperty}
                            min='0'
                            max='0.4'
                            step='0.001'
                        />
                        <input
                            type='text'
                            name='c'
                            value={inputData.c}
                            onChange={handleChange}
                            onBlur={handleOnBlur}
                            onKeyDown={(e) =>
                                e.key === 'Enter' ? handleSubmit(e) : null
                            }
                        />
                    </div>
                    <div>
                        <p>Values above 360 will wrap around</p>
                        <input
                            type='range'
                            name='h'
                            value={oklch.h}
                            onChange={setOklchProperty}
                            min='0'
                            max='360'
                            step='1'
                        />
                        <input
                            type='text'
                            name='h'
                            value={inputData.h}
                            onChange={handleChange}
                            onBlur={handleOnBlur}
                            onKeyDown={(e) =>
                                e.key === 'Enter' ? handleSubmit(e) : null
                            }
                            className='border-3'
                            style={{
                                borderColor: errors.h ? 'red' : 'transparent',
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
