import "./ConnectionCard.css"


interface ConnectionCardProps{

  id?:string

  name:string

  image?:string

  bio?:string

  interests?:string[]

  onMessage?:()=>void

  onViewProfile?:()=>void

}



export default function ConnectionCard({

  id,

  name,

  image,

  bio,

  interests=[],

  onMessage,

  onViewProfile

}:ConnectionCardProps){


return(

<div

className="connection-card"

data-id={id}

>



<img

src={
image ||
"https://i.pravatar.cc/150"
}

alt={name}

className="connection-avatar"

/>





<div className="connection-info">



<h3>

{name}

</h3>





{

bio &&

<p className="connection-bio">

{bio}

</p>

}





{

interests.length>0 &&

<div className="interest-list">


{

interests.map(

(item,index)=>(

<span key={index}>

{item}

</span>

)

)

}


</div>

}





<div className="connection-actions">





{

onMessage &&

<button

className="message-btn"

onClick={onMessage}

>

Message

</button>

}





{

onViewProfile &&

<button

className="profile-btn"

onClick={onViewProfile}

>

View Profile

</button>

}





</div>



</div>



</div>

)

}