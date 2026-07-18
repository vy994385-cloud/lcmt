import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import Layout from "../components/Layout"
import "./CommunityDetails.css"



function CommunityDetails() {


  const { id } = useParams()



  const [posts, setPosts] =
    useState<any[]>([])



  const [content, setContent] =
    useState("")



  const [loading, setLoading] =
    useState(false)



  const [fetching, setFetching] =
    useState(true)





  const user =
    JSON.parse(
      localStorage.getItem("user") || "{}"
    )








  async function fetchPosts(){


    try {


      setFetching(true)



      const response =
        await axios.get(

          `https://lcmt-backend.onrender.com/api/communities/${id}/posts`

        )



      console.log(
        "COMMUNITY POSTS:",
        response.data
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




    try {


      setLoading(true)



      const response =
        await axios.post(


          `https://lcmt-backend.onrender.com/api/communities/${id}/posts`,


          {

            content,

            userId:user._id

          }


        )



      console.log(
  JSON.stringify(response.data, null, 2)
)





      setPosts(prev => [

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


      alert(
        "Post failed"
      )


    }
    finally{


      setLoading(false)


    }


  }









  return (

    <Layout>


      <main className="community-feed">






        <section className="feed-header">


          <h1>
            Community Feed 🌍
          </h1>





          <textarea


            placeholder=
            "Share something with your community..."


            value={content}


            onChange={(e)=>
              setContent(
                e.target.value
              )
            }


          />






          <button


            onClick={createPost}


            disabled={loading}


          >

            {

              loading

              ?

              "Posting..."

              :

              "Post 🚀"

            }


          </button>



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

              key={
                post?._id ||
                Math.random()
              }

            >






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








              <p>


                {

                  post?.content ||

                  "No content"

                }


              </p>








              {

                post?.createdAt &&


                <small>


                  {

                    new Date(

                      post.createdAt

                    )
                    .toLocaleString()


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