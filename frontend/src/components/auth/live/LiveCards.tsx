import {
  useEffect,
  useState
} from "react"

import "./LiveCards.css"


const conversations = [

{
icon:"🏏",
title:"Cricket Arena",
text:"India vs England discussion",
users:"2.4k chatting"
},

{
icon:"😂",
title:"Meme Zone",
text:"Fresh memes are trending",
users:"892 online"
},

{
icon:"🤖",
title:"AI Lounge",
text:"Future of AI discussion",
users:"1.1k talking"
},

{
icon:"🎬",
title:"Movie Club",
text:"New release reviews",
users:"634 active"
},

{
icon:"🚀",
title:"Startup Hub",
text:"Founders exchanging ideas",
users:"428 online"
},

{
icon:"🎮",
title:"Gaming Room",
text:"Players looking for squads",
users:"760 active"
}

]


function LiveCards(){

const [index,setIndex]=useState(0)


useEffect(()=>{

const timer=setInterval(()=>{

setIndex(prev=>

(prev+1)%conversations.length

)

},3500)


return()=>clearInterval(timer)


},[])



const active = conversations[index]


return(

<div className="live-card-container">


<div className="live-label">

🟢 LIVE NOW

</div>


<div className="live-card">


<div className="live-icon">

{active.icon}

</div>


<div className="live-content">


<h3>

{active.title}

</h3>


<p>

{active.text}

</p>


<span>

{active.users}

</span>


</div>


</div>


</div>

)

}


export default LiveCards