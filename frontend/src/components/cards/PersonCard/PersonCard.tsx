import {
  useState
} from "react"

import Card from "../../ui/Card/Card"
import Button from "../../ui/Button/Button"

import {
  MessageCircle,
  UserPlus,
  Users,
  Check
} from "lucide-react"

import {
  Link
} from "react-router-dom"

import api from "../../../api/axios"

import "./PersonCard.css"



interface Person {

  _id:string

  name:string

  username?:string

  headline?:string

  course?:string

  college?:string

  bio?:string

  interests?:string[]

  image?:string

  followers?:string[]

  following?:string[]

}



interface Props {

  person:Person

}



function PersonCard({
  person
}:Props){


const currentUser =
JSON.parse(
  localStorage.getItem("user") || "{}"
)



const [
following,
setFollowing
] =
useState(
  person.followers?.includes(
    currentUser._id
  ) || false
)



const [
loading,
setLoading
] =
useState(false)





async function handleFollow(){

try{


setLoading(true)



if(following){


await api.post(
  `/social/unfollow/${person._id}`
)


setFollowing(false)


}
else{


await api.post(
  `/social/follow/${person._id}`
)


setFollowing(true)


}



}

catch(error){

console.log(
  error
)

}

finally{

setLoading(false)

}

}






return (

<Card className="person-card">



<div className="person-top">


<img

src={
person.image ||
"https://i.pravatar.cc/150"
}

alt={person.name}

className="person-avatar"

/>





<div className="person-info">


<h3>

{person.name}

<span>
✓
</span>

</h3>



<p>

@{
person.username ||
"lcmt"
}

</p>



<p>

{
person.headline ||
person.course ||
"Community Member"
}

</p>



{
person.college &&

<p>

🎓 {person.college}

</p>

}



</div>


</div>







{
person.bio &&

<p className="person-bio">

"{person.bio}"

</p>

}







<div className="person-tags">


{
person.interests?.map(

interest=>(

<span

key={interest}

>

#{interest}

</span>

)

)

}


</div>







<div className="person-stats">


<div>

<strong>

{
person.followers?.length || 0
}

</strong>


<span>

Followers

</span>


</div>





<div>

<strong>

{
person.following?.length || 0
}

</strong>


<span>

Following

</span>


</div>





<div>

<Users size={16}/>


<span>

Member

</span>


</div>


</div>









<div className="person-actions">



<Button


variant={
following
?
"ghost"
:
"primary"
}



onClick={
handleFollow
}



disabled={
loading
}


>


{

following

?

<>

<Check size={16}/>

Following

</>


:

<>

<UserPlus size={16}/>

Follow

</>


}



</Button>








<Button

variant="ghost"

>


<MessageCircle size={16}/>

Message


</Button>



</div>








<Link

to={`/profile/${person._id}`}

className="profile-link"

>

View Profile →

</Link>





</Card>


)

}



export default PersonCard