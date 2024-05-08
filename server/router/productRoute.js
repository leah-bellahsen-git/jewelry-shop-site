const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")
const express = require("express")
const router = express.Router()
const {createNewProduct, getAllProduct, getProductById, updateProduct, deleteProduct} = require("../controller/productController")

router.post("/", createNewProduct)

// router.post("/",verifyJWT, createNewProduct)
router.get("/", getAllProduct)
router.get("/:id", getProductById)
router.put("/", updateProduct)
router.delete("/:id", deleteProduct)
//router.delete("/:id",verifyAdmin, deleteProduct)


module.exports = router