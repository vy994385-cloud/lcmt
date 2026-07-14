import { Link } from "react-router-dom"
import "./Hero.css"

function Hero() {
  return (
    <section className="hero">

      <h1>
        Love Creates
        <br />
        Magic Together
      </h1>

      <p>
        Meaningful connections begin with small moments.
        Discover people, share stories, and build something real.
      </p>

      <Link to="/signup">
        <button>
          Join LCMT
        </button>
      </Link>

    </section>
  )
}

export default Hero