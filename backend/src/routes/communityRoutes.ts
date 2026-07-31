import express from "express"

import {

getCommunities,
getCommunityById,
createCommunity

} from "../controllers/community/communityController"


import {

joinCommunity,
leaveCommunity

} from "../controllers/community/communityMemberController"



import {

addModerator

} from "../controllers/community/communityModerationController"

import { protect } from "../middleware/authMiddleware"

const router =
express.Router()



router.get(
"/",
getCommunities
)


router.get(
"/:id",
getCommunityById
)


router.post(
"/create",
protect,
createCommunity
)

router.post(
"/:id/join",
protect,
joinCommunity
)

router.post(
"/:id/leave",
protect,
leaveCommunity
)

router.post(
"/:id/moderator/:userId",
protect,
addModerator
)



export default router