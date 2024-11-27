import Button from "./Button";

export default function File({ parts, setJsonData, setFileClicked }) {
  const handleNewFile = async () => {
    if (parts.length > 0) {
      try {
        // Send JSON object to main process to save it
        const result = await window.electronAPI.saveJsonFile(parts);
        if (result) {
          console.log("File saved successfully");
          setJsonData([]);
        } else {
          console.log("Save operation was canceled");
        }
      } catch (error) {
        console.error("Error saving file:", error);
      }
      setFileClicked(false);
    }
  };

  const handleSaveFile = async () => {
    try {
      // Send JSON object to main process to save it
      const result = await window.electronAPI.saveJsonFile(parts);
      if (result) {
        console.log("File saved successfully");
      } else {
        console.log("Save operation was canceled");
      }
    } catch (error) {
      console.error("Error saving file:", error);
    }
    setFileClicked(false);
  };

  const handleOpenFile = async () => {
    try {
      try {
        // Send JSON object to main process to save it
        const result = await window.electronAPI.saveJsonFile(parts);
        if (result) {
          console.log("File saved successfully");
        } else {
          console.log("Save operation was canceled");
        }
      } catch (error) {
        console.error("Error saving file:", error);
      }
      setFileClicked(false);
      const data = await window.electronAPI.openJsonFile();
      if (data) {
        console.log("File loaded successfully:", data);
        setJsonData(data); // Use the loaded data in your React component
      } else {
        console.log("No file selected or invalid JSON.");
      }
    } catch (error) {
      console.error("Error opening file:", error);
    }
    setFileClicked(false);
  };

  return (
    <div className="fileClass">
      <Button className="FileButton" handler={handleNewFile}>
        New
      </Button>
      <Button className="FileButton" handler={handleSaveFile}>
        Save
      </Button>
      <Button className="FileButton" handler={handleOpenFile}>
        Open
      </Button>
    </div>
  );
}
