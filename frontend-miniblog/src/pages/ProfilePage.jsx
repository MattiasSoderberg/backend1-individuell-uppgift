import React, { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom"
import { UserContext } from '../App'
import Post from '../components/Post'
import { BASE_URL } from '../utils'

export default function PofilePage() {
    const [currentUser, setCurrentUser] = useState(null)
    const [isUser, setIsUser] = useState(false)
    const [isFollowed, setIsFollowed] = useState(false)

    const { username } = useParams()
    const { user, setEditProfileActive } = useContext(UserContext)

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

    const handleOnEdit = () => {
        setEditProfileActive(true)
    }

    return (
        <> {currentUser &&
            <div>
                <h1>{currentUser.firstName} {currentUser.lastName}</h1>
                <p className="text-muted">{currentUser.posts.length} Posts</p>
                <div className="card mb-1">
                    <div className="row g-0">
                        <div className="col-md-2 overflow-hidden m-2">
                            {currentUser.profile.image.url ?
                                <img src={`http://localhost:3001/${currentUser.profile.image.url}`} className="img-fluid" alt="Profile" />
                                : <img src={`http://localhost:3001/profileImages/no-user-image.jpg`} className="img-fluid" alt="Profile" />}
                        </div>
                        <div className="col-md-9">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title">{currentUser.firstName} {currentUser.lastName}</h5>
                                    {isUser &&
                                        <button onClick={handleOnEdit} className="btn btn-secondary rounded-pill ms-auto">Edit profile</button>
                                    }
                                </div>
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
                        {currentUser.profile &&
                            <div className="m-2">
                                <h5>Bio</h5>
                                <p>{currentUser.profile.bio}</p>
                                <p>{currentUser.profile.email}</p>
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <h3>Posts</h3>
                    {currentUser.posts.length > 0 ? currentUser.posts.map(post => {
                        return <Post key={post._id} post={post} />
                    })
                        : <p>No posts</p>}
                </div>
            </div>
        }
        </>

    )
}
