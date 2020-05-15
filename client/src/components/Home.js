import React, {useContext, useEffect, useState} from 'react'
import {GlobalContext} from '../context/GlobalState';

function Home() {
    const {images, getImages} = useContext(GlobalContext);
    useEffect(() => {
        getImages();
        //eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    // console.log("Images", images);

    const [imageId, setText] = useState(0);
    const {addImage} = useContext(GlobalContext);

    const onSubmit = (e) => {
        e.preventDefault();
        const newImage = {
            id: Math.floor(Math.random() * 100000000),
            imageId
        }
        addImage(newImage);
        }
    
    const handleSelectedFile = e => {
        e.preventDefault();
        // this.setState({
        //     selectedFile: e.target.files[0]
        // });
        const img = {
            selectedFile: e.target.files[0]
        }
        console.log(img)
    };
    return (
        <div>
            <h1>Image Repository</h1>
            <form onSubmit={onSubmit}>
            <input type="file" onChange={handleSelectedFile}/>
            <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default Home;
