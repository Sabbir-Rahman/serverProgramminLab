const express = require('express')

const router = express.Router()

const { getLogin, postLogin, getRegister, postRegister} = require('../controllers/users.controller')

router.route('/login').get(getLogin).post(postLogin)
router.route('/register').get(getRegister).post(postRegister)

module.exports = router