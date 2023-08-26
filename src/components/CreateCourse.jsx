import { Button, Card, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [published, setPublished] = React.useState(false);
    const [image, setImage] = React.useState("");
    return <div>
        {/* <h1>Create Course Page</h1> */}
        <div style={{display: "flex", justifyContent: "center", marginTop: 100}}>
            <Typography variant="h4">Create Course Page</Typography>       
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card variant="outlined" style={{width: 400, padding: 20}}>
                <TextField 
                    label="Title"
                    fullWidth
                    variant="outlined"
                    onChange={e => setTitle(e.target.value)}
                ></TextField>
                <br /><br />               
                <TextField
                    label="Description"
                    fullWidth
                    variant="outlined"
                    onChange={e => setDescription(e.target.value)}
                ></TextField>
                <br /><br />
                <TextField
                    label="Image Link"
                    fullWidth
                    variant="outlined"
                    onChange={e => setImage(e.target.value)}
                ></TextField>
                <br /><br />
                <div style={{display:"flex", justifyContent: "flex-start", alignItems: "center"}}>
                    <TextField
                        label="Price"
                        type="number"
                        id="outlined-number"
                        
                        onChange={e => setPrice(e.target.value)}
                    ></TextField>
                    <FormGroup style={{paddingLeft: 35}}>
                        <FormControlLabel control={<Checkbox onChange={e=>{
                            setPublished(e.target.checked)
                        }}/>} label="Published"></FormControlLabel>
                    </FormGroup>
                </div>
                
                <Button 
                    style={{marginTop: 20}} 
                    variant="contained"
                    onClick={async()=>{
                       
                        const res = await axios({
                            method: "POST",
                            url: "http://localhost:3000/admin/courses",
                            data: JSON.stringify({
                                title,
                                description,
                                price,
                                imageLink: image,
                                published
                            }),
                            headers:{
                                "Content-Type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        })
                        console.log(res.data);
                        alert("course added!");
                    }}
                >Add Course</Button>
            </Card>
        </div>
    </div>
}
export default CreateCourse;