import { CircularProgress, Card, Typography, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { courseDescription, courseDetails, courseImage, courseTitle, isCourseLoading } from '../store/selectors/course';
import { courseState } from '../store/atoms/course';
function Course() {
  let {courseId} = useParams();
  const setCourse = useSetRecoilState(courseState);
  let loading = useRecoilValue(isCourseLoading);
  useEffect(()=>{
    setCourse({isLoading: true, course: []})
    axios({
      method: "GET",
      url: "http://localhost:3000/admin/course/" + courseId,
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    .then(res=> {
      const data = res.data;
      setCourse({
        isLoading: false,
        course: data.course
      });
    })
    .catch(err => {
      setCourse({
        isLoading: false,
        course: null
      })
    })
  }, [])
  
  if(loading){
    return (
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: 500}}>
        <CircularProgress/>
      </div>
    )
  }

  // if(!course){
  //   console.log(course);
  //   return (
  //     <div>404!!! Course doesn't exists</div>
  //   )
  // }

  // return (
  //   <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", alignItems: "center"}}>
  //     <CourseCard course={course}/> 
  //     <UpdateCourse setCourse={setCourse} course={course}/>
  //   </div>
  // )

  return (
    <div>
      <GrayTopper></GrayTopper>
      <Grid container style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Grid item lg={7} md={7} sm={10}>
          <UpdateCourse/>
        </Grid>
        <Grid item lg={5} md={4} sm={2}>
          <CourseCard/>
        </Grid>
      </Grid>
    </div>
  )
}

function GrayTopper(){
  const title = useRecoilValue(courseTitle);
  return <div style={{background: "#212121", width: "100vw", height: 200, color: "white", display: "flex", alignItems: "center", justifyContent: "center"}}>
    <Typography variant='h3' style={{fontWeight: 100}}>{title}</Typography>    
  </div>
}

function CourseCard() {
  const title = useRecoilValue(courseTitle);
  const description = useRecoilValue(courseDescription);
  const imageLink = useRecoilValue(courseImage);
  return <Card variant="outlined" style={{width: 300,margin: 50, border: "1px solid black", minHeight: 200}}>
    <img src={imageLink} style={{width: 300 }} alt="" />
    <Typography variant="h6" textAlign="center" fontWeight="bold">{title}</Typography>
    <Typography variant="body1" textAlign="center">{description}</Typography>
  </Card>
}

function UpdateCourse() {
  
  const [courseDetails, setCourse] = useRecoilState(courseState);
  const [title, setTitle] = useState(courseDetails.course.title);
  const [description, setDescription] = React.useState(courseDetails.course.description);
  const [price, setPrice] = React.useState(courseDetails.course.price);
  const [published, setPublished] = React.useState(courseDetails.course.published);
  const [image, setImage] = React.useState(courseDetails.course.imageLink);

  return (
      <div style={{display: "flex", justifyContent: "center", margin: 50}}>
          <Card variant="outlined" style={{width: 400, padding: 20}}>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Typography variant="h6">Update Course</Typography>       
            </div>
              <TextField 
                  label="Title"
                  fullWidth
                  variant="outlined"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
              ></TextField>
              <br /><br />               
              <TextField
                  label="Description"
                  fullWidth
                  variant="outlined"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
              ></TextField>
              <br /><br />
              <TextField
                  label="Image Link"
                  fullWidth
                  variant="outlined"
                  value={image}
                  onChange={e => setImage(e.target.value)}
              ></TextField>
              <br /><br />
              <div style={{display:"flex", justifyContent: "flex-start", alignItems: "center"}}>
                  <TextField
                      label="Price"
                      type="number"
                      id="outlined-number"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                  ></TextField>
                  <FormGroup style={{paddingLeft: 35}}>
                      <FormControlLabel control={<Checkbox checked={published} onChange={e=>{
                          setPublished(e.target.checked)
                      }}/>} label="Published"></FormControlLabel>
                  </FormGroup>
              </div>
              
              <Button 
                  style={{marginTop: 20}} 
                  variant="contained"
                  onClick={async()=>{
                      const res = await axios({
                          method: "PUT",
                          url: "http://localhost:3000/admin/courses/" + courseDetails.course._id,
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
                      if(res){
                        let updatedCourse = {
                          _id: courseDetails.course._id,
                          title,
                          description,
                          price,
                          imageLink: image,
                          published
                        };
                        setCourse({course: updatedCourse, isLoading: false});
                        alert("Course updated successfully");
                      }
                  }}
              >Update Course</Button>
          </Card>
      </div>
  )
  
}
export default Course