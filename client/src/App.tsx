import {Routes, Route} from 'react-router-dom'
import { useEffect } from 'react';
import Home from "./pages/Home";
import CareerPathForm from './pages/CareerPathForm';
import Roadmap from './pages/Roadmap';
import Layout from './pages/Layout';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { Navigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import api from './configs/api';
import { login } from './store/authSlice';
import { setLoading } from './store/authSlice';


export default function App(){
    const dispatch = useDispatch()

     const getUserData = async () => {
        const token = localStorage.getItem('token')
        try{
            if(token){
                const {data} = await api.get('/api/users/data', {headers:{Authorization:token}})
                if(data.user){
                   dispatch(login({token, user :data.user})) 
                }
                dispatch(setLoading(false))
            }else{
                dispatch(setLoading(false))
            }
        }catch(error:any){
            dispatch(setLoading(false))
            console.log(error.message)
        }
     }

     useEffect(()=>{
        getUserData();
     },[])
    return(
        <Routes>
            <Route path="/" element={<Home />} />
        <Route path="/app" element={<Layout />}>
            <Route index element={<Navigate to="career"/>}/>
            <Route path="career" element = {< CareerPathForm/>} />
            <Route path="roadmap" element = {< Roadmap/>} />
        </Route>
           <Route path="forgot-password" element={<ForgotPassword />} />
           <Route path="reset-password/:token" element={<ResetPassword />} />
            
            
        </Routes>
    )
}