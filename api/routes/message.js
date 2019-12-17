const express = require('express');
const router = express.Router();

const Message = require('../models/messageModel');
router.post('/chat_request', (req, res, next) => {
    console.log('body in chat', req.body)
    let new_channel_id = `${req.body.user_id}${req.body.other_user_id}`
    console.log('new channel id', new_channel_id)
    const new_message = new Message({
        channel_id:new_channel_id
    })

    new_message.save()
    .then(result =>{
        res.json({
            data:result
        })
    })
});

router.get('/chat_users', (req, res, next)=> {
    Message.find()
    .exec()
    .then(result =>{
        res.json({
            data:result
        })
    })
})

module.exports = router;