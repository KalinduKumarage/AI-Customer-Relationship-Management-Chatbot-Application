import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { useDispatch } from "react-redux";
import { getHospitals } from "../actions/hospitalAction";
import {CircularProgress } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 140,
  },
}));

function HospitalModal() {
  const hospitals = useSelector((state) => state.hospitals);
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const dispatch = useDispatch();

  //test if doctors are being retrieved
  console.log(hospitals);

  useEffect(() => {
    dispatch(getHospitals());
  }, [dispatch]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
     !hospitals.length ?<CircularProgress /> : (
    <div className="modalDoctorList"><center>
     <div className={classes.root}>
       <h1 className="topic">Hospitals</h1>
      <Grid container spacing={3}>
        {hospitals.map((hospital) =>(
          <Grid item xs = {12}>
          {/* <Paper className={classes.paper}></Paper> */}
          <Card className={classes.root} key ={hospital._id}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {hospital.hospitalName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           {hospital.hospitalAddress}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        </Grid>
        ))}
        
      </Grid>
    </div>
    </center>
    </div>
    
  )
  );
}
export default HospitalModal;
