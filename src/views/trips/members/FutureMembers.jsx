import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TripService from '../../../lib/services/trip-service'
import CollectionWrapper from '../../../components/global/CollectionWrapper'
import Show from '../../../components/users/Show'

function FutureMembers() {
    const { tripID } = useParams()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [members, setMembers] = useState([])
    const [collection, setCollection] = useState(null)
    const itemsPerPage = 10

    const fetchFutureTripMembers = useCallback(() => {
        setError(null)
        setLoading(true)
        TripService.getFutureTripMembers(tripID)
            .then(response => {
                setMembers(response.data)
            })
            .catch(error => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [tripID])

    useEffect(() => {
        fetchFutureTripMembers()
    }, [fetchFutureTripMembers])

    return (
        <>
            <CollectionWrapper
                error={error}
                loading={loading}
                items={members}
                setCollection={setCollection}
                itemsPerPage={itemsPerPage}
                isToolbar={false}
            >
                {collection && <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-4'>
                    {collection.map(member => <Show key={member.id} item={member} />)}
                </div>}
            </CollectionWrapper>
        </>
    )
}

export default FutureMembers