const express = require("express");
const router = express.Router();
const controller = require("../controllers/studentController");
const { body } = require("express-validator");

// READ
router.get("/", controller.getStudents);

// CREATE
router.post("/add",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Valid email required"),
        body("age").isNumeric().withMessage("Age must be number")
    ],
    controller.addStudent
);

module.exports = router;
