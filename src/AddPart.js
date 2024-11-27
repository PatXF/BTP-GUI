import { useState } from "react";
import "./addpart.css";
import "./Button";
import Button from "./Button";

export default function AddPart({
  parts,
  setParts,
  clicked,
  setClicked,
  setStatus,
}) {
  const [Name, setName] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  function handleAdd() {
    const newPart = { name: Name, XLocation: x, YLocation: y };
    setParts((parts) => [...parts, newPart]);
    setStatus((status) => [...status, `${Name} has been created!`]);
    handleClose();
  }

  function handleClose() {
    setClicked((clicked) => !clicked);
  }

  return (
    <div className="AddPartContainer">
      <div>
        <h1 className="headerClass">Add Part</h1>
        <p className="messageClass">
          Name your part, set it's location and choose if you want to proceed
          with it.
        </p>
      </div>
      <form className="AddPartDetails">
        <label>Part Name:</label>
        <input
          type="text"
          placeholder="Enter part name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label>X-Coordinate:</label>
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          onChange={(e) => setX(e.target.value)}
        ></input>
        <label>Y-Coordinate:</label>
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          onChange={(e) => setY(e.target.value)}
        ></input>
      </form>
      <div className="AddButtonContainer">
        <Button
          radius={10}
          className="PartButton"
          bgColor="#347928"
          handler={handleAdd}
        >
          Add Part
        </Button>
        <Button
          radius={10}
          className="PartButton"
          bgColor="#C63C51"
          handler={handleClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
}
