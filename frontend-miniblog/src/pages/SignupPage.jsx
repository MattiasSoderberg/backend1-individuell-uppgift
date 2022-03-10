import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils'

export default function SignupPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const url = `${BASE_URL}/user/create`
        const headers = {
            "Content-Type": "application/json"
        }
        const payload = {
            username,
            password
        }

        fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            navigate("/")
        })
    }
  return (
    <div>
        <h1 className="mb-4">Signup</h1>

        <form onSubmit={handleOnSubmit}>
            <input type="text" className="form-control mb-3" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="text" className="form-control mb-3" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            {errorMessage && 
            <p className="text-danger">{errorMessage}</p>}
            <button className="btn btn-primary mb-3 rounded-pill px-3">Sign up</button>
        </form>
    </div>
  )
}
