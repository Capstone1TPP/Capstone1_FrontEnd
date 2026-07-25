import { useEffect, useState } from "react"
import { useParams } from "react-router"

function PollResults() {
    const { id } = useParams() 
    const [poll, setPoll] = useState({})
    const [totalvotes, setTotalVotes] = useState(0)

    useEffect(() => {
        const getPollResult = async () => {
            const response = await fetch(`http://localhost:4000/polls/${id}`)
            const data = await response.json()
            setPoll(data) 
        }

        getPollResult()
    }, [])

    const totalVotes = !!poll.options && poll.options.reduce((acc, curr) => {
        return acc + curr.Votes.length
    }, 0)   

    console.log(totalVotes) 
    return (
        <div className="poll-result-container">
            <h1>Poll Result</h1>
            <h3>Total Votes: {totalVotes}</h3>
            <h3>{poll.title}</h3>
            <p>{poll.description}</p>
            <div className="poll-stats">
                {!!poll.options && poll.options.map((option) => {
                    const optionVotePercent = (option.Votes.length / totalVotes) * 100
                    return (
                        <div className="poll-option" key={option.id}>
                            <label htmlFor="">{option.text}</label>
                            <progress value={option.Votes.length} max={totalVotes}></progress>
                            <span>{Math.round(optionVotePercent)} %</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PollResults