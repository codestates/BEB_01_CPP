const { Router } = require('express');
const erc20Router = Router();
const { Erc20 } = require('../models');


erc20Router.post('/', async (req, res) => {
  try {
    const { name, symbol, address } = req.body;
    if (!name && !symbol && !address) return res.status(400).send({ err: 'name, symbol, address is required' });
    const erc20 = new Erc20(req.body);
    await erc20.save();
    return res.send({ erc20 })
  }catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message })
  }
})

erc20Router.get('/', async (req, res) => {
  try {
    const erc20 = await Erc20.find();
    if (!erc20) return res.status(400).send({ err: 'Invalid request' });
    return res.send({ erc20 })
  }catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message })
  }
})

erc20Router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const erc20 = await Erc20.findOne({ name });
    if (!erc20) return res.status(400).send({ err: 'Coin does not exist' });
    return res.send({ erc20 })
  }catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message })
  }
})

erc20Router.delete('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const erc20 = await Erc20.findOneAndDelete({ name });
    if (!erc20) return res.status(400).send({ err: 'Coin does not exist' });
    return res.send({ erc20 })
  }catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message })
  }
})

erc20Router.put('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const { symbol, address } = req.body;
    const erc20 = await Erc20.findOneAndUpdate({ name }, { symbol, address }, { new: true });
    if (!erc20) return res.status(400).send({ err: 'Coin does not exist' });
    return res.send({ erc20 })
  }catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message })
  }
})

module.exports = { erc20Router };