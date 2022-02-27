import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils'

export default function SignupPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const navigate = useNavigate()

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const url = `${BASE_URL}/user/create`
        const headers = {
            "Content-Type": "application/json"
        }
        const payload = {
            username,
            password,
            firstName,
            lastName
        }

        fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(payload)
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                console.log("Error:", res.statusText)
            }
        })
        .then(data => navigate("/"))
    }
  return (
    <div>
        <h1>Signup</h1>

        <form onSubmit={handleOnSubmit}>
            <input type="text" className="form-control mb-3" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="text" className="form-control mb-3" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <input type="text" className="form-control mb-3" placeholder="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} />
            <input type="text" className="form-control mb-3" placeholder="Lastname" value={lastName} onChange={e => setLastName(e.target.value)} />
            <button className="btn btn-primary mb-3">Signup!</button>
        </form>
    </div>
  )
}
