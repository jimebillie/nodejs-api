import express from "express";
import {body, checkExact, validationResult} from "express-validator";
import Users from "../../model/users.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


// Configurations
const api_v1 = express();
const bcryptSalt = bcrypt.genSaltSync(10);


// Router Register
api_v1.post("/register",
     [
        // Username
        body('username')
            .notEmpty().withMessage("Username should not be null")
            .isLength({min: 8, max: 100}).withMessage("Username should over 8 and lower 100 character"),
        // Password
        body('password')
            .notEmpty().withMessage("Password should not be null")
            .isLength({max: 252}).withMessage("Password should over lower 252 character"),
        // Name
        body('name')
            .notEmpty().withMessage("Name should not be null")
            .isLength({max: 252}).withMessage("Name should lower 252 character"),
        // Last Name
        body('lastname')
            .notEmpty().withMessage("Last Name should not be null")
            .isLength({max: 252}).withMessage("Last Name lower 252 character"),
        // Email
        body('email')
            .notEmpty().withMessage("Email should not be null")
            .isEmail().withMessage("Not Type Email")
            .isLength({max: 252}).withMessage("Email lower 252 character"),

    ],
    (req, res) => {

        // Register Validator
        const validatorReq = validationResult(req)
        if (!validatorReq.isEmpty()) {
            res.json({"Validator": validatorReq.array()});
        }

        const usersModel = new Users({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, bcryptSalt),
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            _token: jwt.sign({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, bcryptSalt),
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email
            }, process.env.JWT_SECRET, {expiresIn: "1h"}),
        })

        // Save to database
        usersModel.save().then(() => {
            res.json(
                {
                    "Status": 200,
                    "Msg": "Data User is saved",
                }
            )
        }).catch((error) => {
            // Catch Error usersModel.save()
            res.json(
                {
                    "Status": 0,
                    "detail": error,
                }
            )
        })
    });




// Router Login
api_v1.post("/login", async (req, res) => {

    // Select by username
    const username = req.body.username
    const findUser = await Users.find({username: username}).exec();

    // Compare Password, First of all checking findUser have user on database?
    if (findUser.length !== 0) {

        // Auth Password
        const chkPW = bcrypt.compareSync(req.body.password, findUser[0]["password"]);

        // Can compare password
        if (chkPW === true) {
            const dataUser = findUser[0];

            // Generate new token
            const _token = await jwt.sign({
                username: dataUser["username"],
                password: dataUser["password"],
                name: dataUser["name"],
                lastname: dataUser["lastname"],
                email: dataUser["email"],
            }, process.env.JWT_SECRET, {expiresIn: "1h"})

            // Update new token on database
            await Users.updateOne({_id:dataUser["_id"]}, {_token: _token});

            // Response after all successful
            res.json({
                "Status": 200,
                "Msg": "Login Successful",
                "_token": _token,
            })
        }
        // Can't compare password
        else {
            res.json({
                "Status": 0,
                "Msg": "Login Fail, Please check your username or password!",
            })
        }
    }
    // Can't find username on database
    else {
        res.json({
            "Status": 0,
            "Msg": "Not have this user, Please new register.",
        })
    }
})

export default api_v1;
