import { Routes, Route } from "react-router-dom"

import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Onboarding from "../pages/Onboarding"
import Discover from "../pages/Discover"
import Profile from "../pages/Profile"
import Matches from "../pages/Matches"
import Chat from "../pages/Chat"
import Settings from "../pages/Settings"
import Notifications from "../pages/Notifications"
import EditProfile from "../pages/EditProfile"
import LikesReceived from "../pages/LikesReceived"
import LikesSent from "../pages/LikesSent"
import TestBackend from "../pages/TestBackend"

import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import WhyLCMT from "../components/WhyLCMT"
import HowItWorks from "../components/HowItWorks"
import Safety from "../components/Safety"
import JoinLCMT from "../components/JoinLCMT"
import Footer from "../components/Footer"
import ChatInbox from "../pages/ChatInbox"


function LandingPage() {
  return (
    <>
     <>
  <Hero />
  <WhyLCMT />
  <HowItWorks />
  <Safety />
  <JoinLCMT />
  <Footer />
</>
    </>
  )
}


export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />

      <Route path="/test-backend" element={<TestBackend />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/onboarding" element={<Onboarding />} />

      <Route path="/discover" element={<Discover />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/matches" element={<Matches />} />

      
      <Route path="/settings" element={<Settings />} />

      <Route path="/notifications" element={<Notifications />} />

      <Route path="/edit-profile" element={<EditProfile />} />

      <Route path="/likes-received" element={<LikesReceived />} />

      <Route path="/likes-sent" element={<LikesSent />} />

      <Route 
  path="/chat"
  element={<ChatInbox />}
/>

<Route 
  path="/chat/:id"
  element={<Chat />}
/>

      

    </Routes>
  )
}