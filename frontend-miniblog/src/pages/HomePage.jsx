import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from '../App'
import { BASE_URL } from '../utils'

export default function HomePage() {
    const [newPost, setNewPost] = useState("")
    const [posts, setPosts] = useState(null)
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = () => {
        // const token = localStorage.getItem("micro-blog")
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
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()

        console.log(newPost)
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
            .then(res => res.json())
            .then(data => fetchPosts())
        setNewPost("")
    }

    return (
        <div>
            <h1>Home</h1>

            {user &&
                <div className="card mb-1">
                    <div className="row g-0">
                        <div className="col-md-2">
                            {/* <img src={`http://localhost:3001/${user.profile.image.url}`} class="img-fluid rounded-circle" alt="Profile" /> */}
                        </div>
                        <div className="col-md-10">
                            <div className="card-body">
                                <form onSubmit={handleOnSubmit}>
                                    <textarea className="form-control-plaintext p-4" value={newPost} rows={4} placeholder="What's going on?" onChange={e => setNewPost(e.target.value)} />
                                    <button type="submit" className="btn btn-primary">Post</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }


            {posts && posts.map(post => {
                return <div key={post._id} className="card mb-1">
                    <div className="row g-0">
                        <div className="col-md-4">
                            {/* <img src={`http://localhost:3001/${post.author.profile.image.url}`} class="img-fluid rounded-circle" alt="Profile" /> */}
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <Link to={`/${post.author.username}`}><h5 className="card-title">{post.author.username}</h5></Link>
                                <p className="card-text">{post.text}</p>
                                <p className="card-text"><small className="text-muted">{post.time}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}
