import NavBar from "./NavBar";
import "./index.css";
import PartBox from "./PartBox";
import MaterialBox from "./MaterialBox";
import GeometryBox from "./GeometryBox";
import Part from "./Part";
import { useState, useEffect } from "react";
import Status from "./Status";
import File from "./File";
import Displayer from "./Displayer";

const tempParts = [];

const buttons = [
  { name: "File" },
  { name: "Part" },
  { name: "Geometry" },
  { name: "Material" },
  { name: "Load" },
  { name: "Interaction" },
  { name: "Job" },
  { name: "Results" },
  { name: "View" },
];

function App() {
  const [NavBarClicked, setNavBarClicked] = useState("Part");

  const [parts, setParts] = useState(tempParts);

  const [clickedPart, setClickedPart] = useState("");

  const [isPartSelected, setIsPartSelected] = useState(false);

  const [currentStatus, setCurrentStatus] = useState([]);

  const [lastNavBarClicked, setLastNavBarClicked] = useState("Part");

  const [fileClicked, setFileClicked] = useState(false);

  useEffect(() => {
    if (NavBarClicked !== "Part") {
      setClickedPart("");
      setIsPartSelected(false);
    }
  }, [NavBarClicked]);

  return (
    <div className="main">
      <NavBar
        buttons={buttons}
        selectedOption={NavBarClicked}
        setSelectedOption={setNavBarClicked}
        setLastOption={setLastNavBarClicked}
        fileClicked={fileClicked}
        setFileClicked={setFileClicked}
        lastNavBarClicked={lastNavBarClicked}
      ></NavBar>
      <Displayer
        parts={parts}
        setNav={setNavBarClicked}
        setPart={setClickedPart}
        setPartSelected={setIsPartSelected}
        partSelected={isPartSelected}
      ></Displayer>
      {fileClicked ? (
        <File
          parts={parts}
          setJsonData={setParts}
          setFileClicked={setFileClicked}
        ></File>
      ) : (
        <></>
      )}
      <div className="holder">
        {NavBarClicked === "Part" ||
        (NavBarClicked === "File" && lastNavBarClicked === "Part") ? (
          <Part
            parts={parts}
            setPart={setParts}
            setStatus={setCurrentStatus}
          ></Part>
        ) : (
          <></>
        )}
        {NavBarClicked === "Geometry" ||
        (NavBarClicked === "File" && lastNavBarClicked === "Geometry") ? (
          <>
            {isPartSelected ? (
              <GeometryBox
                className="geometryBoxClass"
                headerClass="headerClass"
                messageClass="messageClass"
                setSelection={setIsPartSelected}
                item={clickedPart}
                parts={parts}
                setParts={setParts}
                setItem={setClickedPart}
                setStatus={setCurrentStatus}
              ></GeometryBox>
            ) : (
              <PartBox
                className="part-box"
                headerClass="headerClass"
                buttonContainer="buttonContainer"
                buttonClass="PartButton"
                pButtonClass="pButtonClass"
                parts={parts}
                setPart={setClickedPart}
                setSelection={setIsPartSelected}
              ></PartBox>
            )}
          </>
        ) : (
          <></>
        )}
        {NavBarClicked === "Material" ||
        (NavBarClicked === "File" && lastNavBarClicked === "Material") ? (
          <>
            {isPartSelected ? (
              <MaterialBox
                className="geometryBoxClass"
                headerClass="headerClass"
                messageClass="messageClass"
                setSelection={setIsPartSelected}
                item={clickedPart}
                parts={parts}
                setParts={setParts}
                setItem={setClickedPart}
                setStatus={setCurrentStatus}
              ></MaterialBox>
            ) : (
              <PartBox
                className="part-box"
                headerClass="headerClass"
                buttonContainer="buttonContainer"
                buttonClass="PartButton"
                pButtonClass="pButtonClass"
                parts={parts}
                setPart={setClickedPart}
                setSelection={setIsPartSelected}
              ></PartBox>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="status">
        <Status
          currentStatus={currentStatus}
          setCurrentStatus={setCurrentStatus}
        >
          {currentStatus.map((item, index) => (
            <p key={index} className="Updates">
              {item}
            </p>
          ))}
        </Status>
      </div>
    </div>
  );
}

export default App;
