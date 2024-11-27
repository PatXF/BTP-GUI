import Selector from "./Selection";
import Button from "./Button";
import { useState } from "react";

const options = ["Mechanical", "Electrical", "Hydrostatic"];

export default function MaterialBox({
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
  const [PropType, setPropType] = useState("");
  const [Val1, setVal1] = useState(0);
  const [Val2, setVal2] = useState(0);

  function handleCancel() {
    setSelection((selection) => !selection);
    setItem("");
  }

  function handleConfirm() {
    const newPart = {
      ...item,
      PropertyType: PropType,
      Val1: Val1,
      Val2: Val2,
    };
    setParts((parts) =>
      parts.map((part) => (part.name === item.name ? newPart : part))
    );
    setStatus((status) => [
      ...status,
      `${item.name}'s property has been updated to ${PropType}, ${Val1}, ${Val2}`,
    ]);
    handleCancel();
  }

  return (
    <div className={className}>
      <div className="topContainer">
        <h1 className={headerClass}>Property</h1>
        <p className={messageClass}>Add a material property to a part</p>
      </div>
      <form>
        <label>Type</label>
        <Selector
          options={options}
          width={205}
          shadow="#A8D3DA"
          setType={setPropType}
        ></Selector>
        <label>Val1</label>
        <input
          type="Number"
          placeholder={0}
          onChange={(e) => setVal1(e.target.value)}
        ></input>
        <label>Val2</label>
        <input
          type="Number"
          placeholder={0}
          onChange={(e) => setVal2(e.target.value)}
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
