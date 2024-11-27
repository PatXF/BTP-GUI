import Button from "./Button";

export default function NavBar({
  buttons,
  selectedOption,
  setSelectedOption,
  setLastOption,
  fileClicked,
  setFileClicked,
  lastNavBarClicked,
}) {
  const handleMinimize = () => window.electronAPI.minimizeWindow();
  const handleRestore = () => window.electronAPI.restoreWindow();
  const handleClose = () => window.electronAPI.closeWindow();

  function handleSelection(item) {
    setSelectedOption(item.name);

    if (item.name === "File") {
      setFileClicked((fileClicked) => {
        if (fileClicked) {
          setSelectedOption(lastNavBarClicked);
        }
        return !fileClicked;
      });
    } else {
      setFileClicked(false);
      setLastOption(item.name);
    }
  }
  return (
    <div className="navbar">
      <span>CEGUI</span>
      {buttons.map((item) => (
        <Button
          key={item.name}
          selected={selectedOption}
          handler={() => handleSelection(item)}
          current={item.name}
          className="navbarbutton"
        >
          {item.name}
        </Button>
      ))}
      <div className="window">
        <Button handler={handleMinimize}>−</Button>
        <Button handler={handleRestore}>⧉</Button>
        <Button handler={handleClose}>X</Button>
      </div>
    </div>
  );
}
