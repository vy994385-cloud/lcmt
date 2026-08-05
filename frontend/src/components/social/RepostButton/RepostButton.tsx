import { useState } from "react"
import toast from "react-hot-toast"
import api from "../../../api/axios"
import "./RepostButton.css"

interface Props{
  post:any
}

export default function RepostButton({
  post
}:Props){

  const [loading,setLoading]=useState(false)
  const [reposted,setReposted]=useState(false)

  async function repost(){

    if(loading) return

    try{

      setLoading(true)

      await api.post(
        `/posts/${post._id}/repost`
      )

      setReposted(true)

      toast.success(
        "Post reposted 🔁"
      )

    }

    catch(error){

      console.log(error)

      toast.error(
        "Couldn't repost"
      )

    }

    finally{

      setLoading(false)

    }

  }

  return(

    <button

      className={
        reposted
        ?
        "repost active"
        :
        "repost"
      }

      onClick={repost}

      disabled={
        loading || reposted
      }

    >

      🔁 {

        reposted
        ?
        "Reposted"
        :
        "Repost"

      }

    </button>

  )

}