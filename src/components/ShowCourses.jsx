import { Typography, Card, CircularProgress, Button } from "@mui/material";
import React, { useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../config"
function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    useEffect(()=>{
        async function getdata(){
            const res = await axios({
                method: "GET",
                url: "http://localhost:3000/admin/courses/",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            const data = res.data;
            if(courses){
                setCourses(data.courses);
            }
        }
        getdata();
    },[])
    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    if(!courses.length){
        return (
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: 500}}>
              <CircularProgress/>
            </div>
        )
    }
    return <div>
         <Typography textAlign="center" variant="h4">Courses</Typography>
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {courses.map(c => <Course course={c} setCourses={setCourses} courses={courses}/>)}
        </div>
    </div>
}

function Course(props) {
    const navigate = useNavigate();
    return <Card variant="outlined" style={{width: 300,margin: 10, padding: 10, border: "1px solid black", minHeight: 200}}>
        <img src={props.course.imageLink} style={{width: 300, height: "15rem"}} alt="" />
        <Typography variant="h6" textAlign="center" fontWeight="bold">{props.course.title}</Typography>
        {/* <h3>{props.course.title}</h3> */}
        <Typography variant="subtitle1" textAlign="center">{props.course.description}</Typography>
        {/* <h4></h4> */}
        <div style={{display: "flex", justifyContent: "space-around", marginTop: 20}}>
            <Button variant="contained" size="large"
            onClick={()=>{
                navigate("/course/"+props.course._id);
            }}
            >Edit</Button>
            <Button variant="contained" size="large" color="error"
            onClick={async()=>{
                const res = await axios.delete(BASE_URL + "/admin/courses/" + props.course._id, {headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }});
                if(res.data){
                    alert("course deleted successfully");
                }
                let newCourses = props.courses.filter(c => c._id !== props.course._id);
                props.setCourses(newCourses);
                console.log(newCourses);
                console.log(res.data);
            }}
            >Delete</Button>
        </div>
    </Card>
}

export default ShowCourses;