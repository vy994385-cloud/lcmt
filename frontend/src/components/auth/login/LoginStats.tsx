import { useEffect, useState } from "react"
import "./LoginStats.css"

const activity=[

"🏏 2,381 discussing the IPL",

"🤖 947 talking about AI",

"😂 Meme Hub is exploding",

"🎬 Movie Club started a live review",

"🚀 Startup founders are networking",

"📈 Finance community is analysing markets",

"🎵 Music Lounge opened a listening party",

"⚽ Match discussion is live"

]

function LoginStats(){

const [index,setIndex]=useState(0)

useEffect(()=>{

const timer=setInterval(()=>{

setIndex(prev=>

(prev+1)%activity.length

)

},3500)

return()=>clearInterval(timer)

},[])

return(

<div className="login-live">

<div className="live-dot"/>

<span>

{activity[index]}

</span>

</div>

)

}

export default LoginStats