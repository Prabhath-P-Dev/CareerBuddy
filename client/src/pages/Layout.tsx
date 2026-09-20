import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import {useSelector} from 'react-redux'
import Loader from "../components/Loader";
import Auth from "./Auth";


const Layout = ()=>{
    const {user, loading} = useSelector((state:any) => state.auth)
    if(loading){
     return  <Loader />
    }
    return(
        <div>
            { 
              user ? (
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <Outlet />
            </div>
            ):(
                <Auth />
            )
        }
            
        </div>

    )
}


export default Layout;
