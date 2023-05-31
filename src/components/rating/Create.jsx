import React, { useState } from 'react'
import RatingService from '../../lib/services/rating-service'
import Form from '../inputs/Form'
import Modal from '../global/Modal'
import { useParams } from 'react-router-dom'

function Create({ isOpen, onClose, userID, fetchFinishedTripMembers }) {
    const { tripID } = useParams()
    const [response, setResponse] = useState(null)
    const fields = [
        {
            name: 'rating',
            label: 'Оцінка',
            type: 'dropdown',
            required: true,
            optionsList: [{ id: 5, name: 5 }, { id: 4, name: 4 }, { id: 3, name: 3 }, { id: 2, name: 2 }, { id: 1, name: 1 } ]
        },
        {
            name: 'comment',
            label: 'Коментар',
            type: 'textarea',
            required: true
        }
    ]

    const submitHandler = (data) => {
        const body = { ...data, userId: userID, postId: tripID }
        return RatingService.create(body)
            .then(response => {
                setResponse(response.data)
                if (fetchFinishedTripMembers) fetchFinishedTripMembers()
            })
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Оцініть риболова'>
            <Form fields={fields} submitFunction={submitHandler} />
            {response && <div>{response}</div>}
        </Modal>
    )
}

export default Create