
import apiSlice from "../apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getProducts:build.query({
            query:()=>({
                url:'api/product'
            })
        }),
        addProduct:build.mutation({
            query:(product)=>({
                url:'api/product',
                method:'POST',
                body:product
            })
        }),
        deleteProduct:build.mutation({
            query:(id)=>({
                url:`api/product/${id}`,
                method:'delete'
            })
        })
    }),
})

export const{
    useGetProductsQuery, useDeleteProductMutation, useAddProductMutation
} = productApiSlice