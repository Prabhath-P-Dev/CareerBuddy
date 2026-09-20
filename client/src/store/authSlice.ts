import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface User {
    id:string;
    name:string;
    email:string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading:boolean
}

const initialState: AuthState = {
    user:null,
    token:null,
    isAuthenticated:false,
    loading:false
}

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers: {
    register:(state, action:PayloadAction<{user:User, token:string}>)=>{
        state.token = action.payload.token
        state.user = action.payload.user
        state.isAuthenticated = true
    },
    login:(state, action:PayloadAction<{user:User, token:string}>)=>{
        state.token = action.payload.token
        state.user = action.payload.user
        state.isAuthenticated = true
    },
    logout:(state)=>{
        state.token = null
        state.user = null
        state.isAuthenticated = false
        localStorage.removeItem('token')
    },
    setLoading:(state, action:PayloadAction<boolean>)=>{
        state.loading = action.payload
    },
  }

})

export const {register, login, logout, setLoading} = authSlice.actions
export default authSlice.reducer