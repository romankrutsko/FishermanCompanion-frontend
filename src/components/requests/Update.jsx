import React, { useState } from 'react'
import Form from '../inputs/Form'
import RequestService from '../../lib/services/request-service'
import Modal from '../global/Modal'

function Update({ isOpen, onClose, request, isEdit, setItem }) {
    const [values, setValues] = useState(request)
    const editFields = [
        {
            name: 'comment',
            label: 'Коментар',
            type: 'text'
        }
    ]
    const respondFields = [
        {
            name: 'status',
            label: 'Статус',
            type: 'dropdown',
            optionsList: [{ id: 'ОЧІКУВАННЯ', name: 'ОЧІКУВАННЯ' }, { id: 'ПРИЙНЯТИЙ', name: 'ПРИЙНЯТИЙ' }, { id: 'ВІДХИЛЕНИЙ', name: 'ВІДХИЛЕНИЙ' }]
        }
    ]
    const editHandler = (data) => {
        return RequestService.edit(request.id, data)
            .then(response => {
                setValues(response.data)
                setItem(response.data)
            })
    }

    const respondHandler = (data) => {
        return RequestService.updateStatus(request.id, data)
            .then(response => {
                setValues(response.data)
                setItem(response.data)
            })
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Редагувати' : 'Відгукнутись'}>
                {isEdit ? <Form fields={editFields} submitFunction={editHandler} values={values} />
                    :
                    <Form values={request} fields={respondFields} submitFunction={respondHandler} />
                }
            </Modal>
        </>
    )
}

export default Update