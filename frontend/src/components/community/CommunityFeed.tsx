import PostCard from "./PostCard"

import "./CommunityFeed.css"


interface Props{

  posts?:any[]

}



export default function CommunityFeed({

  posts=[]

}:Props){



return (

<div className="community-feed">


<h2>

🔥 Discussions

</h2>



{

posts.length === 0

?

<div className="coming-card">

No posts yet. Start the discussion.

</div>


:

posts.map((post:any)=>(


<PostCard

key={
post._id || post.id
}

post={post}

/>


))


}



</div>

)

}
