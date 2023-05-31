import React, { useState, useRef, useEffect, useCallback } from 'react'
import GeoService from '../../lib/services/geo-service'
import ErrorOrLoading from '../global/ErrorOrLoading'

function Location1({ field, register, errors, getValues, setValue }) {
    const [options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const resultContainer = useRef(null);
    const [showResults, setShowResults] = useState(false);
    const [defaultValue, setDefaultValue] = useState(getValues(['location']))

    const fetchOptions = () => {
        if (defaultValue) {
            setLoading(true)
            setError(null)
            GeoService.getLocations(defaultValue)
                .then(response => {
                    setOptions(response.data.dataList)
                })
                .catch(error => {
                    setError(error)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    const handleChange = (e) => {
        setDefaultValue(e.target.value);
    };

    const handleSelection = (selectedIndex) => {
        const selectedItem = options[selectedIndex]
        if (!selectedItem) return resetSearchComplete()
        setSelectedOption(selectedItem)
        resetSearchComplete();
    };

    const resetSearchComplete = useCallback(() => {
        setFocusedIndex(-1);
        setShowResults(false);
    }, []);

    useEffect(() => {
        if (!resultContainer.current) return;

        resultContainer.current.scrollIntoView({
            block: "center",
        });
    }, [focusedIndex]);

    useEffect(() => {
        if (options.length > 0 && !showResults) setShowResults(true);

        if (options.length <= 0) setShowResults(false);
    }, [options]);

    useEffect(() => {
        if (selectedOption) setDefaultValue(selectedOption);
    }, [selectedOption]);

    return (
        <>
            <div
                tabIndex={1}
                onBlur={resetSearchComplete}
                className="relative"
            >
                <input
                    value={defaultValue}
                    onChange={handleChange}
                    type="text"
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Вводіть назву латинськими літерами"
                    onKeyUp={fetchOptions}
                    onBlur={() => setValue(field.name, selectedOption)}
                />
                <input hidden  {...register(field.name, { required: field.required && 'Це поле обовʼязкове.' })}/>
                {/* Search Results Container */}
                {showResults && (
                    <div className="absolute mt-1 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto">
                        {options.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    onMouseDown={() => handleSelection(index)}
                                    ref={index === focusedIndex ? resultContainer : null}
                                    style={{
                                        backgroundColor:
                                            index === focusedIndex ? "rgba(0,0,0,0.1)" : "",
                                    }}
                                    className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2"
                                >
                                    <p> {item}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
                {errors && errors[field.name] && (
                    <span className="text-red-500">{errors[field.name].message}</span>
                )}
            </div>
            <ErrorOrLoading error={error} loading={loading} />
        </>
    )
}

export default Location1