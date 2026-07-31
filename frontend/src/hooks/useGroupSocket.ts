import { useEffect } from "react"
import socket from "../socket"

export default function useGroupSocket(
  groupId: string,
  onMessage: (message: any) => void
) {
  useEffect(() => {
    if (!groupId) return

    socket.emit("join-group", groupId)

    socket.on(
      "group-message",
      onMessage
    )

    return () => {
      socket.emit(
        "leave-group",
        groupId
      )

      socket.off(
        "group-message",
        onMessage
      )
    }
  }, [groupId, onMessage])
}