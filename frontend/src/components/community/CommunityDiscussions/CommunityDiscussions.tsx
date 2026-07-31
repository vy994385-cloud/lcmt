import "./CommunityDiscussions.css"

const discussions = [

{
icon:"📢",
title:"General",
posts:126
},

{
icon:"👨‍💻",
title:"Projects",
posts:48
},

{
icon:"❓",
title:"Help & Doubts",
posts:213
},

{
icon:"🚀",
title:"Startup Ideas",
posts:34
},

{
icon:"🎓",
title:"Placements",
posts:72
},

{
icon:"☕",
title:"Off Topic",
posts:91
}

]

function CommunityDiscussions(){

return(

<section className="community-discussions">

<h2>

💬 Discussions

</h2>

<div className="discussion-grid">

{

discussions.map(item=>(

<div

key={item.title}

className="discussion-card"

>

<div className="discussion-icon">

{item.icon}

</div>

<h3>

{item.title}

</h3>

<p>

{item.posts} discussions

</p>

<button>

Open

</button>

</div>

))

}

</div>

</section>

)

}

export default CommunityDiscussions