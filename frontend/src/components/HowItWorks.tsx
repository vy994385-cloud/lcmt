import "./HowItWorks.css"

function HowItWorks() {

  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      text: "Share your interests, personality, and what makes you unique."
    },
    {
      number: "02",
      title: "Discover People",
      text: "Find people who match your vibe, thoughts, and values."
    },
    {
      number: "03",
      title: "Start Conversations",
      text: "Move beyond likes and begin meaningful conversations."
    },
    {
      number: "04",
      title: "Build Something Meaningful",
      text: "Let small moments create real and lasting bonds."
    }
  ]


  return (

    <section className="how">


      <div className="how-header">

        <h2>
          How LCMT Works
        </h2>


        <p>
          Creating meaningful connections made simple.
        </p>

      </div>





      <div className="steps">


        {
          steps.map((step,index)=>(

            <div 
              className="step"
              key={index}
            >

              <div className="step-number">
                {step.number}
              </div>


              <div className="step-content">

                <h3>
                  {step.title}
                </h3>


                <p>
                  {step.text}
                </p>

              </div>


            </div>

          ))
        }


      </div>



    </section>

  )

}


export default HowItWorks