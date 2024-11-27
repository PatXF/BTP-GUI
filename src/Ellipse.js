import { useEffect, useState } from "react";
import Button from "./Button";

export default function Ellipse({
  width = 0,
  height = 0,
  color = "#999999",
  x = 0,
  y = 0,
  center,
  currPosition,
  startPosition,
  item,
  setNav,
  setPart,
  setPartSelected,
  partSelected,
}) {
  const ulStyle = {
    top: `${height / 2}px`,
    left: `${width / 2}px`,
  };

  const [style, setStyle] = useState({
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: color,
    position: "absolute",
    top: `${center.y - y}px`,
    left: `${x + center.x}px`,
    transform: "transition",
    margin: "0%",
    padding: "0%",
    borderRadius: "100%",
    zIndex: "0",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  const [Hovered, setHoveverd] = useState(false);
  const [allowChange, setAllowChange] = useState(false);

  function handleContext(e) {
    e.preventDefault();
    setAllowChange((allowChange) => !allowChange);
  }

  useEffect(() => {
    setStyle((prevStyle) => ({
      ...prevStyle,
      top: `${center.y + currPosition.y - startPosition.y - height - y}px`,
      left: `${center.x + currPosition.x - startPosition.x + x}px`,
      width: `${width}px`,
      height: `${height}px`,
    }));
  }, [center, x, y, currPosition, startPosition, width, height]);

  useEffect(() => {
    setStyle((prevStyle) => ({
      ...prevStyle,
      filter: Hovered ? "brightness(1.3)" : "brightness(1)",
    }));
  }, [Hovered]);

  return (
    <div
      style={style}
      onMouseEnter={() => setHoveverd(true)}
      onMouseLeave={() => setHoveverd(false)}
      onContextMenu={handleContext}
    >
      {allowChange ? (
        <ShowOptions
          item={item}
          ulStyle={ulStyle}
          setNav={setNav}
          setPart={setPart}
          setPartSelected={setPartSelected}
          setAllowChange={setAllowChange}
          partSelected={partSelected}
        ></ShowOptions>
      ) : (
        <></>
      )}
    </div>
  );
}

function ShowOptions({
  item,
  ulStyle,
  setNav,
  setPart,
  setAllowChange,
  setPartSelected,
  partSelected,
}) {
  function handleGeo({ item }) {
    setNav("Geometry");
    setPart((part) => item);
    setAllowChange((allowChange) => !allowChange);
    setPartSelected(true);
  }

  function handleProp({ item }) {
    setNav("Material");
    setPart((part) => item);
    setAllowChange((allowChange) => !allowChange);
    setPartSelected(true);
  }

  return (
    <div className="listContainer" style={ulStyle}>
      <ul className="ulCont">
        <li className="liDis">{item.name}</li>
        <Button handler={() => handleGeo(item)}>Set Geometry</Button>
        <Button handler={() => handleProp(item)}>Set Property</Button>
      </ul>
    </div>
  );
}
