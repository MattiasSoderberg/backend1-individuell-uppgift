import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { UserContext } from '../App'
import { BASE_URL } from '../utils'

export default function Navigation() {
  const { user } = useContext(UserContext)

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
    .then(res => console.log(res))
    // localStorage.removeItem("mirco-blog")
  }

  return (
    <div>
      <h1>Navigation</h1>

      <div className="list-group">
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
        <button className="btn btn-warning" onClick={handleLogout}>Logout</button>
        {!user && <Link to="/">Login</Link>}
      </div>
    </div>
  )
}
