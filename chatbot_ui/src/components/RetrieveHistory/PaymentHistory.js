import * as React from "react";
import { useState,useEffect} from "react";
import { Link } from "react-router-dom";
import news from "./RH.module.css";
import useFetch from "../../CustomHooks/UseFetch";
import ClipLoader from "react-spinners/ClipLoader";


import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Button } from "@material-ui/core";

const PaymentHHandler = () => 
{

    const { data: Payments, isPending, isError } = useFetch('http://localhost:5000/Payments');
    console.log(Payments);

    return(
        <div>
            <h1>My Payments...</h1>
            <div className={news.bck}>
                <Link className = {news.deco} to='/'>
                    <IconButton color="primary" size="large">
                        <ArrowBackIosIcon />
                    </IconButton>
                </Link>
            </div>
            <br/>

            <Grid container spacing={3}>  <Grid item xs={12}>
                {isError && <div>Something went wrong....</div>}
                {isPending && <div className = "spinner"><ClipLoader loading = {true} size = {50} color = '#074bb8;' /></div>}
                {Payments && Payments.map((c, idx) => {
                    return (
                        <Card key={idx}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h3">
                                        Payment Receipt 
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                    <b>First name:</b> 
                                    </Typography>
                                    <br/><Button color="primary" variant="contained" type = "submit">PRINT</Button>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )
                })}

            </Grid>

            </Grid>


        </div>

        
    );

}

export default PaymentHHandler;