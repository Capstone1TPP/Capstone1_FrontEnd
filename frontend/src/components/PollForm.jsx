import { useState } from "react"

function PollForm () {
    const [polling, setPolling] = useState({
        pollName: '',
        pollDescription: ''
    })
    const [options, setOptions] = useState([])
    const [text, setText] = useState('')

    function handleChange (e) {
        setPolling((prevPolling) => {
            return {
                ...prevPolling,
                [e.target.name]: e.target.value,
            }
        })
    }
    async function handleSubmit(e) {
        
        const response = await fetch('http://localhost:4000/polls', {
            method: "POST",
            body: JSON.stringify(polling.pollName, polling.pollDescription, options),
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.json()

        e.preventDefault()
    }
    function addOption() {
        setOptions([...options, text])
        setText('')
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="">Poll Name</label>
                    <input type="text" name="pollName" placeholder="" onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="">Poll Description</label>
                    <input type="text" name="pollDescription" onChange={handleChange}/>
                </div>

                <h2>Poll Options</h2>
                <div>
                    <input 
                        placeholder="Type your option" 
                        value={text} 
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button onClick={addOption}>Add Option</button>
                    
                </div>
                <button type="submit">submit form</button>
            </form>
            <div>
                <p>Options List</p>
                <ul>
                    {options.map((option) => <li>{option}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default PollForm