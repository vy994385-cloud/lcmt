import {
  Image,
  Video,
  Mic,
  BarChart3,
  Send
} from "lucide-react"

import "./CommunityComposer.css"

interface Props{

  user:any

  content:string

  loading:boolean

  setContent:(value:string)=>void

  onPost:()=>void

}

function CommunityComposer({

  user,

  content,

  loading,

  setContent,

  onPost

}:Props){

  return(

    <section className="community-composer">

      <div className="composer-top">

        <img

          src={
            user.image ||
            "https://picsum.photos/60"
          }

          alt="profile"

          className="composer-avatar"

        />



        <div className="composer-input">

          <h3>

            What's on your mind,

            {user.name || "Member"}?

          </h3>



          <textarea

            value={content}

            placeholder="Share something..."

            onChange={(e)=>

              setContent(
                e.target.value
              )

            }

          />

        </div>

      </div>



      <div className="composer-bottom">

        <div className="composer-tools">

          <button>

            <Image size={18}/>

            Photo

          </button>

          <button>

            <Video size={18}/>

            Video

          </button>

          <button>

            <Mic size={18}/>

            Voice

          </button>

          <button>

            <BarChart3 size={18}/>

            Poll

          </button>

        </div>



        <button

          className="post-button"

          disabled={loading}

          onClick={onPost}

        >

          <Send size={18}/>

          {

            loading

            ?

            "Posting..."

            :

            "Post"

          }

        </button>

      </div>

    </section>

  )

}

export default CommunityComposer