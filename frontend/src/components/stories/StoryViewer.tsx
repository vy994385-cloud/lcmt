import {
useEffect
} from "react"

import {
viewStory
} from "../../services/storyService"


type Props={

story:any

close:()=>void

}


export default function StoryViewer({

story,

close

}:Props){


useEffect(()=>{


viewStory(
story._id
)


const timer =
setTimeout(()=>{

close()

},5000)


return ()=>clearTimeout(timer)


},[])



return (

<div className="story-viewer">


<div className="story-box">


<button
className="close-story"
onClick={close}
>
×
</button>



{
story.type==="text" &&

<h1
style={{
background:
story.background
}}
>

{story.text}

</h1>

}



{
story.media &&

<img

src={story.media}

/>

}



<div className="story-user">

{
story.user.name
}

</div>



<div className="story-actions">

<button>
❤️
</button>

<button>
😂
</button>

<button>
🔥
</button>

</div>


</div>


</div>

)

}