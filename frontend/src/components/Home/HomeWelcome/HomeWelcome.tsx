import { Link } from "react-router-dom"
import "./HomeWelcome.css"

function HomeWelcome(){

  return(

    <section className="welcome-card">

      <h1>

        Welcome back 👋

      </h1>

      <p>

        Discover ideas, connect with people,
        and grow through communities.

      </p>

      <div className="quick-actions">

        <Link to="/explore">

          🚀 Explore

        </Link>

        <Link to="/communities">

          🌍 Explore Communities

        </Link>

      </div>

    </section>

  )

}

export default HomeWelcome