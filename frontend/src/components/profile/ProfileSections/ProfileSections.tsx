import "./ProfileSections.css"


interface Props{

user:any

}



export default function ProfileSections({

user

}:Props){



const skills =

user.skills ||

[

"React",

"AI",

"Machine Learning",

"Communication"

]




const achievements =

user.achievements ||

[

"🚀 Joined LCMT",

"💻 Built first project",

"🎓 Student Developer"

]




return (

<div className="profile-sections">





<section>


<h2>

👤 About Me

</h2>


<div className="profile-box">

<p>

{

user.bio ||

"Passionate student building meaningful connections."

}

</p>


</div>


</section>







<section>


<h2>

⚡ Skills

</h2>


<div className="skill-container">


{

skills.map(

(skill:string)=>(


<span key={skill}>

{skill}

</span>


)

)


}


</div>


</section>








<section>


<h2>

🏆 Achievements

</h2>



<div className="profile-box">


{

achievements.map(

(item:string)=>(


<p key={item}>

{item}

</p>


)

)


}


</div>


</section>








<section>


<h2>

🌍 Communities Joined

</h2>


<div className="profile-box">


<p>

AI & ML Community

</p>


<p>

Startup Club

</p>


<p>

Developer Circle

</p>


</div>


</section>








<section>


<h2>

🔥 Recent Activity

</h2>



<div className="profile-box">


<p>

No recent activity yet.

Start connecting with students 🚀

</p>


</div>


</section>






</div>

)

}