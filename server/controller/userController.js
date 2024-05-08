
const User = require('../models/User')

const Product = require('../models/Product')

const createNewUser = async (req, res) => {

    const { userName, phone, email, roles, password, Shoppingbasket, address } = req.body
    if (!userName || !password)
        return res.status(404).json({ message: 'Please fill all the require parameters!' })


    const sameName = await User.find({ userName: userName }).lean()
    if ((await sameName.length > 0))
        return res.status(400).json({ massege: 'This name is exist' })
    const user = await User.create({ userName, phone, email, roles, password, Shoppingbasket, address })

    if (!user)
        return res.status(400).json({ message: 'invalid user' })
    res.status(201).json({ message: `${userName} created successfully` })

}

const getAllUser = async (req, res) => {
    const users = await User.find().lean()
    if (!users)
        return res.status(400).json({ message: "Users error!" })
    res.json(users)
}
const getUserById = async (req, res) => {
    const { userName } = req.params
    const user = await User.find({ userName: userName }).lean()
    // const user = await User.findById(userName)
    if (!user)
        res.status(400).json({ message: "Product not found" })
    return res.json(user)
}

const updateUser = async (req, res) => {
    const { id, userName, phone, email, roles, password, Shoppingbasket, address } = req.body
    if (!id || !userName || !password)
        return res.status(400).json({ message: 'Please fill all the require parameters!' })
    const user = await User.findById(id).exec()
    if (!user)
        return res.status(400).json({ message: 'User not found' })
    user.password = password
    user.userName = userName
    if (phone) user.phone = phone
    if (email) user.email = email
    if (roles) user.roles = roles
    if (Shoppingbasket) user.Shoppingbasket = Shoppingbasket
    if(address) user.address = address

    const updatedUser = await user.save()
    res.json(`${updatedUser.userName} updated`)
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id).exec()
    if (!user)
        return res.status(400).json({ message: 'User not found' })
    const result = await user.deleteOne()
    console.log(req.user);
    res.json(`${user.userName} deleted`)

}
//***************************************************************//
//If I will use this code, I will need to add address parameter.
//***************************************************************//
//const Product = require('../models/Product')

// const addToBasket = async (req, res) => {
//     const { userName, productId, quantity } = req.body
//     if (!userName || !productId || !quantity) {
//         return res.status(400).json({ message: 'All the fields is required!' })
//     }

//     const user = await User.find({ userName: userName }).exec()
//     if (!user)
//         return res.status(400).json({ message: 'User is not found' })
//     const product = await Product.findById(productId).exec()
//     if (!product)
//         return res.status(400).json({ message: 'Product is not found' })

//     // if (product.quantity < quantity) {
//     //     return res.status(400).json({ message: 'Products quantity is not enough' })
//     // }
//     const f = (user?.Shoppingbasket?.products)?.find(p=>{
//         if(p.product_id==productId){
//             p.quantity = p.quantity+quantity
//         }
//         return (p.product_id==productId)
//     })

//     if(f==undefined){
//    //             console.log( user.Shoppingbasket.products);
// console.log(user.Shoppingbasket);
//         user.Shoppingbasket.products = await [...user.Shoppingbasket,{product_id:productId, quantity:quantity}]
//         console.log( user.Shoppingbasket);
//     }
//     const updatedUser = await user.save()
//    return res.json(updatedUser.Shoppingbasket)

// }



module.exports = { createNewUser, getAllUser, getUserById, updateUser, deleteUser }