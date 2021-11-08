import AddIcCallIcon from "@material-ui/icons/AddIcCall";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import PaymentIcon from "@material-ui/icons/Payment";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//import AddCircleIcon from "@material-ui/icons/AddCircle";
import news from "./Home.module.css";
import { Link } from "react-router-dom";
import { userLogout } from "../helpers/auth";


const Home = ({currentID,setID}) => {
  const logoutSubmit = () => {
    userLogout();
  };

  return (
    <div>
      <h1>User Profile</h1>

      <div className={news.EditBtn} >
       <Link className = {news.deco} to = "/profile">
         <Button 
         onClick={()=>setID()}
         startIcon={<EditIcon />} to ={"/profile"} >Edit profile</Button>
       </Link> 
      </div>

      <div className={news.actions}>
        <Link className = {news.deco} to = "/consultation">
        <Button startIcon={<AddIcCallIcon />} to = {"/consultation"}>My consultations</Button>
        </Link>
      </div>

      <div className={news.actions}>
      <Link className = {news.deco} to = "/order">
        <Button startIcon={<BookmarkBorderIcon />} to = {"/order"}>Order History</Button>
        </Link>
      </div>

      <div className={news.actions}>
      <Link className = {news.deco} to = "/payment">
        <Button startIcon={<PaymentIcon />} to = {"/payment"}>Payment History</Button>
        </Link>
      </div>

      <div className={news.Add}>
      <Link className = {news.deco}>
        <Button variant="outlined" color = "secondary" startIcon={<ExitToAppIcon />} onClick={logoutSubmit}>
          logout
        </Button>
        </Link>
      </div>

    </div>
  );
}

export default Home;
