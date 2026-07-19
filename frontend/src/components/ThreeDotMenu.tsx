import { useEffect, useRef, useState } from "react"
import { MoreVertical } from "lucide-react"
import "./ThreeDotMenu.css"

type MenuItem = {
  label: string
  onClick: () => void
}

type Props = {
  items: MenuItem[]
}

function ThreeDotMenu({ items }: Props) {
  const [open, setOpen] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener(
      "mousedown",
      handleClick
    )

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      )
  }, [])

  return (
    <div
      className="three-dot-menu"
      ref={ref}
    >
      <button
        className="menu-button"
        onClick={() => setOpen(!open)}
      >
        <MoreVertical size={20} />
      </button>

      {open && (
        <div className="menu-dropdown">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick()
                setOpen(false)
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ThreeDotMenu