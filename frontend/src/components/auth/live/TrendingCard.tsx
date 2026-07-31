import "./TrendingCard.css"


interface Props{

icon:string
title:string
text:string
people:string

}


function TrendingCard({
icon,
title,
text,
people
}:Props){


return(

<div className="trending-card">


<div className="trend-icon">

{icon}

</div>


<div className="trend-content">

<h3>
{title}
</h3>

<p>
{text}
</p>

<span>
{people}
</span>


</div>


</div>

)

}


export default TrendingCard