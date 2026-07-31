import "./ProfileInterests.css"


interface Props{
  user:any
}


function ProfileInterests({
  user
}:Props){


const interests =
user.interests || []



return(

<section className="profile-interests">


<div className="interest-header">

<div>
<h2>
Interests
</h2>

<p>
Topics and communities this member enjoys
</p>

</div>


<span>
{interests.length} selected
</span>


</div>



{
interests.length > 0 ?


<div className="interest-list">


{
interests.map(
(interest:string,index:number)=>(

<div
key={index}
className="interest-chip active"
>

<span>
✓
</span>

{interest}

</div>

)

)

}


</div>


:


<div className="empty-interest">

No interests added yet

</div>


}


</section>

)

}


export default ProfileInterests