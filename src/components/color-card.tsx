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
        alpha: oklch.alpha,
    })

    const [errors, setErrors] = useState({
        l: '',
        c: '',
        h: '',
        alpha: '',
    })

    function handleRangeChange(e: React.ChangeEvent<HTMLInputElement>) {
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

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
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
            let schema = Schema[channelName as keyof typeof Schema]
            let data = inputData[channelName as keyof typeof inputData]
            let validatedData = schema.parse(data)

            if (validatedData) {
                setInputData((prevState) => ({
                    ...prevState,
                    [channelName]: validatedData,
                }))
                setOklch((prevState) => ({
                    ...prevState,
                    [channelName]: validatedData,
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
                <div className='flex flex-row'>
                    <canvas
                        className='w-48 h-48 ml-2'
                        style={{
                            backgroundColor: formatCss(oklch),
                        }}
                    />
                    <canvas
                        className='w-48 h-48 ml-2'
                        style={{
                            backgroundColor: formatCss(clampChroma(oklch)),
                        }}
                    />
                    <canvas
                        className='w-48 h-48 ml-2'
                        style={{
                            backgroundColor: formatRgb(clampChroma(oklch)),
                        }}
                    />
                </div>

                <p>in range?: {inRgb(oklch) ? 'yes' : 'no'}</p>
                <p>
                    oklch (input values): ({oklch.l} {oklch.c} {oklch.h})
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
                            onChange={handleRangeChange}
                            min='0'
                            max='1'
                            step='0.001'
                        />
                        <input
                            type='text'
                            name='l'
                            value={inputData.l}
                            onChange={handleInputChange}
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
                            onChange={handleRangeChange}
                            min='0'
                            max='0.4'
                            step='0.001'
                        />
                        <input
                            type='text'
                            name='c'
                            value={inputData.c}
                            onChange={handleInputChange}
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
                            onChange={handleRangeChange}
                            min='0'
                            max='360'
                            step='1'
                        />
                        <input
                            type='text'
                            name='h'
                            value={inputData.h}
                            onChange={handleInputChange}
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
                <div>
                    <div>
                        <p>0-1</p>
                        <input
                            type='range'
                            name='alpha'
                            value={oklch.alpha}
                            onChange={handleRangeChange}
                            min='0'
                            max='1'
                            step='0.01'
                        />
                        <input
                            type='text'
                            name='alpha'
                            value={inputData.alpha}
                            onChange={handleInputChange}
                            onBlur={handleOnBlur}
                            onKeyDown={(e) =>
                                e.key === 'Enter' ? handleSubmit(e) : null
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
