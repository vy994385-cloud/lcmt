import {
useState
} from "react"

import api from "../../../api/axios"

import "./CreateContent.css"


interface Props {

communityId?: string

onCreate?: (post:any)=>void

}


export default function CreateContent({

onCreate

}:Props){


const [content,setContent]=useState("")

const [loading,setLoading]=useState(false)

const [image,setImage]=useState<File | null>(null)

const [imagePreview,setImagePreview]=useState("")



function handleImage(
e:React.ChangeEvent<HTMLInputElement>
){

const file =
e.target.files?.[0]


if(!file)
return


setImage(file)

setImagePreview(
URL.createObjectURL(file)
)

}



async function createPost(){


const text =
content.trim()


if(!text && !image)
return


try{


setLoading(true)


let imageUrl=""


if(image){


const formData =
new FormData()


formData.append(
"file",
image
)



const upload =
await api.post(

"/media/upload",

formData,

{

headers:{

"Content-Type":
"multipart/form-data"

}

}

)



imageUrl =
upload.data.file.url


}



const {data}=await api.post(

"/feed",

{

content:text,

image:imageUrl

}

)



onCreate?.(
data
)


setContent("")

setImage(null)

setImagePreview("")



}

catch(error){

console.log(error)

}


finally{

setLoading(false)

}


}




return(

<div className="composer">


<div className="composer-top">


<textarea

placeholder="What's happening in your communities?"

value={content}

onChange={
e=>setContent(e.target.value)
}

/>



{

imagePreview &&

<img

src={imagePreview}

className="image-preview"

alt="preview"

/>

}



</div>



<div className="composer-bottom">


<div className="composer-tools">



<label className="photo-btn">

📷 Photo

<input

type="file"

accept="image/*"

hidden

onChange={handleImage}

/>

</label>



<button>
❓ Question
</button>


<button>
💡 Idea
</button>



</div>



<button

className="publish"

onClick={createPost}

disabled={
loading ||
(!content.trim() && !image)
}

>


{

loading

?

"Posting..."

:

"Post"

}


</button>


</div>


</div>

)

}
