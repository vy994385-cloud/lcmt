import api from "../../api/axios"

export function reactToMessage(
  id:string,
  emoji:string
){

  return api.post(
    `/chat/${id}/reaction`,
    { emoji }
  )

}

export function editMessage(
  id:string,
  text:string
){

  return api.put(
    `/chat/${id}`,
    { text }
  )

}

export function deleteMessage(
  id:string,
  everyone=false
){

  return api.delete(
    `/chat/${id}?everyone=${everyone}`
  )

}

export function starMessage(
  id:string
){

  return api.post(
    `/chat/${id}/star`
  )

}