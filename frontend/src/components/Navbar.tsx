import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  return (
    <nav className="navbar">

      <div className="brand">
        <h2>LCMT</h2>
        <span>Love Creates Magic Together</span>
      </div>

      <div className="nav-links">
        <Link to="/">Explore</Link>

        <Link to="/login">Login</Link>

        <Link to="/signup">
          <button>
            Join
          </button>
        </Link>
      </div>

    </nav>
  )
}

export default Navbar