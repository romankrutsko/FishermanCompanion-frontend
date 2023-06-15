import React, { useState } from 'react'
import Form from '../inputs/Form'
import Modal from '../global/Modal';
import Show from './Show';
import PostService from '../../lib/services/post-service';
import CategoryService from '../../lib/services/category-service'

function CreatePost({ onClose, isOpen, updateСollection }) {
    const [post, setPost] = useState(null)
    const fields =
        [
            {
                name: 'title',
                label: 'Назва',
                type: 'text',
                required: true
            },
            {
                name: 'categoryId',
                label: 'Категорія',
                type: 'dropdown',
                required: true,
                fetchOptions: () => CategoryService.getAll()
            },
            {
                name: 'description',
                label: 'Деталі',
                required: true,
                type: 'text'
            },
            {
                name: 'startDate',
                label: 'Дата',
                required: true,
                type: 'datetime-local',
            },
            {
                name: 'settlement',
                label: 'Населений пункт',
                type: 'location',
                required: true
            },
            {
                name: 'contactInfo',
                label: 'Контакти',
                required: true,
                type: 'tel'
            }
        ]
    const submitHandler = (data) => {
        return PostService.create(data)
            .then(response => {
                setPost(response.data)
            })
    }

    const modalHandler = () => {
        onClose()
        setPost(null)
        updateСollection()
    }
    return (
        <>
            <Modal onClose={modalHandler} isOpen={isOpen} title='Cтворити пост'>
                {post ?
                    <Show post={post} />
                    :
                    <Form fields={fields} submitFunction={submitHandler} submitButtonName='Опублікувати' onCancel={onClose} />}
            </Modal>
        </>
    )
}

export default CreatePost