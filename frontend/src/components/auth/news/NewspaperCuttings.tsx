import "./NewspaperCuttings.css"


const headlines = [

{
tag:"BREAKING",
title:"AI communities are growing faster than ever",
people:"21.4K people discussing now"
},


{
tag:"SPORTS",
title:"Fans are debating the biggest moments of the season",
people:"14.8K active members"
},


{
tag:"CAMPUS",
title:"Students are sharing ideas, projects and opportunities",
people:"9.6K conversations"
},


{
tag:"ENTERTAINMENT",
title:"Movie communities are creating new theories",
people:"7.2K opinions shared"
}


]


function NewspaperCuttings(){


return(

<section className="newspaper-cuttings">


<div className="newspaper-title">

TODAY'S COMMUNITY FRONT PAGE

</div>



<div className="cutting-grid">


{

headlines.map((item,index)=>(


<article

key={index}

className="cutting-card"

>


<div className="cutting-tag">

{item.tag}

</div>



<h3>

{item.title}

</h3>



<p>

{item.people}

</p>



</article>


))

}


</div>


</section>


)

}


export default NewspaperCuttings