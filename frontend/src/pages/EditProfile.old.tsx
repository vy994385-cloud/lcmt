import {
useEffect,
useState
} from "react"

import {
useNavigate
} from "react-router-dom"

import toast from "react-hot-toast"

import Layout from "../components/Layout"

import api from "../api/axios"

import {
locationOptions,
interestOptions,
lookingForOptions
} from "../data/profileOptions"

import "./EditProfile.css"



export default function EditProfile(){

const navigate = useNavigate()

const [loading,setLoading]=useState(true)

const [saving,setSaving]=useState(false)



const [form,setForm]=useState<any>({

username:"",
headline:"",
bio:"",

location:"",
college:"",
course:"",
year:"",

image:"",

interests:[],

lookingFor:""

})



useEffect(()=>{

loadProfile()

},[])



async function loadProfile(){

try{

const res =
await api.get(
"/profile/me"
)

const user=res.data


setForm({

username:user.username || "",

headline:user.headline || "",

bio:user.bio || "",

location:user.location || "",

college:user.college || "",

course:user.course || "",

year:user.year || "",

image:user.image || "",

interests:user.interests || [],

lookingFor:user.lookingFor || ""

})

}

catch{

toast.error(
"Unable to load profile"
)

}

finally{

setLoading(false)

}

}



function updateField(
key:string,
value:any
){

setForm((prev:any)=>({

...prev,

[key]:value

}))

}



function toggleInterest(
item:string
){

setForm((prev:any)=>({

...prev,

interests:

prev.interests.includes(item)

?

prev.interests.filter(
(i:string)=>i!==item
)

:

[
...prev.interests,
item
]

}))

}



function uploadImage(
e:any
){

const file=e.target.files[0]

if(!file)return


if(file.size>2*1024*1024){

toast.error(
"Image should be below 2MB"
)

return

}


const reader=new FileReader()


reader.onload=()=>{

updateField(
"image",
reader.result
)

}


reader.readAsDataURL(file)

}



async function saveProfile(
e:React.FormEvent
){

e.preventDefault()


try{

setSaving(true)


await api.put(
"/profile",
{

...form,

year:
Number(form.year)

}

)


toast.success(
"Profile updated"
)


navigate("/profile")

}

catch(error:any){

console.log(
error.response?.data || error
)

toast.error(
"Profile update failed"
)

}

finally{

setSaving(false)

}

}



if(loading){

return(

<Layout>

<h2>
Loading...
</h2>

</Layout>

)

}



return(

<Layout>


<main className="edit-profile-page">


<section className="edit-profile-card">


<h1>
Edit Profile
</h1>


<p>
Update your information.
</p>



<form
onSubmit={saveProfile}
>


<div className="form-grid">



<label>
Profile Photo
</label>

<input

type="file"

accept="image/*"

onChange={uploadImage}

/>



<label>
Username
</label>

<input

value={form.username}

onChange={
e=>updateField(
"username",
e.target.value
)
}

/>



<label>
Headline
</label>

<input

value={form.headline}

onChange={
e=>updateField(
"headline",
e.target.value
)
}

/>



<label>
Bio
</label>

<textarea

rows={4}

value={form.bio}

onChange={
e=>updateField(
"bio",
e.target.value
)
}

/>



<label>
Location
</label>

<select

value={form.location}

onChange={
e=>updateField(
"location",
e.target.value
)
}

>

<option>
Select
</option>

{

locationOptions.map(item=>(

<option key={item}>
{item}
</option>

))

}

</select>



<label>
College
</label>

<input

value={form.college}

onChange={
e=>updateField(
"college",
e.target.value
)
}

/>



<label>
Course
</label>

<input

value={form.course}

onChange={
e=>updateField(
"course",
e.target.value
)
}

/>



<label>
Year
</label>

<input

type="number"

value={form.year}

onChange={
e=>updateField(
"year",
e.target.value
)
}

/>



<label>
Looking For
</label>

<select

value={form.lookingFor}

onChange={
e=>updateField(
"lookingFor",
e.target.value
)
}

>

<option>
Select
</option>

{

lookingForOptions.map(item=>(

<option key={item}>
{item}
</option>

))

}

</select>




<div className="full-width">

<label>
Interests
</label>


<div className="option-group">

{

interestOptions.map(item=>(


<button

type="button"

key={item}

className={

form.interests.includes(item)

?

"selected-option"

:

""

}

onClick={()=>toggleInterest(item)}

>

{item}

</button>


))

}


</div>


</div>



</div>




<div className="preview-box">


<h3>
Preview
</h3>


<img

src={
form.image ||
"https://placehold.co/120"
}

alt="profile"

/>


<h2>
{form.username || "Username"}
</h2>


<p>
{form.headline}
</p>


<p>
{form.bio}
</p>


</div>




<div className="edit-actions">


<button

type="button"

onClick={()=>navigate("/profile")}

>

Cancel

</button>


<button

disabled={saving}

>

{

saving

?

"Saving..."

:

"Save Changes"

}

</button>


</div>



</form>


</section>


</main>


</Layout>

)

}