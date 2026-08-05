import "./EditorialBackground.css"

const headlines=[

{text:"THE WORLD IS ALWAYS TALKING",left:"6%",top:"8%",size:54,rotate:-8},

{text:"AI IS CHANGING EVERYTHING",left:"58%",top:"10%",size:38,rotate:7},

{text:"CRICKET NEVER STOPS",left:"12%",top:"24%",size:28,rotate:-4},

{text:"EVERY VOICE MATTERS",left:"62%",top:"26%",size:34,rotate:5},

{text:"THE FUTURE IS COMMUNITY",left:"18%",top:"42%",size:46,rotate:-6},

{text:"JOIN THE CONVERSATION",left:"60%",top:"45%",size:26,rotate:4},

{text:"MUSIC UNITES PEOPLE",left:"8%",top:"62%",size:32,rotate:8},

{text:"YOUR DATA HAS VALUE",left:"56%",top:"64%",size:28,rotate:-5},

{text:"READ • SHARE • DISCUSS",left:"22%",top:"82%",size:24,rotate:2},

{text:"SMALL IDEAS CHANGE THE WORLD",left:"48%",top:"84%",size:34,rotate:-3}

]
export default function EditorialBackground(){

return(

<div className="editorial-bg">

<div className="editorial-colors"/>

<div className="editorial-paper"/>

<div className="editorial-headlines">

{
headlines.map(item=>

<span

key={item.text}

style={{

left:item.left,

top:item.top,

fontSize:item.size,

transform:`rotate(${item.rotate}deg)`

}}

>

{item.text}

</span>

)
}

</div>

<div className="editorial-overlay"/>

</div>

)

}