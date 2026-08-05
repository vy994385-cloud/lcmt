import {
  lazy,
  Suspense
} from "react"

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom"


import AppLayout from "../layouts/AppLayout"


const Login =
lazy(()=>import("../pages/Login"))

const Signup =
lazy(()=>import("../pages/Signup"))

const Onboarding =
lazy(()=>import("../pages/Onboarding"))

const Home =
lazy(()=>import("../pages/Home"))

const Explore =
lazy(()=>import("../pages/Explore"))

const Communities =
lazy(()=>import("../pages/Communities"))

const Circle =
lazy(()=>import("../pages/Circle"))

const Network =
lazy(()=>import("../pages/Network"))

const ChatInbox =
lazy(()=>import("../pages/ChatInbox"))

const Chat =
lazy(()=>import("../pages/Chat"))

const Profile =
lazy(()=>import("../pages/Profile"))

const EditProfile =
lazy(()=>import("../pages/EditProfile"))

const Notifications =
lazy(()=>import("../pages/Notifications"))

const CommunityDetails =
lazy(()=>import("../pages/CommunityDetails"))

const PostDetail =
lazy(()=>import("../pages/PostDetail"))


function Loader(){

return(

<div className="page-loader">

Loading...

</div>

)

}



function isLogged(){

return Boolean(
localStorage.getItem("token")
)

}



function PrivateRoute({
children
}:{
children:React.ReactNode
}){

if(!isLogged()){

return <Navigate to="/login"/>

}

return children

}



export default function AppRoutes(){


return(

<Suspense fallback={<Loader/>}>


<Routes>


<Route
path="/login"
element={<Login/>}
/>


<Route
path="/signup"
element={<Signup/>}
/>


<Route
path="/onboarding"
element={
<PrivateRoute>
<Onboarding/>
</PrivateRoute>
}
/>



<Route
element={
<PrivateRoute>
<AppLayout/>
</PrivateRoute>
}
>


<Route
path="/"
element={<Home/>}
/>


<Route
path="/home"
element={<Home/>}
/>


<Route
path="/explore"
element={<Explore/>}
/>


<Route
path="/communities"
element={<Communities/>}
/>


<Route
path="/community/:id"
element={<CommunityDetails/>}
/>


<Route
path="/circle"
element={<Circle/>}
/>


<Route
path="/network"
element={<Network/>}
/>


<Route
path="/chat"
element={<ChatInbox/>}
/>


<Route
path="/chat/:id"
element={<Chat/>}
/>


<Route
path="/profile"
element={<Profile/>}
/>


<Route
path="/profile/:id"
element={<Profile/>}
/>


<Route
path="/edit-profile"
element={<EditProfile/>}
/>


<Route
path="/notifications"
element={<Notifications/>}
/>


<Route
path="/post/:id"
element={<PostDetail/>}
/>


</Route>


<Route
path="*"
element={<Navigate to="/home"/>}
/>


</Routes>


</Suspense>

)

}
