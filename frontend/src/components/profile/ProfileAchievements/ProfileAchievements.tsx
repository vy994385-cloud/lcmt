import "./ProfileAchievements.css"


interface Props{

  user:any

}


function ProfileAchievements({

  user

}:Props){


  const achievements =

    user.achievements?.length

    ?

    user.achievements

    :

    [

      {
        icon:"🌱",
        title:"Early Member",
        text:"Joined the LCMT community early"
      },

      {
        icon:"🔥",
        title:"Active Contributor",
        text:"Frequently shares thoughts and ideas"
      },

      {
        icon:"🤝",
        title:"Connector",
        text:"Builds meaningful connections"
      },

      {
        icon:"💡",
        title:"Idea Creator",
        text:"Starts interesting conversations"
      }

    ]



  return(

    <section className="profile-achievements">


      <div className="achievement-header">


        <div>

          <h2>
            🏆 Achievements
          </h2>


          <p>
            Community milestones and contributions
          </p>


        </div>



        <span>

          {achievements.length}

        </span>


      </div>




      <div className="achievement-grid">


        {
          achievements.map(

            (item:any,index:number)=>(


              <div

                key={index}

                className="achievement-card"


              >


                <div className="achievement-icon">

                  {
                    item.icon || "✨"
                  }

                </div>



                <div>


                  <h3>

                    {
                      item.title || item
                    }

                  </h3>



                  {

                    item.text &&

                    <p>

                      {item.text}

                    </p>

                  }


                </div>


              </div>


            )

          )
        }


      </div>



    </section>

  )

}


export default ProfileAchievements