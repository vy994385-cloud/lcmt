import { useEffect,useState } from "react"

import StoryAvatar from "./StoryAvatar"

import {
getStories
} from "../../services/storyService"

import StoryViewer from "./StoryViewer"

import "../../pages/Stories/Stories.css"


export default function StoryStrip(){

const [stories,setStories]=
useState<any[]>([])

const [selected,setSelected]=
useState<any>(null)


useEffect(()=>{

loadStories()

},[])


async function loadStories(){

const res =
await getStories()

setStories(res.data)

}



return(

<>


<div className="story-strip">


{
stories.map(
story=>(

<StoryAvatar

key={story._id}

name={
story.user.name
}

image={
story.user.image
}

onClick={()=>setSelected(story)}

/>

)

)

}


</div>


{
selected &&

<StoryViewer

story={selected}

close={()=>
setSelected(null)
}

/>

}


</>


)

}