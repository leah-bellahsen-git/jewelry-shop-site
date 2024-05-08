
const Order = require("../models/Orders")

const createNewOrder = async (req, res) => { 

    const { userId, productId, amount, url, productName, status, userName} = req.body
    // console.log({ userId, productId, amount });
    if (!userId || !productId)
        return res.status(404).json({ message: 'Please fill all the require parameters!' })
    const order = await Order.findOne({ productId, userId, active: true}).exec()
    if (!order) {
        const newOrder = await Order.create({ userId, productId, amount, url, productName, status, userName})
        if (newOrder) {
            return res.status(201).json({ message: 'New order created' })
        }
        else {
            return res.status(400).json({ message: 'Invalid order' })
        }
    }

    else {
        order.amount += amount
        const updateOrder = await order.save()
        console.log(updateOrder);
        res.json(`'${updateOrder.mealId}' updated`)
    }

}

const getAllOrder = async (req, res) => {
    console.log("I am in getAllorders");
    const orders = await Order.find().lean()
    if (!orders)
        return res.status(400).json({ message: "Orders error!" })
    res.json(orders)
}

// const getOrderById = async (req, res) => {

//     const {userName}  = req.params

//     if (!userName)
//         return res.status(404).json({ message: "id is required" })
//     const orders = await Order.find({ userName: userName}).populate(['userId', 'productId']).lean()
//     if (!orders?.length)
//         return res.status(400).json({ message: "Order not found" })
//     return res.json(orders)
// }

// const getOrderById = async (req, res) => {

//     console.log("req.user22: ",req.user);
//     const userId  = req.user._id
//     console.log("userId",userId);
//     if (!userId)
//         return res.status(404).json({ message: "userName is required" })
//     const order = await Order.find({ userId: userId }).populate(['userId', 'productId']).lean()    
//     console.log("orders:",order);

//     if (!order?.length)
//         return res.status(400).json({ message: "Order not found" })
//     return res.json(order)
// }
const getOrderById = async (req, res) => {

    const userId  = req.user._id
    if (!userId)
        return res.status(404).json({ message: "userName is required" })
    const order = await Order.find({ userId: userId }).populate(['userId', 'productId']).lean()    
    console.log("orders:",order);

    if (!order?.length)
        return res.status(400).json({ message: "Order not found" })
    return res.json(order)
}


// const updatedOrder = async (req, res) => {
//     const { id, userId, productId, amount, active, url, productName, status, userName} = req.body
//     if (!id || !userId || !productId)
//         return res.status(400).json({ message: 'Please fill all the require parameters!' })
//     const order = await Order.findById(id).exec()
//     if (!order)
//         return res.status(400).json({ message: 'Order not found' })
//     order.userId = userId
//     order.productId = productId
//     if (amount) order.amount = amount
//     if (active) order.active = active
//     if(url) order.url = url
//     if(productName) order.productName = productName
//     if(status) order.status = status
//     if(userName) order.userName = userName
    
//     const updatedOrder = await order.save()
//     res.json(`Order of ${updatedOrder.userId} updated`)
// }
const updatedOrder = async (req, res) => {
    const { id, userId, productId, amount, active, url, productName, status, userName} = req.body
    if (!id)
        return res.status(400).json({ message: 'Please fill all the require parameters!' })
    const order = await Order.findById(id).exec()
    if (!order)
        return res.status(400).json({ message: 'Order not found' })
    if(userId) order.userId = userId
    if(productId) order.productId = productId
    if (amount) order.amount = amount
    if (active) order.active = active
    if(url) order.url = url
    if(productName) order.productName = productName
    if(status) order.status = status
    if(userName) order.userName = userName
    
    const updatedOrder = await order.save()
    res.json(`Order of ${updatedOrder.userId} updated`)
}

// const deleteOrder = async (req, res) => {
//     const { id } = req.params
//     const order = await Order.findById(id).exec()
//     if (!order)
//         return res.status(400).json({ message: 'Order not found' })
//     const result = order.deleteOne()
//     res.json(`Order of${order.userId} deleted`)

// }
const deleteOrder = async (req, res) => {
    const  {id}  = req.params
    const order = await Order.findById(id).exec()
    if (!order)
        return res.status(400).json({ message: 'Order not found' })
    const result = await order.deleteOne()
    res.json(`Order of${order.userId} deleted`)

}
// const deleteOrder = async (req, res) => {
//     const { id } = req.body._id
//     const order = await Order.findById(id).exec()
//     if (!order)
//         return res.status(400).json({ message: 'Order not found' })
//     const result = order.deleteOne()
//     res.json(`Order of${order.userId} deleted`)

// }

module.exports = { createNewOrder, getAllOrder, getOrderById, updatedOrder, deleteOrder }