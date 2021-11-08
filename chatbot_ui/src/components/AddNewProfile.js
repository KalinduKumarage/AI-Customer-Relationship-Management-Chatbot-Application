import * as React from "react";
import { useState,useEffect} from "react";
import news from "./AddNewProfile.module.css";
import { Link } from "react-router-dom";
//import { useSelector } from "react-redux";
import axios from "axios";
import 'date-fns';
import PDF from './PDF';

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { isUserAuthenticated } from "../helpers/auth";





const AddNP = () => {


const [nic,setNic ] = useState('fetching NIC....')
const [firstName,setFname ] = useState('fetching Fname...')
const [lastName,setLname ] = useState('fetching Lname...')
const [phone,setPhone ] = useState('fetching Phone...')
const [gender,setGender ] = useState('fetching Gender...')
const [dob,setDob ] = useState()

const [ErrorFirstName,setEFname ] = useState(false)
const [ErrorLastName,setELname ] = useState(false)
const [ErrorPhone,setEPhone ] = useState(false)
const [ErrorGender,setEGender ] = useState(false)

const [open, setOpen] = React.useState(false);
const [Eopen, setEOpen] = React.useState(false);

const userData = isUserAuthenticated();

const materialTheme = createMuiTheme({
  overrides: {

    MuiPickersModal: {
      zIndex:30000
    },
  },
});


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setEOpen(false);
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: "http://localhost:5000/ProfileModule",
        });
        setNic(userData.nic);
        setFname(userData.firstName);
        setLname(userData.lastName);
        setPhone(userData.phone);
        setGender(userData.gender);
        setNic(userData.nic);
        var formattedDob = (userData.dob).substring(0,10);
        setDob(formattedDob);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);


// useEffect (()=>{
//  const fetchdata = async ()=>{
//   try {
//   const res = await axios({
//     method : 'GET',
//     url : 'http://localhost:5000/ProfileModule',

//   })


//   setNic(res.data.data.nic)
//   setFname(res.data.data.firstName)
//   setLname(res.data.data.lastName)
//   setPhone(res.data.data.phone)
//   setGender(res.data.data.gender)
//   var getDob = (res.data.data.dob).substring(0,10);
//   setDob(getDob);
//   //setDob(res.data.data.dob)

 
//   //setDob(D)
//   //console.log(res.data.data.dob.toLocaleString())

//   } catch (error) {
//   console.log(error);
//   }
//   }
//   fetchdata();
// },[]);


  const handleSubmit = async(e)=>{
    e.preventDefault();
    
    setEFname(false);
    setELname(false);
    setEGender(false);
    setEPhone(false);

    if(firstName == '')
    {
      setEFname(true);
      setEOpen(true);
    }
    if(lastName == '')
    {
      setELname(true);
      setEOpen(true);
    }
    if(gender == '')
    {
      setEGender(true);
      setEOpen(true);
    }
    if(phone == '')
    {
      setEPhone(true);
      setEOpen(true);
    }
    if(firstName && lastName && phone && gender)
    {
      setOpen(true);
      const data = {nic,firstName,lastName,phone,gender,dob}; 
      const urlUpdate = userData._id;
    try {
      const res = await axios({
        method: 'PATCH',
        url: `http://localhost:5000/ProfileModule/${urlUpdate}`,
        data
    })

      console.log(res);
    } catch (error) {
      console.log(error);
    }
    }
    
  }
  
  return (
    <div>
      <h1>Profile Details</h1>
      <div className={news.bck}>
        <Link to = '/'>
        <IconButton color="primary" size="large">
          <ArrowBackIosIcon />
        </IconButton>
        </Link>
      </div>
      {/* <div> <PDF/> </div> */}

      <div>
      <div className={news.logo}>
        <AccountCircleIcon color="primary" style={{ fontSize: 170 }} />
      </div>

      <form className={news.form} autoComplete = "off" noValidate onSubmit = {handleSubmit}>


        <div className={news.mycontainer}>
          <TextField
            disabled
            id="outlined-disabled"
            defaultValue="NIC"
            variant="outlined"
            className={news.rad}
            size="small"
            value={nic}
            onChange={(e)=>{
              console.log(e.target.value)
            }}
          />
          </div>

          <div className={news.mycontainer}>
          <TextField
            id="outlined-basic"
            // label="Enter First Name"
            variant="outlined"
            className={news.rad}
            size="small"
            error={ErrorFirstName}
            value={firstName}
            onChange={(e)=>{
              setFname(e.target.value)
            }}
          />
          </div>

          <div className={news.mycontainer}>
          <TextField
            id="outlined-basic"
            // label="Enter Last Name"
            variant="outlined"
            size="small"
            className={news.rad}
            error={ErrorLastName}
            value={lastName}
            onChange={(e)=>{
              setLname(e.target.value)
            }}
          />
          </div>
       
        <div className={news.mycontainer}>
        <TextField
            id="outlined-basic"
            // label="Gender"
            variant="outlined"
            size="small"
            className={news.rad}
            value={gender}
            error={ErrorGender}
            onChange={(e)=>{
              setGender(e.target.value)
            }}
          />
          </div>  
          
          <div className={news.mycontainer}>
          <TextField
            id="outlined-basic"
            // label="Phone number"
            variant="outlined"
            className={news.rad}
            size="small"
            error={ErrorPhone}
            value={phone}
            onChange={(e)=>{
              setPhone(e.target.value)
            }}
          />
          </div>
        
        <div className={news.mycontainer}>
          <TextField
            id="datetime-local"
            // label="Birthday"
            className={news.rad}
            type="date"
            value={dob}
            //defaultValue={new Date.now()}
            onChange={(e)=>{
              setDob(e.target.value)
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          

          </div>
        
        <div className={news.radBtn}>
          <Button color="primary" variant="contained" type = "submit">DONE</Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Updated Successfully!
          </Alert>
          </Snackbar>
          <Snackbar open={Eopen} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Error!
          </Alert>
          </Snackbar>

          </div>
      </form>
      </div>
    </div>
  );
}



export default AddNP;
