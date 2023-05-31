import React, { useEffect, useState } from 'react'
import ErrorOrLoading from '../global/ErrorOrLoading'

function Dropdown({ field, register, errors }) {
    const [options, setOptions] = useState(field.optionsList)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (!options) {
            setLoading(true)
            setError(null)
            field.fetchOptions()
                .then(response => {
                    setOptions(response.data)
                })
                .catch(error => {
                    setError(error)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [])
    return (
        <>
            <select
                {...register(field.name, { required: {value: field.required, message: 'Це поле обовʼязкове.' }})}
                className="block p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
                {options && options.map(option =>
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                )}
            </select>
            {errors && errors[field.name] && (
                <span className="text-red-500">{errors[field.name].message}</span>
            )}
            <ErrorOrLoading error={error} loading={loading} />
        </>
    )
}

export default Dropdown