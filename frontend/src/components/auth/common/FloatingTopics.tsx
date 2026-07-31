import "./FloatingTopics.css"


const cards = [

{
icon:"🏏",
title:"Match Debate",
text:"Who should lead the next big game?",
people:"8.2K talking"
},

{
icon:"🤖",
title:"AI Discussions",
text:"Will AI change the future?",
people:"5.4K talking"
},

{
icon:"🎬",
title:"Movie Corner",
text:"Best movie this year?",
people:"12K talking"
},

{
icon:"😂",
title:"Meme Hub",
text:"Internet is exploding today",
people:"20K reactions"
},

{
icon:"🌎",
title:"Community Talk",
text:"Finding people with same interests",
people:"3.7K online"
}

]


function FloatingTopics(){


return(

<div className="floating-topics">


{
cards.map((card,index)=>(


<div

key={index}

className={`topic-card card-${index+1}`}

>


<div className="topic-icon">

{card.icon}

</div>


<div>

<h4>

{card.title}

</h4>


<p>

{card.text}

</p>


<span>

{card.people}

</span>


</div>


</div>


))

}


</div>

)


}


export default FloatingTopics