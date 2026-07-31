import "./ReactionBar.css"

export type MessageReaction = {
  emoji: string
  user: string
}

type Props = {
  reactions: MessageReaction[]
  onReact?: (emoji: string) => void
}

function ReactionBar({
  reactions,
  onReact,
}: Props) {

  if (!reactions || reactions.length === 0) {
    return null
  }

  const grouped = reactions.reduce(
    (
      map: Record<string, number>,
      reaction
    ) => {

      map[reaction.emoji] =
        (map[reaction.emoji] || 0) + 1

      return map

    },
    {}
  )

  return (

    <div className="reaction-bar">

      {Object.entries(grouped).map(
        ([emoji, count]) => (

          <button
            key={emoji}
            className="reaction-chip"
            onClick={() => onReact?.(emoji)}
          >

            <span>{emoji}</span>

            <span>{count}</span>

          </button>

        )
      )}

    </div>

  )

}

export default ReactionBar