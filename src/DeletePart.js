import "./deletepart.css";
import Button from "./Button";
import { useState } from "react";

export default function DeletePart({
  item = {},
  handleDelete,
  cancel,
  setCancel,
  setStatus,
}) {
  const [enteredName, setEnteredName] = useState("");
  function handleConfirm() {
    if (enteredName === item.name) {
      handleDelete();
      handleCancel();
      setStatus((status) => [...status, `${item.name} has been deleted!`]);
    } else setEnteredName((name) => "wrong");
  }

  function handleCancel() {
    setCancel((cancel) => !cancel);
  }

  return (
    <div className="DeletePartContainer">
      <h1 className="headerClass">Delete Part</h1>
      <p className="messageClass">
        Confirm deletion process by entering the name of the part you want to
        delete.
      </p>
      <div className="deletePartDetails">
        <label>{item.name}</label>
        <input
          type="text"
          placeholder={
            enteredName === "wrong"
              ? "Enter correct name!"
              : "Enter name of part"
          }
          value={enteredName === "wrong" ? "" : enteredName}
          onChange={(e) => setEnteredName(e.target.value)}
        ></input>
      </div>
      <div className="deleteButtonContainer">
        <Button
          radius={10}
          className="PartButton"
          bgColor="#C63C51"
          handler={handleConfirm}
        >
          Confirm
        </Button>
        <Button
          radius={10}
          className="PartButton"
          bgColor="#347928"
          handler={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
