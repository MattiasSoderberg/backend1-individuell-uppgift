import React, { useState, useEffect, createContext } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import Navigation from "./components/Navigation";
import './App.css';
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage"
import { BASE_URL } from "./utils";
import UsersPage from "./pages/UsersPage";
import EditProfile from "./components/EditProfile";

const UserContext = createContext()

function App() {
  const [user, setUser] = useState(null)
  const [editProfileActive, setEditProfileActive] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("micro-blog")
      if (token) {
        const url = `${BASE_URL}/user/me`
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        fetch(url, {
          headers: headers
        })
          .then(res => {
            if (res.ok) {
              return res.json()
            } else {
              console.log("Error:", res.statusText)
            }
          })
          .then(data => {
            setUser(data)
            // navigate("/home")
          })
      }
    }
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser, setEditProfileActive }}>
      <div className="row mx-0 gap-4">
        {editProfileActive && <EditProfile />}
        <div className="offset-1 col-2">
          <Navigation />
        </div>
        <div className="col-5">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/:username" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export { UserContext }
export default App;
