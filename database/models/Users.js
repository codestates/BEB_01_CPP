const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accounts: { 
    address: { type: String, required: true },
    privateKey: { type: String, required: true }
  }
}, { timestamps: true, versionKey:false });

const Users = model('users', UserSchema);
module.exports = { Users }
