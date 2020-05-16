import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
const initialState = {
    images: [],
    error: null,
    loading: true
}


export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function getImages(){
        try {
            const response = await axios.get('/images');
            dispatch({
                type: 'GET_IMAGES',
                payload: response.data.data
            })
        } catch (error) {
            dispatch({
                type: 'IMAGE_ERROR',
                payload: "Error"
            })    
        }
    }

    async function addImage(image){
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }
        try {
            await axios.post('/images', image);
            dispatch({
                type: 'ADD_IMAGE',
                payload: image
            });
        } catch (error) {
            dispatch({
                type: 'IMAGE_ERROR',
                payload: error.response.data.error
            });

        }
        
    }
    return (
        <GlobalContext.Provider value={{
            images: state.images,
            loading: state.loading,
            error:state.error,
            getImages,
            addImage
        }
        }>          
         {children}
        </GlobalContext.Provider>
    )
}
