export default (Orders = [], action) => {

    switch(action.type) {
        case 'FETCH_ALL':
            return action.payload;
        default:
            return Orders; 
    }
}