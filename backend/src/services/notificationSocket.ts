import { getIO } from "../socket"


export function sendNotificationSocket(
userId:string,
notification:any
){

const io =
getIO()


if(!io){
return
}


io.to(userId)
.emit(
"notification",
notification
)

}