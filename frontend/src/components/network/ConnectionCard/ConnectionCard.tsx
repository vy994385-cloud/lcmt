import "./ConnectionCard.css"

import ConnectionButton from "../ConnectionButton/ConnectionButton"

interface ConnectionCardProps{

  user:{

    id:string

    name:string

    image?:string

    headline?:string

    location?:string

    mutual?:number

    status?:
      | "none"
      | "pending"
      | "received"
      | "friends"

  }

}

export default function ConnectionCard({

  user

}:ConnectionCardProps){

  return(

    <div className="connection-card">

      <img

        className="connection-avatar"

        src={
          user.image ||
          "https://picsum.photos/300"
        }

        alt={user.name}

      />

      <h3>

        {user.name}

      </h3>

      <p className="headline">

        {user.headline || "Community Member"}

      </p>

      <p className="location">

        📍 {user.location || "Unknown"}

      </p>

      <p className="mutual">

        🤝 {user.mutual || 0} Mutual Connections

      </p>

      <ConnectionButton

        status={user.status}

      />

    </div>

  )

}