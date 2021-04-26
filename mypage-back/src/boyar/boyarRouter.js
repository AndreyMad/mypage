const { Router } = require("express");
const {
  getDots,
  deleteDot,
  addDot,
  editDot,
  boyarAuth,
  checkSessionToken,
} = require("./boyarController");

const router = Router();

router.post("/api/getDots", getDots);
router.post("/api/deleteDot", deleteDot);
router.post("/api/addDot", addDot);
router.post("/api/editDot", editDot);
router.post("/api/authorization", boyarAuth);
router.post('/api/checksessiontoken', checkSessionToken);

module.exports = router;
