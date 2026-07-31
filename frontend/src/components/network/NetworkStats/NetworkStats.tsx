import "./NetworkStats.css"

interface NetworkStatsProps{

  friends:number

  followers:number

  following:number

  requests:number

}

export default function NetworkStats({

  friends,

  followers,

  following,

  requests

}:NetworkStatsProps){

  const stats=[

    {
      label:"Friends",
      value:friends,
      icon:"👥"
    },

    {
      label:"Followers",
      value:followers,
      icon:"👤"
    },

    {
      label:"Following",
      value:following,
      icon:"➡️"
    },

    {
      label:"Requests",
      value:requests,
      icon:"📨"
    }

  ]

  return(

    <section className="network-stats">

      {

        stats.map(item=>(

          <div

            key={item.label}

            className="stat-card"

          >

            <div className="stat-icon">

              {item.icon}

            </div>

            <h2>

              {item.value}

            </h2>

            <p>

              {item.label}

            </p>

          </div>

        ))

      }

    </section>

  )

}