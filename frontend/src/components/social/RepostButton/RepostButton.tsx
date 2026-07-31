import {
useState
} from "react"

import "./RepostButton.css"


export default function RepostButton(){

const [reposted,setReposted]=useState(false)


return(

<button

className={
reposted
?
"repost active"
:
"repost"
}

onClick={()=>
setReposted(!reposted)
}

>

🔁 {reposted ? "Reposted" : "Repost"}

</button>

)

}
