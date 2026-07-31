import "./ProfileTrending.css"

export default function ProfileTrending(){

  const trends = [

    "#AI",

    "#React",

    "#Football",

    "#Startups",

    "#WebDevelopment"

  ]


  return(

    <section className="profile-trending">


      <h3>
        🔥 Trending
      </h3>


      <div className="trend-list">


        {
          trends.map(

            (trend,index)=>(

              <button

                key={index}

                className="trend-item"

              >

                {trend}

              </button>

            )

          )
        }


      </div>


    </section>

  )

}