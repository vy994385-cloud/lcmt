import { Link } from "react-router-dom"

export default function ActiveGroups(){

  const communities = [
    {
      icon:"🤖",
      name:"AI & Machine Learning"
    },
    {
      icon:"🏏",
      name:"Cricket Zone"
    },
    {
      icon:"💻",
      name:"Developers Hub"
    }
  ]


  return(

    <section className="sidebar-card">

      <h3>🔥 Trending Communities</h3>


      <div>

        {
          communities.map((community)=>(
            
            <div
              key={community.name}
              className="sidebar-community"
            >

              <span>
                {community.icon}
              </span>

              {community.name}

            </div>

          ))
        }

      </div>


      <Link
        to="/communities"
        className="sidebar-link"
      >
        Explore Communities →
      </Link>


      <Link
  to="/communities"
  className="sidebar-link"
>
  + Start a Community
</Link>


    </section>

  )

}
