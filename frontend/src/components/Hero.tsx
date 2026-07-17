import { Link } from "react-router-dom"
import "./Hero.css"

function Hero() {

  return (

    <section className="hero">


      {/* Floating connection cards */}

      <div className="hero-card card-one">
        👩‍🎓
        <span>
          Student Community
        </span>
      </div>


      <div className="hero-card card-two">
        💭
        <span>
          Match Ideas
        </span>
      </div>


      <div className="hero-card card-three">
        ❤️
        <span>
          Real Connections
        </span>
      </div>





      <div className="hero-content">


        <h1>

          Love Creates

          <span>
            Magic Together
          </span>

        </h1>




        <p>

          Meaningful connections begin with small moments.
          Discover people, share stories, and build something real.

        </p>





        <Link to="/signup">

          <button>

            Join LCMT ✨

          </button>

        </Link>



      </div>



    </section>

  )

}


export default Hero