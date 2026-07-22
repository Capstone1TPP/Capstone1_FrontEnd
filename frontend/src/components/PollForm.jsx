import { useState } from "react"
import { useNavigate } from "react-router"

function PollForm () {
    const [polling, setPolling] = useState({
        pollName: '',
        pollDescription: ''
    })
    const [options, setOptions] = useState([])
    const [text, setText] = useState('')
    const nav = useNavigate()

    function handleChange (e) {
        setPolling((prevPolling) => {
            return {
                ...prevPolling,
                [e.target.name]: e.target.value,
            }
        })
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const response = await fetch('http://localhost:4000/polls', {
            method: "POST",
            body: JSON.stringify({title: polling.pollName, description: polling.pollDescription, options}),
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.json()

        nav('/')
    }
    function addOption(e) {
        e.preventDefault()
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