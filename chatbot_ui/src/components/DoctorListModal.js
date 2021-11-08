import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { useDispatch } from "react-redux";
import { getDoctors } from "../actions/doctorActions";
import { CircularProgress } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import doctorStyles from "./doctors.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    maxWidth: 345,
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  media: {
    height: 140,
  },
}));

function DoctorListModal() {
  const [openAppointment, setOpenAppointment] = useState(false);
  const doctors = useSelector((state) => state.doctors);
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const dispatch = useDispatch();

  //test if doctors are being retrieved
  console.log(doctors);

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    console.log("doctor clicked");
    //setOpenAppointment(true);    
  };

  return !doctors.length ? (
    <CircularProgress />
  ) : (
    <div className="modalDoctorList" ><center>
      <div className={classes.root}>
        <h1 className="topic">Visiting Doctors</h1>
        <Grid container spacing={3}>
          {doctors.map((doctor) => (
            <Grid item xs={12}>
              {/* <Paper className={classes.paper}></Paper> */}
              <Link to = "/appointment" className={doctorStyles.decoration}>
              <Card className={classes.root} key={doctor._id} add>
                <CardActionArea to = {"/appointment"}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h3">
                      {doctor.doctorName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {doctor.specialty}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {doctor.visitingHours}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {doctor.hospital}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              </Link>
               
            </Grid>
          ))}
        </Grid>
        
      </div>
      </center>
    </div>
  );
}
export default DoctorListModal;
