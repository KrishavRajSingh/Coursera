import { Button, Card, Link, TextField, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { useNavigate } from "react-router-dom";
// import { userEmailState } from "../store/selectors/user";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();
    return <div>
        <div style={{display: "flex", justifyContent: "center", paddingTop: 150}}>
            <Typography variant="h6">Login to admin dashboard</Typography>
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card variant="outlined" style={{width: 400, padding: 20}}>
                <TextField label="Email" id="outlined-basic" variant="outlined" fullWidth onChange={e => setEmail(e.target.value)} />
                <br /><br />
                <TextField label="Password" id="outlined-basic" type="password" fullWidth onChange={e => setPassword(e.target.value)} />
                <br/><br />
                {/* <button>Login</button> */}
                <Button 
                    variant="contained"
                    onClick={async() => {
                        const res = await axios({
                            method: "POST",
                            url: "http://localhost:3000/admin/login",
                            headers: {
                                username: email,
                                password
                            }
                        })
                        console.log(res.data);
                        localStorage.setItem("token",res.data.token);
                        setUser({
                            userEmail: email,
                            isLoading: false
                        });
                        navigate("/courses");
                    }}
                >Sign in</Button>
                <br/>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography >New here? </Typography>
                    <div style={{marginLeft: 6}}>
                        <Link underline="hover" href="/register">Sign up</Link>
                    </div>
                </div>
                {/* <a href="/register">Register</a> */}
            </Card>
        </div>
        <br/>
    </div>
}

export default Login;