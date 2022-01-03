import {_getUser,makeUser} from "../../models/database/index.js";

const getUser = async (req,res) =>{
    const userId = req.params.userId;
    try {
        const user = await _getUser(userId);
        return res.send({ id:user._id});
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message})
      }
}

const setUser = async (req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  const accounts = req.body.accounts;
  try {
    const user = await makeUser({username,password,accounts});
    return res.send({id:user._id});
  } catch (error) {
    console.log(error);
    return res.status(502).send({error});
  }
}


export {getUser,setUser};