import Section from "../components/ui/Section/Section"
import PostCard from "../components/cards/PostCard/PostCard"
import posts from "../mock/posts"

import "./Explore.css"


function Explore(){


return (

<main className="explore-page">


<div className="explore-header">

<h1>
Explore LCMT
</h1>

<p>
Discover students, ideas and communities
</p>


<input
placeholder="Search discussions, students..."
/>


</div>



<Section
title="🔥 Trending Discussions"
subtitle="What's happening around students"
>


<div className="featured-posts">


{
posts.map(post=>(

<PostCard
key={post.id}
post={post}
/>

))
}


</div>


</Section>




<Section

title="👥 Students You May Know"

subtitle="Connect with people who share your interests"

>


<div className="coming-card">

More student recommendations coming soon

</div>


</Section>





<Section

title="🏫 Popular Communities"

subtitle="Join conversations you care about"

>


<div className="coming-card">

Engineering • AI • Startups • Gaming • Sports

</div>


</Section>



</main>


)

}


export default Explore