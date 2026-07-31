import "./ProfileCompletion.css"


interface Props{

user:any

}


export default function ProfileCompletion({
user
}:Props){


if(!user){

return null

}


const fields=[

user.image,

user.bio,

user.college,

user.course,

user.interests?.length,

user.communities?.length

]


const completed =
fields.filter(Boolean).length


const percentage =
Math.round(
(completed / fields.length) * 100
)



return(

<section className="profile-completion">


<div className="completion-header">

<h2>
Profile Strength
</h2>


<strong>
{percentage}%
</strong>


</div>



<div className="completion-bar">

<div
style={{
width:`${percentage}%`
}}
/>

</div>



{

percentage < 100 &&

<p>

Complete your profile to get better connections 🚀

</p>

}


</section>

)

}