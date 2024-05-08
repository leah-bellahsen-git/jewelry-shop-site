import axios from "axios";


const useHTTP = (model) => {

    const url = 'http://localhost:4444/api/'

    const delItem = async (id) => {
        let result
        try {
            result = await axios.delete(url + model + '/' + id)
            console.log(result);
            alert("deleted")
        }
        catch (error) {
            throw (error)
        }
        return result
    }
    const getItem = async (id) => {
        let result2
        try {
            result2 = await axios.get(url + model + '/' + id)
            alert('accepted')
            console.log("result", result2);
        }
        catch (error) {
            throw (error)
        }
        return result2
    }

    const updateItem = async (obj) => {
        let response
        try {
            response = await axios.put(url + model, obj)
            alert("updated")
        }
        catch (error) {
            throw (error)
        }
        return response

    }

    const addItem = async (obj) => {
        let response2
        try {
            response2 = await axios.post(url + model, obj)
            alert('created')
        }
        catch (error) {
            throw (error)
        }
        return response2
    }




    return { delItem, updateItem, addItem, getItem }

}
export default useHTTP