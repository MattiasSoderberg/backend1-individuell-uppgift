import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Comment from '../components/Comment'
import { BASE_URL } from '../utils'

export default function PostDetailPage() {
    const [post, setPost] = useState(null)
    const [content, setContent] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { id } = useParams()

    useEffect(() => {
        const url = `${BASE_URL}/posts/${id}`
        const headers = {
            "Content-Type": "application/json"
        }
        fetch(url, {
            headers: headers
        })
            .then(res => res.json())
            .then(data => {
                setPost(data)
                console.log(data)
            })
    }, [id])

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const url = `${BASE_URL}/posts/${post._id}/comment`
        const token = localStorage.getItem("micro-blog")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const payload = { text: content }
        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                }
            })
            .then(data => {
                if (data) {
                    setErrorMessage(data.message)
                }
            })
    }

    return (
        <>
            {post &&
                <>
                    <div className="card p-3">
                        <div className="row">
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
                            <div className="col-3">
                                {post.author.firstName && post.author.lastName &&
                                    <p>{post.author.firstName} {post.author.lastName}</p>
                                }
                                <p>{post.author.username}</p>
                            </div>
                        </div>
                        <div className="row">
                            <p className="fs-5 px-3">{post.text}</p>
                        </div>
                    </div>
                    <div className="card p-3">
                        <form onSubmit={handleOnSubmit}>
                            <textarea type="text" className="form-control-plaintext text-area mb-2 fs-5" placeholder="Comment" value={content} onChange={e => setContent(e.target.value)} />
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                            <div className="d-flex justify-content-end gap-3">
                                <button className="btn btn-primary rounded-pill px-3">Comment</button>
                            </div>
                        </form>
                    </div>
                    {post.comments.length > 0 && 
                        post.comments.map(comment => {
                            return <Comment key={comment._id} comment={comment} postAuthor={post.author.username} />
                        })
                    }
                </>
            }
        </>
    )
}
