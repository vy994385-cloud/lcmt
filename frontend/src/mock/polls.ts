import type { Poll } from "../types/Poll"

const polls: Poll[] = [
  {
    id: "1",
    question: "Which community should host the next live discussion?",
    options: [
      {
        id: "1",
        text: "🏏 Cricket",
        votes: 324
      },
      {
        id: "2",
        text: "🤖 AI",
        votes: 281
      },
      {
        id: "3",
        text: "🏛 Politics",
        votes: 197
      },
      {
        id: "4",
        text: "🎬 Movies",
        votes: 164
      }
    ],
    totalVotes: 966,
    endsIn: "8 hours"
  }
]

export default polls