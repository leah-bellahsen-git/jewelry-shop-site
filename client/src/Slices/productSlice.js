import { createSlice }from "@reduxjs/toolkit"


const initValue = {
    products:[]
}

const productSlice = createSlice({
    name:"products",
    initialState:initValue,
    reducers:{
        set:(state, actions)=>{
            state.products = actions.payload.data
        }
    }
})
export const {set} = productSlice.actions
export default productSlice.reducer