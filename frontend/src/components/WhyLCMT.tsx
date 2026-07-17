import "./WhyLCMT.css"

function WhyLCMT() {

  const features = [
    {
      icon: "❤️",
      title: "Real Connections",
      text: "Meet people who value meaningful conversations."
    },
    {
      icon: "✨",
      title: "Authentic Profiles",
      text: "Express yourself beyond pictures and create your own story."
    },
    {
      icon: "🔒",
      title: "Safer Experience",
      text: "A community built around respect, trust, and kindness."
    }
  ]


  return (

    <section className="why">


      <div className="section-header">

        <h2>
          Why LCMT?
        </h2>


        <p>
          Because connections should be more than just a swipe.
        </p>

      </div>





      <div className="cards">


        {
          features.map((item,index)=>(

            <div 
              className="why-card"
              key={index}
            >

              <div className="feature-icon">
                {item.icon}
              </div>


              <h3>
                {item.title}
              </h3>


              <p>
                {item.text}
              </p>


            </div>

          ))
        }


      </div>



    </section>

  )

}


export default WhyLCMT