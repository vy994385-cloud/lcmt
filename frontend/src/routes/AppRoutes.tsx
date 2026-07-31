import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"

const Login = lazy(() => import("../pages/Login"))
const Signup = lazy(() => import("../pages/Signup"))
const Onboarding = lazy(() => import("../pages/Onboarding"))
const Explore = lazy(() => import("../pages/Explore"))
const Circle = lazy(() => import("../pages/Circle"))
const Profile = lazy(() => import("../pages/Profile"))
const Chat = lazy(() => import("../pages/Chat"))
const Settings = lazy(() => import("../pages/Settings"))
const Notifications = lazy(() => import("../pages/Notifications"))
const EditProfile = lazy(() => import("../pages/EditProfile"))
const LikesReceived = lazy(() => import("../pages/LikesReceived"))
const LikesSent = lazy(() => import("../pages/LikesSent"))
const TestBackend = lazy(() => import("../pages/TestBackend"))
const Home = lazy(() => import("../pages/Home"))
const Communities = lazy(() => import("../pages/Communities"))
const CommunityDetails = lazy(() => import("../pages/CommunityDetails"))
const PostDetail = lazy(() => import("../pages/PostDetail"))
const ChatInbox = lazy(() => import("../pages/ChatInbox"))
const NewChat = lazy(() => import("../pages/NewChat"))
const Followers = lazy(() => import("../pages/Followers"))
const Following = lazy(() => import("../pages/Following"))
const Friends = lazy(() => import("../pages/Friends"))
const Network = lazy(() => import("../pages/Network"))

const Events = lazy(() => import("../pages/Events"))
const Groups = lazy(() => import("../pages/groups/Groups"))
const CreateGroup = lazy(() => import("../pages/groups/CreateGroup"))
const GroupChat = lazy(() => import("../pages/groups/GroupChat"))
const GroupDetails = lazy(() => import("../pages/groups/GroupDetails"))

import AppLayout from "../layouts/AppLayout"

function Loader() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        fontSize: "18px"
      }}
    >
      Loading...
    </div>
  )
}

function checkProfileComplete() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  )

  if (!user._id) {
    return false
  }

  return Boolean(
    user.college &&
    user.course &&
    user.personality &&
    user.interests &&
    user.interests.length > 0
  )
}

export default function AppRoutes() {

  const homeElement = localStorage.getItem("user")
    ? (
        checkProfileComplete()
          ? <Home />
          : <Onboarding />
      )
    : (
        <Login />
      )

  return (

    <Suspense fallback={<Loader />}>

      <Routes>

  {/* Public Routes */}

  <Route
    path="/"
    element={homeElement}
  />

  <Route
    path="/login"
    element={<Login />}
  />

  <Route
    path="/signup"
    element={<Signup />}
  />

  <Route
    path="/onboarding"
    element={<Onboarding />}
  />



  {/* App Layout */}

  <Route element={<AppLayout />}>

    <Route
      path="/home"
      element={<Home />}
    />

    <Route
      path="/explore"
      element={<Explore />}
    />

    <Route
      path="/circle"
      element={<Circle />}
    />

    <Route
      path="/network"
      element={<Network />}
    />

    <Route
      path="/communities"
      element={<Communities />}
    />

    <Route
      path="/community/:id"
      element={<CommunityDetails />}
    />

    <Route
      path="/groups"
      element={<Groups />}
    />

    <Route
      path="/groups/create"
      element={<CreateGroup />}
    />

    <Route
      path="/groups/:id"
      element={<GroupDetails />}
    />

    <Route
      path="/groups/chat/:id"
      element={<GroupChat />}
    />

    <Route
      path="/chat"
      element={<ChatInbox />}
    />

    <Route
      path="/chat/:id"
      element={<Chat />}
    />

    <Route
      path="/new-chat"
      element={<NewChat />}
    />

    <Route
      path="/profile"
      element={<Profile />}
    />

    <Route
      path="/profile/:id"
      element={<Profile />}
    />

    <Route
      path="/followers"
      element={<Followers />}
    />

    <Route
      path="/following"
      element={<Following />}
    />

    <Route
      path="/friends"
      element={<Friends />}
    />

    <Route
      path="/notifications"
      element={<Notifications />}
    />

    <Route
      path="/settings"
      element={<Settings />}
    />

    <Route
      path="/edit-profile"
      element={<EditProfile />}
    />

    <Route
  path="/profile/edit"
  element={<EditProfile />}
/>

    <Route
      path="/likes-received"
      element={<LikesReceived />}
    />

    <Route
      path="/likes-sent"
      element={<LikesSent />}
    />

    <Route
      path="/post/:id"
      element={<PostDetail />}
    />

    <Route
      path="/events"
      element={<Events />}
    />

  </Route>



  {/* Developer */}

  <Route
    path="/test-backend"
    element={<TestBackend />}
  />

</Routes> </Suspense> ) }

