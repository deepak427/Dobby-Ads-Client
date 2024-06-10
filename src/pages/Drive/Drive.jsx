import { useEffect, useState } from "react";
import AddButton from "../../components/AddButton/AddButton";
import * as api from "../../api";
import "./Drive.css";
import { useNavigate, useParams } from "react-router";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

const Drive = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const [showFullImage, setShowFullImage] = useState();

  const [inputValue, setInputValue] = useState();

  const [folderData, setFolderData] = useState();

  const { id } = useParams();

  const navigate = useNavigate();

  const handlePopupClick = () => {
    setShowPopup(!showPopup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue) {
      alert("Please input ");
      return;
    }

    handlePopupClick();

    if (!selectedCategory) {
      await api.addFolder({
        _id: id,
        name: inputValue,
      });

      fetchData();
    }
  };

  const fetchData = async () => {
    const currentFolder = await api.getFolder({
      _id: id,
    });

    setFolderData(currentFolder.data.result);
  };

  const handleOnfolderClick = (folderId) => {
    navigate(`/drive/${folderId}`);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="drive-main-container">
      {folderData ? (
        <div className="all-folder-store-container">
          {folderData.child.map((subFolder, index) => (
            <div className="folder-icon-container" key={index}>
              <svg
                onClick={() => handleOnfolderClick(subFolder)}
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z" />
              </svg>
              <p>{folderData.childName[index]}</p>
            </div>
          ))}
          {folderData.images.map((imageUrl, index) => (
            <div className="folder-icon-container" key={index}>
              <img
                onClick={() => {
                  setShowFullImage(!showFullImage);
                }}
                style={{ width: "7rem", cursor: "pointer" }}
                src={imageUrl}
                alt="image"
              />
              {showFullImage && (
                <div className="popup">
                  <div className="popup-content">
                    <span
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "0.5rem",
                        top: "0.5rem",
                      }}
                      className="close"
                      onClick={() => {
                        setShowFullImage(!showFullImage);
                      }}
                    >
                      &times;
                    </span>
                    <img style={{width: "40rem"}} src={imageUrl} alt="full image" />
                  </div>
                </div>
              )}
              <p>{folderData.imagesName[index]}</p>
            </div>
          ))}
          <AddButton showPopup={showPopup} setShowPopup={setShowPopup} />
        </div>
      ) : (
        <h2>Loading Please wait</h2>
      )}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="category-container">
              <button
                onClick={() => {
                  setSelectedCategory(0);
                }}
                className={`${
                  !selectedCategory && "selected-category-btn"
                } category-btn`}
              >
                Folder
              </button>
              <button
                onClick={() => {
                  setSelectedCategory(1);
                }}
                className={`${
                  selectedCategory && "selected-category-btn"
                } category-btn`}
              >
                Image
              </button>
              <span
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  right: "1rem",
                  top: "1rem",
                }}
                className="close"
                onClick={handlePopupClick}
              >
                &times;
              </span>
            </div>
            <form action="submit" onSubmit={handleSubmit}>
              <label htmlFor="input-value">
                <h4>
                  {selectedCategory ? "Enter Image name" : "Enter folder name"}
                </h4>
                <input
                  onChange={(e) => setInputValue(e.target.value)}
                  id="input-value"
                  type="text"
                />
                {selectedCategory ? (
                  <ImageUpload
                    inputValue={inputValue}
                    id={id}
                    fetchData={fetchData}
                  />
                ) : (
                  <></>
                )}
              </label>
              {!selectedCategory && <button className="submit-btn">Add</button>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drive;
