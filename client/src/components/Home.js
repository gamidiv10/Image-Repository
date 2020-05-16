import React, {useContext, useEffect, useState} from 'react'
import {GlobalContext} from '../context/GlobalState';

function Home() {
    const {images, getImages} = useContext(GlobalContext);
    useEffect(() => {
        getImages();
        //eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      console.log(images);
    if(images.length)
    {
        var buff = []
        for(var i = 0; i < images.length; i++)
        {
            buff.push("data:image/png;base64," + btoa(String.fromCharCode.apply(null, images[i].file.data)));
        }
    }

    const [imageId] = useState(0);
    var imgFile = useState('');
    const {addImage, deleteImage} = useContext(GlobalContext);

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("imageId", imageId);
        data.append("file", imgFile.selectedFile);
        addImage(data);
        }
    
    const handleSelectedFile = e => {
        e.preventDefault();
        imgFile = {
            selectedFile: e.target.files[0]
        }
    };

    
    return images.length ? (
      <div>
        <form onSubmit={onSubmit} className="image_form">
          <label htmlFor="file" className="custom-file-upload">
          <input type="file" id="file" onChange={handleSelectedFile} />
            Upload Image
          </label>
          <button className="button" type="submit">submit</button>
        </form>
        <div className="image_div">
          <ul>
            {
                images.map((image) => (
                    <img key={image.imageId} className="image" src={"data:image/png;base64," + btoa(String.fromCharCode.apply(null, image.file.data))} 
                    alt="" onDoubleClick={() => deleteImage(image._id)}/>
                ))
            }

            {/* {buff.map((imgUrl) => (
              <img key={Math.random()} className="image" src={imgUrl} alt="" />
            ))} */}
          </ul>
        </div>
      </div>
    ) : null;
}

export default Home;
