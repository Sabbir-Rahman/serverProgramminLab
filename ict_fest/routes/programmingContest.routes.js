const express = require("express");
const router = express.Router();

const {
  ensureAuthentication,
  addUserData,
} = require("../middlewares/authMiddlewire");

//PC = Programming contest
const {
  getRegisterPC,
  postRegisterPC,
  getListPC,
  deletePC,
  paymentDonePC,
  selectParticipantPC,
  getEditPC,
  postEditPC,
  editPC,
} = require("./../controllers/programmingContest.controller");

router.get("/register", ensureAuthentication, addUserData, getRegisterPC);
router.post("/register", ensureAuthentication, addUserData, postRegisterPC);
router.get("/list", ensureAuthentication, addUserData, getListPC);
router.get("/delete/:id", ensureAuthentication, addUserData, deletePC);
router.get("/edit/:id", ensureAuthentication, addUserData, editPC);
router.get(
  "/payment_done/:id",
  ensureAuthentication,
  addUserData,
  paymentDonePC
);
router.get(
  "/select_participant/:id",
  ensureAuthentication,
  addUserData,
  selectParticipantPC
);
router.get(
  "/edit_participant_form",
  ensureAuthentication,
  addUserData,
  getEditPC
);
router.post(
  "/edit_participant_form/:id",
  ensureAuthentication,
  addUserData,
  postEditPC
);

module.exports = router;
