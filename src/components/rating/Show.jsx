import React, { useEffect, useState } from 'react'
import RatingService from '../../lib/services/rating-service'
import ErrorOrLoading from '../global/ErrorOrLoading'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiFillStar } from 'react-icons/ai'

function Rating({ id }) {
    const [rating, setRating] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(rating?.count / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const ratingList = rating?.dataList?.slice(startIndex, endIndex);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        setError(null)
        setLoading(true)
        RatingService.getByUserID(id)
            .then(response => {
                setRating(response.data)
            })
            .catch(error => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])
    return (
        <>
            <div className="bg-white rounded-lg shadow flex flex-col">
                <ErrorOrLoading error={error} loading={loading} />
                {rating?.count > 0 &&
                    <>
                        <ul className="divide-y divide-gray-200">
                            {ratingList && ratingList.map((item) => (
                                <li key={item.id} className="py-4">
                                    <div className="flex">
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-900">
                                                <Link className='text-blue-500 hover:text-blue-700' to={`/users/${item.userIdRatedBy}`}>
                                                    {item.usernameRatedBy}
                                                </Link>
                                            </p>
                                            <div className='flex flex-row items-center gap-1'>
                                                <AiFillStar className="text-yellow-500" />
                                                <span className='font-bold'>{item.rating}</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-4">{item.comment}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 flex justify-center p-4">
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
                        </div>
                    </>}
            </div>
        </>
    )
}

export default Rating