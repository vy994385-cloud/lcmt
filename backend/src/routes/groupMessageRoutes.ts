import express from "express"

import { protect } from "../middleware/authMiddleware"

import {

sendGroupMessage,

getGroupMessages

}

from "../controllers/groups/groupMessageController"



const router =
express.Router()



router.get(

"/:id",

protect,

getGroupMessages

)



router.post(

"/:id",

protect,

sendGroupMessage

)



export default router