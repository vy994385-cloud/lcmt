import Layout from "../components/Layout"
import { useApp } from "../context/AppContext"
import "./Discover.css"


function calculateCompatibility(
  currentUser: any,
  user: any
) {

  let score = 0


  if (
    currentUser.college &&
    currentUser.college === user.college
  ) {
    score += 20
  }


  if (
    currentUser.course &&
    currentUser.course === user.course
  ) {
    score += 20
  }


  const commonInterests =
    currentUser.interests?.filter(
      (item: string) =>
        user.interests?.includes(item)
    ) || []


  score += commonInterests.length * 10



  const commonValues =
    currentUser.values?.filter(
      (item: string) =>
        user.values?.includes(item)
    ) || []


  score += commonValues.length * 10



  if (score > 100) {
    score = 100
  }


  return score

}



function getCommonInterests(
  currentUser:any,
  user:any
){

  return (
    currentUser.interests?.filter(
      (item:string)=>
        user.interests?.includes(item)
    ) || []
  )

}



function getCommonValues(
  currentUser:any,
  user:any
){

  return (
    currentUser.values?.filter(
      (item:string)=>
        user.values?.includes(item)
    ) || []
  )

}



function getCompatibilityReasons(
  currentUser:any,
  user:any
){

  const reasons:string[] = []


  if(
    currentUser.college &&
    currentUser.college === user.college
  ){

    reasons.push(
      "Same College 🎓"
    )

  }



  if(
    currentUser.course &&
    currentUser.course === user.course
  ){

    reasons.push(
      "Same Course 💻"
    )

  }



  const interests =
    getCommonInterests(
      currentUser,
      user
    )


  if(
    interests.length > 0
  ){

    reasons.push(
      `${interests.length} Common Interests ✨`
    )

  }



  const values =
    getCommonValues(
      currentUser,
      user
    )


  if(
    values.length > 0
  ){

    reasons.push(
      `${values.length} Shared Values ❤️`
    )

  }



  return reasons

}





function Discover(){


  const {
    users,
    matches,
    passedUsers,
    likeUser,
    passUser,
  } = useApp()



  const currentUser =
    JSON.parse(
      localStorage.getItem("user") || "{}"
    )



  const availableUsers =
    users.filter(
      (user)=>

        user.id !== currentUser._id &&

        !matches.some(
          (match)=>
            match.id === user.id
        ) &&

        !passedUsers.some(
          (passed)=>
            passed.id === user.id
        )

    )



  return (

    <Layout>


      <main className="discover-page">


        <h1 className="discover-title">

          Discover Meaningful Connections ❤️

        </h1>



        {
          availableUsers.length === 0


          ?


          <p>
            No more profiles available ❤️
          </p>



          :



          <div className="discover-grid">


          {
            availableUsers.map(
              (user)=>(


              <div
                key={user.id}
                className="profile-card"
              >



                <div className="image-container">


                  <img

                    className="profile-image"

                    src={
                      user.image ||
                      "https://picsum.photos/300"
                    }

                    alt={user.name}

                  />



                  <div className="image-overlay">


                    <div className="match-section">


                      <div className="match-badge">

                        ❤️ {
                          calculateCompatibility(
                            currentUser,
                            user
                          )
                        }% Compatible


                      </div>



                      <div className="match-reasons">


                        {
                          getCompatibilityReasons(
                            currentUser,
                            user
                          )
                          .map(
                            (reason:string)=>(

                              <span
                                key={reason}
                              >

                                ✓ {reason}

                              </span>

                            )
                          )
                        }


                      </div>


                    </div>





                    <div className="profile-info">


                      <h2>

                        {user.name}

                      </h2>



                      <p>

                        🎓 {
                          user.college ||
                          "Student"
                        }

                      </p>



                      <p>

                        💻 {
                          user.course ||
                          "Student"
                        }

                      </p>



                    </div>



                  </div>


                </div>






                <div className="profile-content">



                  {
                    user.personality &&


                    <div className="personality-box">


                      💭 {user.personality}


                    </div>

                  }






                  {
                    user.bio &&


                    <p className="info">

                      {user.bio}

                    </p>

                  }






                  {
                    getCommonInterests(
                      currentUser,
                      user
                    ).length > 0 &&


                    <div>


                      <h4>
                        Common Interests ✨
                      </h4>



                      <div className="interests">


                      {
                        getCommonInterests(
                          currentUser,
                          user
                        )
                        .map(
                          (interest:string)=>(

                          <span
                            key={interest}
                            className="interest"
                          >

                            {interest}

                          </span>


                          )
                        )
                      }


                      </div>


                    </div>

                  }







                  {
                    getCommonValues(
                      currentUser,
                      user
                    ).length > 0 &&


                    <div>


                      <h4>
                        Shared Values ❤️
                      </h4>



                      <div className="interests">


                      {
                        getCommonValues(
                          currentUser,
                          user
                        )
                        .map(
                          (value:string)=>(

                          <span
                            key={value}
                            className="interest"
                          >

                            {value}

                          </span>


                          )
                        )
                      }


                      </div>


                    </div>


                  }







                  <div className="action-buttons">


                    <button

                      className="pass-btn"

                      onClick={() =>
                        passUser(user)
                      }

                    >

                      ❌ Pass


                    </button>




                    <button

                      className="like-btn"

                      onClick={() =>
                        likeUser(user)
                      }

                    >

                      ❤️ Connect


                    </button>


                  </div>



                </div>



              </div>


              )
            )
          }


          </div>

        }



      </main>


    </Layout>

  )

}



export default Discover