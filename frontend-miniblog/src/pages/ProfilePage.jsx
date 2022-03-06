import React, { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom"
import { UserContext } from '../App'
import { BASE_URL } from '../utils'
// import { BASE_URL } from '../utils'

export default function PofilePage() {
    const [currentUser, setCurrentUser] = useState(null)
    const [isUser, setIsUser] = useState(false)
    const [isFollowed, setIsFollowed] = useState(false)

    const { username } = useParams()
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user && username && user.username !== username) {
            const url = `${BASE_URL}/user/${username}`
            const headers = {
                "Content-Type": "application/json"
            }

            fetch(url, {
                headers: headers
            })
                .then(res => res.json())
                .then(data => {
                    setCurrentUser(data)
                    setIsUser(false)
                    setIsFollowed(data.followers.includes(user._id))
                })
        } else {
            setCurrentUser(user)
            setIsUser(true)
        }
    }, [user, username])

    const handleOnFollow = () => {
        const url = `${BASE_URL}/user/${currentUser._id}/follow`
        const token = localStorage.getItem("micro-blog")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        fetch(url, {
            headers: headers,
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setIsFollowed(true)
            })
    }

    const handleOnUnfollow = () => {
        const url = `${BASE_URL}/user/${currentUser._id}/unfollow`
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
                console.log(data)
                setIsFollowed(false)
            })
    }

    return (
        <> {currentUser &&
            <div>
                <h1>{currentUser.firstName} {currentUser.lastName}</h1>
                <p className="text-muted">{currentUser.posts.length} Posts</p>
                <div className="card mb-1">
                    <div className="row g-0">
                        <div className="col-md-4">
                            {/* <img src={`http://localhost:3001/${currentUser.profile.image.url}`} class="img-fluid rounded-circle" alt="Profile" /> */}
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{currentUser.firstName} {currentUser.lastName}</h5>
                                <p className="card-text">@{currentUser.username}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex gap-2 align-items-center">
                                        <p className="mb-0">{currentUser.follows.length} <span className="text-muted">Follows</span></p>
                                        <p className="mb-0">{currentUser.followers.length} <span className="text-muted">Followers</span></p>
                                    </div>
                                    {!isUser &&
                                        <>
                                            {isFollowed ?
                                                <button className="btn btn-secondary rounded-pill" onClick={handleOnUnfollow}>Unfollow</button>
                                                : <button className="btn btn-primary rounded-pill" onClick={handleOnFollow}>Follow</button>
                                            }
                                        </>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {currentUser.profile &&
                    <p>{currentUser.profile.bio}</p>
                }
                <div>
                    <h3>Posts</h3>
                    {currentUser.posts.length > 0 ? currentUser.posts.map(post => {
                        return <div key={post._id} className="card mb-1">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    {/* <img src={`http://localhost:3001/${user.user.profile.image.url}`} class="img-fluid rounded-circle" alt="Profile" /> */}
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{currentUser.username}</h5>
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
