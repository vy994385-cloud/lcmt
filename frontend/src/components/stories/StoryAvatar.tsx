type Props = {

  name:string

  image?:string

  viewed?:boolean

  onClick?:()=>void

}


export default function StoryAvatar({

  name,

  image,

  viewed,

  onClick

}:Props){

return (

<div
className="story-avatar"
onClick={onClick}
>


<img

src={
image ||
"https://i.pravatar.cc/150"
}

className={
viewed
?"viewed"
:"new"
}

/>


<span>

{name}

</span>


</div>

)

}