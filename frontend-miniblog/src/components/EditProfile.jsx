import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import { BASE_URL } from '../utils'

export default function EditProfile() {
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [imageFile, setImageFile] = useState(null)
    const { setEditProfileActive } = useContext(UserContext)

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const url = `${BASE_URL}/user/me`
        const token = localStorage.getItem("micro-blog")
        const headers = {
            "Authorization": `Bearer ${token}`
        }

        const formData = new FormData()
        formData.append("email", email)
        formData.append("bio", bio)
        formData.append("firstName", firstName)
        formData.append("lastName", lastName)
        formData.append("imageFile", imageFile)

        fetch(url, {
            method: "PATCH",
            headers: headers,
            body: formData
        })
            .then(res => setEditProfileActive(false))
    }

    return (
        <div className="overlay d-flex align-items-center">
            <div className="col-3 mx-auto bg-light edit-shadow p-5">
                <h3 className="mb-3">Edit Profile</h3>
                <form action="" method='PATCH' encType="multipart/form-data">
                    <input type="text" className="form-control mb-3" placeholder="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <input type="text" className="form-control mb-3" placeholder="Lastname" value={lastName} onChange={e => setLastName(e.target.value)} />
                    <input type="text" name="email" id="email" className="form-control mb-3" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="text" name="bio" id="bio" className="form-control mb-3" placeholder="biography" value={bio} onChange={e => setBio(e.target.value)} />
                    <input type="file" className="form-control mb-3" onChange={e => setImageFile(e.target.files[0])} />
                    <div className="d-flex justify-content-end gap-3">
                        <button type="button" className="btn btn-secondary rounded-pill" onClick={e => setEditProfileActive(false)}>Close</button>
                        <button type="submit" className="btn btn-primary rounded-pill" onClick={handleOnSubmit}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
