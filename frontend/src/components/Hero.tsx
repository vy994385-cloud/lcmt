import { Link } from "react-router-dom"
import "./Hero.css"

function Hero() {

  return (

    <section className="hero">

      {/* Floating connection cards */}

      <div className="hero-card card-one">
        🎓
        <span>
          Student Community
        </span>
      </div>


      <div className="hero-card card-two">
        💭
        <span>
          Thoughts First
        </span>
      </div>


      <div className="hero-card card-three">
        ❤️
        <span>
          Real Connections
        </span>
      </div>


      <div className="hero-card card-four">
        ✨
        <span>
          Shared Values
        </span>
      </div>



      <div className="hero-content">


        <div className="hero-badge">
          ❤️ Built for meaningful student connections
        </div>


        <h1>

          Love Creates

          <span>
            Magic Together
          </span>

        </h1>



        <p>

          Find people who match your thoughts,
          personality, and values.
          Because real connections begin with understanding.

        </p>



        <div className="hero-buttons">

          <Link to="/signup">

            <button className="primary-btn">

              Start Your Journey ✨

            </button>

          </Link>


          <Link to="/discover">

            <button className="secondary-btn">

              Explore Community 💭

            </button>

          </Link>


        </div>



        <div className="hero-note">

          💡 Discover minds before faces

        </div>



      </div>


    </section>

  )

}


export default Hero