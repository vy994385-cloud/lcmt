import { useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import AppRoutes from "./routes/AppRoutes"

function App() {

  const location = useLocation()

  const publicRoutes = [
    "/",
    "/login",
    "/signup"
  ]

  const isPublicPage =
    publicRoutes.includes(location.pathname)


  return (
    <>
      {!isPublicPage && <Navbar />}

      <AppRoutes />
    </>
  )
}

export default App