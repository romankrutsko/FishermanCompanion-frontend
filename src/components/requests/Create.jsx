import React, { useState } from 'react'
import Form from '../inputs/Form'
import RequestService from '../../lib/services/request-service'
import Modal from '../global/Modal'
import Show from './Show'
import { useSelector } from 'react-redux'
import { selectCurrentUserID } from '../../lib/store/slices/auth'

function CreateRequest({ isOpen, onClose, post, setPost }) {
    const currentUserID = useSelector(selectCurrentUserID)
    const [request, setRequest] = useState(null)
    const fields = [
        {
            name: 'comment',
            label: 'Коментар',
            type: 'text'
        }
    ]
    const submitHandler = (data) => {
        const body = { ...data, userId: currentUserID, postId: post.id}
        return RequestService.create(body)
            .then(response => {
                setRequest(response.data)
                setPost(response.data.post)
                if(onClose) onClose()
            })
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} title='Відгукнутись'>
                {request ? <Show request={request} /> : <Form fields={fields} submitFunction={submitHandler} />}
            </Modal>
        </>
    )
}

export default CreateRequest