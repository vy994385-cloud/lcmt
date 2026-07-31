import ConnectButton from "../../social/ConnectButton"
import "./PeopleSuggestions.css"

interface Props{

  suggestions:any[]

}

function PeopleSuggestions({

  suggestions

}:Props){

  return(

    <section className="home-section">

      <h2>

        ✨ People You May Know

      </h2>

      <div className="student-grid">

        {

          suggestions.length===0

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

              <ConnectButton

                userId={user._id}

              />

            </div>

          ))

        }

      </div>

    </section>

  )

}

export default PeopleSuggestions