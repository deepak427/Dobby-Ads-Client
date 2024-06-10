import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./AddButton.css";

const AddButton = ({ showPopup, setShowPopup }) => {
  const handlePopupClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="add-btn">
      <div style={{ textDecoration: "none" }}>
        {" "}
        <FontAwesomeIcon
          onClick={handlePopupClick}
          style={{ padding: "0.5rem 0.5rem 0.5rem 1rem" }}
          icon={faPlusCircle}
        />
      </div>
    </div>
  );
};

export default AddButton;
