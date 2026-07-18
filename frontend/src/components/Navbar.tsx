import { NavLink } from "react-router-dom"
import "./Navbar.css"

function Navbar() {

  return (

    <nav className="navbar">


      <NavLink 
        to="/home" 
        className="logo"
      >

        <span>
          ❤️
        </span>

        LCMT

      </NavLink>





      <div className="nav-links">


        <NavLink 
          to="/home"
          className={({isActive}) =>
            isActive ? "active" : ""
          }
        >

          Home

        </NavLink>

<NavLink 
  to="/communities"
  className={({isActive}) =>
    isActive ? "active" : ""
  }
>

  Communities

</NavLink>



        <NavLink 
          to="/discover"
          className={({isActive}) =>
            isActive ? "active" : ""
          }
        >

          Discover

        </NavLink>





        <NavLink 
          to="/matches"
          className={({isActive}) =>
            isActive ? "active" : ""
          }
        >

          Matches

        </NavLink>





        <NavLink 
          to="/chat"
          className={({isActive}) =>
            isActive ? "active" : ""
          }
        >

          Chat

        </NavLink>





        <NavLink 
          to="/notifications"
          className={({isActive}) =>
            isActive ? "active" : ""
          }
        >

          Notifications

        </NavLink>





        <NavLink 
          to="/profile"
          className={({isActive}) =>
            isActive ? "active" : ""
          }
        >

          Profile

        </NavLink>



      </div>



    </nav>

  )

}


export default Navbar