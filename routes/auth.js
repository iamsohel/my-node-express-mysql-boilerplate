const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const models = require("../models");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const responseService = require("../libs/responseService");
const logger = require("../libs/logger");

router.post("/signin", async (req, res) => {
  const validateLoginInput = require("../validation/login");
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return responseService.sendBadRequest(res, errors);
  const user = await models.User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return responseService.sendBadRequest(
      res,
      "email or password is not correct."
    );
  }
  try {
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return responseService.sendBadRequest(res, "Invalid email or password.");
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      keys.jwtPrivateKey,
      { expiresIn: "2days" }
    );
    return responseService.sendResponse(res, { token });
  } catch (ex) {
    logger.error(ex);
    return responseService.sendServerError(res);
  }
});

router.post("/signup", async (req, res) => {
  const validateRegisterInput = require("../validation/register");
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return responseService.sendBadRequest(res, errors);
  let user = await models.User.findOne({ where: { email: req.body.email } });
  if (user) {
    return responseService.sendBadRequest(res, "User already registered.");
  }
  userObj = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    user = await models.User.create(userObj);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await models.User.update(
      { password: user.password },
      { where: { id: user.id } }
    );
    const data = { id: user.id, name: user.name, email: user.email };
    return responseService.sendResponse(res, { user });
  } catch (ex) {
    logger.error(ex);
    return responseService.sendServerError(res);
  }
});

module.exports = router;
