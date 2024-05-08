
import apiSlice from "../apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getOrders:build.query({
            query:()=>({
                url:'api/order'
            })
        }),
    

        addOrder:build.mutation({
            query:(order)=>({
                url:'api/order',
                method:'POST',
                body:order
            })
        }),
        updateOrder:build.mutation({
            query:(order)=>({
                url:'api/order',
                method:'PUT',
                body:order
            })
        }),
        getOrderById: build.query({
            query: () => ({
                url:'api/order/byId',
                method:'GET'
            })
        }),
        deleteOrder: build.mutation({
            query: (id) => ({
                url:`api/order/${id}`,
                method:'Delete'
            })
        })
    }),
})

export const{
    useGetOrdersQuery, useAddOrderMutation, useGetOrderByIdQuery, useUpdateOrderMutation, useDeleteOrderMutation
} = orderApiSlice 