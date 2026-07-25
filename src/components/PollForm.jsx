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
    optionOne: "Option 1 is required",
    optionTwo: "Option 2 is required",
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
    if (options[0].text === "") {
      alert(error.optionOne);
      return;
    }
    if (options[1].text === "") {
      alert(error.optionTwo);
      return;
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

        <h2>Poll Options</h2>
        <div>
          <button onClick={addOption}>Add Option</button>
          {options.map((option, index) => {
            return (
              <div key={index} style={{ marginTop: 10 }}>
                <input 
                  value={option.text}
                  placeholder="Type your option"
                  id={index}
                  onChange={(e) => handleOption(e)}
                />
                <button
                  id="deleteButton"
                  onClick={(e) => handleDeleteOption(e, index)}
                >
                  Delete Option
                </button>
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
