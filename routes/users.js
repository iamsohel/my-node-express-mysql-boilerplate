const express = require("express");
const router = express.Router();
const models = require("../models");
const responseService = require("../libs/responseService");
const logger = require("../libs/logger");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");

router.put("/", auth, async (req, res) => {
  let user = await models.User.findByPk(req.user.id);
  if (!user) {
    return responseService.sendNotFound(res);
  }
  user.name = req.body.name;
  try {
    let updatedUser = await user.save();
    updatedUser = { id: user.id, name: user.name };
    return responseService.sendResponse(res, { updatedUser });
  } catch (ex) {
    logger.error(ex);
    return responseService.sendServerError(res);
  }
});

router.put("/change-password", auth, async (req, res) => {
  let user = await models.User.findByPk(req.user.id);
  if (!user) {
    return responseService.sendNotFound(res);
  }
  if (req.body.password !== req.body.confirm_password) {
    return responseService.sendBadRequest(res, "Password mismatch");
  }
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await models.User.update(
      { password: user.password },
      { where: { id: req.user.id } }
    );
    updatedUser = { id: user.id, name: user.name };
    return responseService.sendResponse(res, { updatedUser });
  } catch (ex) {
    logger.error(ex);
    return responseService.sendServerError(res);
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return responseService.sendNotFound(res);
    }
    return responseService.sendResponse(res, { user });
  } catch (ex) {
    logger.error(ex);
    return responseService.sendServerError(res);
  }
});

module.exports = router;
