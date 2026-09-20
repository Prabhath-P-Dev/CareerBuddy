import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import CareerPathForm from './pages/CareerPathForm';
import Roadmap from './pages/Roadmap';
import Auth from './pages/Auth';

export default function App(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/career" element = {< CareerPathForm/>} />
            <Route path="/roadmap" element = {< Roadmap/>} />
            <Route path="/login" element= {<Auth />} />
            
        </Routes>
    )
}