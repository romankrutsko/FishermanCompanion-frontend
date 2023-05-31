import React, { useState } from 'react'
import Form from '../inputs/Form'
import Modal from '../global/Modal'
import UserService from '../../lib/services/user-service'
import { useDispatch } from 'react-redux'
import { updateCredentials } from '../../lib/store/slices/auth'

function Update({ isOpen, onClose, user }) {
    const [values, setValues] = useState(user)
    const dispatch = useDispatch()
    const fields = [
        {
            name: 'password',
            label: 'Пароль',
            type: 'password',
            minLength: 1
        },
        {
            name: 'bio',
            label: 'Про себе',
            required: false,
            type: 'textarea'
        },
        {
            name: 'contacts',
            label: 'Контакти',
            required: false,
            type: 'textarea'
        },
        {
            name: 'location',
            label: 'Населений пункт',
            required: true,
            type: 'location'
        }
    ];

    const submitHandler = (data) => {
        // Remove password field if it's empty
        const filteredData = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== ''))
        return UserService.update(filteredData, user.id)
            .then((response) => {
                setValues(response.data)
                dispatch(updateCredentials(response.data))
                onClose()
            })
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} title='Редагувати профіль'>
                <Form fields={fields} submitFunction={submitHandler} onCancel={onClose} values={values} />
            </Modal>
        </>
    )
}

export default Update