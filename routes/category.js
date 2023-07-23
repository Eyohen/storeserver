const express = require("express");
const {create,update,remove,list,read} = require('../controllers/category.js')

//middlewares
const {requireSignIn, isAdmin} = require('../middlewares/auth.js')

const router = express.Router();


router.post('/category/create', requireSignIn, isAdmin, create)
router.put('/category/update/:updateId',  requireSignIn, isAdmin, update)
router.delete('/category/delete/:deleteId',  requireSignIn, isAdmin, remove)
router.get('/category/list', list)
router.get('/category/:slug', read)

module.exports = router;