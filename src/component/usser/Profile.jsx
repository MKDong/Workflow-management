import React from 'react'
import { useSelector } from 'react-redux';

function Profile() {
    const user = useSelector(store => store.counter.user)
    console.log(user);
  return (
    <div>
        <ul>
            <li>Name: {user.username}</li>
            <li>Email: {user.email}</li>
            <li>ID: {user.id}</li>
        </ul>
    </div>
  )
}

export default Profile