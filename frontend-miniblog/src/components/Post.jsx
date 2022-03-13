import React from 'react'
import { Link } from "react-router-dom"

export default function Post({ post }) {
    return (
        <div className="card mb-2">
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
