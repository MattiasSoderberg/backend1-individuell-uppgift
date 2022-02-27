
useEffect(() => {
    const headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.c29mZW5lbg.w5t6FdEjpWN4SwbhGV4rtExbf9l7BTT2tmYb1vDI7bI"
    }
    fetch("http://localhost:3001/api/user/me", {
        headers: headers
    })
        .then(res => res.json())
        .then(data => setUser(data))
}, [])

const handleOnSubmit = (e) => {
    e.preventDefault()
    
    const formData = new FormData()
    formData.append("email", email)
    formData.append("bio", bio)
    formData.append("imageFile", imageFile)

    console.log(formData.get("imageFile"))

    const headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.c29mZW5lbg.w5t6FdEjpWN4SwbhGV4rtExbf9l7BTT2tmYb1vDI7bI"
    }

    const url = "http://localhost:3001/api/user/me"

    fetch(url, {
        method: "PATCH",
        headers: headers,
        body: formData
    })
        .then(res => console.log(res))
}
<div className="col-4">
    <form action="" method='PATCH' encType="multipart/form-data">
        <input type="text" name="email" id="email" className='form-control' placeholder='email' value={email} onChange={e => setemail(e.target.value)} />
        <input type="text" name="bio" id="bio" className="form-control" placeholder="biography" value={bio} onChange={e => setBio(e.target.value)} />
        <input type="file" onChange={e => setImageFile(e.target.files[0])} />
        <button className="btn btn-primary" onClick={handleOnSubmit}>Save</button>
    </form>
</div>
{
    user &&
    <img src={`http://localhost:3001/${user.profile.image.url}`} alt="" />
}