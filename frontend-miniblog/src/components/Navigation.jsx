import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from '../App'
import { BASE_URL } from '../utils'

export default function Navigation() {
  const { user, setUser, setToken } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    const url = `${BASE_URL}/user/logout`
    const token = localStorage.getItem("micro-blog")
    const headers = {
      "Conent-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    fetch(url, {
      headers: headers
    })
      .then(res => {
        localStorage.removeItem("micro-blog")
        navigate("/")
        setToken(null)
        setUser(null)
      })

  }

  return (
    <div>
      <h1>Navigation</h1>

      <div className="list-group">
        <Link to="/home">Home</Link>
        {user && <Link to={`/${user.username}`}>Profile</Link>}
        {user && <Link to="/users">Users</Link>}
        {user && <button className="btn btn-warning" onClick={handleLogout}>Logout</button>}
        {!user && <Link to="/">Login</Link>}
      </div>
    </div>
  )
}
