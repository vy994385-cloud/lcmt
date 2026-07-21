import { useState } from "react"

import "./CategoryChips.css"

const categories = [

"✨ For You",

"🔥 Trending",

"💻 Technology",

"🤖 AI",

"💼 Business",

"🚀 Startups",

"🏛 Politics",

"💰 Finance",

"🎬 Movies",

"🎮 Gaming",

"⚽ Football",

"🎵 Music",

"📷 Photography",

"📚 Books",

"🧠 Psychology",

"🛰 Space",

"🌍 Travel",

"🏋 Fitness",

"🎨 Art",

"😂 Memes"

]

export default function CategoryChips(){

const [active,setActive]=useState("✨ For You")

return(

<div className="category-scroll">

{

categories.map(category=>(

<button

key={category}

className={
active===category
?
"chip-active"
:
"chip"
}

onClick={()=>setActive(category)}

>

{category}

</button>

))

}

</div>

)

}