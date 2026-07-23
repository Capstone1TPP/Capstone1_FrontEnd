import { useEffect } from "react"
import { useParams } from "react-router"

function PollResults() {
    const { id } = useParams()

        // when this component is loaded i would like to do the following
        // 1. get the entire poll infomartion so i can extract the poll name and descriptions
        // 2. get the poll options so i can display them through the labels
        // 3. get the poll votes so i can get the total amount of votes 

    return (
        <div className="poll-result-container">
            <h3>Poll Name</h3>
            <p>Poll Description Lorem ipsum dolor sit amet.</p>

            <div className="poll-stats">
                <div className="poll-option">
                    <label htmlFor="">Option A</label>
                    <progress value={45} max={100}></progress>
                </div>
                
                <div className="poll-option">
                    <label htmlFor="">Option A</label>
                    <progress value={45} max={100}></progress>
                </div>

                <div className="poll-option">
                    <label htmlFor="">Option A</label>
                    <progress value={45} max={100}></progress>
                </div>
            </div>
        </div>
    )
}

export default PollResults