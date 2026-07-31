import "./CommunityHeader.css"

interface Props {
  name: string
  description: string
  icon?: string
  members: number
  joined: boolean

  onJoin: () => void
}

function CommunityHeader({

  name,

  description,

  icon = "🌍",

  members,

  joined,

  onJoin

}: Props) {

  return (

    <section className="community-header">

      <div className="community-banner" />



      <div className="community-info">

        <div className="community-icon">

          {icon}

        </div>



        <div className="community-text">

          <h1>

            {name}

          </h1>



          <p>

            {description}

          </p>



          <span>

            👥 {members} Members

          </span>

        </div>



        <div className="community-actions">

          <button

            className="join-btn"

            onClick={onJoin}

          >

            {

              joined

              ?

              "Joined ✓"

              :

              "Join Community"

            }

          </button>



          <button

            className="share-btn"

          >

            Share

          </button>

        </div>

      </div>

    </section>

  )

}

export default CommunityHeader