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
  interestOptions
} from "../data/profileOptions"

import "./EditProfile.css"



function EditProfile(){

const navigate=useNavigate()


const [loading,setLoading]=useState(true)

const [saving,setSaving]=useState(false)


const [form,setForm]=useState<any>({

username:"",
headline:"",
bio:"",

college:"",
course:"",

location:"",
image:"",
coverImage:"",
website:"",

interests:[],

profileVisibility:"public"

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

college:user.college || "",

course:user.course || "",

location:user.location || "",

image:user.image || "",
coverImage:user.coverImage || "",
website:user.website || "",

interests:user.interests || [],

profileVisibility:
user.profileVisibility || "public"

})


}

catch(error){

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
value:string
){

setForm((prev:any)=>({

...prev,

[key]:value

}))

}




function toggleInterest(
value:string
){

setForm((prev:any)=>{

const exists =
prev.interests.includes(value)


return{

...prev,

interests:

exists

?

prev.interests.filter(
(item:string)=>item!==value
)

:

[
...prev.interests,
value
]

}

})

}





function uploadImage(
e:any
){

const file =
e.target.files[0]


if(!file)return


if(file.size > 2 * 1024 * 1024){

toast.error(
"Image must be under 2MB"
)

return

}


const reader =
new FileReader()


reader.onload=()=>{

updateField(
"image",
reader.result as string
)

}


reader.readAsDataURL(file)

}



function uploadCover(
e:any
){

const file =
e.target.files[0]

if(!file)return

const reader =
new FileReader()

reader.onload=()=>{

updateField(
"coverImage",
reader.result as string
)

}

reader.readAsDataURL(file)

}

async function handleSave(
e:React.FormEvent
){

e.preventDefault()


try{

setSaving(true)



await api.put(
"/profile",
form
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

<div className="edit-profile-page">

<h2>
Loading...
</h2>

</div>

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
Update your public profile information.
</p>



<form onSubmit={handleSave}>


<label>
Profile Photo
</label>


<input

type="file"

accept="image/*"

onChange={uploadImage}

/>

<label>
Cover Image
</label>

<input
type="file"
accept="image/*"
onChange={uploadCover}
/>

{
form.coverImage &&

<img
className="profile-preview-image"
src={form.coverImage}
alt="cover"
/>
}

{
form.image &&

<img

className="profile-preview-image"

src={form.image}

alt="profile"

/>

}




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
Location
</label>


<select
  value={form.location}
  onChange={e => updateField("location", e.target.value)}
>

  <option value="">
    Select
  </option>

  {locationOptions.map(item => (
    <option key={item} value={item}>
      {item}
    </option>
  ))}

</select>

<label>
  Website
</label>

<input
  placeholder="https://yourwebsite.com"
  value={form.website}
  onChange={e =>
    updateField(
      "website",
      e.target.value
    )
  }
/>




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





<label>
Profile Visibility
</label>


<select

value={form.profileVisibility}

onChange={
e=>updateField(
"profileVisibility",
e.target.value
)
}

>

<option value="public">
Public
</option>

<option value="friends">
Friends
</option>

<option value="private">
Private
</option>


</select>




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


export default EditProfile