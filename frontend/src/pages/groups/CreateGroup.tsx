import {
useState
} from "react"

import {
useNavigate
} from "react-router-dom"

import {
createGroup
}
from "../../services/groups/groupService"

import "./CreateGroup.css"



function CreateGroup(){

const navigate =
useNavigate()


const [form,setForm]=
useState({

name:"",
description:""

})



async function submit(){

if(!form.name.trim())
return


const group =
await createGroup(form)


navigate(
`/groups/${group._id}`
)

}



return (

<main className="create-group">


<h1>
Create Community Group
</h1>



<input

placeholder="Group name"

value={form.name}

onChange={
e=>
setForm({

...form,

name:e.target.value

})
}

/>



<textarea

placeholder="Description"

value={form.description}

onChange={
e=>
setForm({

...form,

description:e.target.value

})
}

/>



<button
onClick={submit}
>

Create

</button>


</main>

)

}


export default CreateGroup