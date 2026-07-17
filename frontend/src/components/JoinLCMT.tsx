import { Link } from "react-router-dom"
import "./JoinLCMT.css"

function JoinLCMT() {

  return (

    <section className="join">


      <div className="join-content">


        <div className="join-glow"></div>



        <h2>
          Ready to create something meaningful?
        </h2>



        <p>
          Join LCMT and discover connections
          that go beyond the ordinary.
        </p>




        <Link to="/signup">

          <button>

            Start Your Journey ✨

          </button>

        </Link>



      </div>



    </section>

  )

}


export default JoinLCMT