const express = require("express");
const router = express.Router();
const controller = require("../controllers/anime.controller");

router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.post("/", controller.create);
router.put("/:id", controller.editById);
router.delete("/:id", controller.deleteById);

module.exports = router;
