import { useEffect, useState } from "react"
import "./ProfilePhotos.css"


export default function ProfilePhotos({
  user
}:any){


  const [selected,setSelected] = useState<number | null>(null)



  const photos=[

    ...(user.photos || [])

  ]



  if(user.image){

    photos.unshift(user.image)

  }



  if(user.coverImage){

    photos.unshift(user.coverImage)

  }



  function closeViewer(){

    setSelected(null)

  }



  function next(){

    if(selected === null) return

    setSelected(
      (selected + 1) % photos.length
    )

  }



  function previous(){

    if(selected === null) return


    setSelected(

      selected === 0

      ?

      photos.length - 1

      :

      selected - 1

    )

  }




  useEffect(()=>{


    function handleKey(e:KeyboardEvent){

      if(selected === null)
        return


      if(e.key==="ArrowRight")
        next()


      if(e.key==="ArrowLeft")
        previous()


      if(e.key==="Escape")
        closeViewer()

    }



    window.addEventListener(
      "keydown",
      handleKey
    )



    return()=>{

      window.removeEventListener(
        "keydown",
        handleKey
      )

    }


  },[selected])





  return(


    <section className="profile-photos">


      <div className="photos-header">

        <h2>
          📷 Media
        </h2>

        <span>
          {photos.length} Photos
        </span>

      </div>




      {
        photos.length===0


        ?

        <div className="empty-media">

          No media yet.

        </div>


        :


        <div className="photo-grid">


          {
            photos.map(
              (
                photo:string,
                index:number
              )=>(


              <div

                key={index}

                className="photo-card"

                onClick={()=>
                  setSelected(index)
                }

              >

                <img

                  src={photo}

                  alt="media"

                  loading="lazy"

                />


              </div>


            ))
          }


        </div>


      }





      {
        selected !== null &&

        <div

          className="media-modal"

          onClick={closeViewer}

        >


          <button

            className="close-media"

            onClick={closeViewer}

          >

            ✕


          </button>



          <button

            className="media-prev"

            onClick={
              e=>{
                e.stopPropagation()
                previous()
              }
            }

          >

            ←

          </button>




          <img

            src={
              photos[selected]
            }

            alt="preview"

            onClick={
              e=>e.stopPropagation()
            }

          />



          <button

            className="media-next"

            onClick={
              e=>{
                e.stopPropagation()
                next()
              }
            }

          >

            →

          </button>



          <div className="media-count">

            {selected + 1}
            /
            {photos.length}

          </div>



        </div>

      }


    </section>


  )

}