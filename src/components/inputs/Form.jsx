import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorOrLoading from '../global/ErrorOrLoading';
import Default from './Default';
import Dropdown from './Dropdown';
import Location from './Location';

const Form = ({ fields, submitFunction, submitButtonName, cancelButtonName, onCancel, children, values, title, isHorizontal }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { register, handleSubmit, errors, reset, getValues, setValue } = useForm({ values });

    const onSubmit = async (data) => {
        setLoading(true)
        setError(null)
        submitFunction(data)
            .catch(error => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    };

    const onReset = () => {
        reset()
        setError(null)
        setLoading(false)
        if (onCancel) onCancel()
    }
    return (
        <div className='p-5'>
            {title && <h2 className="text-xl font-bold">{title}</h2>}
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className={`${isHorizontal ? 'flex flex-col md:flex-row items-center gap-4' : ''}`}>
                    {fields.map((field) => (
                        <div key={field.name} 
                        className={`${field.type === 'checkbox' ? 'flex flex-row items-center text-justify' : ''}`}>
                            <label htmlFor={field.name} className="block font-medium text-gray-700">
                                {field.label}
                                {field.required && <span className="text-red-500">*</span>}
                            </label>
                            {!field.type.includes('dropdown') && !field.type.includes('location') &&
                                <Default register={register} errors={errors} field={field} />}
                            {field.type === 'dropdown' &&
                                <Dropdown register={register} errors={errors} field={field} />}
                            {field.type === 'location' &&
                                <Location register={register} errors={errors} field={field} getValues={getValues} setValue={setValue} />}
                        </div>
                    ))}
                </div>
                <div className="flex justify-center">
                    <ErrorOrLoading error={error} loading={loading} />
                </div>
                {children}
                <div className="flex justify-center sm:flex-col">
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="flex-grow px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
                        >
                            {submitButtonName ? submitButtonName : 'Підтвердити'}
                        </button>
                        <button
                            type="button"
                            className="flex-grow px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                            onClick={onReset}
                        >
                            {cancelButtonName ? cancelButtonName : 'Скасувати'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Form;