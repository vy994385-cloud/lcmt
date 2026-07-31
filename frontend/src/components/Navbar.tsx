import { NavLink } from "react-router-dom"

import {
  useNotifications
} from "../context/NotificationContext"

import "./Navbar.css"



function Navbar(){


const {
  unread
}=useNotifications()



const links=[

{
name:"Home",
path:"/home",
icon:"⌂"
},

{
name:"Explore",
path:"/explore",
icon:"🌎"
},

{
name:"Communities",
path:"/communities",
icon:"👥"
},

{
name:"Network",
path:"/network",
icon:"🔗"
},

{
name:"Chat",
path:"/chat",
icon:"💬"
},

{
name:"Notifications",
path:"/notifications",
icon:"🔔",
badge:true
},

{
name:"Profile",
path:"/profile",
icon:"👤"
}

]



return(

<nav className="navbar">


<div className="navbar-brand">


<div className="brand-logo">

LC

</div>


<div className="brand-text">

<h2>
LCMT
</h2>

<span>
Talk. Connect. Belong.
</span>


</div>


</div>




<div className="navbar-links">


{

links.map(link=>(


<NavLink

key={link.path}

to={link.path}

className={({isActive})=>

isActive

?

"nav-item active"

:

"nav-item"

}


>


<span

className={

link.badge && unread>0

?

"nav-icon notification-active"

:

"nav-icon"

}

>

{link.icon}



{

link.badge && unread>0 &&

<span className="notification-badge">

{
unread>99
?
"99+"
:
unread
}

</span>

}



</span>


<span>

{link.name}

</span>



</NavLink>


))


}



</div>


</nav>

)

}


export default Navbar