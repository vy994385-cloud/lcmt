import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"

import "./GroupChat.css"

import GroupHeader from "../../components/groupchat/GroupHeader"
import GroupComposer from "../../components/groupchat/GroupComposer"
import GroupInfoModal from "../../components/groupchat/GroupInfoModal"
import GroupMembersDrawer from "../../components/groupchat/GroupMembersDrawer"
import GroupMessageBubble from "../../components/groupchat/GroupMessageBubble"

import {
  getGroup,
  getMessages,
  sendMessage,
} from "../../services/groupChatService"

import type {
  GroupData,
  GroupMessage,
} from "../../services/groupChatService"

import useGroupSocket from "../../hooks/useGroupSocket"

export default function GroupChat() {

  const { id } = useParams()

  const currentUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  )

  const [group, setGroup] =
    useState<GroupData | null>(null)

  const [messages, setMessages] =
    useState<GroupMessage[]>([])

  const [showInfo, setShowInfo] =
    useState(false)

  const [showMembers, setShowMembers] =
    useState(false)

  const bottomRef =
    useRef<HTMLDivElement>(null)

  async function load() {

    if (!id) return

    const groupData =
      await getGroup(id)

    const messageData =
      await getMessages(id)

    setGroup(groupData)

    setMessages(messageData)

  }

  useEffect(() => {
    load()
  }, [id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    })
  }, [messages])

  useGroupSocket(
    id || "",
    (message) => {

      setMessages(prev => [

        ...prev,

        message

      ])

    }
  )

  async function handleSend(
    text: string
  ) {

    if (!id) return

    const message =
      await sendMessage(
        id,
        {
          text,
          type: "text",
        }
      )

    setMessages(prev => [

      ...prev,

      message

    ])

  }

  if (!group)
    return <p>Loading...</p>

  return (

    <main className="group-chat-page">

      <GroupHeader

        name={group.name}

        image={group.image}

        members={group.members.length}

        onInfo={() =>
          setShowInfo(true)
        }

        onMembers={() =>
          setShowMembers(true)
        }

      />

      <section className="group-messages">

        {messages.map(message => (

          <GroupMessageBubble

            key={message._id}

            mine={
              message.sender._id ===
              currentUser._id
            }

            sender={
              message.sender.name
            }

            avatar={
              message.sender.image
            }

            text={message.text}

            time={
              new Date(
                message.createdAt
              ).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )
            }

          />

        ))}

        <div ref={bottomRef} />

      </section>

      <GroupComposer
        onSend={handleSend}
      />

      <GroupMembersDrawer

        open={showMembers}

        members={group.members}

        onClose={() =>
          setShowMembers(false)
        }

      />

      <GroupInfoModal

        open={showInfo}

        name={group.name}

        description={
          group.description
        }

        onClose={() =>
          setShowInfo(false)
        }

      />

    </main>

  )

}