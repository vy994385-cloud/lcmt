import Layout from "../components/Layout"
import "./Home.css"
import { Link } from "react-router-dom"

function Home() {

  const students = [
    {
      name: "Aditi",
      course: "CSE AI-ML",
      interest: "Artificial Intelligence",
      thought: "Kindness matters more than popularity."
    },
    {
      name: "Rahul",
      course: "B.Tech CSE",
      interest: "Web Development",
      thought: "Build things that solve real problems."
    },
    {
      name: "Sneha",
      course: "Design",
      interest: "UI/UX",
      thought: "Good design starts with empathy."
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
            students.map((student,index)=>(

              <div
                className="thought-card"
                key={index}
              >

                <h3>
                  ❤️ {student.name}
                </h3>


                <p>
                  "{student.thought}"
                </p>


                <div>

                  ❤️ {120 + index * 80}

                  {"  "}

                  💬 Comment

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