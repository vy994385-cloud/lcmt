import "./ProfilePassions.css"


interface Props{

user:any

}


export default function ProfilePassions({

user

}:Props){


const passions =

user.interests?.length

?

user.interests

:

[
"Exploring Communities",
"Meeting People",
"Learning New Things"
]


return(

<section className="profile-passions">


<h2>
🔥 Interests & Passions
</h2>


<div className="passion-list">


{

passions.map(

(item:string,index:number)=>(


<span

key={index}

>

{item}

</span>


)

)

}


</div>


</section>

)

}