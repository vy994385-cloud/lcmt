import TrendingCard from "./TrendingCard"
import "./LivePulse.css"

function LivePulse(){

return(

<section className="live-pulse">


<div className="pulse-header">

<span>
🔥 LIVE NOW
</span>

<p>
People are discussing
</p>

</div>



<TrendingCard

icon="🤖"

title="AI Debate"

text="Will AI change the future of developers?"

people="12.4K people talking"

/>



<TrendingCard

icon="🏏"

title="Sports Arena"

text="Big match opinions are heating up"

people="8.2K people talking"

/>



<TrendingCard

icon="🎬"

title="Movie Universe"

text="Fans are sharing theories and reviews"

people="5.7K people talking"

/>



</section>

)

}


export default LivePulse