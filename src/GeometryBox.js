import { useState } from "react";
import Selector from "./Selection";
import Button from "./Button";

const options = ["Rectangle", "Ellipse", "Triangle"];

export default function GeometryBox({
  className,
  headerClass,
  messageClass,
  item,
  parts,
  setParts,
  setSelection,
  setItem,
  setStatus,
}) {
  const [GeoType, setGeoType] = useState(options[0]);
  const [Width, setWidth] = useState(0);
  const [Height, setHeight] = useState(0);

  function handleCancel() {
    setSelection((selection) => !selection);
    setItem("");
  }

  function handleConfirm() {
    const newPart = {
      ...item,
      GeometryType: GeoType,
      Height: Height,
      Width: Width,
    };
    setParts((parts) =>
      parts.map((part) => (part.name === item.name ? newPart : part))
    );
    setStatus((status) => [
      ...status,
      `${item.name}'s geometry has been updated to ${GeoType}, ${Width}, ${Height}`,
    ]);
    handleCancel();
  }

  return (
    <div className={className}>
      <div className="topContainer">
        <h1 className={headerClass}>Geometry</h1>
        <p className={messageClass}>Describe a part via geometry</p>
      </div>
      <form>
        <label>Type</label>
        <Selector
          options={options}
          width={205}
          shadow="#A8D3DA"
          setType={setGeoType}
        ></Selector>
        <label>Width</label>
        <input
          type="Number"
          placeholder={0}
          onChange={(e) => setWidth(Number(e.target.value))}
        ></input>
        <label>Height</label>
        <input
          type="Number"
          placeholder={0}
          onChange={(e) => setHeight(Number(e.target.value))}
        ></input>
      </form>
      <div className="deleteButtonContainer">
        <Button
          radius={10}
          className="PartButton"
          bgColor="#347928"
          handler={handleConfirm}
        >
          Confirm
        </Button>
        <Button
          radius={10}
          className="PartButton"
          bgColor="#C63C51"
          handler={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
