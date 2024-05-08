
const verifyJWT = require("../middleware/verifyJWT")
const express = require("express")
const router = express.Router()
const {createNewUser, getAllUser, getUserById, updateUser, deleteUser, addToBasket} = require("../controller/userController")




router.post("/", createNewUser)
router.get("/",verifyJWT, getAllUser)
router.get("/:userName", getUserById)
router.put("/", updateUser)
router.delete("/:id", verifyJWT, deleteUser)
// router.put("/addToBasket", addToBasket)



module.exports = router