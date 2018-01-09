function PhotoReducer(state = [], action) {
    if (action.type === 'UPLOADPHOTO') {
        return action.payload
    } else {
        return []
    }
}

export default PhotoReducer;