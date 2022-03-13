import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { BASE_URL } from '../utils'

export default function ExplorePage() {
    const [tags, setTags] = useState(null)

    useEffect(() => {
        const url = `${BASE_URL}/tags`
        const token = localStorage.getItem("micro-blog")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        fetch(url, {
            headers: headers
        })
            .then(res => res.json())
            .then(data => setTags(data))
    }, [])

    return (
        <div>
            <h2>Explore tags</h2>
            <div className="d-flex gap-3">
                {tags && tags.map(tag => {
                    return <Link className="tag-link" key={tag._id} to={`/tags/${tag.tag}`}>#{tag.tag}</Link>
                })}
            </div>
        </div>
    )
}
