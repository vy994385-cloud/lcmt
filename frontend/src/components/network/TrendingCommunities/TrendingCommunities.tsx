import "./TrendingCommunities.css"


const trends=[

"🤖 AI Builders",
"⚽ Football Fans",
"🏏 Cricket Zone",
"🎮 Gaming",
"🎵 Music Lovers"

]


export default function TrendingCommunities(){

return (

<section className="trending">

<h2>
Trending Communities
</h2>


<div>

{
trends.map(item=>(

<span key={item}>
{item}
</span>

))
}

</div>

</section>

)

}
