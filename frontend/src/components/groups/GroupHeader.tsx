import "./GroupHeader.css"


interface Props{

name:string

description:string

image?:string

members:number

isMember:boolean

isAdmin:boolean

onJoin:()=>void

onLeave:()=>void

}


function GroupHeader({

name,
description,
image,
members,
isMember,
isAdmin,
onJoin,
onLeave

}:Props){


return(

<header className="group-header">


<div className="group-info">


<img

className="group-avatar"

src={
image ||
"https://picsum.photos/100"
}

/>


<div>

<h1>
{name}
</h1>


<p>
{description}
</p>


<span>
👥 {members} members
</span>


</div>


</div>



<div>


{
isAdmin &&
<p>
⭐ Admin
</p>
}



<button

onClick={
isMember
?
onLeave
:
onJoin
}

>

{
isMember
?
"Leave"
:
"Join"
}

</button>


</div>


</header>

)

}


export default GroupHeader