import "./VibeSelector.css"


interface Props{

selected:string[]

setSelected:(data:string[])=>void

}


const vibes=[

"🔥 Talkative",

"🧠 Curious",

"😂 Funny",

"⚔️ Debater",

"🌱 Learner",

"🎨 Creator",

"🚀 Builder",

"🎮 Competitive"

]


function VibeSelector({

selected,

setSelected

}:Props){



function toggle(vibe:string){


if(selected.includes(vibe)){


setSelected(

selected.filter(

(item)=>item!==vibe

)

)


}

else{


setSelected([

...selected,

vibe

])


}


}



return(

<section className="vibe-selector">


<h2>

What's your vibe?

</h2>


<p>

Tell communities how you like to participate.

</p>



<div className="vibe-grid">


{

vibes.map(vibe=>(


<button

type="button"

key={vibe}

className={

selected.includes(vibe)

?

"vibe-card active"

:

"vibe-card"

}


onClick={()=>toggle(vibe)}

>


{vibe}


</button>


))


}


</div>


</section>

)

}


export default VibeSelector