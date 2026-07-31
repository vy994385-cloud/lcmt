import "./CommunityComments.css"

interface Props{

  post:any

  value:string

  setValue:(value:string)=>void

  onComment:()=>void

}

function CommunityComments({

  post,

  value,

  setValue,

  onComment

}:Props){

  return(

    <section className="community-comments">

      <div className="comment-input">

        <input

          placeholder="Write a comment..."

          value={value}

          onChange={(e)=>

            setValue(e.target.value)

          }

        />



        <button

          onClick={onComment}

        >

          Comment 💬

        </button>

      </div>



      <div className="comment-list">

        {

          post.comments?.map((comment:any)=>(

            <div

              key={comment._id}

              className="comment-item"

            >

              <strong>

                {

                  comment.user?.name ||

                  "Member"

                }

              </strong>



              <span>

                {comment.text}

              </span>

            </div>

          ))

        }

      </div>

    </section>

  )

}

export default CommunityComments