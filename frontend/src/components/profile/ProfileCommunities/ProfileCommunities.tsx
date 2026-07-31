import "./ProfileCommunities.css"


interface Props{
  user:any
}


export default function ProfileCommunities({
  user
}:Props){


const communities =
user.communities || []



return(

<section className="profile-communities">


<div className="community-header">

<div>

<h2>
Communities
</h2>

<p>
Spaces where this member connects and contributes
</p>

</div>


<span>
{communities.length} joined
</span>


</div>



{

communities.length === 0 ?


<div className="empty-community">


<div className="empty-icon">
🌱
</div>


<h3>
No communities yet
</h3>


<p>
Join communities to discover people, ideas and conversations.
</p>


</div>


:


<div className="community-profile-grid">


{

communities.map(

(community:any,index:number)=>(


<div

className="community-profile-card"

key={community._id || index}

>


<div className="community-icon">

{
community.icon || "🌍"
}

</div>



<div className="community-info">


<h3>
{community.name}
</h3>


<p>
{community.category || "Community"}
</p>



<span>
👥 {community.members?.length || 0} members
</span>


</div>


</div>


)

)


}


</div>


}


</section>

)

}