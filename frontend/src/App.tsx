import { useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import AppRoutes from "./routes/AppRoutes"

function App() {

  const location = useLocation()

  const hideNavbarRoutes = [
    "/login",
    "/signup"
  ]

  const shouldShowNavbar = !hideNavbarRoutes.includes(
    location.pathname
  )


  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <AppRoutes />
    </>
  )
}

export default App