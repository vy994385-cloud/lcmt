import "./ProfileFriends.css"

interface Props{
  user:any
  canViewPrivate:boolean
}

export default function ProfileFriends({
  user,
  canViewPrivate
}:Props){


const friends = user.friends || []



if(!canViewPrivate){

return(

<section className="profile-friends">

<h2>
🤝 Friends
</h2>


<p className="private-friends">

Friends list is private. Connect with this person to build your circle.

</p>


</section>

)

}



return(

<section className="profile-friends">

<h2>
🤝 Friends
</h2>



{

friends.length===0

?

<p className="private-friends">

No friends yet.

</p>


:

<div className="friends-grid">


{

friends.map((friend:any,index:number)=>(

<div

className="friend-card"

key={friend._id || index}

>


<img

src={
friend.image ||
"https://i.pravatar.cc/100"
}

/>


<span>

{friend.name || "LCMT Member"}

</span>


</div>

))

}


</div>

}



</section>

)

}