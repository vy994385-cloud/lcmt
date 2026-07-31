import "./PostMenu.css"

interface Props{

  onCopy:()=>void

  onReport:()=>void

  onHide:()=>void

  onNotInterested:()=>void

  onSave?:()=>void

  onBlock?:()=>void

  onFollow?:()=>void

}


export default function PostMenu({

  onCopy,

  onReport,

  onHide,

  onNotInterested,

  onSave,

  onBlock,

  onFollow

}:Props){


return(

<div className="post-menu">


<button onClick={onSave}>
🔖 Save post
</button>


<button onClick={onCopy}>
🔗 Copy link
</button>


<button onClick={onFollow}>
🔔 Turn on notifications
</button>


<button onClick={onNotInterested}>
👎 Not interested
</button>


<button onClick={onHide}>
🚫 Hide this post
</button>


<button onClick={onBlock}>
🚷 Block user
</button>


<button 
className="danger"
onClick={onReport}
>
⚠️ Report
</button>


</div>

)

}
