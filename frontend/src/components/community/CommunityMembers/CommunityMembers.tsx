import "./CommunityMembers.css"

interface Props{

  members:any[]

}


function CommunityMembers({

  members=[]

}:Props){


return(

<section className="community-members">


<h2>
👥 Community Members
</h2>



<div className="member-grid">


{

members.length===0 ? (

<p className="empty-members">
No members yet
</p>

)

:

members.map((member:any)=>(


<div

key={member._id}

className="member-card"

>


<img

src={
member.image ||
"https://i.pravatar.cc/120"
}

alt={member.name}

/>



<div className="member-info">


<h3>
{member.name}
</h3>



<p>
{
member.bio ||
"Community member"
}
</p>



<div className="member-tags">

{

(member.interests || [])

.slice(0,3)

.map((interest:string)=>(

<span key={interest}>
#{interest}
</span>

))

}


</div>


</div>



<button>

View Profile

</button>


</div>


))

}


</div>


</section>

)

}


export default CommunityMembers
