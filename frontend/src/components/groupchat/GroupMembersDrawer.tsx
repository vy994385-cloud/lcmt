type Member = {
  _id: string
  name: string
  image?: string
}

type Props = {
  open: boolean

  members: Member[]

  onClose: () => void
}

export default function GroupMembersDrawer({
  open,
  members,
  onClose,
}: Props) {

  if (!open) return null

  return (
    <aside className="members-drawer">

      <div className="drawer-header">

        <h3>Members</h3>

        <button onClick={onClose}>
          ✕
        </button>

      </div>

      {members.map(member => (

        <div
          key={member._id}
          className="member-row"
        >

          <img
            src={
              member.image ||
              "https://placehold.co/50"
            }
            alt={member.name}
          />

          <span>{member.name}</span>

        </div>

      ))}

    </aside>
  )
}