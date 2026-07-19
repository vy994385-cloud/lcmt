import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import Layout from "../components/Layout"
import "./CommunityDetails.css"
import ThreeDotMenu from "../components/ThreeDotMenu"
import {
  Image,
  Video,
  Mic,
  BarChart3,
  Send
} from "lucide-react"

function CommunityDetails() {

  const { id } = useParams()


  const [posts, setPosts] =
    useState<any[]>([])


  const [content, setContent] =
    useState("")


  const [commentText, setCommentText] =
    useState<Record<string,string>>({})


  const [loading, setLoading] =
    useState(false)


  const [fetching, setFetching] =
    useState(true)


  const user =
    JSON.parse(
      localStorage.getItem("user") || "{}"
    )



  async function fetchPosts(){

    try{

      setFetching(true)


      const response =
        await axios.get(

          `https://lcmt-backend.onrender.com/api/communities/${id}/posts`

        )


      setPosts(

        Array.isArray(response.data)

        ?

        response.data

        :

        []

      )


    }
    catch(error:any){

      console.log(
        error.response?.data ||
        error.message
      )


      setPosts([])

    }
    finally{

      setFetching(false)

    }

  }



  useEffect(()=>{

    if(id){

      fetchPosts()

    }

  },[id])





  async function createPost(){


    if(!content.trim()){

      return

    }


    try{


      setLoading(true)


      const response =
        await axios.post(

          `https://lcmt-backend.onrender.com/api/communities/${id}/posts`,

          {
            content,
            userId:user._id
          }

        )


      setPosts(prev=>[

        response.data.post,

        ...prev

      ])


      setContent("")


    }
    catch(error:any){

      console.log(
        error.response?.data ||
        error.message
      )


      alert("Post failed")

    }
    finally{

      setLoading(false)

    }

  }





  async function toggleLike(
    postId:string
  ){

    try{


      const response =
        await axios.post(

          `https://lcmt-backend.onrender.com/api/communities/posts/${postId}/like`,

          {
            userId:user._id
          }

        )


      setPosts(prev=>

        prev.map(post=>

          post._id === postId

          ?

          response.data.post

          :

          post

        )

      )


    }
    catch(error:any){

      console.log(
        error.response?.data ||
        error.message
      )

    }

  }





  async function addComment(
    postId:string
  ){


    const text =
      commentText[postId]


    if(!text?.trim()){

      return

    }



    try{


      const response =
        await axios.post(

          `https://lcmt-backend.onrender.com/api/communities/posts/${postId}/comment`,

          {
            userId:user._id,
            text
          }

        )



      setPosts(prev=>

        prev.map(post=>

          post._id === postId

          ?

          response.data.post

          :

          post

        )

      )



      setCommentText(prev=>({

        ...prev,

        [postId]:""

      }))



    }
    catch(error:any){

      console.log(
        error.response?.data ||
        error.message
      )

    }


  }





  return (

    <Layout>


      <main className="community-feed">

  <h1 className="feed-title">
    Community Feed 🌍
  </h1>

  <section className="feed-header">

    <div className="composer-top">

      <img
        src={
          user.image ||
          "https://picsum.photos/60"
        }
        alt="Profile"
        className="composer-avatar"
      />

      <div className="composer-input">

        <h3>
          What's on your mind, {user.name || "Student"}?
        </h3>

        <textarea
          placeholder="Share something with your community..."
          value={content}
          onChange={(e)=>
            setContent(e.target.value)
          }
        />

      </div>

    </div>

    <div className="composer-actions">

      <div className="composer-icons">

        <button type="button">
          <Image size={18}/>
          <span>Photo</span>
        </button>

        <button type="button">
          <Video size={18}/>
          <span>Video</span>
        </button>

        <button type="button">
          <Mic size={18}/>
          <span>Voice</span>
        </button>

        <button type="button">
          <BarChart3 size={18}/>
          <span>Poll</span>
        </button>

      </div>

      <button
        className="post-btn"
        onClick={createPost}
        disabled={loading}
      >

        <Send size={18}/>

        {loading ? "Posting..." : "Post"}

      </button>

    </div>

  </section>

        <section className="posts">


        {

          fetching

          ?

          <p>
            Loading posts...
          </p>


          :


          posts.length === 0


          ?

          <p>
            No posts yet. Start the conversation!
          </p>


          :


          posts.map((post:any)=>(


            <div

              className="post-card"

              key={post._id}

            >



              <div className="post-header">

  <div className="post-user">

    <img
      src={
        post?.user?.image ||
        "https://picsum.photos/50"
      }
      alt="profile"
    />

    <strong>
      {
        post?.user?.name ||
        "Student"
      }
    </strong>

  </div>

  <ThreeDotMenu
    items={[
      {
        label: "💾 Save Post",
        onClick: () => {
          alert("Coming Soon")
        }
      },
      {
        label: "🔗 Copy Link",
        onClick: () => {
          navigator.clipboard.writeText(
            `${window.location.origin}/communities/${id}`
          )
          alert("Link copied")
        }
      },
      {
        label: "📤 Share",
        onClick: () => {
          alert("Coming Soon")
        }
      },
      {
        label: "🚩 Report",
        onClick: () => {
          alert("Reported")
        }
      }
    ]}
  />

</div>





              <p>

                {
                  post.content
                }

              </p>






              <button

                onClick={()=>

                  toggleLike(
                    post._id
                  )

                }

              >


                {
                  post.likes?.some(

                    (like:any)=>

                      like.toString() === user._id

                  )

                  ?

                  "❤️"

                  :

                  "🤍"

                }


                {" "}


                {
                  post.likes?.length || 0
                }


              </button>







              <div className="comments">


                <input


                  placeholder="Write a comment..."


                  value={
                    commentText[post._id] || ""
                  }


                  onChange={(e)=>

                    setCommentText(prev=>({

                      ...prev,

                      [post._id]:
                      e.target.value

                    }))

                  }


                />



                <button

                  onClick={()=>

                    addComment(
                      post._id
                    )

                  }

                >

                  Comment 💬

                </button>




                {

                  post.comments?.map(

                    (comment:any)=>(


                      <p

                        key={
                          comment._id
                        }

                      >

                        <strong>

                          {
                            comment.user?.name ||
                            "Student"
                          }

                        </strong>


                        {" "}


                        {
                          comment.text
                        }


                      </p>


                    )

                  )

                }


              </div>







              {

                post.createdAt &&


                <small>

                  {
                    new Date(
                      post.createdAt
                    ).toLocaleString()
                  }

                </small>

              }




            </div>


          ))

        }


        </section>


      </main>


    </Layout>

  )

}


export default CommunityDetails