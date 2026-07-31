import { Link } from "react-router-dom"
import "./CommunitiesPreview.css"

interface Props{

  communities:string[]

}

function CommunitiesPreview({

  communities

}:Props){

  return(

    <section className="home-section">

      <h2>

        🌍 Communities

      </h2>

      <div className="tag-container">

        {

          communities.map((community,index)=>(

            <Link

              key={index}

              to="/communities"

              className="tag"

            >

              {community}

            </Link>

          ))

        }

      </div>

    </section>

  )

}

export default CommunitiesPreview