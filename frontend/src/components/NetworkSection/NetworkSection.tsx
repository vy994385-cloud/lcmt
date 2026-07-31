import "./NetworkSection.css"


interface NetworkSectionProps {

    title:string

    description?:string

    children:React.ReactNode

}



function NetworkSection({

    title,

    description,

    children

}:NetworkSectionProps){


return (

<section className="network-section">


<h2>
{title}
</h2>



{
description &&

<p className="section-description">

{description}

</p>

}



<div className="network-grid">

{children}

</div>



</section>

)

}


export default NetworkSection