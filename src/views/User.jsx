import React from 'react'
import Show from '../components/users/Show'
import Rating from '../components/rating/Show'
import { useParams } from 'react-router-dom'

function User() {
  const { userID } = useParams()

  return (
    <div key={userID} className='flex gap-2 flex-col md:flex-row'>
      <div className='flex-1'>
        <Show id={userID} />
      </div>
      <div className='flex-1'>
        <Rating id={userID} />
      </div>
    </div>
  )
}

export default User