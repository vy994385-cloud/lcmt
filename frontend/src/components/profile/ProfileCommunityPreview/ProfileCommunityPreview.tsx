import "./ProfileCommunityPreview.css"

interface Props{
  user:any
}

export default function ProfileCommunityPreview({
  user
}:Props){

  const communities =
    user.communities || []


  return(

    <section className="community-preview">


      <h3>
        🌍 Communities
      </h3>


      {
        communities.length === 0

        ?

        <p className="empty-preview">
          No communities joined yet
        </p>

        :

        <>

        <div className="preview-list">

        {
          communities
          .slice(0,3)
          .map((community:any,index:number)=>(

            <div
              className="preview-card"
              key={community._id || index}
            >

              <div className="preview-icon">

                {
                  community.icon || "🌍"
                }

              </div>


              <div>

                <strong>
                  {community.name}
                </strong>

                <span>
                  👥 {community.members?.length || 0} members
                </span>

              </div>


            </div>

          ))
        }

        </div>


        {
          communities.length > 3 &&

          <button className="view-more">

            View all {communities.length}

          </button>

        }

        </>

      }


    </section>

  )

}