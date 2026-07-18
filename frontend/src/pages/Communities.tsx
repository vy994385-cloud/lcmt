import { useEffect, useState } from "react"
import axios from "axios"
import Layout from "../components/Layout"
import "./Communities.css"


function Communities() {


  const [communities, setCommunities] = useState<any[]>([])



  useEffect(() => {


    async function fetchCommunities() {

      try {

        const response = await axios.get(
          "http://localhost:5000/api/communities"
        )


        setCommunities(response.data)


      } catch (error) {

        console.log(error)

      }

    }


    fetchCommunities()


  }, [])



  async function joinCommunity(id: string) {

    try {


  const user =
    JSON.parse(
      localStorage.getItem("user") || "{}"
    )


  await axios.post(

    `http://localhost:5000/api/communities/${id}/join`,

    {
      userId: user._id
    }

  )


  alert("Joined Community 🎉")


  window.location.reload()



} catch(error:any) {

  console.log(
    error.response?.data || error.message
  )

  alert(
    error.response?.data?.message ||
    "Join failed"
  )

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
                  onClick={() =>
                    joinCommunity(
                      community._id
                    )
                  }
                >

                  Join Community

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