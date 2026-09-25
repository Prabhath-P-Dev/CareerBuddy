import React, { useState } from "react"
import api from "../configs/api"
import { useDispatch } from "react-redux"
import { register, login } from "../store/authSlice"
import { Link } from "react-router-dom"
const Auth = () => {

    const dispatch = useDispatch();
    const query = new URLSearchParams(window.location.search)
    const urlState = query.get("state")

    const [state, setState] = useState(urlState || "login")
    const [error, setError] = useState(" ")
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        if(state === "register" && !formData.name.trim()) {
            setError("Name is required");
            return;
        }

        if(!formData.email.trim()){
            setError("Email is required");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(formData.email)){
            setError("Please Enter a valid email")
            return;
        }

        if(!formData.password){
            setError("Password is required")
            return;
        }

        if(state === "register" && formData.password.length < 8){
            setError("Password must be atleast 8 characters")
            return;
        }
        setError("");
        try{
            setLoading(true)
            if(state === "register") {
                const {data} = await api.post("/api/users/register", formData)
                localStorage.setItem("token", data.token)
                console.log("registered successfully")
                dispatch(register(data))
            }else if(state === "login") {
                const {data} = await api.post("/api/users/login", {
                    email:formData.email,
                    password:formData.password,
                })
                localStorage.setItem("token", data.token)
                console.log("login successfull")
                dispatch(login(data))
            }
        }catch(error:any){
            setError(error.response?.data?.message || "Something went wrong")
        }finally{
            setLoading(false);
        }
   }

    const handleChange = (e:any) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    

    return (
        <>
         <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="sm:w-[350px]  text-center border border-gray-300/60 rounded-2xl px-8 border-none bg-gray-50 ">
                <h1 className="text-gray-900 text-3xl mt-10 font-medium">{state === "login" ? "Login" : "Sign up"}</h1>
                <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
                {state !== "login" && (
                    <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-4 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                        <input type="text" name="name" placeholder="Name" className="border-none outline-none ring-0" value={formData.name} onChange={handleChange} required />
                    </div>
                )}
                <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
                    <input type="email" name="email" autoComplete="email" placeholder="Email id" className="border-none outline-none ring-0" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-icon lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    <input type="password" name="password" autoComplete={state === "register"? "new-password":"current-password"} placeholder="Password" className="border-none outline-none ring-0" value={formData.password} onChange={handleChange} required />
                </div>
                {state === "login" && (
                    <div className="mt-4 text-left text-indigo-500">
                    <Link to="/forgot-password" className="text-sm" type="reset">Forget password?</Link>
                </div>
                )}
                
                <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">
                    {!loading && (
                        (state === "login" ? "Login" :"SignUp")
                    )}
                    {loading && (
                        state === "login" ? "Logging in..." : "Creating account..."
                    )}
                    
                </button>
                <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-gray-500 text-sm mt-3 mb-11">{state === "login" ? "Don't have an account?" : "Already have an account?"} <a href="#" className="text-indigo-500 hover:underline">click here</a></p>
            </form>
            </div>
            </>
    )
}
export default Auth;