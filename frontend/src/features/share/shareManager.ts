import { renderTextImage } from "./renderTextImage"
import { shareLink } from "./shareLink"
import { shareMedia } from "./shareMedia"

export async function sharePost(
  post:any,
  card?:HTMLElement
){

  const url =
    window.location.origin +
    "/post/" +
    post._id


  const title =
    post.author?.name || "LCMT Post"


  const text =
    post.content || "Check this post on LCMT"



  // Native share support (Android/iOS)

  if(
    navigator.share
  ){

    try{

      await navigator.share({

        title,

        text,

        url

      })


      return {
        success:true,
        method:"native"
      }


    }catch(error){

      console.log(
        "Share cancelled"
      )

    }

  }



  // Media posts fallback

  if(post.image){

 const shared =
 await shareMedia(
 post.image,
 title,
 text
)

 if(shared)
 return true

}


if(post.video){

 const shared =
 await shareMedia(
 post.image,
 title,
 text
)
 if(shared)
 return true

}


if(post.voice){

 const shared =
 await shareMedia(
 post.image,
 title,
 text
)

 if(shared)
 return true

}



  // Generate LCMT share card

  if(card){

    const image =
      await renderTextImage(card)


    const link =
      document.createElement("a")


    link.href=image

    link.download="lcmt-post.png"

    link.click()


    return {

      success:true,
      method:"image"

    }

  }



  // Final fallback

  return shareLink(
    title,
    text,
    url
  )


}