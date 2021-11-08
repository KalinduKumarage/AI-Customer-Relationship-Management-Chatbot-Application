import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import doctor from "../images/doctor.png";
import { createAppointment } from "../actions/appointmentAction";
import Select from "@material-ui/core/Select";
import Alert from "@material-ui/lab/Alert";


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
  buttonSubmit: {
    margin: theme.spacing(1),
  },
  buttonUpload: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  formLabel: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function Appointment(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [session, setSession] = React.useState('');
  //const [open, setOpen] = React.useState(false);

  const [successOpen, setSuccessOpen] = useState(false);
  const [validationFailureOpen, setValidationFailureOpen] = useState(false);

  //hooks for errors on each field
  const [emptyPatientName, setEmptyPatientName] = useState(false);
  const [emptyContactNumber, setEmptyContactNumber] = useState(false)

  const [emptyLabelPatientName, setEmptyLabelPatientName] = useState(false);
  const [emptyLabelContactNumber, setEmptyLabelContactNumber] = useState(false);
  
  const handleChange = (event) => {
    setSession(event.target.value);
    setInputFields({ ...inputFields, appointmentTime: event.target.value });    
  };

  const handleClose = () => {
    //setOpen(false);
    setSuccessOpen(false);
    setValidationFailureOpen(false);
  };

 
  //store data in useState object
  const [inputFields, setInputFields] = useState([
    {
      appointmentTime: "",
      patientName: "",
      doctorName: "",
      contactNo: "",
    },
  ]);

  //button function clear
  const clear = () => {
    setInputFields({
      appointmentTime: "",
      patientName: "",
      doctorName: "",
      contactNo: "",
    });
  };

  //once user submits user data is sent using dispatch
  const submitHandler = (e) => {
    e.preventDefault();

    //validation of fields
    let validity = true;
    setEmptyContactNumber(false);
    setEmptyPatientName(false)
    setEmptyLabelContactNumber("");
    setEmptyLabelPatientName("");

    if(inputFields.patientName === ""){
      validity = false;
      setEmptyPatientName(true);
      setEmptyLabelPatientName("Please enter Patient name");
    }

    if(inputFields.contactNo === ""){
      validity = false;
      setEmptyContactNumber(true);
      setEmptyLabelContactNumber("Please enter a valid Contact Number");
    }

    if(validity === true){
      setEmptyContactNumber(false);
      setEmptyLabelContactNumber("");
      setEmptyPatientName(false);
      setEmptyLabelPatientName("");

      dispatch(createAppointment(inputFields));
      setSuccessOpen(true);
      setSession('');
      clear();

      setSuccessOpen(true);
    } else {
      setValidationFailureOpen(true);
    }


    console.log(inputFields);
  };


  function cancelHandler() {
    props.onCancel();
  }
  return (
    <div className="modalAppointment"><center>
      <Typography variant="h6" gutterBottom>
        Appointment Summary
      </Typography>
      <img src={doctor} alt="doctor" width="150" height="150" />
      <form className={classes.root} onSubmit={submitHandler}  autoComplete="off">
      
        <TextField
          name="patientName"
          label="Patient's Name"
          error={emptyPatientName}
          helperText={emptyLabelPatientName}
          value={inputFields.patientName}
          variant="outlined"
          color="primary"
          size="small"
          onChange={(e) =>
            setInputFields({ ...inputFields, patientName: e.target.value })
          }
        />
        <br></br>
        <TextField
          name="doctorName"
          label="Doctor Name"
          value={inputFields.doctorName}
          variant="outlined"
          color="primary"
          size="small"
          onChange={(e) =>
            setInputFields({ ...inputFields, doctorName: e.target.value })
          }
        />
        <br></br>
        <TextField
          name="contactNo"
          label="Contact Number"
          error={emptyContactNumber}
          helperText={emptyLabelContactNumber}
          value={inputFields.contactNo}
          variant="outlined"
          color="primary"
          size="small"
          onChange={(e) =>
            setInputFields({ ...inputFields, contactNo: e.target.value })
          }
        />
        <br></br>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select a Session </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{ width: "27ch" }}
          value={session}
          onChange={handleChange}          
          MenuProps={{style: {zIndex: 35001}}}
        >
          <MenuItem value={'No.3 18th of October 10.00 a.m'}>No.3 18th of October 10.00 a.m</MenuItem>
          <MenuItem value={'No.4 18th of October 10.30 a.m'}>No.4 18th of October 10.30 a.m</MenuItem>
          <MenuItem value={'No.7 18th of October 11.00 a.m'}>No.7 18th of October 11.00 a.m</MenuItem>
          <MenuItem value={'No.8 18th of October 11.20 a.m'}>No.8 18th of October 11.20 a.m</MenuItem>
          <MenuItem value={'No.9 18th of October 11.30 a.m'}>No.9 18th of October 11.30 a.m</MenuItem>
        </Select>
      </FormControl>
      <br></br>
        
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          type="submit"
        >
          Confirm
        </Button>
        <Snackbar open={successOpen} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Appointment Confirmation Successful!
          </Alert>
        </Snackbar>
        <Snackbar open = {validationFailureOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
            Please make sure all fields are filled!
          </Alert>
          </Snackbar>
  
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          onClick={clear}
        >
          Back
        </Button>
      </form>
      </center>
    </div>
  );
}

export default Appointment;
