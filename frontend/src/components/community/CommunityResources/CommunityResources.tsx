import "./CommunityResources.css"

const resources = [

{
icon:"📄",
title:"Machine Learning Notes",
type:"PDF"
},

{
icon:"🎥",
title:"LLM Workshop Recording",
type:"Video"
},

{
icon:"💻",
title:"Community GitHub",
type:"Repository"
},

{
icon:"🔗",
title:"Useful AI Websites",
type:"Links"
},

{
icon:"📚",
title:"Interview Preparation",
type:"Guide"
},

{
icon:"🛠",
title:"Development Tools",
type:"Tools"
}

]

function CommunityResources(){

return(

<section className="community-resources">

<h2>

📚 Resources

</h2>

<div className="resource-grid">

{

resources.map(item=>(

<div

key={item.title}

className="resource-card"

>

<div className="resource-icon">

{item.icon}

</div>

<h3>

{item.title}

</h3>

<p>

{item.type}

</p>

<button>

Open

</button>

</div>

))

}

</div>

</section>

)

}

export default CommunityResources