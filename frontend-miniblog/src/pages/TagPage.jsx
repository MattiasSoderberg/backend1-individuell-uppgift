import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import Post from '../components/Post'
import { BASE_URL } from '../utils'

export default function TagPage() {
    const [posts, setPosts] = useState(null)
    const tag = useParams()

    useEffect(() => {
        const url = `${BASE_URL}/posts/${tag.tag}`
        const headers = {
            "Content-Type": "application/json"
        }
        fetch(url, {
            headers: headers
        })
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [tag])
    return (
        <div>
            <h1>#{tag.tag}</h1>
            {posts && posts.map(post => {
                return <Post key={post._id} post={post} />
            })}
        </div>
    )
}
