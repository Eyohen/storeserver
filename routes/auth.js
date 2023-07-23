const express = require("express");
const {register, login,secret} = require('../controllers/auth.js')


const {requireSignIn, isAdmin} = require('../middlewares/auth.js')

const router = express.Router();




router.post('/register', register)
router.post('/login', login)
//testing
router.get('/secret', requireSignIn, isAdmin, secret)

module.exports = router;