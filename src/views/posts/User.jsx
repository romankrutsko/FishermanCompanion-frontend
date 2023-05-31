import React, { useCallback, useEffect, useState } from 'react'
import PostService from '../../lib/services/post-service'
import Show from '../../components/posts/Show'
import Create from '../../components/posts/Create'
import { useParams } from 'react-router-dom'
import CollectionWrapper from '../../components/global/CollectionWrapper'

function User() {
    const { userID } = useParams()
    const [posts, setPosts] = useState(null)
    const [collection, setCollection] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const itemsPerPage = 10;

    const modalHandler = () => {
        setIsOpen(!isOpen)
    }
    const fetchPosts = useCallback((skip, take) => {
        setLoading(true)
        setLoading(false)
        PostService.getByUserID(userID, skip, take)
            .then(response => {
                setPosts(response.data)
            })
            .catch(error => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [userID])

    useEffect(() => {
        fetchPosts(0, itemsPerPage)
    }, [fetchPosts])

    return (
        <>
            <CollectionWrapper
                onNext={fetchPosts}
                onPrevious={fetchPosts}
                itemsPerPage={itemsPerPage}
                items={posts}
                error={error}
                loading={loading}
                onModal={modalHandler}
                setCollection={setCollection}
                isToolbar={true}
                isSearch={false}
                isCreate={true}
            >
                {collection &&
                    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
                        {collection.map(post => <Show key={post.id} post={post} />)}
                    </div>}
                <Create onClose={modalHandler} isOpen={isOpen} updateСollection={() => fetchPosts(0, itemsPerPage)} />
            </CollectionWrapper>
        </>
    )
}

export default User