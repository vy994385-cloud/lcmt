import React from "react"

import "./Layout.css"


interface LayoutProps{

children:React.ReactNode

}


function Layout({

children

}:LayoutProps){


return(

<div className="app-shell">


{/* Ambient lights */}

<div className="ambient ambient-one"></div>

<div className="ambient ambient-two"></div>

<div className="ambient ambient-three"></div>



<div className="page-container">

{children}

</div>



</div>

)


}


export default Layout