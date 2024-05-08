const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")
const express = require("express")
const router = express.Router()

const {createNewOrder, getAllOrder, getOrderById, updatedOrder, deleteOrder} = require("../controller/orderController")

router.post("/", createNewOrder)
//router.get("/",verifyAdmin, getAllOrder)
router.get("/", getAllOrder)
router.get("/byId",verifyJWT, getOrderById)
router.put("/", updatedOrder)
router.delete("/:id",verifyJWT, deleteOrder)
// router.delete("/:id",verifyJWT, deleteOrder)

module.exports = router

