import React from 'react'

export default function Comment({ comment, postAuthor }) {
    return (
        <div className="card p-3">
            {comment &&
                <div>
                    <p className="mb-1 fw-bold">{comment.author.username}
                    {comment.author?.profile &&
                        <span className="text-muted small m-0 mx-2">{comment.author.profile.firstName} {comment.author.profile.lastName}</span>
                    }
                    </p>
                    <p className="text-muted small">Commenting on {postAuthor}'s post</p>
                    <p key={comment._id} className="mt-3 mb-2">{comment.text}</p>
                </div>
            }
        </div>
    )
}
