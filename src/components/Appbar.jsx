import { Button, CircularProgress, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// import { isUserLoading, userEmailState } from '../store/selectors/user';
import { userState } from '../store/atoms/user';
import { courseState } from '../store/atoms/course';

function Appbar() {
    const navigate = useNavigate();

    const [user, setUser] = useRecoilState(userState);
    const setCourse = useSetRecoilState(courseState);
    if(user.isLoading){
        return (
        <div style={{display: "flex", justifyContent: "center", padding: 8}}>
            <CircularProgress/>
        </div>
        )
    }
    if(user.userEmail){
        return (
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#dfe6e9"}}>
                <div style={{cursor: 'pointer', marginLeft: 10}}>
                    <Typography variant='h6' onClick={()=>navigate("/")}>Coursera</Typography>
                </div>
                <div style={{display: "flex", padding: 5, alignItems: "center"}} className='nav-button' >       
                    <div>
                        {user.userEmail}
                    </div>
                    <Button 
                        variant={"outlined"} 
                        onClick={()=>{
                            navigate("/courses");
                            }
                        }
                        style={{margin: 5}}
                    >Courses</Button>

                    <Button 
                        variant={"outlined"} 
                        onClick={()=>{
                            navigate("/createCourse");
                            }
                        }
                        style={{margin: 5}}
                    >Add Course</Button>
                    <Button 
                        variant={"contained"} 
                        onClick={()=>{
                            localStorage.setItem("token", null);
                            // location.href = "/";
                            setUser({
                                isLoading: false,
                                userEmail: null
                            });
                            setCourse({
                                isLoading: true,
                                course: null
                            })
                            }
                        }
                        style={{margin: 5}}
                        color='error'
                    >Log out</Button>
                </div>
            </div>
        )
    }else{
        return (
          
          <div style={{display: "flex", justifyContent: "space-between", padding: 4, alignItems: "center", backgroundColor: "#c8d6e5"}}>
              <div style={{cursor: 'pointer', marginLeft: 10}}>
                  <Typography variant='h6' onClick={()=>navigate("/")}>Coursera</Typography>
              </div>
              <div style={{display: "flex", padding: 1}} className='nav-button' >
                  <div>
                      <Button variant={"outlined"} onClick={()=>{navigate("/register")}}>Sign up</Button>
                  </div>
                  <div>
                      <Button variant={"outlined"} onClick={()=>navigate("/login")}>Sign in</Button>
      
                  </div>
              </div>
          </div>
        )
    }

}

export default Appbar