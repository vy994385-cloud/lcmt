import { Link } from "react-router-dom"
import "./JoinLCMT.css"

function JoinLCMT() {
  return (
    <section className="join">
      <h2>
        Ready to create something meaningful?
      </h2>

      <p>
        Join LCMT and discover connections
        that go beyond the ordinary.
      </p>

      <Link to="/signup">
        <button>
          Join LCMT
        </button>
      </Link>

    </section>
  )
}

export default JoinLCMT