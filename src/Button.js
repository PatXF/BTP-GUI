import { useState } from "react";

export default function Button({
  children,
  width = "auto",
  radius = 5,
  border = 0,
  bgColor = "#3C3D37",
  color = "white",
  handler,
  className = "",
  current,
  selected,
}) {
  const [Hovered, setHoveverd] = useState(false);

  const buttonStyle = {
    fontFamily: "Arial",
    width: { width },
    borderRadius: `${radius}px`,
    border: `${border}px`,
    backgroundColor: bgColor,
    filter:
      Hovered | (current ? current === selected : false)
        ? "brightness(1.3)"
        : "brightness(1)",
    cursor: "pointer",
    color: color,
    transition: "filter 0.3s ease",
  };

  return (
    <button
      style={buttonStyle}
      className={className}
      onMouseEnter={() => setHoveverd(true)}
      onMouseLeave={() => setHoveverd(false)}
      onClick={handler}
    >
      {children}
    </button>
  );
}
