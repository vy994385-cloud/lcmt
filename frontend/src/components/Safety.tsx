import "./Safety.css"

function Safety() {

  const safetyFeatures = [
    {
      icon: "🔒",
      title: "Privacy First",
      text: "Your personal information stays protected with a safer connection experience."
    },
    {
      icon: "🤝",
      title: "Respectful Community",
      text: "A space where people connect with kindness, honesty, and respect."
    },
    {
      icon: "✨",
      title: "Genuine Interactions",
      text: "Focus on meaningful conversations instead of only appearances."
    }
  ]


  return (

    <section className="safety">


      <div className="safety-header">


        <h2>
          A Safer Way To Connect
        </h2>


        <p>
          Meaningful connections grow in an environment built on trust and respect.
        </p>


      </div>





      <div className="safety-cards">


        {
          safetyFeatures.map((item,index)=>(

            <div 
              className="safety-card"
              key={index}
            >


              <div className="safety-icon">

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


export default Safety