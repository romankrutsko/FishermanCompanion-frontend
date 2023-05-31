import React, { useCallback, useEffect, useState } from 'react'
import PostService from '../../lib/services/post-service'
import Show from '../../components/posts/Show'
import Create from '../../components/posts/Create'
import CategoryService from '../../lib/services/category-service'
import GeoService from '../../lib/services/geo-service'
import { useSelector } from 'react-redux'
import { selectCurrentUserLocation } from '../../lib/store/slices/auth'
import CollectionWrapper from '../../components/global/CollectionWrapper'
import { selectCurrentAuthState } from '../../lib/store/slices/auth'
import geolocation from 'geolocation'

function Index() {
  const [userLocation, setUserLocation] = useState(null);
  const currentUserSettlement = useSelector(selectCurrentUserLocation)
  const isAuth = useSelector(selectCurrentAuthState)
  const [posts, setPosts] = useState(null)
  const [collection, setCollection] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const itemsPerPage = 10;

  const fields = [
    {
      name: 'categoryId',
      label: 'Категорія',
      type: 'dropdown',
      fetchOptions: () => CategoryService.getAll(),
      required: true
    },
    {
      label: 'За рейтингом риболова',
      name: 'sortByUserRating',
      type: 'checkbox',
    },
    {
      label: 'За локацією в профілі',
      name: 'sortByUserLocation',
      type: 'checkbox'
    },
    {
      label: 'За поточною локацією',
      name: 'sortByCurrentLocation',
      type: 'checkbox'
    },
    {
      label: 'Радіус пошуку км',
      name: 'radius',
      type: 'dropdown',
      optionsList: [
        { name: 15, id: 15 },
        { name: 30, id: 30 },
        { name: 50, id: 50 }]
    },
  ]
  const modalHandler = () => {
    setIsOpen(!isOpen)
  }

  const fetchPosts = useCallback((skip, take) => {
    setLoading(true)
    setLoading(false)
    PostService.getAll(skip, take)
      .then(response => {
        setPosts(response.data)
      })
      .catch(error => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchPosts(0, itemsPerPage)
    getLocation()
  }, [fetchPosts])
  const getLocation = () => {
    geolocation.getCurrentPosition((error, position) => {
      if (error) {
        console.log('Error occurred. Error code: ' + error);
        return;
      }

      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
    });
  }
  const searchByCategory = (data) => {
    return PostService.getByCategory({ categoryId: data.categoryId, sortByUserRating: data.sortByUserRating },
      { skip: 0, take: itemsPerPage })
      .then(response => {
        setPosts(response.data)
      })
      .catch(error => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const searchByUserLocation = (data) => {
    return GeoService.getLocationCoordinates(currentUserSettlement)
      .then(response => {
        PostService.getByLocation({
          ...response.data,
          categoryId: data.categoryId,
          radius: data.radius,
          sortByUserRating: data.sortByUserRating
        })
          .then(response => {
            setPosts(response.data)
          })
          .catch(error => {
            setError(error)
          })
      })
      .catch(error => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const searchByCurrentLocation = (data) => {
    console.log(userLocation);
    return PostService.getByLocation({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      categoryId: data.categoryId,
      radius: data.radius,
      sortByUserRating: data.sortByUserRating
    })
      .then(response => {
        setPosts(response.data)
      })
      .catch(error => {
        setError(error)
      })
  }
  const submitHandler = (data) => {
    console.log(data);
    if (data.sortByUserLocation) {
      return searchByUserLocation(data)
    } else if (data.sortByCurrentLocation) {
      return searchByCurrentLocation(data)
    } else {
      return searchByCategory(data)
    }
  }

  return (
    <>
      <CollectionWrapper
        onNext={fetchPosts}
        onPrevious={fetchPosts}
        itemsPerPage={itemsPerPage}
        items={posts}
        error={error}
        loading={loading}
        fields={fields}
        onSearch={submitHandler}
        onModal={modalHandler}
        onCancel={() => fetchPosts(0, itemsPerPage)}
        setCollection={setCollection}
        isToolbar={isAuth}
        isSearch={true}
        isCreate={true}
      >
        {collection &&
          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
            {collection.map(post => <Show key={post.id} post={post} />)}
          </div>}
        <Create onClose={modalHandler} isOpen={isOpen} updateCollection={() => fetchPosts(0, itemsPerPage)} />
      </CollectionWrapper>
    </>
  )
}

export default Index