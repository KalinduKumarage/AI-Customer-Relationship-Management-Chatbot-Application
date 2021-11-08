//import AddNP from "./AddNewprofile";
import Home from "./Home";

const MyFormModal = ({ currentID,setID}) =>
{
    return(
        <div className = "mymodal"><Home currentID={currentID} setID={setID}/></div>
        
        );

}

export default MyFormModal;