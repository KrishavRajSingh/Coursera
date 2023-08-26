import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import Appbar from './components/Appbar';
import Course from "./components/Course"
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import {userState} from "./store/atoms/user";
import axios from 'axios';
import {BASE_URL} from "./config"
// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    const setUser = useSetRecoilState(userState);
    async function init(){
        try{
            const res = await axios.get(BASE_URL + "/admin/me", {
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            });

            if(res.data.username){
                setUser({
                    isLoading: false,
                    userEmail: res.data.username
                });
            }else{
                setUser({
                    isLoading: false,
                    userEmail: null
                });
            }
        }catch(err){
            setUser({
                isLoading: false,
                userEmail: null
            });
            console.error(" try signing in/up",err);
        }
    }

    useEffect(()=>{
        init();
    },[])

    return (
        <div style={{backgroundColor: "#eeeeee", height: "100vh", width: "100vw", overflow: "scroll"}}>
            <Router>
                <Appbar/>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/createCourse" element={<CreateCourse />} />
                    <Route path="/courses" element={<ShowCourses />} />
                    <Route path='/course/:courseId' element={<Course/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;