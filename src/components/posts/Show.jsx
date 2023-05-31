import { AiFillStar, AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'
import { formatDate } from '../../lib/utils'
import UserRoles from '../../lib/enums/user-roles'
import { useState } from 'react'
import { selectCurrentUserID, selectCurrentUserRole } from '../../lib/store/slices/auth'
import { useSelector } from 'react-redux'
import PostService from '../../lib/services/post-service'
import ErrorOrLoading from '../global/ErrorOrLoading'
import Update from './Update'
import { FaHandshake } from 'react-icons/fa'
import CreateRequest from '../requests/Create'
import { FaHandHolding } from 'react-icons/fa'

function Show({ post }) {
    const [item, setItem] = useState(post)
    const path = useLocation().pathname.split('/')[4]
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const currentUserId = useSelector(selectCurrentUserID)
    const currentUserRole = useSelector(selectCurrentUserRole)
    const isAllowedToEdit = (item.user.id === currentUserId && (new Date() < new Date(item.startDate))) || (currentUserRole === UserRoles.ADMIN)
    const [showRequestModal, setShowRequestModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const editModalVisibilityHandler = () => {
        setShowEditModal(!showEditModal)
    }
    const deleteHandler = () => {
        const confirmDelete = window.confirm(`Ви впевнені, що хочете видалити пост ${item.title}? \n Цю дію неможливо скасувати`)
        if (confirmDelete) {
            setError(null)
            setLoading(true)
            PostService.delete(item.id)
                .catch(error => {
                    setError(error)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }
    const requestModalVisibilityHandler = () => {
        setShowRequestModal(!showRequestModal)
    }
    return (
        <div className='flex flex-col justify-between shadow rounded-lg md:p-4 gap-4'>
            <div className='flex flex-col gap-4'>
                <div className="flex flex-col gap-4">
                    <img className="w-52 h-52 place-self-center rounded-lg" src={item.user.avatar} alt="Аватар" />
                    <div className='flex flex-row gap-2'>
                        <div className="text-black">
                            <Link className='font-bold text-blue-500 hover:text-blue-700' to={`/users/${item.user.id}`}>
                                {item.user.username}
                            </Link>
                        </div>
                        {item.user.averageRating ? (
                            <div className='flex flex-row items-center gap-1'>
                                <AiFillStar className="text-yellow-500" />
                                <span className='font-bold'>{item.user.averageRating}</span>
                            </div>
                        ) : (
                            <span className='text-gray-500'>Рейтинг відсутній</span>
                        )}
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className='font-bold text-center mb-4'>{item.title}</div>
                    <div className='grid grid-cols-2 justify-items-end'>
                        <div className='flex flex-col text-start'>
                            <div>
                                {item.settlement}
                            </div>
                            <div>
                                {item.category.name}
                            </div>
                            <div>
                                {formatDate(item.startDate)}
                            </div>
                            <div>
                                {item.contactInfor}
                            </div>
                        </div>
                        <div className='block text-justify'>
                            <div>
                                {item.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                {item.canRespond &&
                    <button onClick={requestModalVisibilityHandler} className="flex gap-1 justify-center items-center bg-green-500 hover:bg-green-600 text-white rounded-md p-2">
                        <span>Відгукнутись</span>
                        <FaHandshake />
                    </button>}
                {isAllowedToEdit && <Link to={`/users/${item.user.id}/posts/${item.id}/requests`} className='flex flex-row mx-auto bg-green-500 hover:bg-green-600 text-white rounded-md p-2 gap-1'>
                    <span>Відгуки на пост</span>
                    <FaHandHolding />
                </Link>}
                {path && <Link to={`/users/${item.user.id}/trips/${path}/${item.id}/members`} className='flex flex-row mx-auto bg-green-500 hover:bg-green-600 text-white rounded-md p-2 gap-1'>
                    <span>Учасники</span>
                    <FaHandHolding />
                </Link>}
                {isAllowedToEdit && <div className="flex flex-row justify-evenly">
                    <button onClick={editModalVisibilityHandler} className="flex gap-1 items-center bg-yellow-500 hover:bg-yellow-600 text-white rounded-md p-2">
                        <span>Редагувати</span>
                        <AiFillEdit />
                    </button>
                    <button onClick={deleteHandler} className="flex gap-1 items-center bg-red-500 hover:bg-red-600 text-white rounded-md p-2">
                        <span>Видалити</span>
                        <AiFillDelete />
                    </button>
                    <ErrorOrLoading error={error} loading={loading} />
                    <Update isOpen={showEditModal} onClose={editModalVisibilityHandler} post={post} setPost={setItem}/>
                </div>}
            </div>
            <CreateRequest isOpen={showRequestModal} onClose={requestModalVisibilityHandler} post={post} setPost={setItem}/>
        </div>
    )
}

export default Show