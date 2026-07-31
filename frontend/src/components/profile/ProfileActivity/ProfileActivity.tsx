import "./ProfileActivity.css"


interface Props{

  user:any

}


function ProfileActivity({

  user

}:Props){


  const activities =

    user.activities?.length

    ?

    user.activities

    :

    [

      {
        icon:"❤️",
        title:"Liked a post",
        time:"2 hours ago"
      },

      {
        icon:"💬",
        title:"Commented on a community post",
        time:"Yesterday"
      },

      {
        icon:"🌍",
        title:"Joined AI Community",
        time:"3 days ago"
      },

      {
        icon:"🤝",
        title:"Became friends with Rahul",
        time:"1 week ago"
      }

    ]



  return(

    <section className="profile-activity">


      <h2>
        ⚡ Activity
      </h2>



      <div className="activity-timeline">


        {
          activities.map(

            (activity:any,index:number)=>(


              <div

                key={index}

                className="activity-item"

              >


                <div className="activity-icon">

                  {activity.icon}

                </div>



                <div className="activity-content">


                  <h4>

                    {activity.title}

                  </h4>


                  <small>

                    {activity.time}

                  </small>


                </div>


              </div>


            )

          )
        }


      </div>


    </section>

  )

}


export default ProfileActivity