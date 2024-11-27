import { useState } from "react";
import "./displayer.css";
import { useRef } from "react";
import { useEffect } from "react";
import Ellipse from "./Ellipse";
import Rectangle from "./Rectangle";

const initialOriginStyle = {
  width: "10px",
  height: "10px",
  backgroundColor: "red",
  borderRadius: "100%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "transition",
  margin: "0%",
  padding: "0%",
  zIndex: "0",
};

const colors = [
  "#BFECFF",
  "#CDC1FF",
  "#FFF6E3",
  "#FFCCEA",
  "#00FF9C",
  "#B6FFA1",
  "#FEFFA7",
  "#FFE700",
  "#C9E9D2",
  "#C4E1F6",
];

export default function Displayer({
  parts,
  setNav,
  setPart,
  setPartSelected,
  partSelected,
}) {
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currPosition, setCurrPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  function handleMouseDown(e) {
    setIsDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
    setCurrPosition({ x: e.clientX, y: e.clientY });
  }
  function handleMouseMove(e) {
    if (isDragging) {
      setCurrPosition({ x: e.clientX, y: e.clientY });
      setOriginStyle((prevStyle) => ({
        ...prevStyle,
        top: `${center.y + currPosition.y - startPosition.y}px`,
        left: `${center.x + currPosition.x - startPosition.x}px`,
      }));
    }
  }

  function handleMouseUp(e) {
    setIsDragging(false);
    setCurrPosition({ x: 0, y: 0 });
    setStartPosition({ x: 0, y: 0 });
    setCenter((center) => ({
      x: center.x + currPosition.x - startPosition.x,
      y: center.y + currPosition.y - startPosition.y,
    }));
  }

  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  function handleResize() {
    setViewportSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const CenterRef = useRef(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (CenterRef.current) {
      const Rectangle = CenterRef.current.getBoundingClientRect();
      const X =
        Rectangle.left - viewportSize.width * 0.01 + Rectangle.width / 2;
      const Y = Rectangle.top - viewportSize.height / 20 + Rectangle.height / 2;
      setCenter({ x: X, y: Y });
    }
  }, [viewportSize]);

  const [originStyle, setOriginStyle] = useState(initialOriginStyle);

  useEffect(() => {
    setOriginStyle((prevStyle) => ({
      ...prevStyle,
      top: `${center.y}px`,
      left: `${center.x}px`,
    }));
  }, [center]);

  return (
    <div className="displayer" ref={CenterRef}>
      <div
        className="Paint"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {parts.map((item, i) => (
          <Shape
            key={item.name}
            item={item}
            width={item.Width}
            height={item.Height}
            color={colors[i]}
            center={center}
            currPosition={currPosition}
            startPosition={startPosition}
            x={item.XLocation - item.Width / 2}
            y={item.YLocation - item.Height / 2}
            setNav={setNav}
            setPart={setPart}
            setPartSelected={setPartSelected}
            partSelected={partSelected}
          ></Shape>
        ))}
        <div style={originStyle}></div>
      </div>
    </div>
  );
}

function Shape({
  item,
  width,
  height,
  color,
  center,
  currPosition,
  startPosition,
  x,
  y,
  setNav,
  setPart,
  setPartSelected,
  partSelected,
}) {
  if (item.GeometryType === "Ellipse") {
    return (
      <Ellipse
        width={width}
        height={height}
        color={color}
        center={center}
        currPosition={currPosition}
        startPosition={startPosition}
        x={x}
        y={y}
        item={item}
      />
    );
  } else if (item.GeometryType === "Rectangle") {
    return (
      <Rectangle
        width={width}
        height={height}
        color={color}
        center={center}
        currPosition={currPosition}
        startPosition={startPosition}
        x={x}
        y={y}
        item={item}
        setNav={setNav}
        setPartSelected={setPartSelected}
        setPart={setPart}
        partSelected={partSelected}
      />
    );
  }
}
