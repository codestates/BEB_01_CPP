import pkg from 'mongoose';
const { Schema, model } = pkg;

const UserSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accounts: { 
    address: { type: String, required: true },
    privateKey: { type: String, required: true }
  }
}, { timestamps: true, versionKey:false });

const Users = model('user', UserSchema);
export default Users;