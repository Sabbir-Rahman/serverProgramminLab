const express = require('express')
const router = express.Router()

const {
    ensureAuthentication,
    addUserData
} = require('../middlewares/authMiddlewire')

//MO = Math Olympiad
const { getRegisterMO,postRegisterMO,getListMO,deleteMO} = require('./../controllers/mathOlympiad.controller')

router.route('/register',ensureAuthentication,addUserData).get(getRegisterMO).post(postRegisterMO)
router.get('/list',ensureAuthentication,addUserData, getListMO)
router.get("/delete/:id", ensureAuthentication, addUserData, deleteMO);

module.exports = router