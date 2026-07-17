import { Link } from "react-router-dom"
import "./Footer.css"

function Footer() {

  return (

    <footer className="footer">


      <div className="footer-content">



        <div className="footer-brand">


          <h2>
            ❤️ LCMT
          </h2>


          <p>
            Love Creates Magic Together
          </p>


          <span>
            Meaningful connections built around thoughts,
            personalities, and real conversations.
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


          <Link to="/discover">
            Discover
          </Link>


        </div>





        <div className="footer-community">


          <h3>
            Community
          </h3>


          <p>
            ❤️ Real Connections
          </p>


          <p>
            🎓 Student Network
          </p>


          <p>
            ✨ Meaningful Bonds
          </p>


        </div>



      </div>





      <div className="footer-bottom">


        <p>
          Created with love
        </p>


        <h3>
          — Vishu
        </h3>



      </div>



    </footer>

  )

}


export default Footer