import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FaRegComment, FaRegHeart, FaHeart } from "react-icons/fa"
import { UserContext } from '../App'
import { BASE_URL } from '../utils'

export default function Post({ post }) {
    const [isLiked, setIsLiked] = useState(false)
    const [numberOfLikes, setNumberOfLikes] = useState()
    const [numberOfComments, setNumberOfComments] = useState()
    const { setCommentActive, setCommentOrigin, user } = useContext(UserContext)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (user) {
            setIsLiked(post.likes.includes(user._id))
            setNumberOfLikes(post.likes.length)
            setNumberOfComments(post.comments.length)
        }
    }, [user, post])

    const handleOnLike = () => {
        const url = `${BASE_URL}/posts/${post._id}/like`
        const token = localStorage.getItem("micro-blog")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        fetch(url, {
            headers: headers
        })
        .then(res => {
            setIsLiked(true)
            setNumberOfLikes(numberOfLikes + 1)
        })
    }

    const handleOnUnlike = () => {
        const url = `${BASE_URL}/posts/${post._id}/unlike`
        const token = localStorage.getItem("micro-blog")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        fetch(url, {
            headers: headers
        })
        .then(res => {
            setIsLiked(false)
            setNumberOfLikes(numberOfLikes - 1)
        })
    }

    const handleOnComment = () => {
        setCommentActive(true)
        setCommentOrigin(post)
    }

    const handleOnCardClick = () => {
        navigate(`/${post.author.username}/post/${post._id}`)
    }

    return (
        <div className="card mb-2 hover-card" onClick={handleOnCardClick}>
            <div className="row g-0">
                {post.author.profile ?
                    <div className="col-md-2 m-1">
                        {post.author.profile.image &&
                            <img src={`http://localhost:3001/${post.author.profile.image.url}`} className="img-fluid" alt="Profile" />
                        }
                    </div>
                    : <div className="col-md-2 m-1">
                        <img src={`http://localhost:3001/profileImages/no-user-image.jpg`} className="img-fluid" alt="No user" />
                    </div>
                }
                <div className="col-md-8">
                    <div className="card-body">
                        <Link className="post-heading-link" to={`/${post.author.username}`}><h5 className="card-title">{post.author.username}</h5></Link>
                        <p className="card-text">{post.text}</p>
                        <p className="card-text"><small className="text-muted">Posted {post.timeDisplay}</small></p>
                        <div className="d-flex gap-5">
                            <div onClick={handleOnComment}>
                                <FaRegComment className="z-5" />
                                <span className="mx-2 text-muted">{numberOfComments}</span>
                            </div>
                            <div>
                                { isLiked ? 
                                <FaHeart className="z-5" onClick={handleOnUnlike} />
                            : <FaRegHeart className="z-5" onClick={handleOnLike} /> }
                                <span className="mx-2 text-muted">{numberOfLikes}</span>
                            </div>
                        </div>
                    </div>
                    {post.tags.length > 0 &&
                        <div className="px-3 mb-3">
                            <h5>Tags</h5>
                            <div className="d-flex gap-2">
                                {post.tags.map((tag, index) => {
                                    return <Link className="tag-link" key={index} to={`/tags/${tag}`}>#{tag}</Link>
                                })}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
