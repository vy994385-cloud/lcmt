import {
 Settings,
 LogOut,
 Shield,
 HelpCircle
} from "lucide-react"

import {
 Link
} from "react-router-dom"


function MoreMenu(){

return (

<div 
className="more-menu"
onClick={(e)=>e.stopPropagation()}
>


<Link to="/settings">
<Settings size={18}/>
Settings
</Link>


<Link to="/privacy">
<Shield size={18}/>
Privacy
</Link>


<Link to="/help">
<HelpCircle size={18}/>
Help
</Link>


<button>
<LogOut size={18}/>
Logout
</button>


</div>

)

}


export default MoreMenu