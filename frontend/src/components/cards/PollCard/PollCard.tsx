import Card from "../../ui/Card/Card"
import Button from "../../ui/Button/Button"
import type { Poll } from "../../../types/Poll"

import "./PollCard.css"

interface Props{
  poll: Poll
}

function PollCard({
  poll
}:Props){

  const maxVotes = Math.max(
    ...poll.options.map(option=>option.votes)
  )

  return(

    <Card className="poll-card">

      <div className="poll-header">

        <h3>
          📊 Poll of the Day
        </h3>

        <span>
          Ends in {poll.endsIn}
        </span>

      </div>

      <h2>
        {poll.question}
      </h2>

      <div className="poll-options">

        {
          poll.options.map(option=>(

            <div
              key={option.id}
              className="poll-option"
            >

              <div
                className="poll-fill"
                style={{
                  width:`${
                    option.votes/maxVotes*100
                  }%`
                }}
              />

              <span>
                {option.text}
              </span>

              <strong>
                {option.votes}
              </strong>

            </div>

          ))
        }

      </div>

      <div className="poll-footer">

        <small>

          {poll.totalVotes} votes

        </small>

        <Button>

          Vote

        </Button>

      </div>

    </Card>

  )

}

export default PollCard