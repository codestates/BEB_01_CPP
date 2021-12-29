const { Router } = require('express');
const userRouter = Router();
const mongoose = require('mongoose');
const { Users } = require('../models/Users');

userRouter.get('/', async (req, res) => {
  try {
    const users = await Users.find({});
    return res.send({ users})
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message})
  }
})

userRouter.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: 'Invalid userId'})
    const user = await Users.findOne({_id: userId});
    return res.send({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message})
  }
})

userRouter.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: 'Invalid userId'})
    const user = await Users.findOneAndDelete({_id: userId});
    return res.send({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({err: err.message})
  }
})

userRouter.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: 'Invalid userId'})
    const { userName, password, address, privateKey } = req.body;
    if (!userName || !password || !address || !privateKey) return res.status(400).send({ err: 'Invalid user data'})
    if (userName.length < 3) return res.status(400).send({ err: 'Invalid userName'})
    if (password.length < 3) return res.status(400).send({ err: 'Invalid password'})
    
    // if(age) updateBody.age = age;
    // if(name) updateBody.name = name;
    // const user = await Users.findByIdAndUpdate(userId, updateBody, { new: true });

    let user = await Users.findById(userId);
    if (userName) user.userName = userName;
    if (password) user.password = password;
    if (address) user.address = address;
    if (privateKey) user.privateKey = privateKey;
    await user.save()

    return res.send({user})
  } catch (err) {
    console.log(err);
    return res.status(500).send({err: err.message})
  }
})

userRouter.post('/', async (req, res) => {
  try{
    let { userName, password, address, privateKey } = req.body;
    if(!userName) return res.status(400).send({ err: 'username is required' });
    if(!password) return res.status(400).send({ err: 'password is required' });
    const user = new Users(req.body);
    await user.save();
    return res.send({ user })
  }catch(err){
    console.log(err);
    return res.status(500).send({ err: err.message })
  }
})

module.exports = {
  userRouter
}