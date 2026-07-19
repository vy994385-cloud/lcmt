import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

import Layout from "../components/Layout"
import "./Home.css"



function Home() {


  const [posts, setPosts] =
    useState<any[]>([])


  const [suggestions, setSuggestions] =
    useState<any[]>([])


  const [loading, setLoading] =
    useState(true)




  useEffect(() => {


    async function fetchFeed(){


      try {


        const response =
  await axios.get(

    "https://lcmt-backend.onrender.com/api/feed",

    {
      headers:{

        Authorization:

        `Bearer ${localStorage.getItem("token")}`

      }
    }

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


      }
      finally{


        setLoading(false)


      }


    }





    async function fetchSuggestions(){


      try {


        const response =
          await axios.get(


            "https://lcmt-backend.onrender.com/api/users/discover",


            {

              headers:{

                Authorization:

                `Bearer ${localStorage.getItem("token")}`

              }

            }


          )



        setSuggestions(

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


      }


    }




    fetchFeed()

    fetchSuggestions()



  },[])







  const communities = [


    "AI & ML",

    "Web Development",

    "Startup Club",

    "Photography"


  ]





  const events = [


    "AI Hackathon 2026",

    "College Tech Meetup",

    "Startup Workshop"


  ]








  return (


    <Layout>


      <main className="home-page">






        <section className="welcome-card">


          <h1>

            Welcome back 👋

          </h1>



          <p>

            Your next meaningful connection
            can start with a thought.

          </p>




          <div className="quick-actions">


            <Link to="/discover">

              🔍 Discover People

            </Link>




            <Link to="/communities">

              🌍 Explore Communities

            </Link>



          </div>



        </section>









        <section className="home-section">


          <h2>

            💭 Question of the Day

          </h2>




          <div className="question-card">


            <p>

              "What quality instantly makes you respect someone?"

            </p>



            <button>

              Share Your Thought ✨

            </button>



          </div>



        </section>









        <section className="home-section">


          <h2>

            ❤️ Thought Feed

          </h2>




          <div className="thought-feed">


          {


            loading


            ?


            <p>

              Loading thoughts...

            </p>



            :



            posts.length === 0



            ?



            <p>

              No thoughts yet.
              Start the conversation ✨

            </p>



            :



            posts.map((post:any)=>(


              <div

                className="thought-card"

                key={post._id}

              >



                <h3>

                  ❤️ {post.user?.name || "Student"}

                </h3>




                <span>

                  🌍 {post.community?.name || "LCMT"}

                </span>




                <p>

                  "{post.content}"

                </p>




                <div>


                  ❤️ {post.likes?.length || 0}


                  {"   "}


                  💬 {post.comments?.length || 0}


                </div>



              </div>



            ))


          }


          </div>



        </section>









        <section className="home-section">


          <h2>

            👥 People You May Connect With

          </h2>




          <div className="student-grid">



          {


            suggestions.length === 0



            ?



            <p>

              No suggestions available 🚀

            </p>



            :



            suggestions.map((user:any)=>(



              <div

                className="student-card"

                key={user._id}

              >



                <img

                  src={

                    user.image ||

                    "https://picsum.photos/100"

                  }

                  alt="profile"

                />




                <h3>

                  {user.name}

                </h3>




                <p>

                  🎓 {user.course || "Student"}

                </p>




                <span>

                  ✨ {

                    user.interests?.join(", ")

                    ||

                    "LCMT Member"

                  }

                </span>




                <button>

                  Connect ❤️

                </button>



              </div>



            ))


          }



          </div>



        </section>









        <section className="home-section">


          <h2>

            🌍 Communities

          </h2>




          <div className="tag-container">


          {


            communities.map((item,index)=>(


              <Link

                to="/communities"

                className="tag"

                key={index}

              >

                {item}


              </Link>


            ))


          }



          </div>




        </section>









        <section className="home-section">


          <h2>

            🎉 Upcoming Events

          </h2>




          <div className="event-card">


          {


            events.map((event,index)=>(


              <p key={index}>


                📅 {event}


              </p>


            ))


          }



          </div>



        </section>









        <section className="home-section">


          <h2>

            🚀 Student Opportunities

          </h2>




          <div className="opportunity-card">


            <p>

              💻 React Developer needed for student project

            </p>




            <p>

              🤖 AI Hackathon Team Formation

            </p>



          </div>



        </section>






      </main>



    </Layout>


  )

}




export default Home