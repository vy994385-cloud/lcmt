import express from "express"

import { protect }
from "../middleware/authMiddleware"

import {

createGroup,
getGroups,
getGroupById

}
from "../controllers/group/groupController"


import {

joinGroup,
leaveGroup,
removeGroupMember

}
from "../controllers/group/groupMemberController"


import {

promoteMember,
demoteMember,
transferOwnership

}
from "../controllers/group/groupAdminController"

const router =
express.Router()



router.get(

"/",

protect,

getGroups

)



router.get(

"/:id",

protect,

getGroupById

)



router.post(

"/",

protect,

createGroup

)



router.post(

"/leave/:id",

protect,

leaveGroup

)



router.delete(

"/:id/member/:userId",

protect,

removeGroupMember

)



router.post(

"/join/:id",

protect,

joinGroup

)

router.put(
"/:id/promote/:userId",
protect,
promoteMember
)


router.put(
"/:id/demote/:userId",
protect,
demoteMember
)


router.put(
"/:id/transfer/:userId",
protect,
transferOwnership
)



export default router