const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: String,
  privateKey: String
}, { timestamps: true, versionKey:false });

const Users = model('user', UserSchema);
module.exports = { Users }