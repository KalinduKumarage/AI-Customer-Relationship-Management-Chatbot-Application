export default (appointments = [], action) => {

    switch(action.type) {
        case 'FETCH_ALL':
            return appointments;
            //return action.payload;
        case 'CREATE':
            return [...appointments, action.payload];
        default:
            return appointments; 
    }
}