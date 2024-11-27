import { useState } from "react";

export default function Selector({ options = [], width, shadow, setType }) {
  const [Hover, setHover] = useState(false);

  const selectStyle = {
    border: "0px",
    width: `${width}px`,
    padding: "5px",
    boxShadow: `5px 5px 10px ${shadow}`,
    borderRadius: "5px",
    backgroundColor: "#F5F5F5",
    filter: Hover ? "brightness(1.1)" : "brightness(1)",
    transition: "filter 0.3s ease",
    cursor: "pointer",
    textAlign: "center",
  };

  function handleChange(event) {
    setType((GeoType) => event.target.value);
  }

  return (
    <select
      style={selectStyle}
      onMouseEnter={() => setHover(!Hover)}
      onMouseLeave={() => setHover(!Hover)}
      onChange={handleChange}
      defaultValue={options[0]}
    >
      {options.map((item, i) => (
        <option key={i} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
