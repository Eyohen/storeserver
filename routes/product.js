const express = require("express");
const {create,update,remove,list,read,photo} = require('../controllers/product.js')
const formidableMiddleware = require('express-formidable');


//middlewares
const {requireSignIn, isAdmin} = require('../middlewares/auth.js')

const router = express.Router();


router.post('/product/create', requireSignIn, isAdmin, formidableMiddleware(), create);
router.put('/product/update/:productId',  requireSignIn, isAdmin, formidableMiddleware(), update);
router.delete('/product/delete/:productId',  requireSignIn, isAdmin, remove);
router.get('/product/list', list);
router.get('/product/:slug', read);
router.get('/product/photo/:productId', photo);

module.exports = router;