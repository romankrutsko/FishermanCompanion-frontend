import React, { useState, useEffect, useCallback } from 'react'
import UserService from '../../lib/services/user-service'
import { AiFillStar, AiFillEdit, AiFillDelete } from 'react-icons/ai'
import ErrorOrLoading from '../global/ErrorOrLoading'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, selectCurrentUserID, selectCurrentUserRole } from '../../lib/store/slices/auth'
import Update from './Update'
import UserRoles from '../../lib/enums/user-roles'
import CreateRating from '../rating/Create'
import { MdRateReview } from 'react-icons/md'

function Show({ item, id, canBeRated, fetchFinishedTripMembers }) {
    const [user, setUser] = useState(item)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showRatingModal, setShowRatingModal] = useState(false)
    const navigate = useNavigate()
    const currentUserId = useSelector(selectCurrentUserID)
    const currentUserRole = useSelector(selectCurrentUserRole)
    const isAllowedToEdit = (+id === currentUserId) || (currentUserRole === UserRoles.ADMIN)
    const dispatch = useDispatch()

    const getUser = useCallback(() => {
        setLoading(true)
        setError(null)
        UserService.getByID(id)
            .then(response => {
                setUser(response.data)
            })
            .catch(error => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    useEffect(() => { if (id) getUser() }, [id, getUser])

    const deleteHandler = () => {
        const confirmDelete = window.confirm('Ви впевнені, що хочете видалити свій акаунт? \n Цю дію неможливо скасувати')
        if (confirmDelete) {
            setLoading(true)
            setError(null)
            UserService.delete(id)
                .then(() => {
                    if (+id === currentUserId) {
                        navigate('/')
                        dispatch(logOut())
                    }
                })
                .catch(error => {
                    setError(error)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    const avatarEditHandler = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('avatar', file);
        setError(null)
        setLoading(true)
        UserService.updateAvatar(id, formData)
            .then((response) => {
                setUser(prevUser => ({ ...prevUser, avatar: response.data }))
            })
            .catch(error => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const editModalVisibilityHandler = () => {
        setShowEditModal(!showEditModal)
    }
    const ratingModalVisibilityHandler = () => {
        setShowRatingModal(!showRatingModal)
    }
    return (
        <>
            <ErrorOrLoading error={error} loading={loading} />
            {user &&
                <>
                    <div className="flex flex-col shadow rounded-lg md:p-4 gap-4">
                        <div className='flex flex-col md:flex-row items-center'>
                            <div className="relative w-fit p-4">
                                <img className="md:place-self-start place-self-center w-20 h-20 rounded-full mb-2" src={user.avatar} alt="Аватар" />
                                {isAllowedToEdit && <label htmlFor="avatarInput" className="absolute inset-0 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                                    <AiFillEdit className="text-xl" />
                                    <input type="file" accept="image/*" id="avatarInput" className="hidden" onChange={avatarEditHandler} />
                                </label>}
                            </div>
                        </div>
                        <div className="flex-grow flex flex-col justify-between">
                            <div className="p-4">
                                <div className="flex flex-col">
                                    <div>
                                        <h2 className="text-lg font-semibold mb-1">Імʼя</h2>
                                        <div className="flex flex-col">
                                            <Link to={`/users/${user.id}`} className='text-blue-500 hover:text-blue-700'>
                                                {user.username}
                                            </Link>
                                            {user.averageRating ? (
                                                <div className='flex flex-row items-center gap-1'>
                                                    <AiFillStar className="text-yellow-500" />
                                                    <span className='font-bold'>{user.averageRating}</span>
                                                </div>
                                            ) : (
                                                <span className='text-gray-500'>Рейтинг відсутній</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <h2 className="text-lg font-semibold mb-1">Про мене</h2>
                                        <p className="text-black text-justify">{user.bio}</p>
                                    </div>
                                    <div className="mt-4">
                                        <h2 className="text-lg font-semibold mb-1">Населений пункт</h2>
                                        <p className="text-black">{user.location}</p>
                                    </div>
                                    <div className="mt-4">
                                        <h2 className="text-lg font-semibold mb-1">Контакти</h2>
                                        <p className="text-black text-justify">{user.contacts}</p>
                                    </div>
                                </div>
                                {canBeRated &&
                                    <button onClick={ratingModalVisibilityHandler}
                                        className="flex mt-4 items-center bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2">
                                        <span className="mr-1">Оцінити риболова</span>
                                        <MdRateReview />
                                    </button>}
                            </div>
                            {isAllowedToEdit && <div className="flex flex-row justify-evenly">
                                <button onClick={editModalVisibilityHandler} className="flex gap-1 items-center bg-yellow-500 hover:bg-yellow-600 text-white rounded-md p-2">
                                    <span className="mr-1">Редагувати</span>
                                    <AiFillEdit />
                                </button>
                                <button onClick={deleteHandler} className="flex gap-1 items-center bg-red-500 hover:bg-red-600 text-white rounded-md p-2">
                                    <span className="mr-1">Видалити</span>
                                    <AiFillDelete />
                                </button>
                                <Update onClose={editModalVisibilityHandler} isOpen={showEditModal} user={user} />
                            </div>}
                        </div>
                    </div>
                    <CreateRating fetchFinishedTripMembers={fetchFinishedTripMembers} userID={user.id} isOpen={showRatingModal} onClose={ratingModalVisibilityHandler} />
                </>
            }
        </>
    )
}

export default Show