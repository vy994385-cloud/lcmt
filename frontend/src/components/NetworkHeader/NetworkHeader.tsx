import "./NetworkHeader.css"

interface Props{

  connections:number

  communities:number

  requests:number

}

export default function NetworkHeader({

  connections,

  communities,

  requests

}:Props){

  return(

    <section className="network-header">

      <h1>

        Your Social Space

      </h1>

      <p>

        Connect, share, discover communities and grow together.

      </p>

      <div className="network-stats">

        <div className="network-stat">

          <span>

            🤝

          </span>

          <h3>

            {connections}

          </h3>

          <p>

            Connections

          </p>

        </div>

        <div className="network-stat">

          <span>

            🌎

          </span>

          <h3>

            {communities}

          </h3>

          <p>

            Communities

          </p>

        </div>

        <div className="network-stat">

          <span>

            📩

          </span>

          <h3>

            {requests}

          </h3>

          <p>

            Requests

          </p>

        </div>

      </div>

    </section>

  )

}