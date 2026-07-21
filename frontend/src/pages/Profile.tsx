import {
  Edit,
  Share2
} from "lucide-react"

import {
  Link
} from "react-router-dom"

import "./Profile.css"



function Profile(){


const user = JSON.parse(
  localStorage.getItem("user") || "{}"
)



return (

<main className="profile-page">


<section className="profile-cover">

</section>





<section className="profile-header">



<img

src={
user.image ||
"https://i.pravatar.cc/200"
}

className="profile-avatar"

alt="profile"

/>



<h1>

{user.name || "Aryan Kumar"}

<span>
✓
</span>

</h1>



<p className="username">

@{user.username || "user"}

</p>



<p className="bio">

AI enthusiast | Politics | Startups | Coding

</p>





<div className="profile-stats">


<Link to="/followers">

<div>

<strong>
245
</strong>

<span>
Followers
</span>

</div>

</Link>





<Link to="/following">

<div>

<strong>
180
</strong>

<span>
Following
</span>

</div>

</Link>





<Link to="/friends">

<div>

<strong>
42
</strong>

<span>
Friends
</span>

</div>

</Link>



</div>





<div className="profile-actions">


<button>

<Edit size={16}/>

Edit Profile

</button>





<button>

<Share2 size={16}/>

Share

</button>


</div>


</section>







<nav className="profile-tabs">


<span className="active">
Posts
</span>


<span>
Communities
</span>


<span>
About
</span>


</nav>







<section className="profile-section">


<h2>
💭 Thoughts
</h2>


<div className="profile-card">


Technology should empower people and create meaningful change.

</div>


</section>







<section className="profile-section">


<h2>
🔥 Interests
</h2>


<div className="interest-list">


<span>
AI
</span>


<span>
Politics
</span>


<span>
Startups
</span>


<span>
Programming
</span>


<span>
Cricket
</span>


</div>


</section>







<section className="profile-section">


<h2>
🌍 Communities Joined
</h2>


<div className="profile-card">


AI Builders

<br/>

Political Discussions

<br/>

Startup Network


</div>


</section>







<section className="profile-section">


<h2>
📌 Recent Activity
</h2>


<div className="profile-card">


Created AI discussion

<br/>

Joined Political Debate community

<br/>

Followed new creators


</div>


</section>




</main>

)

}


export default Profile