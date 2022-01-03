import mongoose from 'mongoose';
import Users from './models/Users.js';


const getAllUser =async () =>{
    try {
        const users = await Users.find({});
        return users
      } catch (err) {
        console.log(err);
        return false;
      }
}

const _getUser = async (userId) =>{
    try {        
        if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: 'Invalid userId'})
        const user = await Users.findOne({_id: userId});
        return user;
      } catch (err) {
        console.log(err);
        return false;
      }
}

const makeUser = async ({ userName, password,accounts }) =>{
    try{
        if(!userName) return false;
        if(!password) return false;
        const user = new Users({ userName, password,accounts });
        await user.save();
        return user;
      }catch(err){
        console.log(err);
        return false;
      }
}

const changeUserInfo = () =>{

}

const deleteUser = async (userId) =>{
    try {
        if (!mongoose.isValidObjectId(userId)) return false; 
        const user = await Users.findOneAndDelete({_id: userId});
        return user;
      } catch (err) {
        console.log(err);
        return false;
      }
}

export {getAllUser,_getUser,makeUser,changeUserInfo,deleteUser}