import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

function Home() {
  const { images, getImages } = useContext(GlobalContext);
  useEffect(() => {
    getImages();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(images);

  const [imageList, setImages] = useState(null);

  const { addImage, deleteImage } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
      for (var i = 0; i < imageList.length; i++) {
        data.append(`file[${i}]`, imageList[i]);
  
      }
      data.append("count", imageList.length);
      console.log("data in Form", data);
      addImage(data);
    
  };

  const handleSelectedFile = (e) => {
    e.preventDefault();
    setImages(e.target.files);
  };

  return images.length ? (
    <div>
      <form onSubmit={onSubmit} className="image_form">
        <label htmlFor="file" className="custom-file-upload">
          <input type="file" id="file" onChange={handleSelectedFile} multiple />
          Upload Image
        </label>
        <button className="button" type="submit">
          submit
        </button>
      </form>
      <div className="image_div">
        <ul>
          {images.map((image) => (
            <img
              key={image.imageId}
              className="image"
              src={
                "data:image/png;base64," +
                new Buffer(image.file.data).toString("base64")
              }
              alt=""
              onDoubleClick={() => deleteImage(image._id)}
            />
          ))}
        </ul>
      </div>
    </div>
  ) : null;
}

export default Home;
