import React from 'react'
import { Link } from "react-router-dom"

export default function Post({ post }) {
    return (
        <div className="card mb-2">
            <div className="row g-0">
                {post.author.profile ?
                    <div className="col-md-2 m-1 d-flex align-items-center">
                        {post.author.profile.image &&
                            <img src={`http://localhost:3001/${post.author.profile.image.url}`} className="img-fluid" alt="Profile" />
                        }
                    </div>
                    : <div className="col-md-2 m-1 d-flex align-items-center">
                        <img src={`http://localhost:3001/profileImages/no-user-image.jpg`} className="img-fluid" alt="No user" />
                    </div>
                }
                <div className="col-md-8">
                    <div className="card-body">
                        <Link to={`/${post.author.username}`}><h5 className="card-title">{post.author.username}</h5></Link>
                        <p className="card-text">{post.text}</p>
                        <p className="card-text"><small className="text-muted">{post.createdAt.split("T")[0]} {post.createdAt.split("T")[1].slice(0, 8)}</small></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
