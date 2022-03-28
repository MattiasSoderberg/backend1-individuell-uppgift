import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import { BASE_URL } from '../utils'

export default function CommentInput({ commentOrigin }) {
    const [content, setContent] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { setCommentActive } = useContext(UserContext)

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const url = `${BASE_URL}/posts/${commentOrigin._id}/comment`
        const token = localStorage.getItem("micro-blog")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const payload = { text: content }
        console.log(payload)
        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        })
        .then(res => {
            if (res.ok) {
                setCommentActive(false)
            } else {
                return res.json()
            }
        })
        .then(data => {
            console.log(data)
            if (data) {
                setErrorMessage(data.message)
            }
        })
    }

  return (
    <div className="overlay d-flex align-items-center">
            <div className="col-3 mx-auto bg-light edit-shadow p-5">
                <h3 className="mb-3">{commentOrigin.author.username}</h3>
                <p className="mb-5">{commentOrigin.text}</p>
                <form onSubmit={handleOnSubmit}>
                    <h5>Comment</h5>
                    <textarea type="text" className="form-control-plaintext p-4 text-area mb-2" placeholder="Comment" value={content} onChange={e => setContent(e.target.value)} />
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <div className="d-flex justify-content-end gap-3">
                        <button className="btn btn-primary rounded-pill px-3">Comment</button>
                        <button type="button" className="btn btn-secondary rounded-pill px-3" onClick={e => setCommentActive(false)}>Close</button>
                    </div>
                </form>
            </div>
        </div>
  )
}
