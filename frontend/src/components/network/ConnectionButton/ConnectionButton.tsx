import "./ConnectionButton.css"

interface ConnectionButtonProps {

  status?:
    | "none"
    | "pending"
    | "received"
    | "friends"

  onConnect?:()=>void

  onAccept?:()=>void

  onReject?:()=>void

}

export default function ConnectionButton({

  status="none",

  onConnect,

  onAccept,

  onReject

}:ConnectionButtonProps){

  if(status==="friends"){

    return(

      <button
        className="connection-btn friends"
      >

        ✓ Friends

      </button>

    )

  }

  if(status==="pending"){

    return(

      <button
        className="connection-btn pending"
      >

        Request Sent

      </button>

    )

  }

  if(status==="received"){

    return(

      <div className="request-actions">

        <button
          className="connection-btn accept"
          onClick={onAccept}
        >

          Accept

        </button>

        <button
          className="connection-btn reject"
          onClick={onReject}
        >

          Reject

        </button>

      </div>

    )

  }

  return(

    <button
      className="connection-btn connect"
      onClick={onConnect}
    >

      + Connect

    </button>

  )

}