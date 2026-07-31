import "./UpcomingEvents.css"

interface Props{

  events:string[]

}

function UpcomingEvents({

  events

}:Props){

  return(

    <section className="home-section">

      <h2>

        🎉 Upcoming Events

      </h2>

      <div className="event-card">

        {

          events.map((event,index)=>(

            <p key={index}>

              📅 {event}

            </p>

          ))

        }

      </div>

    </section>

  )

}

export default UpcomingEvents