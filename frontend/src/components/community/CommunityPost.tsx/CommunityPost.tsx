import ThreeDotMenu from "../../ThreeDotMenu"
import CommunityComments from "../CommunityComments/CommunityComments"
import toast from "react-hot-toast"

import "./CommunityPost.css"

interface Props{

  post:any

  user:any

  communityId?:string

  onLike:(postId:string)=>void

  commentText:string

  setCommentText:(value:string)=>void

  onComment:(postId:string)=>void

}

function CommunityPost({

  post,

  user,

  communityId,

  onLike,

  commentText,

  setCommentText,

  onComment

}:Props){

  return(

    <article className="community-post">

      <header className="post-header">

        <div className="post-user">

          <img

            src={
              post?.user?.image ||
              "https://picsum.photos/50"
            }

            alt="profile"

          />

          <div>

            <h4>

              {post?.user?.name || "Member"}

            </h4>

            <small>

              {

                post.createdAt &&

                new Date(

                  post.createdAt

                ).toLocaleString()

              }

            </small>

          </div>

        </div>

        <ThreeDotMenu

          items={[

            {

              label:"💾 Save",

              onClick:()=>{

                toast(
                  "Save feature coming soon 🚀"
                )

              }

            },

            {

              label:"🔗 Copy Link",

              onClick:()=>{

                navigator.clipboard.writeText(

                  `${window.location.origin}/community/${communityId}`

                )

                toast.success(
                  "Link copied to clipboard."
                )

              }

            },

            {

              label:"🚩 Report",

              onClick:()=>{

                toast.success(
                  "Post reported. Thanks for your feedback."
                )

              }

            }

          ]}

        />

      </header>

      <div className="post-content">

        {post.content}

      </div>

      <div className="post-actions">

        <button

          onClick={()=>

            onLike(post._id)

          }

        >

          {

            post.likes?.some(

              (like:any)=>

                like.toString()===user._id

            )

            ?

            "❤️"

            :

            "🤍"

          }

          {" "}

          {post.likes?.length || 0}

        </button>

      </div>

      <CommunityComments

        post={post}

        value={commentText}

        setValue={setCommentText}

        onComment={()=>

          onComment(post._id)

        }

      />

    </article>

  )

}

export default CommunityPost