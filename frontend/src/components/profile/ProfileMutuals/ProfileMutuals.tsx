import "./ProfileMutuals.css"

interface Props{
  user:any
}

export default function ProfileMutuals({
  user
}:Props){

  const mutuals =
    user.mutualConnections || []

  const shared =
    user.sharedInterests || []


  return(

    <section className="profile-mutuals">


      <div className="sidebar-title">

        <h3>
          🤝 Mutual Connections
        </h3>

      </div>


      {
        mutuals.length === 0

        ?

        <p className="empty-text">
          No mutual connections yet
        </p>

        :

        <>

        <div className="mutual-list">

          {
            mutuals.slice(0,4).map(

              (person:any,index:number)=>(

                <div
                  className="mutual-card"
                  key={person._id || index}
                >

                  <img
                    src={
                      person.image ||
                      "https://i.pravatar.cc/100"
                    }
                    alt={person.name}
                  />

                  <span>
                    {person.name}
                  </span>

                </div>

              )

            )
          }

        </div>


        {
          mutuals.length > 4 &&

          <button className="view-more">

            View all {mutuals.length}

          </button>

        }

        </>

      }



      {
        shared.length > 0 &&

        <div className="shared-section">


          <h3>
            ✨ Shared Interests
          </h3>


          <div className="shared-list">

          {
            shared.slice(0,5).map(

              (item:string,index:number)=>(

                <span key={index}>
                  {item}
                </span>

              )

            )
          }

          </div>


        </div>

      }



    </section>

  )

}