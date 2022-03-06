import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from '../utils'

export default function LandingPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const url = `${BASE_URL}/user/login`
        const headers = {
            "Content-Type": "application/json"
        }
        const payload = { username, password }
        console.log(payload)

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    console.log(res)
                }
            })
            .then(data => {
                localStorage.setItem("micro-blog", data.token)
                navigate("/home")
            })
    }

    return (
        <div className="container">
            <h1>Welcome</h1>

            <h3 className='mb-3'>Login</h3>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button className="btn btn-primary mb-3">Login</button>
                <p>Dont have an account? Sign up <Link to="/signup">here</Link></p>
            </form>
        </div>
    )
}
