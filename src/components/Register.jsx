import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Card, Link, Typography } from "@mui/material";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { useNavigate } from "react-router-dom";
/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();
    return <div>
        <div style={{paddingTop: 150, display:"flex", justifyContent: "center"}}>
            <Typography variant="h6">Register to the website</Typography>
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card variant="outlined" style={{width: 400, padding: 20}}>
                <TextField 
                    id="outlined-basic" 
                    label="Email" 
                    variant="outlined" 
                    fullWidth
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <br /><br />
                <TextField 
                    id="outlined-basic" 
                    label="Password" 
                    variant="outlined" 
                    fullWidth
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <br /><br />
                <Button 
                    variant="contained"
                    onClick={async ()=>{
                        console.log(password, email);
                        const res = await axios({
                            method: "POST",
                            url: "http://localhost:3000/admin/signup",
                            data: JSON.stringify({
                                username: email,
                                password
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });
                        console.log(res.data);
                        localStorage.setItem("token",res.data.token);
                        setUser({
                            isLoading: false,
                            userEmail: email
                        })
                        navigate("/courses");
                        // location.href = "/courses";
                    }}     
                >Sign up</Button>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography>Already a user? </Typography>
                    <div style={{marginLeft: 10}}>
                        {/* <Button size="large" variant="outlined" href="/login">Sign in</Button> */}
                        <Link underline="hover" href="/login">Sign in</Link>
                    </div>
                </div>
            
                {/* <a href="/login">Login</a> */}
            </Card>
        </div>
    </div>
}

export default Register;