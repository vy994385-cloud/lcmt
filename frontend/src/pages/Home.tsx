import Layout from "../components/Layout"
import "./Home.css"
import { Link } from "react-router-dom"

function Home() {

  const students = [
    {
      name: "Aditi",
      course: "CSE AI-ML",
      interest: "Artificial Intelligence"
    },
    {
      name: "Rahul",
      course: "B.Tech CSE",
      interest: "Web Development"
    },
    {
      name: "Sneha",
      course: "Design",
      interest: "UI/UX"
    }
  ]


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


        {/* Welcome */}

        <section className="welcome-card">

          <h1>
            Welcome back 👋
          </h1>

          <p>
            Find your people, build connections,
            and grow together with LCMT.
          </p>

        </section>



        {/* Question */}

        <section className="home-section">

          <h2>
            💭 Question of the Day
          </h2>

          <div className="question-card">

            <p>
              "What skill are you learning right now?"
            </p>

            <button>
              Answer
            </button>

          </div>

        </section>




        {/* Students */}

        <section className="home-section">

          <h2>
            👥 Students You May Know
          </h2>


          <div className="student-grid">


            {
              students.map((student,index)=>(

                <div
                  className="student-card"
                  key={index}
                >

                  <h3>
                    {student.name}
                  </h3>

                  <p>
                    🎓 {student.course}
                  </p>

                  <span>
                    ✨ {student.interest}
                  </span>

                </div>

              ))
            }


          </div>


        </section>




        {/* Communities */}

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




        {/* Events */}

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




        {/* Opportunities */}

        <section className="home-section">

          <h2>
            🚀 Opportunities
          </h2>


          <div className="opportunity-card">

            <p>
              Looking for React Developer for a student project
            </p>

            <p>
              AI Hackathon Team Formation
            </p>

          </div>


        </section>


      </main>


    </Layout>

  )

}


export default Home