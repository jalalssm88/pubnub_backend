const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
router.post('/signup', (req, res, next) => {
    console.log('user in signup', req.body)
    User.find({email:req.body.email})
    .exec()
    .then(user=> {
        if(user.length >= 1){
            return res.status(409).json({
                status: "failed",
                message: "User already exist"
            })
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }else{
                    const new_user = new User({
                        full_name:req.body.full_name,
                        email:req.body.email,
                        password:hash,
                    })
                    new_user.save()
                    .then(()=> {
                        res.status(200).json({
                            status: "success",
                            message: "User successfully created"
                        })
                    })
                    .catch(err=> {
                        res.status(500).json({
                            error:err
                        })
                    })
                }
            })
        }
    })
});

router.post('/login', (req, res, next)=>{
    console.log('user in login ', req.body)
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(400).json({
                message:"Email you try to login not found"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if(err){
                return res.status(400).json({
                    message:"Auth failed"
                })
            }
            if(result){
                const token = jwt.sign({
                    userId: user[0]._id,
                    email:user[0].email,
                },
                    'secret'
                );
                return res.status(200).json({
                    message: "Auth successful",
                    token:'Bearer ' + token,
                    full_name:user[0].full_name,
                    email:user[0].email,
                    userId:user[0]._id
                })
            }
            res.status(400).json({
                message:"Password does not match"
            })
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
    })
})

module.exports = router;