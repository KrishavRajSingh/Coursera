
import React from "react";
import {Button, Grid, Typography} from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/user";
/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
    const navigate = useNavigate();
    const userEmail = useRecoilValue(userEmailState);
    return <Grid container style={{marginTop: "15vh"}}>
        <Grid item lg={7} xs={12} md={6} style={{display: "flex", justifyContent: "center"}} >
                <img style={{objectFit: "contain"}} src="https://media.istockphoto.com/id/1216068188/photo/online-education-concept-with-person-using-a-laptop.jpg?s=612x612&w=0&k=20&c=lE3XaeuvRKBYtgV0SzJ4SMjuZi-a4iPfUH0fgxegU0E=" alt="" />
           
        </Grid>
        <Grid item lg={5} xs={12} md={6} display={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>

            <Typography variant="h5" textAlign={"center"}>Admin Dashboard</Typography>
            <Typography variant="h2" textAlign={"center"}>Coursera</Typography>
            <Typography variant="h6" textAlign={"center"}>Learn, Earn and Grow</Typography>
            {/* <h1>Welcome to course selling website!</h1> */}
            {!userEmail && <div style={{display: "flex", justifyContent: "center"}}>
                <Button style={{margin:15}} variant="contained"
                    onClick={()=>navigate("/register")}
                >Sign up</Button>          
                <Button style={{margin:15}} variant="contained"
                    onClick={() => {
                        navigate("/login")
                    }}
                >Sign in</Button>
            </div>}
            
        </Grid>
    </Grid>
}

export default Landing;