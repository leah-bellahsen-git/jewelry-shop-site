 import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
    reducerPath:'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4444/',
        credentials:'include',
        prepareHeaders:(headers, {getState})=>{
            const token = getState().auth.token
            if(token){
                console.log("token");
                headers.set("authorization",`Bearer ${token}`)
            }
            else{
                console.log("not token");
            }
            return headers
        }
    }),
    endpoints:()=>({})
})
export default apiSlice