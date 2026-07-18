import {
  Home,
  Users,
  Search,
  Heart,
  MessageCircle,
  Bell,
  User
} from "lucide-react"

import { Link } from "react-router-dom"

import "./Navbar.css"


function Navbar(){

return (

<>

<nav className="desktop-nav">

<h2>
❤️ LCMT
</h2>


<Link to="/">
<Home size={20}/>
<span>Home</span>
</Link>


<Link to="/communities">
<Users size={20}/>
<span>Communities</span>
</Link>


<Link to="/discover">
<Search size={20}/>
<span>Discover</span>
</Link>


<Link to="/matches">
<Heart size={20}/>
<span>Matches</span>
</Link>


<Link to="/chat">
<MessageCircle size={20}/>
<span>Chat</span>
</Link>


<Link to="/notifications">
<Bell size={20}/>
<span>Notifications</span>
</Link>


<Link to="/profile">
<User size={20}/>
<span>Profile</span>
</Link>


</nav>



<nav className="mobile-nav">


<Link to="/">
<Home/>
</Link>


<Link to="/communities">
<Users/>
</Link>


<Link to="/discover">
<Search/>
</Link>


<Link to="/chat">
<MessageCircle/>
</Link>


<Link to="/profile">
<User/>
</Link>


</nav>


</>

)

}


export default Navbar