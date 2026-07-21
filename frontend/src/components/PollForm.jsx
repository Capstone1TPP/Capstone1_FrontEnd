import { useState } from "react"

function PollForm () {
    const [option, setOptions] = useState({
        pollName: '',
        pollDescription: '',
        optionOne: '',
        optionTwo: '',
        optionThree: '',
    })
    function handleChange (e) {
        setOptions((prevOptions) => {
            return {
                ...prevOptions,
                [e.target.name]: e.target.value,
            }
        })

        // fetch call post to sned back the poll data with options
        console.log(option)
    }
    function handleSubmit(e) {
        e.preventDefault()
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
                    <input type="text" name="optionOne" placeholder="Add Option" className="option" onChange={handleChange}/> 
                    <input type="text" name="optionTwo" placeholder="Add Option" className="option" onChange={handleChange}/> 
                    <input type="text" name="optionThree" placeholder="Add Option" className="option" onChange={handleChange}/> 
                </div>
                <button type="submit">submit form</button>
            </form>
        </div>
    )
}

export default PollForm