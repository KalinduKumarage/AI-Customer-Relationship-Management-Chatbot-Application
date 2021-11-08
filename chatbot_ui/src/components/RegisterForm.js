import React from "react";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { setUserAuthentication, isUserAuthenticated } from "../helpers/auth";
import { createUser } from "../api/index.js";
import { setUserAuthentication } from "../helpers/auth.js";

//import { createUser, getUsers } from "../actions/users";

import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    button: {
      margin: theme.spacing(1),
    },
  },
}));

const RegisterForm = () => {
  // const users = useSelector((state) => state.users);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    nic: "",
    email: "",
    dob: "",
    gender: "",
  });

  const submitUser = (event) => {
    event.preventDefault();
    // var users = dispatch(getUsers());
    // for (var user in users) {
    // }
    createUser(userData)
      .then((response) => {
        setUserAuthentication(response.data.token, response.data.newUser);
        console.log(response.data);
        // if(response.data === "Contains Email"){
         
        // }else{
        //   <Alert severity="success" sx={{ width: "100%" }}>
        //     Registered user!
        //   </Alert>;
        // }
         <Alert severity="success" sx={{ width: "100%" }}>
           User Already Present!
         </Alert>;

      })

      .catch((err) => {
        console.log("Sign In Api Error:", err);
      });
    // dispatch(createUser(userData));
    setUserData({
      firstName: "",
      lastName: "",
      phone: "",
      nic: "",
      email: "",
      dob: "",
      gender: "",
    });
  };

  return (
    <div className="modalRegisterForm">
      <center>
        <h1>Registration Form</h1>
      </center>
      <Divider variant="middle" />
      <br></br>
      <center>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={submitUser}
        >
          <TextField
            name="firstName"
            required
            id="filled-required"
            label="First Name"
            variant="outlined"
            value={userData.firstName}
            onChange={(e) =>
              setUserData({ ...userData, firstName: e.target.value })
            }
          />
          <TextField
            name="lastName"
            required
            id="filled-required"
            label="Last Name"
            variant="outlined"
            value={userData.lastName}
            onChange={(e) =>
              setUserData({ ...userData, lastName: e.target.value })
            }
          />

          <br></br>
          <TextField
            name="nic"
            required
            id="filled-required"
            label="NIC"
            variant="outlined"
            value={userData.nic}
            onChange={(e) => setUserData({ ...userData, nic: e.target.value })}
          />

          <TextField
            name="phone"
            required
            id="filled-required"
            label="Phone Number"
            placeholder="Phone number"
            variant="outlined"
            value={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
          />

          <br></br>
          <TextField
            name="email"
            required
            type="email"
            id="filled-required"
            label="Email"
            variant="outlined"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <TextField
            id="date"
            label="Date of Birth"
            type="date"
            variant="outlined"
            value={userData.dob}
            onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br></br>
          <FormControl component="fieldset"></FormControl>

          <FormLabel component="legend" className="gender" variant="outlined">
            Gender
          </FormLabel>
          <RadioGroup
            name="gender"
            aria-label="gender"
            className="gender"
            value={userData.gender}
            onChange={(e) =>
              setUserData({ ...userData, gender: e.target.value })
            }
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
          <br></br>
          <br></br>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            startIcon={<SaveIcon />}
            fullWidth
          >
            Submit
          </Button>
         
        </form>
      </center>
    </div>
  );
};

export default RegisterForm;
