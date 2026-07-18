import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import Layout from "../components/Layout"
import "./Communities.css"



function Communities() {


  const [communities, setCommunities] =
    useState<any[]>([])


  const [loadingId, setLoadingId] =
    useState<string | null>(null)



  const navigate = useNavigate()



  const user =
    JSON.parse(
      localStorage.getItem("user") || "{}"
    )




  async function fetchCommunities() {

    try {

      const response =
        await axios.get(
          "https://lcmt-backend.onrender.com/api/communities"
        )


      setCommunities(response.data)


    } catch(error){

      console.log(error)

    }

  }





  useEffect(()=>{

    fetchCommunities()

  },[])







  async function joinCommunity(id:string){


    try {


      setLoadingId(id)



      const response =
        await axios.post(

          `https://lcmt-backend.onrender.com/api/communities/${id}/join`,

          {
            userId:user._id
          }

        )



      alert("Joined Community 🎉")



      setCommunities(prev =>

        prev.map((community)=>

          community._id === id

          ?

          response.data.community

          :

          community

        )

      )



    }
    catch(error:any){


      console.log(
        error.response?.data || error.message
      )


      alert(
        error.response?.data?.message ||
        "Join failed"
      )


    }
    finally{

      setLoadingId(null)

    }


  }







  return (

    <Layout>


      <main className="communities-page">



        <section className="community-header">


          <h1>
            🌍 Student Communities
          </h1>


          <p>
            Find people who share your interests,
            passions, and goals.
          </p>


        </section>






        <div className="community-grid">


        {

          communities.map((community)=>(


            <div

              className="community-card"

              key={community._id}


              onClick={()=>{

                navigate(
                  `/communities/${community._id}`
                )

              }}

            >





              <div className="community-icon">

                {community.icon}

              </div>






              <span className="category">

                {community.category}

              </span>







              <h2>

                {community.name}

              </h2>







              <p>

                {community.description}

              </p>







              <div className="members">

                👥 {community.members?.length || 0}
                {" "}Students

              </div>








              {

                community.members?.some(

                  (member:any)=>

                  member._id === user._id

                )


                ?



                <button

                  className="joined"

                  disabled

                  onClick={(e)=>{

                    e.stopPropagation()

                  }}

                >

                  ✓ Joined

                </button>



                :



                <button


                  disabled={
                    loadingId === community._id
                  }



                  onClick={(e)=>{


                    e.stopPropagation()



                    joinCommunity(
                      community._id
                    )


                  }}


                >


                  {

                    loadingId === community._id

                    ?

                    "Joining..."

                    :

                    "Join Community"


                  }


                </button>


              }





            </div>


          ))

        }



        </div>


      </main>


    </Layout>

  )

}


export default Communities