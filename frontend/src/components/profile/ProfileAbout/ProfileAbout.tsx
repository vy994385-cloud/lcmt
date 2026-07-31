import "./ProfileAbout.css"


function ProfileAbout({
user
}:any){


return(

<section className="profile-about">


<h2>
About
</h2>


<p className="bio">

{user.bio || "No bio added yet."}

</p>



<div className="about-grid">


<div>

<span>
🎓 Education
</span>

<strong>
{user.college || "Not added"}
</strong>

</div>



<div>

<span>
📍 Location
</span>

<strong>
{user.location || "Not added"}
</strong>

</div>



</div>


</section>

)

}


export default ProfileAbout