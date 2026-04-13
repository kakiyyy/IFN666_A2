const express = require("express");

const controller = require("../controllers/tutorial");

const validateMongoId = require("../middleware/validateMongoId");
const authenticateWithJwt = require("../middleware/authenticateWithJwt");
const validatePaginateQueryParams = require("../middleware/validatePaginateQueryParams");

const router = express.Router();

// Public GET, protected POST
router.route("/")
    .get(validatePaginateQueryParams, controller.list)
    .post(authenticateWithJwt, controller.create);

// Public GET by id, protected PUT and DELETE
router.route("/:id")
    .all(validateMongoId("id"))
    .get(controller.detail)
    .put(authenticateWithJwt, controller.update)
    .delete(authenticateWithJwt, controller.delete);

module.exports = router;
