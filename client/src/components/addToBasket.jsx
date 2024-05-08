
import React from "react";
import { useGetUserByIdQuery } from "../app/appUser/userAPiSlice";
import { useAddOrderMutation } from "../app/appOrders/orderApiSlice";

const AddToBasket = (props) => {

    const [addFunc, { isError, isSuccess, isLoading, data, error }] = useAddOrderMutation()


    console.log("props: ",props);
    console.log("I am in component AddToBasket1");

    const userName = sessionStorage.getItem("user")


    //const [getI, resGetI] = useGetUserByIdQuery({})

    //const myUser = getI(userName)

    //const myUser = data?.find((u)=>u.userName.localeCompare(userName) )
    //console.log("myUserOnView ", myUser);

    const order = {
        productId: "65e608578fb6d39f0ecf1447",//props.productId,
        amount: props.amount,
        userId: userName
    }
    
    addFunc(order)
    return (
        <>
            {console.log("product: ", props.product)}
            {console.log("amount: ", props.amount)}


        </>
    )
}

export default AddToBasket