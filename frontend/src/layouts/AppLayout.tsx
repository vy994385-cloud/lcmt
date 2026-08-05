import { Outlet, useLocation } from "react-router-dom"

import TopBar from "../components/navigation/TopBar"
import BottomNav from "../components/navigation/BottomNav"

import "./AppLayout.css"

import EditorialBackground from "../components/background/EditorialBackground"

export default function AppLayout(){

const location = useLocation()

const hideNavigation =
location.pathname === "/login" ||
location.pathname === "/signup" ||
location.pathname === "/onboarding"


return (

<div className="app-shell">

<EditorialBackground />

{
!hideNavigation &&
<TopBar />
}

<main className="app-content">

<Outlet />

</main>

{
!hideNavigation &&
<BottomNav />
}

</div>

)

}