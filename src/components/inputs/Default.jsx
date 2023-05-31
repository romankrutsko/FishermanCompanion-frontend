import React from 'react'

function Default({ register, errors, field }) {
    return (
        <>
            {field.type === 'textarea' ?
                <textarea
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.name, {
                        required: { value: field.required, message: 'Це поле обовʼязкове.' },
                        minLength: {
                            value: field.minLength,
                            message: `Мінімальна довжина має бути ${field.minLength}.`,
                        },
                        maxLength: {
                            value: field.maxLength,
                            message: `Максимальна довжина має бути ${field.maxLength}.`,
                        },
                        min: {
                            value: field.min,
                            message: `Мінімальне значення має бути ${field.min}.`,
                        },
                        max: {
                            value: field.max,
                            message: `Максимальне значення ${field.max}.`,
                        },
                    })}
                    className="block p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                :
                <input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.name,
                        {
                            required: { value: field.required, message: 'Це поле обовʼязкове.' },
                            minLength: {
                                value: field.minLength,
                                message: `Мінімальна довжина має бути ${field.minLength}.`,
                            },
                            maxLength: {
                                value: field.maxLength,
                                message: `Максимальна довжина має бути ${field.maxLength}.`,
                            },
                            min: {
                                value: field.min,
                                message: `Мінімальне значення має бути ${field.min}.`,
                            },
                            max: {
                                value: field.max,
                                message: `Максимальне значення може бути ${field.max}.`,
                            },
                        })}
                    className="block p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />}
            {errors && <div className="text-red-500 p-4">{errors?.[field.name]?.message}</div>}
        </>
    )
}

export default Default