import React, { useState } from 'react'
import Form from '../inputs/Form'
import Modal from '../global/Modal'
import PostService from '../../lib/services/post-service'
import CategoryService from '../../lib/services/category-service'

function Update({ isOpen, onClose, post, setPost }) {
    const [values, setValues] = useState(post)
    const [status, setStatus] = useState(null)
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
                type: 'textarea'
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
        return PostService.update(post.id, data)
            .then(response => {
                setValues(response.data)
                setPost(response.data)
                setStatus(response.status)
            })
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} title='Редагувати'>
                <Form fields={fields} submitFunction={submitHandler} onCancel={onClose} values={values}>
                    {status && <div className='text-center font-semibold text-lg'>Пост оновлено</div>}
                </Form>
            </Modal>
        </>
    )
}

export default Update