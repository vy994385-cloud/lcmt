export async function shareMedia(
  fileUrl:string,
  title:string,
  text:string
){

  try{

    const response =
      await fetch(fileUrl)


    const blob =
      await response.blob()


    const file =
      new File(
        [blob],
        "lcmt-media",
        {
          type:blob.type
        }
      )



    if(
      navigator.canShare &&
      navigator.canShare({
        files:[file]
      })
    ){

      await navigator.share({

        title,

        text,

        files:[
          file
        ]

      })


      return true

    }


  }catch(error){

    console.log(
      "Media share failed",
      error
    )

  }


  return false

}