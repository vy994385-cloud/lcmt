import "./PostShareCard.css"


interface Props{

  post:any

}



export default function PostShareCard({
  post
}:Props){


  return (

    <div 
      id="lcmt-share-card"
      className="share-card"
    >

      <div className="share-logo">

        🌍 LCMT

      </div>



      <div className="share-author">

        {post.author?.name || "LCMT Member"}

      </div>



      <div className="share-content">

        {post.content}

      </div>



      {
        post.community &&
        (

          <div className="share-community">

            #{post.community.name}

          </div>

        )
      }



      <div className="share-footer">

        Explore • Connect • Build Communities

      </div>


    </div>

  )

}