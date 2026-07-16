import { Response } from "express"
import User from "../models/User"
import { AuthRequest } from "../middleware/authMiddleware"



export async function updateProfile(
  req: AuthRequest,
  res: Response
) {
  try {

    const {
      age,
      gender,
      college,
      course,
      year,
      bio,
      interests,
      image,
      lookingFor,
      values,
      personality,
    } = req.body



    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        age,
        gender,
        college,
        course,
        year,
        bio,
        interests,
        image,
        lookingFor,
        values,
        personality,
      },
      {
        new: true,
      }
    ).select("-password")



    res.status(200).json({
      message: "Profile updated successfully",
      user,
    })



  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: "Server Error",
    })

  }
}







export async function getMyProfile(
  req: AuthRequest,
  res: Response
) {

  try {

    const user =
      await User.findById(req.userId)
      .select("-password")



    res.status(200).json(user)



  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: "Server Error",
    })

  }

}









export async function getUsers(
  req: AuthRequest,
  res: Response
) {

  try {


    const users = await User.find({

      // Do not show current user
      _id: {
        $ne: req.userId,
      },


      // Only completed profiles

      bio: {
        $ne: "",
      },


      college: {
        $ne: "",
      },


      course: {
        $ne: "",
      },


    })
    .select("-password")



    res.status(200).json(users)



  } catch (error) {


    console.error(error)


    res.status(500).json({
      message: "Server Error",
    })


  }

}









export async function likeUser(
  req: AuthRequest,
  res: Response
) {

  try {


    const currentUserId = req.userId

    const likedUserId = req.params.userId




    if (currentUserId === likedUserId) {

      return res.status(400).json({
        message: "You cannot like yourself",
      })

    }




    const currentUser =
      await User.findById(currentUserId)



    const likedUser =
      await User.findById(likedUserId)




    if (!currentUser || !likedUser) {

      return res.status(404).json({
        message: "User not found",
      })

    }





    const alreadyLiked =
      currentUser.likedUsers.some(
        (id: any) =>
          id.toString() === likedUserId
      )



    if (alreadyLiked) {

      return res.status(200).json({
        message: "Already liked",
      })

    }






    currentUser.likedUsers.push(
      likedUser._id
    )





    let matched = false





    const mutualLike =
      likedUser.likedUsers.some(
        (id: any) =>
          id.toString() === currentUserId
      )






    if (mutualLike) {


      matched = true




      const alreadyMatched =
        currentUser.matchedUsers.some(
          (id: any) =>
            id.toString() === likedUserId
        )



      if (!alreadyMatched) {

        currentUser.matchedUsers.push(
          likedUser._id
        )

      }





      const reverseMatch =
        likedUser.matchedUsers.some(
          (id: any) =>
            id.toString() === currentUserId
        )



      if (!reverseMatch) {

        likedUser.matchedUsers.push(
          currentUser._id
        )

      }



      await likedUser.save()


    }





    await currentUser.save()





    res.status(200).json({

      message: matched
        ? "It's a Match! ❤️"
        : "Liked successfully ❤️",

      matched,

    })




  } catch (error) {


    console.error(error)


    res.status(500).json({
      message: "Server Error",
    })


  }

}