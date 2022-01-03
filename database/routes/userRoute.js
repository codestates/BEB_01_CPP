const { Router } = require('express');
const userRouter = Router();
const mongoose = require('mongoose');
const { Users } = require('../models');

userRouter.get('/', async (req, res) => {
  try {
    const users = await Users.find({});
    return res.send({ users })
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message})
  }
})

userRouter.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: 'Invalid userId'})
    const users = await Users.findOne({_id: userId});
    return res.send({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message})
  }
})

userRouter.post('/', async (req, res) => {
  try{
    let { userName, password } = req.body;
    if(!userName) return res.status(400).send({ err: 'username is required' });
    if(!password) return res.status(400).send({ err: 'password is required' });
    const users = new Users(req.body);
    await users.save();
    return res.send({ users })
  }catch(err){
    console.log(err);
    return res.status(500).send({ err: err.message })
  }
})

userRouter.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: 'Invalid userId'})
    const users = await Users.findOneAndDelete({_id: userId});
    return res.send({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).send({err: err.message})
  }
})

userRouter.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: 'Invalid userId'})
    const users = await Users.findOneAndUpdate({_id: userId}, req.body, { new: true });
    return res.send({ users });
  }
  catch (err) {
    console.log(err);
    return res.status(500).send({err: err.message})
  }
})

module.exports = {
  userRouter
}