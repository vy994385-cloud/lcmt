import { useEffect } from "react"
import API from "../api/axios"

function TestBackend() {

  useEffect(() => {

    API.get("/status")
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])


  return (
    <main style={{ padding: "40px" }}>
      <h1>
        Checking Backend Connection...
      </h1>
    </main>
  )
}

export default TestBackend