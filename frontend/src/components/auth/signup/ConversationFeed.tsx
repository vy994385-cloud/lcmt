import {
  useEffect,
  useState
} from "react"

import "./ConversationFeed.css"


const conversations = [

{
emoji:"🏏",
title:"Match Debate",
text:"Who should lead the next big game?",
people:"8.2K people talking"
},


{
emoji:"😂",
title:"Meme Corner",
text:"Share your funniest internet finds",
people:"5.6K people online"
},


{
emoji:"🤖",
title:"AI Discussions",
text:"Will AI change the way we work?",
people:"3.4K people talking"
},


{
emoji:"🎬",
title:"Movie Club",
text:"Latest releases and reviews",
people:"2.8K people active"
},


{
emoji:"🏛️",
title:"Public Debate",
text:"Different opinions. One conversation.",
people:"4.1K people discussing"
},


{
emoji:"🚀",
title:"Startup Stories",
text:"Ideas, failures and lessons",
people:"1.7K founders"
}

]


function ConversationFeed(){


const [index,setIndex]=useState(0)



useEffect(()=>{


const timer=setInterval(()=>{


setIndex(prev=>

(prev+1)%conversations.length

)


},3000)



return()=>clearInterval(timer)


},[])



const item =
conversations[index]



return(

<div className="conversation-feed">


<div className="feed-paper">


<div className="paper-label">

TRENDING NOW

</div>



<div className="conversation-item">


<div className="conversation-icon">

{item.emoji}

</div>


<div>


<h4>

{item.title}

</h4>


<p>

{item.text}

</p>


<span>

{item.people}

</span>


</div>


</div>



</div>


</div>

)

}


export default ConversationFeed