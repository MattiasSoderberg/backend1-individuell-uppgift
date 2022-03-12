import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from '../App'
import { BASE_URL } from '../utils'
import { FiHome, FiHash, FiLogIn, FiUser, FiUsers } from "react-icons/fi"

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
      <h1 className="mb-4">Navigation</h1>

      <div className="list-group gap-4">
        <Link to="/home" className="navigation-link"><FiHome className="nav-svg" />Home</Link>
        {user && <Link to="/explore" className="navigation-link"><FiHash className="nav-svg" />Explore</Link>}
        {user && <Link to={`/${user.username}`} className="navigation-link"><FiUser className="nav-svg" />Profile</Link>}
        {user && <Link to="/users" className="navigation-link"><FiUsers className="nav-svg" />Users</Link>}
        {user && <div><button className="btn btn-primary rounded-pill px-5" onClick={handleLogout}>Logout</button></div>}
        {!user && <Link to="/" className="navigation-link"><FiLogIn className="nav-svg" />Login</Link>}
      </div>
    </div>
  )
}
