import {
  User,
  Shield,
  Bell,
  Ban,
  HelpCircle,
  Info,
  LogOut
} from "lucide-react"

import {
  Link,
  useNavigate
} from "react-router-dom"

import Layout from "../components/Layout"

import "./Settings.css"



function Settings(){


const navigate = useNavigate()



function logout(){

  localStorage.removeItem("user")

  localStorage.removeItem("token")

  navigate("/login")

}




const settings = [

{
title:"Edit Profile",
icon:<User size={22}/>,
path:"/profile/edit"
},

{
title:"Privacy Settings",
icon:<Shield size={22}/>,
path:"/privacy"
},

{
title:"Notification Preferences",
icon:<Bell size={22}/>,
path:"/notification-settings"
},

{
title:"Blocked Users",
icon:<Ban size={22}/>,
path:"/blocked"
},

{
title:"Help & Support",
icon:<HelpCircle size={22}/>,
path:"/help"
},

{
title:"About LCMT",
icon:<Info size={22}/>,
path:"/about"
}

]



return (

<Layout>

<main className="settings-page">


<h1>
⚙️ Settings
</h1>



<div className="settings-container">


{
settings.map(

(item)=>(


<Link

to={item.path}

className="settings-option"

key={item.title}

>


<div className="settings-icon">

{item.icon}

</div>




<div className="settings-text">

<h3>
{item.title}
</h3>


<p>
Manage your LCMT experience
</p>


</div>



<span>
›
</span>



</Link>


)

)

}



<button

className="logout-button"

onClick={logout}

>


<LogOut size={20}/>


Logout


</button>



</div>


</main>


</Layout>

)

}


export default Settings