import React, { useEffect, useState } from 'react'
import RequestService from '../../lib/services/request-service'
import Show from '../../components/requests/Show'
import CollectionWrapper from '../../components/global/CollectionWrapper'

function Requests() {
    const [requests, setRequests] = useState(null)
    const [collection, setCollection] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const itemsPerPage = 10;

    useEffect(() => {
        setLoading(true)
        setError(null)
        RequestService.getAll()
            .then(response => {
                setRequests(response.data)
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
            <CollectionWrapper
                itemsPerPage={itemsPerPage}
                items={requests}
                error={error}
                loading={loading}
                setCollection={setCollection}
                isToolbar={false}
            >
                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
                    {collection?.map(request => <Show request={request} key={request.request.id} />)}
                </div>
            </CollectionWrapper>
        </>
    )
}

export default Requests