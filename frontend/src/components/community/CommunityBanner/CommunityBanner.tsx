import "./CommunityBanner.css"

interface CommunityBannerProps {

  community?: {

    name?: string

    description?: string

    banner?: string

    image?: string

    members?: number

    visibility?: "Public" | "Private"

    tags?: string[]

    joined?: boolean

  }

}

function CommunityBanner({

  community = {}

}: CommunityBannerProps) {

  return (

    <section className="community-banner">

      <div

        className="banner-cover"

        style={{

          backgroundImage:`url(${

            community.banner ||

            "https://picsum.photos/1400/350"

          })`

        }}

      />



      <div className="banner-content">

        <img

          className="banner-avatar"

          src={

            community.image ||

            "https://picsum.photos/200"

          }

          alt={

            community.name ||

            "Community"

          }

        />



        <div className="banner-info">

          <div className="banner-title">

            <h1>

              {

                community.name ||

                "Community Name"

              }

            </h1>



            <span className="visibility">

              {

                community.visibility ||

                "Public"

              }

            </span>

          </div>



          <p>

            {

              community.description ||

              "A place where people learn, share ideas and grow together."

            }

          </p>



          <div className="community-meta">

            👥 {

              community.members || 0

            } Members

          </div>



          <div className="community-tags">

            {

              (community.tags || [

                "community",

                "learning",

                "discussion"

              ]).map(tag=>(

                <span key={tag}>

                  #{tag}

                </span>

              ))

            }

          </div>

        </div>



        <div className="banner-actions">

          <button className="join-btn">

            {

              community.joined

              ?

              "Joined"

              :

              "Join"

            }

          </button>



          <button className="invite-btn">

            Invite

          </button>

        </div>

      </div>

    </section>

  )

}

export default CommunityBanner