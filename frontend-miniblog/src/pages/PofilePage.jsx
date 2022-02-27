import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App'
// import { BASE_URL } from '../utils'

export default function PofilePage() {
    // const [user, setUser] = useState(null)
    // const [posts, setPosts] = useState([])

    const { user } = useContext(UserContext)

    useEffect(() => {
        // const token = localStorage.getItem("micro-blog")
        // const url = `${BASE_URL}/user/me`
        // const headers = {
        //     "Content-Type": "application/json",
        //     "Authorization": `Bearer ${token}`
        // }
        // fetch(url, {
        //     headers: headers,
        // })
        //     .then(res => {
        //         if (res.ok) {
        //             return res.json()
        //         } else {
        //             console.log("Error:", res.statusText)
        //         }
        //     })
        //     .then(data => {
        //         setUser(data.user)
        //         setPosts(data.posts)
        //     })
    }, [])

    return (
        <> {user &&
            <div>
                <h1>{user.user.firstName} {user.user.lastName}</h1>
                <p className="text-muted">{user.user.posts.length} Posts</p>
                <div className="card mb-1">
                    <div className="row g-0">
                        <div className="col-md-4">
                            {/* <img src={`http://localhost:3001/${user.user.profile.image.url}`} class="img-fluid rounded-circle" alt="Profile" /> */}
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{user.user.firstName} {user.user.lastName}</h5>
                                <p className="card-text">@{user.user.username}</p>
                                <p className="card-text">{user.user.follows.length} <span className="text-muted">Follows</span> {user.user.followers.length} <span className="text-muted">Followers</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                {user.user.profile &&
                    <p>{user.user.profile.bio}</p>
                }
                <div>
                    <h3>Posts</h3>
                    {user.posts.length > 0 ? user.posts.map(post => {
                        return <div key={post._id} className="card mb-1">
                        <div className="row g-0">
                            <div className="col-md-4">
                                {/* <img src={`http://localhost:3001/${user.user.profile.image.url}`} class="img-fluid rounded-circle" alt="Profile" /> */}
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{user.user.username}</h5>
                                    <p className="card-text">{post.text}</p>
                                    <p className="card-text"><small className="text-muted">{post.time}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    })
                : <p>No posts</p>}
                </div>
            </div>
        }
        </>

    )
}
