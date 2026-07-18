import { useEffect, useState } from "react"
import axios from "axios"
import Layout from "../components/Layout"
import "./Communities.css"


function Communities() {


  const [communities, setCommunities] = useState<any[]>([])

  const [user, setUser] = useState<any>(null)



  useEffect(() => {


    const storedUser =
      JSON.parse(
        localStorage.getItem("user") || "null"
      )


    setUser(storedUser)



    async function fetchCommunities() {


      try {


        const response =
          await axios.get(
            "https://lcmt-backend.onrender.com/api/communities"
          )


        setCommunities(
          response.data
        )


      } catch(error) {


        console.log(error)


      }


    }


    fetchCommunities()


  }, [])





  async function joinCommunity(
    id:string
  ) {


    try {


      if(!user?._id){

        alert(
          "Please login first"
        )

        return

      }



      await axios.post(

        `https://lcmt-backend.onrender.com/api/communities/${id}/join`,

        {
          userId:user._id
        }

      )



      setCommunities(
        prev =>

        prev.map(
          community => {


            if(
              community._id === id
            ){


              const alreadyJoined =
                community.members?.some(
                  (member:any)=>
                    member._id === user._id
                )



              if(alreadyJoined){

                return community

              }



              return {

                ...community,

                members:[
                  ...(community.members || []),

                  {
                    _id:user._id,
                    name:user.name,
                    image:user.image
                  }

                ]

              }


            }


            return community


          }

        )

      )



    } catch(error:any){


      console.log(
        error.response?.data ||
        error.message
      )


      alert(
        error.response?.data?.message ||
        "Join failed"
      )


    }


  }





  function isJoined(
    community:any
  ){


    return community.members?.some(
      (member:any)=>
        member._id === user?._id
    )


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
            communities.map(
              (community)=>(


              <div
                className="community-card"
                key={community._id}
              >



                <div className="community-icon">

                  {community.icon}

                </div>





                <h2>

                  {community.name}

                </h2>





                <p>

                  {community.description}

                </p>





                <span>

                  👥 {community.members?.length || 0} Students

                </span>





                <button

                  disabled={
                    isJoined(community)
                  }

                  onClick={()=>
                    joinCommunity(
                      community._id
                    )
                  }

                >

                  {
                    isJoined(community)
                    ?
                    "✓ Joined"
                    :
                    "Join Community"
                  }


                </button>



              </div>


            ))

          }



        </div>



      </main>


    </Layout>


  )


}



export default Communities