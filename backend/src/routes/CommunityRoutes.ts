import express from "express"

import {
  getCommunities,
  joinCommunity
} from "../controllers/communityController"


const router = express.Router()


router.get(
  "/",
  getCommunities
)


router.post(
  "/:id/join",
  (req,res,next)=>{

    console.log(
      "JOIN REQUEST RECEIVED",
      req.params.id,
      req.body
    )

    next()

  },
  joinCommunity
)


export default router