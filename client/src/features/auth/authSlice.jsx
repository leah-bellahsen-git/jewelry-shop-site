import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: sessionStorage.getItem("token") || "",
        isUserLoggedIn: sessionStorage.getItem("token") ? true : false,
        userFullName: "",
        role: "",
        userId:""
    },
    reducers: {
        setToken: (state, action) => {
            const token = action.payload.accessToken
            state.token = token
            sessionStorage.setItem("token", token)
            const role = action.payload.user.roles
            console.log("role on slice:", role);
            state.role = role
            sessionStorage.setItem("role", role)
            state.isUserLoggedIn = true
            const userId = action.payload.user._id
            console.log("UserId on slice:", userId);
            sessionStorage.setItem("userId", userId)
            state.userId = userId


        },
        removeToken: (state) => {
            state.token = ""
            sessionStorage.removeItem("token")
            state.role = ""
            sessionStorage.removeItem("role")
            state.isUserLoggedIn = false
            sessionStorage.removeItem("userId")
            state.userId = ""
        }
    }
})

export default authSlice.reducer
export const { setToken, removeToken } = authSlice.actions