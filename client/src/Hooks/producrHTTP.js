// import axios from "axios";


// const useHTTP = (model) => {

//     const url = 'http://localhost:4444/product/'

//     const delItem = async (id) => {
//         try {
//             const result = await axios.delete(url + model + '/' + id)
//             console.log(result);
//             alert("deleted")
//         }
//         catch (error) {
//             throw (error)
//         }
//         return result
//     }

//     const updateItem = async (obj) => {
//         try {
//             const response = await axios.put(url + model, obj)
//             alert("updated")
//         }
//         catch (error) {
//             throw (error)
//         }
//         return response

//     }

//     const addItem = async(obj) =>{
//         try{
//             const response = axios.post(url+model,obj)
//             alert('created')
//         }
//         catch(error){
//             throw(error)
//         }
//         return response
//     }


// return {delItem, updateItem, addItem}

// }
// export default useHTTP