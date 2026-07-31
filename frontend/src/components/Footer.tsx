import { Link } from "react-router-dom"
import "./Footer.css"

function Footer() {

  return (

    <footer className="footer">

      <div className="footer-content">

        <div className="footer-brand">

          <Link
            to="/"
            className="footer-logo"
          >

            <div className="vy-logo">
              VY
            </div>

            <div className="brand-text">

              <h2>
                LCMT
              </h2>

              <p>
                Love Creates Magic Together
              </p>

            </div>

          </Link>

          <span>
            Explore ideas. Connect with people.
            Build communities. Grow together.
          </span>

        </div>

        <div className="footer-links">

          <h3>
            Explore
          </h3>

          <Link to="/signup">
            Join LCMT
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link to="/explore">
            Explore
          </Link>

        </div>

        <div className="footer-community">

          <h3>
            Community
          </h3>

          <p>
            💡 Ideas & Innovation
          </p>

          <p>
            🤝 People & Communities
          </p>

          <p>
            🚀 Learn • Build • Grow
          </p>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          Crafted with ❤️ by VY
        </p>

      </div>

    </footer>

  )

}

export default Footer