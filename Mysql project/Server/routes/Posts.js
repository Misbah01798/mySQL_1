const express = require('express');
const router = express.Router();
const {Posts} = require('../models')
const { Users } = require("../models");

router.get('/', (req, res) =>{
    res.send("server running")
});

router.post("/", async (req, res) =>{
    const post = req.body;
   await Posts.create(post);
   res.json(post);
    
})







module.exports =router;