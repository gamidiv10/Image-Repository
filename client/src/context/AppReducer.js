export default (state, action) => {
  switch (action.type) {
    case "GET_IMAGES":
      return {
        ...state,
        loading: false,
        images: action.payload,
      };
    case "ADD_IMAGE":
      return {
        ...state,
        images: [...state.images, ...action.payload],
      };
    case "DELETE_IMAGE":
      return {
        ...state,
        images: state.images.filter(image => image._id !== action.payload)
      };
    case "IMAGE_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
