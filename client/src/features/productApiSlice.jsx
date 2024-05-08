
import apiSlice from "../app/apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getProduct: build.query({
            query:()=>({
                url:"/api/product"
            }),
            providesTags: ["Products"]
        }),
        addProductsItem:build.mutation({
            query:(product)=>({
                url:"/api/product",
                method:"POST",
                body:product

            }),
            invalidatesTags: ["Products"]
        }),
        deleteProductsItem: build.mutation({
            query:({id})=>({
                url:"/api/product/id",
                method:"DELETE"
            })
        })
    })
})

export const {useGetProductQuery, useAddProductsItemMutation, useDeleteProductsItemMutation} = productApiSlice