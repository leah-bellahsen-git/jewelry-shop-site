


import React from "react";
import { useGetUsersQuery } from "../app/appUser/userAPiSlice";
import { useDeleteProductMutation } from "../app/appProduct/productApiSlice";

const DeleteItem = async (props) => {

    let degel;
    console.log("props: ", props?.product?._id);
    const [del, resDel] = useDeleteProductMutation({})

    console.log("Before deleted");
    useDeleteProductMutation()
    console.log("After deleted");
if(degel!=false)
    await del(props.product._id)   
     degel = false

    // await del(3)

    return (
        <>


        </>
    )
}

export default DeleteItem