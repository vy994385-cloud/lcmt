import { Link } from "react-router-dom"

interface Props{
  communities:any[]
}

export default function TrendingCommunities({
  communities
}:Props){

  return(

    <section className="sidebar-card">

      <h3>🌍 Trending Communities</h3>

      {

        communities.length===0 ?

        <p>No communities yet</p>

        :

        communities.slice(0,5).map((community:any)=>(

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