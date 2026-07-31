import GroupMessage from "../../models/groups/GroupMessage"

export async function createGroupMessage(
  data: any
) {

  return await GroupMessage.create(data)

}

export async function getGroupMessages(
  groupId: string
) {

  return await GroupMessage.find({

    group: groupId

  })

    .populate(
      "sender",
      "name image"
    )

    .sort({

      createdAt: 1

    })

}