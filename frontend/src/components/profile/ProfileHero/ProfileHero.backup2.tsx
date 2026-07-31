import {useNavigate} from "react-router-dom"

import "./ProfileHero.css"

function ProfileHero({
user,
isOwnProfile
}:any){

const navigate=useNavigate()

const joined=user.createdAt
?new Date(user.createdAt).toLocaleDateString(
undefined,
{
month:"short",
year:"numeric"
}
)
:"Recently"

return(

<section className="profile-hero">

<div className="profile-cover">

<img
src={
user.coverImage ||
"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80"
}
alt="cover"
/>

</div>

<div className="profile-main">

<img

className="profile-avatar"

src={
user.image ||
"https://placehold.co/180"
}

alt="profile"

/>

<div className="profile-content">

<div className="profile-title">

<div>

<h1>

{user.name || user.username}

<span className="verified-badge">

✔

</span>

</h1>

<p className="username">

@{user.username || "member"}

</p>

</div>

<div className="profile-buttons">

{

isOwnProfile

?

<button

className="primary-btn"

onClick={()=>navigate("/profile/edit")}

>

Edit Profile

</button>

:

<>

<button className="primary-btn">

Follow

</button>

<button className="secondary-btn">

Message

</button>

</>

}

<button className="secondary-btn">

Share

</button>

</div>

</div>

{

user.bio &&

<p className="profile-bio">

{user.bio}

</p>

}

<div className="profile-chips">

{

user.college &&

<span>

🎓 {user.college}

</span>

}

{

user.course &&

<span>

📚 {user.course}

</span>

}

{

user.location &&

<span>

📍 {user.location}

</span>

}

<span>

📅 Joined {joined}

</span>

</div>

</div>

</div>

</section>

)

}

export default ProfileHero