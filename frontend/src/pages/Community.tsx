import { Navigate, useParams } from "react-router-dom"


export default function Community(){

  const { id } = useParams()


  return (

    <Navigate
      to={`/community/${id}`}
      replace
    />

  )

}
