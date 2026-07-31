export interface SharePost {

  _id:string

  content:string

  author?:{

    name:string

  }

}

const BASE_URL = window.location.origin

function postLink(id:string){

  return `${BASE_URL}/post/${id}`

}

export async function sharePost(post:SharePost){

  const url = postLink(post._id)

  const text =
`${post.author?.name || "Someone"} shared a discussion on LCMT

"${post.content}"

Join the conversation:
${url}`

  if(navigator.share){

    try{

      await navigator.share({

        title:"LCMT",

        text,

        url

      })

      return

    }

    catch{

      return

    }

  }

  return false

}

export async function copyLink(id:string){

  const url = postLink(id)

  await navigator.clipboard.writeText(url)

  alert("Link copied!")

}

export function whatsapp(id:string){

  const url = postLink(id)

  window.open(

`https://wa.me/?text=${encodeURIComponent(url)}`,

"_blank"

  )

}

export function telegram(id:string){

  const url = postLink(id)

  window.open(

`https://t.me/share/url?url=${encodeURIComponent(url)}`,

"_blank"

  )

}

export function twitter(id:string){

  const url = postLink(id)

  window.open(

`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,

"_blank"

  )

}

export function facebook(id:string){

  const url = postLink(id)

  window.open(

`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,

"_blank"

  )

}