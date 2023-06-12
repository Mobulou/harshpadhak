const express=require("express");

const router=new express.Router();

const controllers=require("../controllers/userControllers")


//routes


router.post("/user/register", controllers.userpost);
router.get("/user/getAlluser",controllers.getUsers);
router.get("/user/singleUser/:id",controllers.getSingleuser);
router.delete("/user/deleteUser/:id",controllers.deleteuser);
router.put("/user/userupdate/:id",controllers.updateUser)
module.exports = router;