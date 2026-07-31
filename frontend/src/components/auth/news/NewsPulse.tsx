import {
useEffect,
useState
} from "react"

import "./NewsPulse.css"

import {
pulseStories
} from "../../../data/livePulseData"



function NewsPulse(){


const [index,setIndex]=useState(0)



useEffect(()=>{


const timer=setInterval(()=>{


setIndex(prev=>

(prev+1)%pulseStories.length

)


},3500)



return()=>clearInterval(timer)


},[])



const story=pulseStories[index]



return(


<section className="news-pulse">


<div className="news-heading">

LCMT PULSE • LIVE NOW

</div>



<article className="featured-story">


<div className="story-icon">

{story.icon}

</div>



<div>


<span>

{story.category}

</span>



<h3>

{story.title}

</h3>



<p>

🔥 {story.engagement}

</p>


</div>


</article>



<div className="pulse-dots">


{

pulseStories.map((_,i)=>(


<div

key={i}

className={
i===index
?
"active"
:
""
}

/>


))

}


</div>


</section>


)


}


export default NewsPulse