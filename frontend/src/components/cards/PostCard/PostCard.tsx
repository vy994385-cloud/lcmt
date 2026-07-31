import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import api from "../../../api/axios"

import {
  formatTimeAgo,
  fullDate
} from "../../../utils/time"

import {
  getAvatar
} from "../../../utils/avatar"

import {
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal
} from "lucide-react"

import "./PostCard.css"

import ShareButton from "../../share/ShareButton"

import PostMenu from "../../social/PostMenu/PostMenu"

import CommentBox from "../../social/CommentBox/CommentBox"

import Reactions from "../../social/Reactions/Reactions"

import RepostButton from "../../social/RepostButton/RepostButton"

import FollowButton from "../../social/FollowButton/FollowButton"

interface Props{
  post:any
}

export default function PostCard({post}:Props){

  const author =
    post.author ||
    post.user ||
    {}

    

  const navigate = useNavigate()

  const [likes,setLikes]=useState(

    Array.isArray(post.likes)

      ? post.likes.length

      : post.likes || 0

  )

  const [liked,setLiked]=useState(()=>{

const user =
JSON.parse(
localStorage.getItem("user") || "{}"
)

return Array.isArray(post.likes)
&&
post.likes.some(
(id:any)=>
String(id) === String(user._id)
)

})

  const [saved,setSaved]=useState(false)

  const [deleting,setDeleting]=useState(false)

  const [loadingLike,setLoadingLike]=useState(false)

  const [showComments,setShowComments]=useState(false)

  const [showMenu,setShowMenu]=useState(false)

  const [comment,setComment]=useState("")

  const [preview,setPreview]=useState("")

  const [comments,setComments]=useState<any[]>(

    post.comments ||

    post.commentList ||

    []

  )

  useEffect(()=>{

    const savedPosts = JSON.parse(

      localStorage.getItem("savedPosts") || "[]"

    )

    setSaved(

      savedPosts.includes(post._id)

    )

  },[post._id])

  async function likePost(){

  if(!post._id || loadingLike) return

  const previousLiked = liked
  const previousLikes = likes

  const nextLiked = !liked

  setLiked(nextLiked)

  setLikes(
    nextLiked
    ?
    likes + 1
    :
    Math.max(0, likes - 1)
  )


  try{

    setLoadingLike(true)

    const {data}=await api.post(
      `/feed/${post._id}/like`
    )

    setLiked(data.liked)

    setLikes(data.likes)

  }

  catch(error){

    console.log(error)

    setLiked(previousLiked)

    setLikes(previousLikes)

  }

  finally{

    setLoadingLike(false)

  }

}

function copyLink(){

navigator.clipboard.writeText(
window.location.origin+"/post/"+post._id
)

alert("Link copied")

}


function hidePost(){

alert("Post hidden")

}


function reportPost(){

alert("Post reported")

}


function notInterested(){

alert("You won't see similar posts")

}
  async function addComment(){

    if(!comment.trim()) return

    try{

      const {data}=await api.post(

        `/feed/${post._id}/comment`,

        {

          text:comment

        }

      )

      setComments(data)

      setComment("")

    }

    catch(error){

      console.log(error)

    }

  }

  function openPost(){

    if(post._id){

      navigate(

        `/post/${post._id}`

      )

    }

  }

  function toggleSave(){

    const savedPosts = JSON.parse(

      localStorage.getItem("savedPosts") || "[]"

    )

    let updated

    if(savedPosts.includes(post._id)){

      updated = savedPosts.filter(

        (id:string)=>id!==post._id

      )

      setSaved(false)

    }

    else{

      updated=[

        ...savedPosts,

        post._id

      ]

      setSaved(true)

    }

    localStorage.setItem(

      "savedPosts",

      JSON.stringify(updated)

    )

  }

  async function deleteCurrentPost(){

  if(
    !post._id ||
    deleting
  ) return

  const ok = window.confirm(
    "Delete this post?"
  )

  if(!ok) return

  try{

    setDeleting(true)

    await api.delete(
      `/feed/${post._id}`
    )

    window.location.reload()

  }

  catch(error){

    console.log(error)

    alert("Failed to delete post")

  }

  finally{

    setDeleting(false)

  }

}

  const imageUrl =

  !post.image

    ? ""

    : post.image.startsWith("http")

      ? post.image

      : `${(import.meta.env.VITE_API_URL || "http://localhost:5000")
          .replace("/api","")}${post.image}`

      

  return(

    <article

      className="post-card"

      data-post={post._id}

    >

      <div className="post-header">

        <div

          className="post-author"

          onClick={()=>

            navigate(

              `/profile/${author?._id || ""}`

            )

          }

        >

          <img

            src={getAvatar(author)}

            alt="avatar"

          />

          <div className="author-info">

            <div className="author-name-row">

<h4>
{author?.name || "Unknown User"}
</h4>


{
author?._id &&
<FollowButton id={author._id}/>
}

</div>

            <div className="post-meta">

              {

                post.community?._id

                ?

                (

                  <span

  className="community-link"

  onClick={(e)=>{

    e.stopPropagation()

    navigate(
      `/community/${post.community._id}`
    )

  }}

>

  {post.community.name}

</span>

                )

                :

                (

                  <span>

                    {post.communityName || "Community"}

                  </span>

                )

              }

              •

              <span

                title={fullDate(post.createdAt)}

              >

                {formatTimeAgo(post.createdAt)}

              </span>

            </div>

          </div>

        </div>

      </div>

      <div className="post-body">

        {

          post.type &&

          <span className="post-type">

            {post.type}

          </span>

        }

        <p

          className="post-content"

          onClick={openPost}

        >

          {post.content}

        </p>

        

       {
  imageUrl && (

    <img
      src={imageUrl}
      alt="Post"
      className="post-image"
      loading="lazy"
      onError={(e)=>{
        e.currentTarget.style.display = "none"
      }}
      onClick={(e)=>{
        e.stopPropagation()
        setPreview(imageUrl)
      }}
    />

  )
}


      </div>

      <Reactions
count={
  Array.isArray(post.reactions)
  ?
  post.reactions.length
  :
  0
}
/>

      <div className="post-actions">
                <button
          onClick={likePost}
          disabled={loadingLike}
          className={
            liked
              ? "active-action"
              : ""
          }
        >
          <Heart size={18}/>
          <span>{likes}</span>
        </button>

        <button
          onClick={()=>
            setShowComments(
              !showComments
            )
          }
        >
          <MessageCircle size={18}/>
          <span>{comments.length}</span>
        </button>

       <RepostButton />

<ShareButton post={post}/>

        <button
          onClick={toggleSave}
          className={
            saved
              ? "active-action"
              : ""
          }
        >
          <Bookmark size={18}/>
        </button>

        {
  String(author?._id || "") ===
  String(
    JSON.parse(
      localStorage.getItem("user") || "{}"
    )._id || ""
  ) && (

    <button
      onClick={deleteCurrentPost}
      disabled={deleting}
      className="delete-post-btn"
    >
      🗑 Delete
    </button>

  )
}

<div className="post-more">

<button
onClick={()=>setShowMenu(!showMenu)}
>
<MoreHorizontal size={22}/>
</button>


{
showMenu &&

<PostMenu

onCopy={copyLink}

onReport={reportPost}

onHide={hidePost}

onNotInterested={notInterested}

/>

}

</div>

      </div>

      {
showComments &&

<CommentBox

comments={comments}

value={comment}

setValue={setComment}

onSubmit={addComment}

/>

}
      {

        preview &&

        <div

          className="image-preview-overlay"

          onClick={()=>
            setPreview("")
          }

        >

          <img

            src={preview}

            alt="Preview"

            className="image-preview-full"

            onClick={e=>
              e.stopPropagation()
            }

          />

        </div>

      }

    </article>

  )

}