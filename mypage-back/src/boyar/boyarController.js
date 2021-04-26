const db = require("../../postgres/boyarDbController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const getDots = async (req, res) => {
  const dataResp = await db.getDots();
  if (dataResp.error) {
    return res.status(200).send(dataResp);
  }
  return res.status(201).send(dataResp);
};

const deleteDot = async (req, res) => {
  const dataResp = await db.deleteDot(req.body.id);
  if (dataResp.error) {
    return res.status(203).send(dataResp);
  }
  return res.status(200).send(dataResp);
};

const addDot = async (req, res) => {
  const dataResp = await db.addDot(req.body.data);
  if (dataResp.error) {
    return res.status(403).send(dataResp);
  }
  return res.status(200).send(dataResp);
};

const editDot = async (req, res) => {
  const dataResp = await db.editDot(req.body.dot);
  if (dataResp.error) {
    return res.status(403).send(dataResp);
  }

  return res.status(200).send(dataResp);
};

const boyarAuth = async (req, res) => {
  const user = req.body.user;
  const userFromDB = await db.checkBoyarUser(user);
  if (!userFromDB) {
    return res.status(200).send({ status: "Incorrect Login" });
  }
  const isPasswValid = bcrypt.compareSync(
    req.body.user.password,
    userFromDB.password
  );
  if (!isPasswValid) {
    return res.status(200).send({ status: "Incorrect Password" });
  }
  const token = jwt.sign(userFromDB.id, config.secret);
  db.updateBoyarUserToken(userFromDB.login, token);
  return res
    .status(200)
    .send({ token: token, status: "succes", name: userFromDB.login });
};

const checkSessionToken = async (req, res) => {
  const dataResp = await db.checkSessionToken(req.body.token);
  if (!dataResp) {
    return res.status(200).send({ status: "not authorized" });
  }
  return res
    .status(200)
    .send({ status: "sheck succes", username: dataResp.login });
};

module.exports = {
  addDot,
  editDot,
  deleteDot,
  getDots,
  boyarAuth,
  checkSessionToken,
};
