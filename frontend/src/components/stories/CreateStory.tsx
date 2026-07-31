import { useState } from "react"

import {
  createStory
} from "../../services/storyService"


function CreateStory() {

  const [text,setText] =
    useState("")

  const [loading,setLoading] =
    useState(false)


  async function submitStory(){

    if(!text.trim())
      return


    try{

      setLoading(true)

      await createStory({

        type:"text",

        text,

        background:"#7c3aed"

      })


      setText("")

      window.location.reload()


    }
    catch(error){

      console.log(error)

    }
    finally{

      setLoading(false)

    }

  }


  return (

    <div className="create-story">

      <textarea

        placeholder="Share something..."

        value={text}

        onChange={
          e=>setText(e.target.value)
        }

      />


      <button
        onClick={submitStory}
        disabled={loading}
      >

        {
          loading
          ? "Posting..."
          : "Add Story"
        }

      </button>


    </div>

  )

}


export default CreateStory