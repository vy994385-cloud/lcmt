import axios from "axios"

const API = axios.create({
  baseURL: "https://lcmt-backend.onrender.com/api",
})

export default API