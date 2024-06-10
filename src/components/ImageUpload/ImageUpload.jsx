import React, { useState } from "react";
import * as api from "../../api"

const ImageUpload = ({inputValue, id, fetchData}) => {
  const [image, setImage] = useState(null);

  const uploadImage = async () => {
    if (!inputValue) {
        return;
    }

    const data = new FormData();
    data.append("file", image);
    data.append(
      "upload_preset",
      import.meta.env.VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    data.append(
      "cloud_name",
      import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME
    );
    data.append("folder", "Cloudinary-React");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();

      await api.addImage({
        _id: id,
        name: inputValue,
        imageUrl: res.url,
      });

      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

  };

  const handleResetClick = () => {
    setImage(null);
  };

  return (
    <div className="image-upload-main">
      <input
        id="hidden-input"
        type="file"
        className="hidden"
        onChange={handleImageChange}
        accept="image/*"
      />

      <div className="image-bottom-btns">
        <button onClick={uploadImage} className="submit-btn" disabled={!image}>
          Upload now
        </button>
        <button style={{marginLeft: "0.5rem"}} onClick={handleResetClick} className="submit-btn">
          Reset
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
