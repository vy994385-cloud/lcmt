import "./NetworkTabs.css"


interface NetworkTabsProps {

  active:string

  onChange:(tab:string)=>void

}


function NetworkTabs({
  active,
  onChange
}:NetworkTabsProps){


const tabs = [

{
label:"Home",
value:"all"
},

{
label:"People",
value:"people"
},

{
label:"Friends",
value:"connections"
},

{
label:"Requests",
value:"requests"
},

{
label:"Communities",
value:"communities"
}

]



return (

<div className="network-tabs">


{
tabs.map((tab)=>(

<button

key={tab.value}

className={
active === tab.value
?
"active"
:
""
}

onClick={()=>
onChange(tab.value)
}

>

{tab.label}

</button>

))

}


</div>

)

}


export default NetworkTabs
