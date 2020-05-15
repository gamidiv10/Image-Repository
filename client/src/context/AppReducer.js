export default (state, action) => {
    switch (action.type){
        case 'GET_IMAGES':
            return { 
                ...state,
                loading: false,
                images: action.payload
             }
        case 'ADD_TRANSACTION':
        return {
            ...state,
            transactions: [...state.transactions, action.payload]
            }
        case 'IMAGE_ERROR':
            return {
                ...state,
                error: action.payload
            }
        
        default:
            return state
    }
}
