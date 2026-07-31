import { useNavigate } from "react-router-dom"
import "./ProfileStats.css"

export default function ProfileStats({ user }: any) {

  const navigate = useNavigate()

  function format(value:number){

    if(value >= 1000000){
      return (value/1000000).toFixed(1)+"M"
    }

    if(value >= 1000){
      return (value/1000).toFixed(1)+"K"
    }

    return value
  }

  const stats = [

    {
      icon:"📝",
      value:user.posts?.length || 0,
      label:"Posts",
      action:()=>{}
    },

    {
      icon:"👥",
      value:user.followers?.length || 0,
      label:"Followers",
      action:()=>navigate(`/profile/${user._id}/followers`)
    },

    {
      icon:"❤️",
      value:user.following?.length || 0,
      label:"Following",
      action:()=>navigate(`/profile/${user._id}/following`)
    },

    {
      icon:"🌍",
      value:user.communities?.length || 0,
      label:"Communities",
      action:()=>navigate("/communities")
    },

    {
      icon:"🤝",
      value:user.friends?.length || 0,
      label:"Friends",
      action:()=>navigate("/network")
    }

  ]

  return(

    <section className="profile-stats">

      {

        stats.map((item,index)=>(

          <button
            key={index}
            className="stat-card"
            onClick={item.action}
          >

            <span className="stat-icon">
              {item.icon}
            </span>

            <h2>
              {format(item.value)}
            </h2>

            <p>
              {item.label}
            </p>

          </button>

        ))

      }

    </section>

  )

}