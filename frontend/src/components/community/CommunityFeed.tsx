import PostCard from "../cards/PostCard/PostCard"

import postsData from "../../mock/posts"

import { events } from "../../mock/events"

import "./CommunityFeed.css"



interface Props {


  community?: any


  tab?: string


  posts?: any[]


}




export default function CommunityFeed({

  tab="Feed",

  posts=[]

}:Props){





const allPosts = [

  ...posts,

  ...postsData

]






if(tab==="Questions"){


return (

<div className="community-feed">


<h2>
❓ Questions
</h2>



{

allPosts

.filter(
post =>
post.type==="Question"
||
!post.type
)

.map(post=>(


<PostCard

key={post.id}

post={post}

/>


))


}



</div>

)


}







if(tab==="Polls"){


return (

<div className="community-feed">


<h2>
📊 Polls
</h2>



<div className="coming-card">

Create polls and collect opinions from the community

</div>



</div>

)


}








if(tab==="Events"){


return (

<div className="community-feed">


<h2>
🎉 Events
</h2>



{

events.map((event:any)=>(


<div

key={event.id}

className="event-box"

>


<h3>

{event.title}

</h3>



<p>

{event.date}

</p>



</div>


))


}



</div>

)


}







if(tab==="Members"){


return (

<div className="community-feed">


<h2>
👥 Members
</h2>




<div className="coming-card">

Community members will appear here

</div>



</div>

)


}







return (

<div className="community-feed">



<h2>
🔥 Discussions
</h2>



{

allPosts.map(post=>(


<PostCard

key={post.id}

post={post}

/>


))


}



</div>

)


}