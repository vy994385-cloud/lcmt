import "./ConversationCloud.css"


const conversations = [

"🏏 Who wins tonight's match?",

"🎬 That ending was unbelievable",

"😂 Everyone is sharing this meme",

"🎵 New song everyone is talking about",

"🌎 What's happening in your city?",

"🎮 Best game this year?",

"📚 College memories"

]


function ConversationCloud(){

return(

<div className="conversation-cloud">


{
conversations.map((item,index)=>(

<div
key={item}
className={`conversation-card card-${index}`}
>

{item}

</div>

))
}


</div>

)

}


export default ConversationCloud