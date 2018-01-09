function PhotoReducer(state = [], action) {
    if (action.type === 'UPLOADPHOTO') {
        return action.payload
    }
}

export default PhotoReducer;