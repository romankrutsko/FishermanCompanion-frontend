import React, { useCallback, useEffect, useState } from 'react'
import CollectionWrapper from '../../components/global/CollectionWrapper'
import TripService from '../../lib/services/trip-service'
import { useParams } from 'react-router-dom'
import Show from '../../components/posts/Show'

function Finished() {
  const { userID } = useParams()
  const [trips, setTrips] = useState(null)
  const [collection, setCollection] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const itemsPerPage = 10

  const fetchFinishedTrips = useCallback(days => {
    return TripService.getFinishedTrips(userID, days.days)
      .then(response => {
        setTrips(response.data)
      })
  }, [userID])

  const fields = [
    {
      name: 'days',
      label: 'Минуло днів',
      type: 'dropdown',
      optionsList: [{ id: 7, name: 7 }, { id: 14, name: 14 }, { id: 30, name: 30 }]
    }
  ]
  useEffect(() => {
    setError(null)
    setLoading(true)
    fetchFinishedTrips(7)
      .catch(error => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [userID, fetchFinishedTrips])

  return (
    <>
      <CollectionWrapper
        itemsPerPage={itemsPerPage}
        items={trips}
        error={error}
        loading={loading}
        setCollection={setCollection}
        isToolbar={true}
        fields={fields}
        isSearch={true}
        onSearch={fetchFinishedTrips}
      >
        {collection &&
          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-4'>
            {collection.map(post => <Show key={post.id} post={post} />)}
          </div>}
      </CollectionWrapper>
    </>
  )
}

export default Finished