
const Product = require("../models/Product")

const createNewProduct = async(req, res)=>{
    const {name, price, color, inventoryStatus, url, amount} = req.body
    if(!name)
        return res.status(404).json({message:'Name is required'})
    const product = await Product.create({name, price, color, inventoryStatus, url, amount})
    if(!product)
        res.status(400).json({message:'invalid product'})
    res.status(201).json({message:`${name} created`})
}

const getAllProduct = async(req, res)=>{
    const products = await Product.find().lean()
    if(!products)
        return res.status(400).json({message:"products error!"})
    res.json(products)
}

const getProductById = async(req,res)=>{
    const {id} = req.params
    const product = await Product.findById(id)
    if(!product)
        res.status(400).json({message:"Product not found"})
    return res.json(product)
}

const updateProduct = async(req, res)=>{
    const {id, name, price, color, inventoryStatus, url, amount} = req.body
    if(!id || !name)
        res.status(400).json('Please fill all the require parameters!')
    const product = await Product.findById(id).exec()
    product.name = name
    if(price) product.price = price
    if(color) product.color = color
    if(inventoryStatus) product.inventoryStatus = inventoryStatus
    if(url) product.url = url
    if(amount) product.amount = amount
    const updateProduct = await product.save()
    res.json(`${updateProduct.name} updated`)
}

const deleteProduct = async(req,res)=>{
    const {id} = req.params
    const product = await Product.findById(id).exec()
    if(!product)
        res.status(400).json({message:'product not pound'})
    const result = await product?.deleteOne()
    res.json(`${product.name} deleted`)
}




module.exports = {createNewProduct, getAllProduct, getProductById, updateProduct, deleteProduct}