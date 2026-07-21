import Button from "../../components/ui/Button/Button"

import "./PersonCard.css"


interface Person {

  name:string

  image?:string

  college:string

  course:string

  bio:string

  interests:string[]

  similarity:number

  status?:string

}


interface Props {

  person:Person

}



function PersonCard({
  person
}:Props){


return (

<div className="person-card">


<div className="person-top">


<img

src={
person.image ||
"https://i.pravatar.cc/150"
}

alt={person.name}

className="person-avatar"

/>


<div>

<h3>
{person.name}
</h3>


<p>
🎓 {person.course}
</p>


<p>
🏫 {person.college}
</p>


</div>


</div>



<p className="person-bio">

"{person.bio}"

</p>



<div className="interest-list">


{
person.interests.map(
(item)=>(

<span key={item}>
#{item}
</span>

)

)

}


</div>



<div className="similarity">

🔥 {person.similarity}% Similar Vibe

</div>



{
person.status &&

<div className="person-status">

{person.status}

</div>

}



<div className="person-actions">


<Button variant="ghost">

👋 Wave

</Button>


<Button variant="primary">

🤝 Connect

</Button>


</div>



</div>


)

}


export default PersonCard