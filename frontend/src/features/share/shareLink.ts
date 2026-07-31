export async function shareLink(

  title:string,

  text:string,

  url:string

){

  try{


    if(
      navigator.share
    ){

      await navigator.share({

        title,

        text,

        url

      })


      return {

        success:true,

        method:"native"

      }

    }



    await navigator.clipboard.writeText(
      url
    )


    alert(
      "LCMT link copied!"
    )


    return {

      success:true,

      method:"clipboard"

    }



  }catch(error){


    console.log(
      "Share failed",
      error
    )


    return {

      success:false

    }

  }

}