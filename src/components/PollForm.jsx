import { useState } from "react";
import { useNavigate } from "react-router";

function PollForm() {
  const [polling, setPolling] = useState({
    pollName: "",
    pollDescription: "",
  });
  const [options, setOptions] = useState([{ text: "" }, { text: "" }]);
  const [optionVal, setOptionVal] = useState("");
  const [error, setError] = useState({
    pollName: "Polling Name is needed",
    pollDescription: "Polling Description is needed",
    optionOne: "Option 1 is required",
    optionTwo: "Option 2 is required",
    optionLength: "At least 2 options are needed"
  });
  const [deleteId, setDeleteId] = useState("");

  const nav = useNavigate();

  function handleChange(e) {
    setPolling((prevPolling) => {
      return {
        ...prevPolling,
        [e.target.name]: e.target.value,
      };
    });
  }
  function handleOption(e) {
    setOptions((prevOptions) => {
      const inputIndex = Number(e.target.attributes["id"].value);

      return prevOptions.map((option, index) => {
        if (index === inputIndex) {
          return {
            text: e.target.value,
          };
        } else {
          return {
            ...option,
          };
        }
      });
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const errorMessages = [];

    if (polling.pollName.trim() === ""){
        errorMessages.push(error.pollName);
        // return;
    }
    if (polling.pollDescription.trim() === ""){
        errorMessages.push(error.pollDescription);
        // return;
    }
    if (options.length < 2){
        errorMessages.push(error.optionLength);
        // return;
    }
    if (options[0].text.trim() === "") {
      errorMessages.push(error.optionOne);
    //   return;
    }
    if (options[1].text.trim() === "") {
      errorMessages.push(error.optionTwo);
    //   return;
    }
    if(errorMessages.length > 0){
        return alert(errorMessages.join("\n"));
    }

    // check if option.text is empty, if it is remove it from the state

    // setOptions((prevOptions) => {
    //   return prevOptions.filter((option) => {
    //     Object.keys(option).length !== 0;
    //   });
    //   console.log(">>>>>", options);
    // });

    const reviewedOptions = options.filter((option) => option.text.trim() !=="")
    // console.log(reviewedOptions)
    setOptions(reviewedOptions)
    // console.log(options);

    const response = await fetch("http://localhost:4000/polls", {
      method: "POST",
      body: JSON.stringify({
        title: polling.pollName,
        description: polling.pollDescription,
        options: reviewedOptions,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    nav("/");
  }
  function addOption(e) {
    e.preventDefault();
    if (options.length >= 8){
        return;
    }
    setOptions([...options, {text: ""}]);
  }

  async function handleDeleteOption(e, index) {
    console.log("form index:", index);
    e.preventDefault();
    const updatedOption = options.filter((option, i) => {
      return i !== index;
    });
    setOptions([...updatedOption]);
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Poll Name</label>
          <input
            type="text"
            name="pollName"
            placeholder=""
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="">Poll Description</label>
          <input type="text" name="pollDescription" onChange={handleChange} />
        </div>

        <h2>Poll Options (8 Max)</h2>
        <div>
          {options.length < 8 &&( <button onClick={addOption}>Add Option</button>)}
          {options.map((option, index) => {
            return (
              <div key={index} 
              style={{ 
                marginTop: 10,
                display:"flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "center"
                }}>
                <input 
                  value={option.text}
                  placeholder="Type your option"
                  id={index}
                  onChange={(e) => handleOption(e)}
                  style={{ flex: "1 2 500px" }}
                />
                {options.length > 2 && (
                <button
                  id="deleteButton"
                  onClick={(e) => handleDeleteOption(e, index)}
                  style={{ flexShrink: 0, padding: "4px 10px", fontSize: 14, width: "75px"}}
                >
                  Delete
                </button>
                )}
              </div>
            );
          })}
          {/* <button onClick={addOption}>Add Option</button> */}
        </div>
        <button type="submit">submit form</button>
      </form>
    </div>
  );
}

export default PollForm;
