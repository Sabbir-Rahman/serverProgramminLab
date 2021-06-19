const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");

const {getRegister,postRegister,getLogin,getDashboard,getLandingPage,postLogin,logout} = require('../controllers/authController')

const isLoggedIn = require('../middleWare/authMiddleWare')

const pageNotFound = require('../controllers/generalController')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use('/dashboard',isLoggedIn)
router.get('/',getLandingPage)

router.route('/login').get(getLogin).post(postLogin)

router.get('/logout',logout)

router.route('/register').get(getRegister).post(postRegister)

router.get('/dashboard',getDashboard)

router.get(pageNotFound)

module.exports = router