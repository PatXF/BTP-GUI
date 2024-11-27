import { useState } from "react";
import Button from "./Button";
import "./part.css";
import AddPart from "./AddPart";
import DeletePart from "./DeletePart";

export default function Part({ parts, setPart, setStatus }) {
  const [clicked, setClicked] = useState(null);
  const [numClicks, setNumClicks] = useState(0);
  const [editClicked, setEdit] = useState(false);
  const [newClicked, setNew] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});

  function handleClick({ item }) {
    if (clicked === item.name) {
      setNumClicks((numClicks) => numClicks + 1);
      if (numClicks === 1) {
        setClicked(null);
        setNumClicks(0);
      }
    } else {
      setNumClicks(1);
      setClicked(item.name);
    }
  }

  function handleEdit() {
    setEdit((editClicked) => !editClicked);
    if (newClicked) handleNew();
  }

  function handleDeleteClick(item) {
    setDeleteClicked((deleteClicked) => !deleteClicked);
    setDeleteItem((newItem) => item);
  }

  function handleDelete(deletion) {
    setPart((parts) => parts.filter((curr) => curr.name !== deletion));
  }

  function handleNew() {
    setNew((newClicked) => !newClicked);
    if (editClicked) handleEdit();
  }

  if (deleteClicked) {
    return (
      <DeletePart
        item={deleteItem}
        handleDelete={() => handleDelete(deleteItem.name)}
        cancel={deleteClicked}
        setCancel={setDeleteClicked}
        setStatus={setStatus}
      ></DeletePart>
    );
  }

  if (newClicked) {
    return (
      <AddPart
        parts={parts}
        setParts={setPart}
        clicked={newClicked}
        setClicked={setNew}
        setStatus={setStatus}
      ></AddPart>
    );
  }
  return (
    <div className="PartClass">
      <h1 className="headerClassPart">Parts</h1>
      <div className="buttonContainer">
        <Button
          radius={10}
          className="PartButton"
          bgColor="#E6A157"
          handler={handleNew}
        >
          Create New Part
        </Button>
        {parts.length > 0 ? (
          <Button
            radius={10}
            className="PartButton"
            bgColor="#C63C51"
            handler={handleEdit}
          >
            {editClicked ? "Close" : "Edit List"}
          </Button>
        ) : (
          <></>
        )}
      </div>
      <div className="partInfoContainer">
        {parts.length > 0 ? (
          parts.map((item, i) =>
            editClicked ? (
              <DeleteInfo>
                <div className="deletePart">
                  <p>{item.name}</p>
                  <Button
                    bgColor="#C63C51"
                    className="deleteButton"
                    handler={() => handleDeleteClick(item)}
                  >
                    Delete
                  </Button>
                </div>
              </DeleteInfo>
            ) : (
              <PartInfoComplete
                key={i}
                clicked={clicked}
                item={item}
                handleClick={handleClick}
              ></PartInfoComplete>
            )
          )
        ) : (
          <div className="CreatePartMessage">
            <p>No parts to display! Create a new Part to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PartDetails({ item }) {
  return (
    <div className="partDetails">
      <label>Name: </label>
      <input disabled placeholder={item.name}></input>
      <label>Geometry Type: </label>
      <input disabled placeholder={item.GeometryType}></input>
      <label>X Co-ordinate: </label>
      <input disabled placeholder={item.XLocation}></input>
      <label>Y Co-ordinate: </label>
      <input disabled placeholder={item.YLocation}></input>
      <label>Height: </label>
      <input disabled placeholder={item.Height}></input>
      <label>Width: </label>
      <input disabled placeholder={item.Width}></input>
      <label>Property Type: </label>
      <input disabled placeholder={item.PropertyType}></input>
      <label>Val1: </label>
      <input disabled placeholder={item.Val1}></input>
      <label>Val2: </label>
      <input disabled placeholder={item.Val2}></input>
    </div>
  );
}

function PartInfo({ children, handleClick, item, clicked }) {
  return (
    <div role="button" onClick={() => handleClick({ item })}>
      {children}
    </div>
  );
}

function DeleteInfo({ children, item }) {
  return <div className="pButtonDiv">{children}</div>;
}

function PartInfoComplete({ clicked, item, handleClick }) {
  return (
    <div
      className={
        clicked === item.name
          ? "partContainer partContainerClicked"
          : "partContainer"
      }
    >
      <PartInfo handleClick={handleClick} item={item} clicked={clicked}>
        {clicked === item.name ? "-" : "+"} {item.name}
      </PartInfo>
      {clicked === item.name ? <PartDetails item={item}></PartDetails> : <></>}
    </div>
  );
}
