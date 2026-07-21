import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import { AppProvider } from "./context/AppContext"

import "./index.css"
import "./styles/theme.css"

import socket from "./socket"


socket.on(
  "connect",
  () => {

    console.log(
      "🟢 Connected:",
      socket.id
    )

    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    )

    if (user._id) {

      socket.emit(
        "join",
        user._id
      )

    }

  }
)


ReactDOM.createRoot(
  document.getElementById("root")!
).render(

  <React.StrictMode>

    <BrowserRouter>

      <AppProvider>

        <App />

      </AppProvider>

    </BrowserRouter>

  </React.StrictMode>

)