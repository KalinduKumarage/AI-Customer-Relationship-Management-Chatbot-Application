import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CancelOutlined from "@material-ui/icons/CancelOutlined";
import Icon from "@material-ui/core/Icon";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import { createPrescription } from "../actions/precriptionAction";
import Divider from "@material-ui/core/Divider";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import InputIcon from '@material-ui/icons/Input';
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
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
  prescriptionInput: {
    width: "55ch",
  },
  checkBoxField: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
}));

function FormModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  // use state variables
  const [baseImage, setBaseImage] = useState("");

  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);
  const [validationFailureOpen, setValidationFailureOpen] = useState(false);

  // error state hooks for each form field
  const [emptyFirstName, setEmptyFirstName] = useState(false);
  const [emptyLastName, setEmptyLastName] = useState(false);
  const [emptyAllergies, setEmptyAllergies] = useState(false);
  const [emptyHealthConditions, setEmptyHealthConditions] = useState(false);
  const [emptyMedicines, setEmptyMedicines] = useState(false);
  const [emptyLabelFirstName, setEmptyLabelFirstName] = useState(false);
  const [emptyLabelLastName, setEmptyLabelLastName] = useState(false);
  const [emptyLabelAllergies, setEmptyLabelAllergies] = useState(false);
  const [emptyLabelHealthConditions, setEmptyLabelHealthConditions] =
    useState(false);
  const [emptyLabelMedicines, setEmptyLabelMedicines] = useState(false);

  const [inputFields, setInputFields] = useState([
    {
      firstName: "",
      lastName: "",
      allergies: "",
      healthConditions: "",
      medicines: "",
      gender: "",
      selectedImage: "",
    },
  ]);

  const [genderValue, setGenderValue] = useState("");

  // handlers
  const handleRadioChange = (event) => {
    setGenderValue(event.target.value);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
    setFailureOpen(false);
    setValidationFailureOpen(false);
  };

  const clear = () => {
    setInputFields({
      firstName: "",
      lastName: "",
      allergies: "",
      healthConditions: "",
      medicines: "",
      gender: "",
      selectedImage: "",
    });
    setGenderValue("");
    setBaseImage("");
  };

  const resetHandler = () => {
    setEmptyFirstName(false);
    setEmptyLabelFirstName("");
    setEmptyLastName(false);
    setEmptyLabelLastName("");
    setEmptyAllergies(false);
    setEmptyLabelAllergies("");
    setEmptyHealthConditions(false);
    setEmptyLabelHealthConditions("");
    setEmptyMedicines(false);
    setEmptyLabelMedicines("");

    setInputFields({
      firstName: "",
      lastName: "",
      allergies: "",
      healthConditions: "",
      medicines: "",
      gender: "",
      selectedImage: "",
    });
    setGenderValue("");
    setBaseImage("");
  };

  const removeImageHandler = () => {
    if (baseImage === "") {
      setFailureOpen(true);
    } else {
      setBaseImage("");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let validity = true;
    let validityImage = true;

    setEmptyFirstName(false);
    setEmptyLabelFirstName("");
    setEmptyLastName(false);
    setEmptyLabelLastName("");
    setEmptyAllergies(false);
    setEmptyLabelAllergies("");
    setEmptyHealthConditions(false);
    setEmptyLabelHealthConditions("");
    setEmptyMedicines(false);
    setEmptyLabelMedicines("");

    if (genderValue === "Male") {
      inputFields.gender = "Male";
    } else if (genderValue === "Female") {
      inputFields.gender = "Female";
    } else if (genderValue === "Other") {
      inputFields.gender = "Other";
    }

    if (inputFields.firstName === "") {
      validity = false;
      setEmptyFirstName(true);
      setEmptyLabelFirstName("Please enter your First Name");
    }
    if (inputFields.lastName === "") {
      validity = false;
      setEmptyLastName(true);
      setEmptyLabelLastName("Please enter your Last Name");
    }
    if (inputFields.allergies === "") {
      validity = false;
      setEmptyAllergies(true);
      setEmptyLabelAllergies("Please enter any present allergies");
    }
    if (inputFields.healthConditions === "") {
      validity = false;
      setEmptyHealthConditions(true);
      setEmptyLabelHealthConditions(
        "Please enter any present Health Conditions"
      );
    }
    if (inputFields.medicines === "") {
      validity = false;
      setEmptyMedicines(true);
      setEmptyLabelMedicines("Please enter the Medicines");
    }
    if (inputFields.gender === "") {
      validity = false;
    }
    if (inputFields.selectedImage === "") {
      validityImage = false;
    }

    if (validity === true || validityImage === true) {
      setEmptyFirstName(false);
      setEmptyLabelFirstName("");
      setEmptyLastName(false);
      setEmptyLabelLastName("");
      setEmptyAllergies(false);
      setEmptyLabelAllergies("");
      setEmptyHealthConditions(false);
      setEmptyLabelHealthConditions("");
      setEmptyMedicines(false);
      setEmptyLabelMedicines("");

      dispatch(createPrescription(inputFields));
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

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
    setInputFields({ ...inputFields, selectedImage: base64 });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="modalPrescription">
      <Typography variant="h5" gutterBottom>
        Enter your Prescription
      </Typography>
      <form className={classes.root} onSubmit={submitHandler}>
        <TextField
          name="firstName"
          label="First Name"
          error={emptyFirstName}
          helperText={emptyLabelFirstName}
          value={inputFields.firstName}
          variant="outlined"
          color="primary"
          size="small"
          onChange={(e) =>
            setInputFields({ ...inputFields, firstName: e.target.value })
          }
        />
        <TextField
          name="lastName"
          label="Last Name"
          error={emptyLastName}
          helperText={emptyLabelLastName}
          value={inputFields.lastName}
          variant="outlined"
          color="primary"
          size="small"
          onChange={(e) =>
            setInputFields({ ...inputFields, lastName: e.target.value })
          }
        />
        <br />
        <br />
        <FormControl component="fieldset">
          <FormLabel className={classes.formLabel} component="legend">
            Gender
          </FormLabel>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            value={genderValue}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="Male"
              control={<Radio color="primary" />}
              label="Male"
              labelPlacement="start"
            />
            <FormControlLabel
              value="Female"
              control={<Radio color="primary" />}
              label="Female"
              labelPlacement="start"
            />
            <FormControlLabel
              value="Other"
              control={<Radio color="primary" />}
              label="Other"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <TextField
          name="allergies"
          label="Allergies"
          error={emptyAllergies}
          helperText={emptyLabelAllergies}
          value={inputFields.allergies}
          variant="outlined"
          color="primary"
          className={classes.prescriptionInput}
          size="small"
          onChange={(e) =>
            setInputFields({ ...inputFields, allergies: e.target.value })
          }
        />
        <br />
        <TextField
          name="healthConditions"
          label="Health Conditions"
          error={emptyHealthConditions}
          helperText={emptyLabelHealthConditions}
          value={inputFields.healthConditions}
          variant="outlined"
          color="primary"
          className={classes.prescriptionInput}
          size="small"
          onChange={(e) =>
            setInputFields({ ...inputFields, healthConditions: e.target.value })
          }
        />
        <TextField
          id="outlined-textarea"
          label="Enter Prescriptions"
          error={emptyMedicines}
          helperText={emptyLabelMedicines}
          value={inputFields.medicines}
          placeholder="Placeholder"
          className={classes.prescriptionInput}
          multiline
          variant="outlined"
          onChange={(e) =>
            setInputFields({ ...inputFields, medicines: e.target.value })
          }
        />
        <br />
        <br />
        <Typography variant="h6" gutterBottom>
          Or Upload an Image
        </Typography>
        <Divider variant="middle" />
        <br />
        <div className={classes.root}>
          <input
            accept="image/*"
            id="contained-button-file"
            className={classes.input}
            type="file"
            onChange={(e) => {
              uploadImage(e);
            }}
          />
          <label htmlFor="contained-button-file">
            <Button
              className={classes.buttonUpload}
              size="medium"
              variant="outlined"
              color="primary"
              component="span"
              endIcon={<AddAPhotoIcon />}
            >
              Upload an Image
            </Button>
          </label>
          <Button
            style={{ marginLeft: 2 }}
            variant="outlined"
            color="secondary"
            endIcon={<DeleteOutlinedIcon />}
            onClick={removeImageHandler}
          >
            Remove Image
          </Button>
          <br />
          <img src={baseImage} height="200px" />
        </div>
        <br />

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          type="submit"
          onClick={submitHandler}
          endIcon={<InputIcon />}
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          endIcon={<CancelOutlined />}
          onClick={cancelHandler}
        >
          Cancel
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="outlined"
          color="primary"
          endIcon={<RotateLeftIcon />}
          onClick={resetHandler}
        >
          Reset
        </Button>
        <Snackbar
          open={successOpen}
          autoHideDuration={3000}
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity="success"
            variant="filled"
            elevation={6}
          >
            Prescription has been successfully uploaded!
          </Alert>
        </Snackbar>
        <Snackbar
          open={failureOpen}
          autoHideDuration={5000}
          variant="filled"
          elevation={6}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity="error">
            There is no image, Please insert an Image.
          </Alert>
        </Snackbar>
        <Snackbar
          open={validationFailureOpen}
          autoHideDuration={5000}
          variant="filled"
          elevation={6}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity="error">
            Cannot leave the fields empty, Upload an Image or Fill in the
            Fields.
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
}

export default FormModal;
