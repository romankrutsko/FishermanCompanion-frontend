import React, { useEffect, useState } from 'react'
import CollectionWrapper from '../../components/global/CollectionWrapper'
import TripService from '../../lib/services/trip-service'
import { useParams } from 'react-router-dom'
import Show from '../../components/posts/Show'

function Future() {
  const { userID } = useParams()
  const [trips, setTrips] = useState(null)
  const [collection, setCollection] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const itemsPerPage = 10

  useEffect(() => {
    setError(null)
    setLoading(true)
    TripService.getFutureTrips(userID)
      .then(response => {
        setTrips(response.data)
      })
      .catch(error => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [userID])
  return (
    <>
      <CollectionWrapper
        itemsPerPage={itemsPerPage}
        items={trips}
        error={error}
        loading={loading}
        setCollection={setCollection}
        isToolbar={false}
      >
        {collection &&
          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-4'>
            {collection.map(post => <Show key={post.id} post={post} />)}
          </div>}
      </CollectionWrapper>
    </>
  )
}

export default Future