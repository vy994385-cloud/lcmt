import { Outlet } from "react-router-dom"

import TopBar from "../components/navigation/TopBar"
import BottomNav from "../components/navigation/BottomNav"

export default function AppLayout() {

  return (

    <div className="app-shell">

      <TopBar />

      <main
        style={{
          minHeight: "calc(100vh - 120px)"
        }}
      >
        <Outlet />
      </main>

      <BottomNav />

    </div>

  )

}