import { Link } from "react-router-dom"

interface Props{
  communities:any[]
}

export default function YourCommunities({
  communities
}:Props){

  const joined=

  communities.filter(

    (community:any)=>

    community.joined ||

    community.isMember

  )

  return(

    <section className="sidebar-card">

      <h3>❤️ Your Communities</h3>

      {

        joined.length===0 ?

        <p>Join a community to see it here.</p>

        :

        joined.slice(0,5).map((community:any)=>(

          <Link
            key={community._id}
            to={`/community/${community._id}`}
            className="sidebar-link"
          >

            {community.icon || "🌍"} {community.name}

          </Link>

        ))

      }

    </section>

  )

}