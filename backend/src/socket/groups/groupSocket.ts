import { Server, Socket } from "socket.io"

export function registerGroupSocket(
  io: Server,
  socket: Socket
) {

  socket.on(
    "join-group",
    (groupId: string) => {

      socket.join(`group:${groupId}`)

    }
  )

  socket.on(
    "leave-group",
    (groupId: string) => {

      socket.leave(`group:${groupId}`)

    }
  )

  socket.on(
    "group-typing",
    (data) => {

      socket
        .to(`group:${data.groupId}`)
        .emit(
          "group-typing",
          data
        )

    }
  )

}