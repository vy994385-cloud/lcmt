import "./Avatar.css"

interface AvatarProps{

  src?: string

  alt?: string

  size?: number

  online?: boolean

  onClick?: ()=>void

}

function Avatar({

  src,

  alt="Avatar",

  size=60,

  online,

  onClick

}:AvatarProps){

  return(

    <div

      className="avatar-wrapper"

      onClick={onClick}

      style={{

        width:size,

        height:size

      }}

    >

      <img

        className="avatar"

        src={
          src ||
          "https://picsum.photos/300"
        }

        alt={alt}

      />

      {

        online !== undefined &&

        <span

          className={`status-dot ${
            online
            ? "online"
            : "offline"
          }`}

        />

      }

    </div>

  )

}

export default Avatar