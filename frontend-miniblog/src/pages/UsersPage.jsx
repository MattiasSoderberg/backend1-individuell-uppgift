import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { BASE_URL } from '../utils'

export default function UsersPage() {
    const [users, setUsers] = useState(null)

    useEffect(() => {
        const url = `${BASE_URL}/users`
        const token = localStorage.getItem("micro-blog")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        fetch(url, {
            headers: headers
        })
        .then(res => res.json())
        .then(data => setUsers(data))
    }, [])
  return (
    <div>
        <h1>Users</h1>
        {users && users.map(user => {
            return <Link key={user._id} to={`/${user.username}`}>{user.username}</Link>
        })}
    </div>
  )
}
