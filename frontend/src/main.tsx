import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import { AppProvider } from "./context/AppContext"

import "./index.css"
import "./styles/theme.css"

import socket from "./socket"

import { Toaster } from "react-hot-toast"

import {
  NotificationProvider
} from "./context/NotificationContext"

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

    <NotificationProvider>

      <App />

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#ffffff",
            color: "#111827",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            boxShadow: "0 12px 32px rgba(0,0,0,.12)",
            fontWeight: 500,
          },

          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#ffffff",
            },
          },

          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#ffffff",
            },
          },
        }}
      />

    </NotificationProvider>

  </AppProvider>

</BrowserRouter>
  </React.StrictMode>

)