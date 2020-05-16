import React, {useContext, useEffect, useState} from 'react'
import {GlobalContext} from '../context/GlobalState';

function Home() {
    const {images, getImages} = useContext(GlobalContext);
    useEffect(() => {
        getImages();
        //eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    if(images.length)
    {
        var buf = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, images[0].file.data));
    }

    const [imageId] = useState(0);
    var imgFile = useState('');
    const {addImage} = useContext(GlobalContext);

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("imageId", imageId);
        data.append("file", imgFile.selectedFile);
        console.log("image object", data);
        addImage(data);
        }
    
    const handleSelectedFile = e => {
        e.preventDefault();
        imgFile = {
            selectedFile: e.target.files[0]
        }
        console.log("Image Received",imgFile)
    };
    return (
        <div>
            <h1>Image Repository</h1>
            <form onSubmit={onSubmit}>
            <input type="file" onChange={handleSelectedFile}/>
            <button type="submit">submit</button>
            </form>

            <img src={buf} alt=""/>
        </div>
    )
}

export default Home;
