import { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import Form from '../inputs/Form'
import ErrorOrLoading from './ErrorOrLoading'

function CollectionWrapper({ items, setCollection, itemsPerPage, onNext, onPrevious, children, error, loading, fields, onSearch, onModal, onCancel, isSearch, isToolbar, isCreate }) {
    const [currentPage, setCurrentPage] = useState(1)
    const count = items?.count
    const totalPages = Math.ceil(count / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    useEffect(() => {
        setCollection(items?.dataList?.slice(startIndex, endIndex))
    }, [count, items, endIndex, startIndex, setCollection])

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
        if (onNext) {
            onNext(itemsPerPage * currentPage, itemsPerPage)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
        if (onPrevious) {
            onPrevious((currentPage * itemsPerPage) - itemsPerPage, itemsPerPage)
        }
    }

    return (
        <>
            {isToolbar && <div className="flex flex-col md:flex-row items-center justify-evenly bg-gray-200">
                {isSearch && <Form fields={fields} submitButtonName='Пошук' cancelButtonName='Очистити фільтри' submitFunction={onSearch} isHorizontal={true} onCancel={onCancel} />}
                {isCreate && <button onClick={onModal} className="px-8 py-4 text-white bg-green-500 rounded hover:bg-green-600">Створити</button>}
                <ErrorOrLoading error={error} loading={loading} />
            </div>}
            {count === 0 && <div className='text-center p-4 font-bold text-2xl'>Не знайдено</div>}
            <div className='p-4'>
                {children && children}
            </div>
            {count > itemsPerPage && <div className="mt-4 flex justify-center p-4">
                <span className="inline-flex rounded-md shadow-sm">
                    <button
                        type="button"
                        className="disabled:opacity-50 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        <AiOutlineArrowLeft />
                        Назад
                    </button>
                </span>
                <span className="ml-3 inline-flex rounded-md shadow-sm">
                    <button
                        type="button"
                        className="disabled:opacity-50 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Вперед
                        <AiOutlineArrowRight />
                    </button>
                </span>
            </div>}
        </>
    )
}

export default CollectionWrapper