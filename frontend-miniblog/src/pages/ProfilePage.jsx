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
                    console.log(data)
                    setIsUser(false)
                    setIsFollowed(data.followers.includes(user._id))
                })
        } else {
            setCurrentUser(user)
            console.log(user)
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
                setIsFollowed(false)
            })
    }

    const handleOnEdit = () => {
        setEditProfileActive(true)
    }

    return (
        <> {currentUser &&
            <div>
                <h1>{currentUser.username}</h1>
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
                                    <h5 className="card-title">@{currentUser.username}</h5>
                                    {isUser &&
                                        <button onClick={handleOnEdit} className="btn btn-secondary rounded-pill ms-auto">Edit profile</button>
                                    }
                                </div>
                                <p className="card-text">{currentUser.firstName} {currentUser.lastName}</p>
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
                        {currentUser.profile.bio &&
                            <div className="m-2">
                                <h4>Bio</h4>
                                <p>{currentUser.profile.bio}</p>
                                <h5>Email</h5>
                                <p>{currentUser.profile.email}</p>
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <h3>Posts</h3>
                    {currentUser.posts.length > 0 ?
                        <p>{currentUser.posts.length}</p>
                        : <p>No posts</p>}
                    {currentUser.posts && currentUser.posts.map(post => {
                        return <Post key={post._id} post={post} />
                    })}
                </div>
            </div>
        }
        </>

    )
}
