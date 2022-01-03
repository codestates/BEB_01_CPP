const { Schema, model } = require('mongoose');

const Erc20Schema = new Schema(
  {
    name: { type: String, required: true },
    value: {
      symbol: { type: String, required: true },
      address: { type: String, required: true }
      }
  }, 
  { versionKey:false });

const Erc20 = model('erc20', Erc20Schema);
module.exports = { Erc20 }