import React, { useState } from 'react'
import { AiFillEdit, AiFillDelete, AiFillStar } from 'react-icons/ai'
import RequestService from '../../lib/services/request-service'
import ErrorOrLoading from '../global/ErrorOrLoading'
import Update from './Update'
import { useSelector } from 'react-redux'
import { selectCurrentUserID } from '../../lib/store/slices/auth'
import { FaHandshake } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { formatDate } from '../../lib/utils'

function Show({ request }) {
  const [item, setItem] = useState(request)
  const currentUserID = useSelector(selectCurrentUserID)
  const [showEditModal, setShowEditModal] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const isEdit = currentUserID === item?.request?.userId
  const editModalVisibilityHandler = () => {
    setShowEditModal(!showEditModal)
  }

  const deleteHandler = () => {
    const deleteConfirm = window.confirm('Ви впевнені, що хочете видалити цей запит?')
    if (deleteConfirm) {
      setLoading(true)
      setError(null)
      RequestService.delete(item.request.id)
        .then(() => {
          setItem(null)
        })
        .catch(error => {
          setError(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <>
      {item && <div className="flex flex-col justify-between shadow rounded-lg md:p-4 gap-4">
        <div>
          <p className="font-bold text-xl">Автор оголошення</p>
          <div className="flex flex-row justify-between">
            <Link
              className="font-bold inline text-blue-500 hover:text-blue-700"
              to={`/users/${item.post.user.id}`}
            >
              {item.post.user.username}
            </Link>
            {item.post.user.averageRating ? (
              <div className="flex flex-row items-center gap-1">
                <AiFillStar className="text-yellow-500" />
                <span className="font-bold">{item.post.user.averageRating}</span>
              </div>
            ) : (
              <span className="text-gray-500">Рейтинг відсутній</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-lg">Контакти автора</p>
            <p>{item.post.user.contacts}</p>
            <p className="font-semibold text-lg">Контакти в оголошенні</p>
            <p>{item.post.contactInfo}</p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-xl">Оголошення</p>
            <div className="place-self-start">
              <p className="font-semibold text-lg text-center">{item.post.title}</p>
              <div className="grid grid-cols-2 justify-items-end">
                <div className="flex flex-col text-start">
                  <div>{item.post.settlement}</div>
                  <div>{item.post.category.name}</div>
                  <div>{formatDate(item.post.startDate)}</div>
                  <div>{item.post.contactInfor}</div>
                </div>
                <div className="block text-justify">
                  <div>{item.post.description}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-xl">Відгук на оголошення</p>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-lg">Статус</p>
                <p>{item.request.status}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-lg">Коментар</div>
                <div className="block text-justify">
                  <div>{item.request.comment}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {isEdit && (
            <div className="flex flex-row justify-evenly">
              <button
                onClick={editModalVisibilityHandler}
                className="flex gap-1 items-center bg-yellow-500 hover:bg-yellow-600 text-white rounded-md p-2"
              >
                <span className="mr-1">Редагувати</span>
                <AiFillEdit />
              </button>
              <button
                onClick={deleteHandler}
                className="flex gap-1 items-center bg-red-500 hover:bg-red-600 text-white rounded-md p-2"
              >
                <span className="mr-1">Видалити</span>
                <AiFillDelete />
              </button>
            </div>
          )}
          {!isEdit && (
            <button
              onClick={editModalVisibilityHandler}
              className="w-fit place-self-end flex flex-row items-center bg-green-500 hover:bg-green-600 text-white rounded-md p-2 gap-1"
            >
              <span className="mr-1">Відгукнутись на запит</span>
              <FaHandshake />
            </button>
          )}
        </div>
      </div>}
      <Update
        isOpen={showEditModal}
        onClose={editModalVisibilityHandler}
        request={item?.request}
        isEdit={isEdit}
        setItem={setItem}
      />
      <ErrorOrLoading error={error} loading={loading} />
    </>
  )
}

export default Show