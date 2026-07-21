import ConnectButton from "../social/ConnectButton"

import "./StudentCard.css"



interface Props{

user:any

}



export default function StudentCard({

user

}:Props){


return (

<div className="student-profile-card">



<img

src={

user.image ||

"https://picsum.photos/200"

}

alt="profile"

/>




<h3>

{user.name}

</h3>



<p>

🎓 {user.college || "Student"}

</p>



<p>

💻 {user.course || "CSE"}

</p>



<span>

✨

{

user.interests?.join(", ")

||

"Technology"

}

</span>



<ConnectButton

userId={user._id}

/>



</div>

)

}