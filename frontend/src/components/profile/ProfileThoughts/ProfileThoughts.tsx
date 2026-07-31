import "./ProfileThoughts.css"


interface Props{

user:any

}


export default function ProfileThoughts({

user

}:Props){


const thoughts =

user.thoughts?.length

?

user.thoughts

:

[]



return(

<section className="profile-thoughts">


<h2>
💭 Thoughts & Discussions
</h2>



{

thoughts.length===0

?

<div className="empty-thoughts">

<p>
No discussions yet
</p>

<span>
Share your thoughts with communities 🌍
</span>

</div>


:

<div className="thought-list">


{

thoughts.map(

(thought:any,index:number)=>(


<div

className="thought-card"

key={index}

>


<p>

{thought.text}

</p>



<div className="thought-meta">

<span>

🌍 {thought.community || "Community"}

</span>


<span>

{thought.time || "Recently"}

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