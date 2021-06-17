const express = require('express')
const router = express.Router()

const {getRegister,postRegister,getLogin,getDashboard,getLandingPage} = require('../controllers/authController')

const pageNotFound = require('../controllers/generalController')


router.get('/',getLandingPage)

router.get('/login',getLogin)

router.route('/register').get(getRegister).post(postRegister)

router.get('/dashboard',getDashboard)

router.get(pageNotFound)

module.exports = router