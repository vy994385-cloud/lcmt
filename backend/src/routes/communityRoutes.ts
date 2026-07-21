import { Router } from "express"

import {
 getCommunities,
 joinCommunity
} from "../controllers/communityController"


const router = Router()


router.get(
 "/",
 getCommunities
)


router.post(
 "/:id/join",
 joinCommunity
)


export default router