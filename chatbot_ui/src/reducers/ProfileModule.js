export default (ProfileModule = [], action) => {
    
    switch(action.type) {
        case 'FETCH_ALL':
            return action.payload;
        //case 'UPDATE':
            //return ProfileModule.map((post)=>post._id == action.payload._id ? action.payload:post);
            default:
                return ProfileModule;
    }
}