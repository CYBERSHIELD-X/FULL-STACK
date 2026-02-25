const Student = require("../models/Student");
const { validationResult } = require("express-validator");

exports.getStudents = async (req, res) => {
    const students = await Student.find();
    res.render("index", { students });
};

exports.addStudent = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("index", {
            students: await Student.find(),
            error: errors.array()[0].msg
        });
    }

    await Student.create(req.body);
    res.redirect("/");
};

