import  express  from "express";
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import mongoose from "mongoose"
import { Router } from "express";
const router = Router()
import Users from "../models/User.js";


router.post('/signup', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (!password || !username) {
        res.status(422).json({ error: "please enter all fields" })

    }
    Users.findOne({ name: username })
        .then((saveduser) => {
            if (saveduser) {
                return res.status(422).json({ error: "user already exist" })
            }
            const user = new Users({
                name: username,
                password: password
            })
            user.save()
                .then(user => {
                    res.json({ message: "saved successfully" })
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
})

/**Sign in route
 * 
 */
router.post('/signin', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    console.log(username);
    // console.log(username);
    // if username and password not given
    if (!password || !username) {
        res.status(422).json({ error: "please enter all fields" })

    }
    // check password is correct
    Users.findOne({ name: username })
        .then(saveduser => {
            if (!saveduser) {
                return res.status(422).json({ error: "invalid user it is" })
            }
            if (password == saveduser.password) {

                const token = jwt.sign({ _id: saveduser._id }, process.env.SECRET_KEY)
                res.send(token)
            }
            else {
                return res.status(422).json({ error: "invalid user" })
            }
        })
        .catch(err => {
            console.log(err);
        })
})

export default router