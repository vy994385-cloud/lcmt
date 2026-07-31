export default function getSenderId(message:any){

if(typeof message.sender==="object"){

return message.sender?._id

}

return message.sender

}