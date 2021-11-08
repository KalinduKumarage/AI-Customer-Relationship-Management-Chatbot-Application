export default (prescriptions = [], action) => {
    
    switch(action.type) {
        case 'FETCH_ALL':
            return prescriptions;
        case 'CREATE':
            return [...prescriptions, action.payload];
        default:
            return prescriptions;
    }
}