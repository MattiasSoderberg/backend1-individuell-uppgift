import React, { useEffect, useState, useContext, useCallback } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from '../App'
import Post from '../components/Post'
import { BASE_URL } from '../utils'

export default function HomePage() {
    const [newPost, setNewPost] = useState("")
    const [posts, setPosts] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    const { user, setToken } = useContext(UserContext)

    const fetchPosts = useCallback(() => {
        if (!user) {
            const url = `${BASE_URL}/posts`
            const headers = {
                "Content-Type": "application/json",
            }
            fetch(url, {
                headers: headers
            })
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        console.log("Error:", res.statusText)
                    }
                })
                .then(data => setPosts(data))
        } else {
            const url = `${BASE_URL}/posts/follows`
            const token = localStorage.getItem("micro-blog")
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            fetch(url, {
                headers: headers
            })
                .then(res => res.json())
                .then(data => {
                    setPosts(data)
                })
        }
    }, [user])

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const token = localStorage.getItem("micro-blog")
        const url = `${BASE_URL}/posts`
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const payload = { text: newPost }

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (res.ok) {
                    setNewPost("")
                } else {
                    return res.json()
                }
            })
            .then(data => {
                if (data) {
                    console.log(data.message)
                    setErrorMessage(data.message)
                }
            })
    }

    return (
        <div>
            <h1>Home</h1>

            {user &&
                <div className="card mb-4">
                    <div className="row g-0">
                        <div className="col-md-2 overflow-hidden m-2">
                            {user.profile.image.url ?
                                <img src={`http://localhost:3001/${user.profile.image.url}`} className="img-fluid" alt="Profile" />
                                : <img src={`http://localhost:3001/profileImages/no-user-image.jpg`} className="img-fluid" alt="No user" />}
                        </div>
                        <div className="col-md-9">
                            <div className="card-body">
                                <form className="mb-3" onSubmit={handleOnSubmit}>
                                    <textarea className="form-control-plaintext p-4 text-area mb-2" value={newPost} rows={4} placeholder="Write something" onChange={e => setNewPost(e.target.value)} />
                                    <button type="submit" className="btn btn-primary rounded-pill px-4">Post</button>
                                </form>
                                {errorMessage &&
                                <p className="text-danger">{errorMessage}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            }


            {posts && posts.map(post => {
                return <Post key={post._id} post={post} />
            })}
        </div>
    )
}
