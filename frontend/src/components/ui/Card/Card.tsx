import type { ReactNode } from "react"
import "./Card.css"

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
  padding?: "none" | "sm" | "md" | "lg"
}

function Card({
  children,
  className = "",
  onClick,
  hover = true,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={`
        card-ui
        ${hover ? "card-hover" : ""}
        card-padding-${padding}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card