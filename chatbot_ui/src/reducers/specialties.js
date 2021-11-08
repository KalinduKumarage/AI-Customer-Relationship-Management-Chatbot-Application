export default (specialties = [], action) => {

    switch(action.type) {
        case 'FETCH_ALL':
            return action.payload;
        default:
            return specialties;
    }
}