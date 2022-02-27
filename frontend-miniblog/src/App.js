import React, { useState, useEffect, createContext } from "react"
import { Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation";
import './App.css';
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/PofilePage"
import { BASE_URL } from "./utils";

const UserContext = createContext()

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("micro-blog")
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
        .then(data => setUser(data))
    }
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="row">
        <div className="col-3">
          <Navigation />
        </div>
        <div className="col-6">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export { UserContext }
export default App;
