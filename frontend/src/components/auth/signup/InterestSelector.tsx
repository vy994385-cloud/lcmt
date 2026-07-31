import "./InterestSelector.css"


interface Props{

selected:string[]

setSelected:(data:string[])=>void

}


const interests = [

"🏏 Sports",

"🎬 Movies",

"😂 Memes",

"🤖 AI & Technology",

"🚀 Startups",

"🎵 Music",

"🏛️ Politics",

"🎮 Gaming",

"📚 Learning",

"🍔 Food",

"✈️ Travel"

]


function InterestSelector({

selected,

setSelected

}:Props){


function toggle(item:string){


if(selected.includes(item)){


setSelected(

selected.filter(

(value)=>value!==item

)

)


}

else{


setSelected([

...selected,

item

])


}


}



return(

<section className="interest-selector">


<h2>

What interests you?

</h2>


<p>

Choose communities and conversations you want to explore.

</p>



<div className="interest-grid">


{

interests.map(item=>(


<button

type="button"

key={item}

className={

selected.includes(item)

?

"interest-card active"

:

"interest-card"

}


onClick={()=>toggle(item)}

>


{item}


</button>


))


}


</div>



</section>

)

}


export default InterestSelector