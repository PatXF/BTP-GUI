export default function PartBox({
  className,
  headerClass,
  pButtonClass,
  parts = [],
  setPart,
  setSelection,
}) {
  function handleClick(item) {
    setPart((part) => item);
    setSelection(true);
  }

  return (
    <div className={className ? className : ""}>
      <div className="topContainer">
        <h1 className={headerClass ? headerClass : ""}>Part</h1>
        <p className="messageClass">Select a part to change its properties</p>
      </div>
      <div className="partBoxContainer">
        {parts.length > 0 ? (
          parts.map((part) => (
            <p
              role="button"
              className={pButtonClass ? pButtonClass : ""}
              onClick={() => handleClick(part)}
              key={part.name}
            >
              {part.name}
            </p>
          ))
        ) : (
          <div className="CreatePartMessage">
            <p>No parts to display! Create a new Part to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
}
