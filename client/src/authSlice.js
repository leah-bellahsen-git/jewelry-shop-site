import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: sessionStorage.getItem("token") || "",
        user: sessionStorage.getItem("user") || "",
        role: sessionStorage.getItem("role") || "",
        isUserLoggedIn: sessionStorage.getItem("token") ? true : false,
        idUser: sessionStorage.getItem("idUser") || "",
        userFullName: ""
    },
    reducers: {
        setToken: (state, action) => {
            const token = action.payload.accessToken
            state.token = token
            state.isUserLoggedIn = true
            sessionStorage.setItem("token", token)
            console.log("????????????????????????????");

            const user = action.payload.user
            state.user = user
            sessionStorage.setItem("user", JSON.stringify(user.userName))
            console.log("user (on set) ", user.userName);

            const idUser = action.payload.user
            console.log("user details: ", idUser);
            state.idUser = idUser._id
            sessionStorage.setItem("idUser", JSON.stringify(idUser._id))

            const role = action.payload.user.roles
            state.role = role
            sessionStorage.setItem("role", role)
            console.log("role ", role);
        },
        removeToken: (state) => {
            state.token = ""
            state.isUserLoggedIn = false
            sessionStorage.removeItem("token")
            state.user = ""
            sessionStorage.removeItem("user")
            state.role = ""
            sessionStorage.removeItem("role")
        }
    }
})
export default authSlice.reducer
export const { setToken, removeToken, setName } = authSlice.actions