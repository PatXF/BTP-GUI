import { useEffect, useRef, useState } from "react";
import Button from "./Button";

export default function Status({ children, currentStatus, setCurrentStatus }) {
  const changeRef = useRef(null);

  const [clearClicked, setClearClicked] = useState(false);

  function scrollToEnd() {
    if (changeRef.current) {
      changeRef.current.scrollTop = changeRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToEnd();
  }, [currentStatus]);

  function handleClear() {
    setClearClicked((clearClicked) => !clearClicked);
  }

  function handleConfirm() {
    setCurrentStatus((currentStatus) => []);
    handleCancel();
  }

  function handleCancel() {
    setClearClicked((clearClicked) => !clearClicked);
  }

  return (
    <div className="statusContainer">
      <div className="statusTopContainer">
        <h4 className="statusClass">Status</h4>
        {clearClicked ? (
          <div className="statusButton">
            <Button bgColor="transparent" handler={handleConfirm}>
              ✅
            </Button>
            <Button bgColor="transparent" handler={handleCancel}>
              ❌
            </Button>
          </div>
        ) : (
          <Button
            className="statusButton"
            bgColor="#C63C51"
            handler={handleClear}
          >
            Clear
          </Button>
        )}
      </div>

      <div className="statusDisplay" ref={changeRef}>
        {children}
      </div>
    </div>
  );
}
