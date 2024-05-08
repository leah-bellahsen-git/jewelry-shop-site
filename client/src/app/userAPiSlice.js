import apiSlice from "./apiSlice"


const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (build)=>({
        getUsers:build.query({
            query:()=>({
                url:'api/user'
            })
        }),
    addUser: build.mutation({
        query:(user)=>({
            url:'api/user/register',
            method:'POST',
            body:user
        })
    }),
    loginUser: build.mutation({
        query:(user)=>({
            url:'api/auth/login',
            method:'POST',
            body:user
        })
    }),
    }),
})
export const{
    useGetUsersQuery,useAddUserMutation,useLoginUserMutation
} = userApiSlice