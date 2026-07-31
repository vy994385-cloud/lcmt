import { Link } from "react-router-dom"

interface Props{
  people:any[]
}

export default function SuggestedPeople({
  people
}:Props){

  return(

    <section className="sidebar-card">

      <h3>👥 Suggested People</h3>

      {

        people.length===0 ?

        <p>No suggestions available.</p>

        :

        people.slice(0,5).map((person:any)=>(

          <Link
            key={person._id}
            to={`/profile/${person._id}`}
            className="sidebar-link"
          >

            {person.name}

          </Link>

        ))

      }

    </section>

  )

}